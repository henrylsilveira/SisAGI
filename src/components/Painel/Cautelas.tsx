import {
  Flex,
  Circle,
  Text,
  Heading,
  Grid,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { CautelaArray } from "../../@types/types";
import { NotData } from "../NotData";

export function CautelasComponentPainel() {
  const { data: session } = useSession();

  const { data } = useQuery(["todasCautelas"], async () => {
    const result = await api.get<CautelaArray>(
      `/cautela/${session.militar.id}`
    );
    return result;
  });

  return (
    <Flex
      bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
      boxShadow="buttonShadow"
      rounded="lg"
      transition="ease-in-out"
      w="100%"
      flexDirection="column"
    >
      <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
        <Heading size="md" p={2}>
          CAUTELAS
        </Heading>
      </Flex>
      {!(data?.data?.length === 0) ? (
        <Grid
          gridTemplateColumns={["1fr 1fr"]}
          mb={4}
          pb={4}
          mx={4}
        >
          <VStack mx="auto">
            <Text
              boxShadow="buttonShadow"
              px={2}
              py={1}
              bg="whiteAlpha.100"
              rounded="lg"
            >
              Cautelas abertas
            </Text>
            <Text
              boxShadow="buttonShadow"
              px={2}
              py={1}
              bg="whiteAlpha.100"
              rounded="lg"
            >
              Cautelas fechadas
            </Text>
          </VStack>
          <VStack mx="auto">
            <Text
              boxShadow="buttonShadow"
              px={4}
              py={1}
              bgColor="yellow.800"
              rounded="lg"
            >
              {
                data?.data.filter(
                  (cautela) => cautela.data_fechamento_cautela == null
                ).length
              }
            </Text>
            <Text
              boxShadow="buttonShadow"
              px={4}
              py={1}
              bgColor="green.600"
              rounded="lg"
            >
              {
                data?.data.filter(
                  (cautela) => cautela.data_fechamento_cautela !== null
                ).length
              }
            </Text>
          </VStack>
        </Grid>
      ) : (
        <NotData textoComponent="Nenhuma cautela encontrada." />
      )}
      <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
        <Heading size="md" p={2}>
          MATERIAIS
        </Heading>
      </Flex>
      {(data?.data?.length === 0 || data?.data?.filter((cautela) => cautela.status === "ativo")) ? (
        <Grid
        gridTemplateColumns={["1fr","1fr 1fr"]}
        mb={4}
        pb={4}
        mx={4}
      >
        {/* UMA OBRA DE ARTE ESSE CODIGO ABAIXO */}
        {Array.from(
          new Set(
            data?.data
              .filter((cautela) => cautela.status === "ativo")
              .map((item) => item.material.nome)
          )
        ).map((cautela, index) => (
          <Flex
            key={cautela + index}
            boxShadow="buttonShadow"
            px={4}
            py={1}
            m={1}
            alignItems="center"
            justifyContent="space-between"
          >
            {cautela}
            <Circle
            ml={2}
              size="40px"
              bg="green.700"
              boxShadow="buttonShadow"
              fontWeight="bold"
            >
              {
                data?.data.filter((item) => item.material.nome === cautela)
                  .length
              }
            </Circle>
          </Flex>
        ))}
      </Grid>
      ) : <NotData textoComponent="Sem materiais cautelados." />}
      
    </Flex>
  );
}
