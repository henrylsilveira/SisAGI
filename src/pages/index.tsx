import {
  Flex,
  Button,
  Stack,
  Image,
  Heading,
  useToast,
  Text,
  Grid,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";

import { signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getUserIP } from "../utils/scripts";

type SignInFormData = {
  identidade: string;
  senha: string;
  ip?: string;
};

const signInFormSchema = yup.object().shape({
  identidade: yup.string().required("Obrigatório."),
  senha: yup.string().required("Senha obrigatória."),
  ip: yup.string()
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { data: session, status } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (session && status === "authenticated") {
      Router.push("/dashboard");
    } else {
      Router.push("/");
      return;
    }
  }, [session, status]);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await signIn("credentials", {
      redirect: false,
      identidade: values.identidade,
      senha: values.senha,
      ip: await getUserIP(),
      callbackUrl: "/dashboard"      
    });

    if (res.error) {
      toast({
        title: "Login",
        description: res.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return ;
    }
    return Router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>SisAGI | Sistema de Apoio a Gestão Interna</title>
      </Head>
      <Flex w="100vw" h="100vh" flexDir="row" align="center" justify="center">
        <Grid gridTemplateColumns={["1fr","1fr 1fr"]} bg="#1b1b1b44" backdropFilter="blur(5px)" boxShadow="buttonShadow" rounded="2xl" px={8}>
          <Flex w={["25","30"]} mx="auto" align="center" justify="center">
            <Image src="./img/CFRN5BIS.png" alt="brasão Cmdo Fron RN / 5 BIS" />
          </Flex>
          <Flex
            as="form"
            w="100%"
            flexDir="column"
            maxWidth={420}
            p="8"
            borderRadius={8}
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack
              spacing={4}
              border="1px"
              boxShadow="buttonShadow"
              bg="gray.990"
              borderColor="green.800"
              rounded="2xl"
              pb={8}
              px={6}
            >
              <Flex align="center" justify="center" flexDir="column">
                <Heading
                  fontWeight="bold"
                  letterSpacing="tight"
                  bgGradient="linear(to-tr, green.300, gray.600, green.300 )"
                  bgClip="text"
                  size="2xl"
                  mt={2}
                  p={4}
                >
                  SisAGI
                </Heading>
                <Text fontSize={["sm", "md", "lg"]}>
                  Sistema de Apoio a Gestão Interna
                </Text>
                <Heading as="h2" size="md">
                  Cmdo Fron RN / 5 BIS
                </Heading>
              </Flex>

              <Input
                name="identidade"
                label="Identidade"
                type="text"
                error={errors.identidade}
                {...register("identidade")}
              />
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.senha}
                {...register("senha")}
              />
              <Flex flexDir="row" justifyContent="space-between">
              <Button
                boxShadow="buttonShadow"
                variant="ghost"
                w="100%"
                transition="0.3s"
                _hover={{ border: "1px" , borderColor: "green.700" }}
                type="submit"
                mt="6"
                mr={4}
                colorScheme="green"
                size="lg"
                isLoading={formState.isSubmitting}
              >
                Entrar
              </Button>
              <Link href="/cadastro">
                <Button
                  boxShadow="buttonShadow"
                  mt="6"
                  w="100%"
                  variant="ghost"
                  transition="0.3s"
                  _hover={{ border: "1px" , borderColor: "blue.700" }}
                  colorScheme="blue"
                  size="lg"
                >
                  Cadastrar
                </Button>
              </Link>
            </Flex>
            </Stack>
            
            <Flex
              textAlign="center"
              boxShadow="buttonShadow"
              my={4}
              alignItems="center"
              w="full"
              bg="blackAlpha.500"
              rounded="lg"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="tight"
                bgGradient="linear(to-tr, green.300, gray.600, green.300 )"
                bgClip="text"
                p={2}
                w="full"
              >
                Desenvolvido pelo 3ªSgt Henry - 2016
              </Text>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
