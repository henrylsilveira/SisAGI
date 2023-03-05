import {
  Flex,
  Grid,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Router from "next/router";
import { formatarDataHora } from "../utils/scripts";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ComumComponentDashboard } from "../components/Dashboard/Comum";

export default function Dashboard() {
  const { data: session, status } = useSession()
  console.log(session)
  const toast = useToast()
  const idLogado = 'toastNaoLogado'
  const id = 'toastLogin'
  
  useEffect(() => {
      if(session && status === 'authenticated') {
        if (!toast.isActive(id)){
          toast({
            id,
            title: 'Autenticação válida.',
            description: `Seu token de acesso é válido até dia ${formatarDataHora(session.expires)}. `,
            status: 'info',
            duration: 2000,
            isClosable: true,
          })
        }
        }else {
          Router.push('/')
          if (!toast.isActive(idLogado)){
              toast({
              id: idLogado,
              title: 'Autenticação inválida.',
              description: `Seu token de acesso venceu, realize o login novamente. `,
              status: 'warning',
              duration: 1000,
              isClosable: true,
            })
          }
        }
  }, [session, toast, status])

  return (
    <>
    <Head>
        <title>SisAGI | Painel Principal</title>
    </Head>
    <Grid gridTemplateColumns={["1fr"]} gap={4} bg="gray.800" borderRadius={8} p={4}>
        <ComumComponentDashboard />
    </Grid>
    </>
  );
}