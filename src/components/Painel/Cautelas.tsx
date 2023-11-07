import {
  Flex,
  Circle,
  Text,
  Heading,
  Grid,
  VStack,
  Tag,
  HStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { CautelaArray } from "../../@types/types";
import { NotData } from "../NotData";
import { NotLoaded } from "../NotLoaded";
import { useState } from "react";

export function CautelasComponentPainel() {
  const { data: session } = useSession();
  const [first, setfirst] = useState()

  const { data, isLoading } = useQuery(["todasCautelas"], async () => {
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
      {isLoading ? (
        <NotLoaded />
      ) : !(data?.data?.length === 0) ? (
        <Grid gridTemplateColumns={["1fr 1fr"]} mb={4} pb={4} mx={4}>
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
      {isLoading ? (
        <NotLoaded />
      ) : data?.data.filter(
          (cautela) =>
          cautela.status === 'ativo' &&
            cautela.cautelou.nome_guerra === session.militar.nome_guerra
        ).length !== 0 ? (
        <Grid gridTemplateColumns={["1fr","1fr", "1fr 1fr"]} mb={4} pb={4} mx={4}>
          {/* UMA OBRA DE ARTE ESSE CODIGO ABAIXO */}
          {isLoading ? (
            <NotLoaded />
          ) : (
            Array.from(
              new Set(
                data?.data
                  .filter((cautela) => cautela.status === "ativo")
                  .map((item) => item.material.nome)
              )
            ).map((nomeMaterial, index) => (
              <Flex
                key={nomeMaterial + index}
                boxShadow="buttonShadow"
                px={4}
                py={1}
                m={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <VStack flex={1} textAlign="center">
                  <Text mr={2}>{nomeMaterial}</Text>
                  <HStack>
                    <Tag bgColor="green.600" color="white">
                      Cautelas:
                      {
                        data?.data.filter(
                          (item) => item.material.nome === nomeMaterial
                        ).length
                      }
                    </Tag>
                    <Tag bgColor="green.600" color="white">
                      Quantidade:
                      {data?.data
                        .filter((item) => item.material.nome === nomeMaterial)
                        .map((item) => item.quantidade || 0)
                        .reduce(
                          (acumulador, valorAtual) => acumulador + valorAtual,
                          0
                        )}
                    </Tag>
                  </HStack>
                </VStack>
              </Flex>
            ))
          )}
        </Grid>
      ) : (
        <NotData textoComponent="Sem materiais cautelados." />
      )}
    </Flex>
  );
}
