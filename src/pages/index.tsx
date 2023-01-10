import {
  Flex,
  Button,
  Stack,
  Image,
  Heading,
  useToast,
  Text
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useForm } from 'react-hook-form';
import { SubmitHandler } from "react-hook-form/dist/types";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useEffect } from "react";
import Router from "next/router";

import { signIn, useSession } from "next-auth/react"

type SignInFormData = {
  identidade: string;
  senha: string;
}

const signInFormSchema = yup.object().shape({
  identidade: yup.string().required('Obrigatório.'),
  senha: yup.string().required('Senha obrigatória.')
})

export default function Home() {
  const { register, handleSubmit, formState, formState: {errors} } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { data:session } = useSession()

  const toast = useToast()
  useEffect(() => {
    if(session){
      Router.push('/dashboard')
    }else {
      return
    }
  }, [session])

  const handleSignIn:SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const res = await signIn("credentials", {
      redirect: false,
      identidade: values.identidade,
      senha: values.senha,
    });

    if (res.error) {
      toast({
        title: 'Login',
        description: 'Senha ou indentidade incorreta.',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return Router.push('/')
    }

    Router.push('/dashboard');
  }


  return (
    <Flex w="100vw" h="100vh" flexDir="row" align="center" justify="center">
      <Flex bg="gray.800" rounded="lg" px={8}>
        <Flex align="center" justify="center"> 
            <Image src='./img/CFRN5BIS.png' alt='brasão Cmdo Fron RN / 5 BIS' />
        </Flex>
        <Flex
          as="form"
          w="100%"
          flexDir="column"
          maxWidth={360}
          p="8"
          borderRadius={8}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Flex align="center" justify="center" flexDir='column'>
              <Heading as='h1' size='2xl' pb={4}>SisAGI</Heading>
              <Text fontSize={['sm','md','lg']}>Sistema de Apoio a Gestão Interna</Text>
              <Heading as='h2' size='md'>Cmdo Fron RN / 5 BIS</Heading>
            </Flex>

            <Input name="identidade" label="Identidade" type="text" error={errors.identidade} {...register("identidade")} />
            <Input name="password" label="Senha" type="password" error={errors.senha} {...register("senha")}/>
          </Stack>
          <Flex flexDir="row" justifyContent="space-between">
          <Button type="submit" mt="6" colorScheme="green" size="lg" isLoading={formState.isSubmitting}>
            Entrar
          </Button>
          <Link href="/cadastro">
            <Button mt="6" colorScheme="blue" size="lg" >
              Cadastrar
            </Button>
          </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
