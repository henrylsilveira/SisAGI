
import {
  Box,
  Flex,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";


import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { useSession } from "../../../services/context/auth";
import ScheduleViatura from "../../../components/ScheduleViatura/ScheduleViatura";
import { PedidoViatura } from "../../../@types/types";
import { api } from "../../../services/api";
import { useQuery } from "react-query";

export default function RelatorioS4() {
  const { user: session, status } = useSession();

  const { isLoading, error, data } = useQuery(
    ["todosPedidosViaturas"],
    async () => {
      const result = await api.get<PedidoViatura[]>("/veiculos/pedidos");
      return result;
    }
  );
  const toast = useToast();
  useEffect(() => {
    if (!session?.Funcao.find((func) => func.funcao === "enc pmt")) {
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
        <title>SisAGI | S/4</title>
      </Head>
      <Flex direction="column" flex="1" gap={4}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.990" borderRadius={8} pb="4">
            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="buttonShadow"
              rounded="lg"
              w="100%"
              flexDirection="column"
              p={4}
              as="form"
              direction="column"

            >
              <ScheduleViatura pedidosViatura={data?.data} />
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
