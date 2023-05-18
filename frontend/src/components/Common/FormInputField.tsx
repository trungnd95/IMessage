import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';

type FormInputFieldProps = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
};

export default function FormInputField({
  textarea,
  ...props
}: FormInputFieldProps) {
  const [field, { touched, error }] = useField(props);
  const InputEle = !textarea ? Input : Textarea;
  return (
    <FormControl isInvalid={(touched && error) as boolean | undefined}>
      {props.label && (
        <FormLabel m={5} htmlFor={props.name}>
          {props.label}
        </FormLabel>
      )}
      <InputEle {...field} {...props} />
      {touched && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
