import FormInputField from '@/components/Common/FormInputField';
import {
  User,
  useCreateConversationMutation,
  useSearchUsersLazyQuery,
} from '@/graphql-client/generated/graphql';
import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
//import { User } from 'next-auth';
import { useState } from 'react';
import * as Yup from 'yup';

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateModal({ isOpen, onClose }: CreateModalProps) {
  /// Libs
  const toast = useToast();
  const router = useRouter();

  /// Graphql query
  const [searchUsers, { loading, error }] = useSearchUsersLazyQuery();
  const [
    createConversation,
    { loading: createConversationLoading, error: createConversationError },
  ] = useCreateConversationMutation();

  /// Component state
  const [searchedUsers, setSearchedUsers] = useState<Array<User> | undefined>(
    undefined,
  );
  const [selectedUsers, setSelectedUsers] = useState<Array<User>>([]);

  const { data: session } = useSession();

  /// Callback handlers
  const handleCreateConversation = async () => {
    /// Get list selected users id & current user id.
    const participantIds = [
      ...selectedUsers!.map((user) => user.id),
      session?.user.id as string,
    ];

    /// Call api
    try {
      const response = await createConversation({
        variables: {
          participantIds,
        },
      });
      if (response.data?.createConversation?.success) {
        /// Give toast alert message
        toast({
          title: 'Conversation created.',
          description: response.data.createConversation.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        /// Push conversation id to router param
        router.push({
          query: {
            conversationId: response.data.createConversation.conversation?.id,
          },
        });

        /// Clean state & close modal
        onClose();
        setSearchedUsers(undefined);
        setSelectedUsers([]);
      } else {
        /// Give toast alert message
        toast({
          title: 'Create conversation failed.',
          description: response.data?.createConversation?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="whiteAlpha.200">
        <ModalHeader>Create converstation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ searchUsername: '' }}
            // validate={(values) => {
            //   const errors = {
            //     searchUsername: '',
            //   };
            //   if (values.searchUsername.length < 3)
            //     errors.searchUsername = 'username must not empty';
            //   console.log(errors);
            //   return errors;
            // }}
            validationSchema={Yup.object({
              searchUsername: Yup.string().required('Username is required!'),
            })}
            onSubmit={async (values) => {
              const response = await searchUsers({
                variables: {
                  ...values,
                },
              });

              setSearchedUsers(response.data?.searchUsers);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormInputField
                  name="searchUsername"
                  placeholder="Search username"
                  type="text"
                />
                <Button
                  type="submit"
                  variant="solid"
                  w="100%"
                  mt={4}
                  isLoading={isSubmitting || loading}
                >
                  Search
                </Button>
              </Form>
            )}
          </Formik>
          {/* Query result */}
          {(error || createConversationError) && (
            <Text
              fontSize="xl"
              color="red.500"
            >{`Failed to request to server. ${
              error || createConversationError
            }`}</Text>
          )}
          <Box mt={4}>
            {searchedUsers &&
              (searchedUsers?.length <= 0 ? (
                <Text fontSize="md">No uer found!</Text>
              ) : (
                <VStack spacing={5} alignItems="flex-start">
                  {searchedUsers.map((user) => (
                    <HStack
                      key={user.id}
                      p={4}
                      spacing={4}
                      align="center"
                      bg="blackAlpha.300"
                      borderRadius={5}
                      w="full"
                      justify="space-between"
                    >
                      <Flex alignItems="center" gap={4}>
                        <Avatar src={user.image} name={user.name} />
                        <Text fontSize="md">{user.username}</Text>
                      </Flex>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          setSelectedUsers((prev) => [...prev, user]);
                        }}
                        isDisabled={selectedUsers.includes(user)}
                      >
                        Select
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              ))}
          </Box>

          {/* List of selected users */}
          {selectedUsers.length > 0 && (
            <Box mt={4} px={3} py={3} bg="blackAlpha.300">
              <Flex gap={2} wrap="wrap">
                {selectedUsers.map((user) => (
                  <HStack
                    px={3}
                    py={3}
                    spacing={3}
                    key={user.id}
                    bg="whiteAlpha.50"
                    borderRadius={5}
                  >
                    <Text>{user.username}</Text>
                    <Circle
                      size={5}
                      color="whiteAlpha.600"
                      bg="whiteAlpha.200"
                      _hover={{ cursor: 'pointer' }}
                      onClick={() =>
                        setSelectedUsers((prev) =>
                          prev.filter((user_) => user_.id != user.id),
                        )
                      }
                    >
                      <SmallCloseIcon />
                    </Circle>
                  </HStack>
                ))}
              </Flex>
            </Box>
          )}
        </ModalBody>
        <ModalFooter m={3}>
          <Button
            color="whiteAlpha.900"
            bgColor="red.600"
            _hover={{ bgColor: 'red.800' }}
            mr={3}
            onClick={onClose}
            w="50%"
          >
            Close
          </Button>
          <Button
            w="50%"
            variant="solid"
            bgColor="green.600"
            color="whiteAlpha.900"
            isDisabled={selectedUsers.length == 0}
            _hover={{ bgColor: 'green.800' }}
            onClick={handleCreateConversation}
            isLoading={createConversationLoading}
          >
            Create converstation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
