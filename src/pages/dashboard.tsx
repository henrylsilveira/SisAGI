import { Flex, Grid, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import Router from "next/router";
import { formatarDataHora } from "../utils/scripts";
import Head from "next/head";
import { ComumComponentDashboard } from "../components/Dashboard/Comum";
import { useSession } from "../services/context/auth";

export default function Dashboard() {
  // const { data: session, status } = useSession();
  const { user: session, status } = useSession();
  console.log(session)
  console.log(status)
  const toast = useToast();
  const idLogado = "toastNaoLogado";
  const id = "toastLogin";
  // useEffect(() => {
  //   if (session) {
  //     if (!toast.isActive(id)) {
  //       toast({
  //         id,
  //         title: "Autenticação válida.",
  //         description: `Seu token de acesso é válido até dia . `,
  //         status: "info",
  //         duration: 2000,
  //         isClosable: true,
  //       });
  //     }
  //   } else {
  //     Router.push("/");
  //     if (!toast.isActive(idLogado)) {
  //       toast({
  //         id: idLogado,
  //         title: "Autenticação inválida.",
  //         description: `Seu token de acesso venceu, realize o login novamente. `,
  //         status: "warning",
  //         duration: 1000,
  //         isClosable: true,
  //       });
  //     }
  //   }
  // }, [session, toast]);

  return (
    <>
      <Head>
        <title>SisAGI | Painel Principal</title>
      </Head>
      <Flex
        bg="gray.800"
        borderRadius={8}
        w="100%"
        p={4}
      >
        <ComumComponentDashboard />
      </Flex>
    </>
  );
}
