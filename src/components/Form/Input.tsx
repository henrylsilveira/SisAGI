import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | any;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        bgColor="gray.990"
        _readOnly={{ color: 'gray.700'}}
        border="1px"
        borderColor="gray.700"
        _hover={{ bgColor: "gray.990" }}
        focusBorderColor="green.500"
        variant="filled"
        size="lg"
        ref={ref}
        {...rest}
      />
      
      {!!error && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
    
  );
};

export const Input = forwardRef(InputBase);
