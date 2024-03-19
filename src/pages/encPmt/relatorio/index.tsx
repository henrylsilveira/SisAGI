
import {
    Box,
    Flex,
    SimpleGrid,
    useToast,
  } from "@chakra-ui/react";
  
  import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
  
  export default function RelatorioPmt() {
    const { data: session } = useSession();
   
    const toast = useToast();
    useEffect(() => {
      if (!session?.militar.Funcao.find((func) => func.funcao === "enc pmt")) {
        Router.push("/");
        toast({
          title: "Acesso não autorizado.",
          description: 'Você não tem autorização para acessar essa área.',
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }, [session, toast]);

  
    return (
      <>
        <Head>
          <title>SisAGI | Encarregado do PMT</title>
        </Head>
        <Flex direction="column" flex="1" gap={4}>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            
    
            </Box>
          </SimpleGrid>
        </Flex>
      </>
    );
  }
  