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
import { useContext, useEffect, useState } from "react";
import Router from "next/router";

import Head from "next/head";
import { getUserIP } from "../utils/scripts";

import { useSession } from "../services/context/auth";
import { NotLoaded } from "../components/NotLoaded";

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
  const [loading, setLoading] = useState(false);
const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const toast = useToast();

  const { user: session, signed, Login } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/dashboard");
    } else {
      Router.push("/");
      return;
    }
  }, [session]);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await Login({
        identidade: values.identidade,
        senha: values.senha,
        ip: await getUserIP(),
      })
      if (res.status != 200) {
        toast({
          title: "Login",
          description: res.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });

      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false)


    // const res = await signIn("credentials", {
    //   redirect: false,
    //   identidade: values.identidade,
    //   senha: values.senha,
    //   ip: await getUserIP(),
    //   callbackUrl: "/dashboard"      
    // });


    return Router.push("/");
  };

  return (
    <>
      <Head>
        <title>SisAGI | Sistema de Apoio a Gestão Interna</title>
      </Head>
      <Flex w="100vw" h="100vh" flexDir="row" align="center" justify="center">
        <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} bg="#1b1b1b44" backdropFilter="blur(5px)" boxShadow="buttonShadow" rounded="2xl" px={8}>
          <Flex w={["25", "30"]} mx="auto" align="center" justify="center">
            <Image w={480} src="./img/logo13bib.png" alt="brasão 13 BIB" />
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

                <Image w="12rem" src="./img/logo3.png" alt="SisAGI" />


              </Flex>

              <Input
                name="identidade"
                label="Identidade"
                type="text"
                placeholder="Nr identidade"
                error={errors.identidade}
                {...register("identidade")}
              />
              <Input
                name="password"
                label="Senha"
                type="password"
                placeholder="senha"
                error={errors.senha}
                {...register("senha")}
              />
              <Flex flexDir="row" justifyContent="space-between">
                <Button
                  boxShadow="buttonShadow"
                  variant="ghost"
                  w="100%"
                  transition="0.3s"
                  _hover={{ border: "1px", borderColor: "green.700" }}
                  type="submit"
                  mt="6"
                  mr={4}
                  colorScheme="green"
                  size="lg"
                >
                  {loading === true ? <NotLoaded compact /> : "Entrar"}
                  
                </Button>
                <Link href="/cadastro">
                  <Button
                    boxShadow="buttonShadow"
                    mt="6"
                    w="100%"
                    variant="ghost"
                    transition="0.3s"
                    _hover={{ border: "1px", borderColor: "blue.700" }}
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
                Desenvolvido e projetado pelo 3ªSgt Henry - 2016
              </Text>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
    </>
  );
}

