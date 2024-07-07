
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  filter,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";
import * as yup from "yup";

import { SlRefresh } from "react-icons/sl";
import { TiInfoLarge } from "react-icons/ti";
import { ModalCautela } from "../../../components/Modal/Material/ModalCautela";
import Head from "next/head";
import { CautelaArray, Material, MaterialArray } from "../../../@types/types";
import { useSession } from "../../../services/context/auth";


interface MaterialDataProps extends Material {
  cautelas?: CautelaArray;
}

const signInFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório."),
  condicoes: yup.string().required("Condições obrigatória."),
  quantidade: yup.number().required("Quantidade obrigatório."),
  codigo: yup.string(),
  subUnidade: yup.string().required("SU obrigatório"),
  dependencia: yup.string().required("Dependência obrigatório"),
  categoria: yup.string().required("Categoria obrigatório"),
});

export default function Cautela() {
  const { user: session, status } = useSession();
  const [result, setResult] = useState({});
  const [militares, setMilitares] = useState({});

  const { isLoading: militarLoading, data: militarData } = useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get("/militar");
      setMilitares(result);
    }
  );

  const { isLoading, data, refetch } = useQuery(
    ["todosMateriais"],
    async () => {
      const result = await api.get<MaterialArray>("/material");
      const filterData = result.data.filter(
        (result: Material) =>
          result.sub_unidade === session.companhia &&
          result.dependencia === session.pelotao
      );
      setResult(filterData);
      return filterData;
    }
  );
  

  return (
    <>
      <Head>
        <title>SisAGI | Material - Cautelar</title>
      </Head>
      <Flex direction="column" flex="1" gap={4}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="buttonShadow"
              flexDirection="column"
              rounded="lg"
              px={4}
              w="100%"
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
                py={2}
              >
                <Heading fontSize="2xl" pl={2}>
                  MATERIAIS {isLoading ? <Spinner ml={8} /> : ""}
                </Heading>
                <IconButton
                  boxShadow="buttonShadow"
                  colorScheme="twitter"
                  float="right"
                  mr={2}
                  onClick={() => refetch()}
                  aria-label="Atualizar tabela"
                  icon={<SlRefresh />}
                />
              </Flex>
              <TableContainer px={4} mb={4}>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Material</Th>
                      <Th textAlign="center">Condições</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">SU</Th>
                      <Th textAlign="center">Dependência</Th>
                      <Th textAlign="center">Cauteladas</Th>
                      <Th textAlign="center">Disponíveis</Th>
                      <Th textAlign="center">Categoria</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((res: MaterialDataProps) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{res.nome}</Td>
                        <Td textAlign="center">
                          <Popover placement="top-start">
                            <PopoverTrigger>
                              <Button
                                bg="green.400"
                                size="xs"
                                _hover={{ bgColor: "green.600" }}
                                py="1"
                                boxShadow="buttonShadow"
                              >
                                <Icon boxSize={6} as={TiInfoLarge}  color="white" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent bg="gray.990"
                          border="1px"
                          borderColor="green.700">
                              <PopoverHeader fontWeight="bold">
                                Condições
                              </PopoverHeader>
                              <PopoverArrow bg="gray.800" />
                              <PopoverCloseButton />
                              <PopoverBody
                                as="div"
                                wordBreak="normal"
                                h="auto"
                                py={6}
                                overflow="scroll"
                              >
                                {res.condicoes}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                        <Td textAlign="center">{res.quantidade}</Td>
                        <Td textAlign="center">{res.sub_unidade}</Td>
                        <Td textAlign="center">{res.dependencia}</Td>
                        <Td textAlign="center">
                          {res.cautelas
                            ?.filter((c: any) => c.status === "ativo")
                            .reduce((total = 0, cautela) => {
                              return total + cautela.quantidade;
                            }, 0)}
                        </Td>
                        <Td textAlign="center">
                          {res.quantidade -
                            res.cautelas
                              ?.filter((c: any) => c.status === "ativo")
                              .reduce((total = 0, cautela) => {
                                return total + cautela.quantidade;
                              }, 0)}
                        </Td>
                        <Td textAlign="center">
                          {res.categoria === "controlado" ? (
                            <Badge
                              as="span"
                              variant="outline"
                              colorScheme="red"
                            >
                              {res.categoria}
                            </Badge>
                          ) : (
                            <Badge
                              as="span"
                              variant="outline"
                              colorScheme="green"
                              boxShadow="buttonShadow"
                            >
                              {res.categoria}
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          {res.quantidade -
                            res.cautelas
                              ?.filter((c: any) => c.status === "ativo")
                              .reduce((total = 0, cautela) => {
                                return total + cautela.quantidade;
                              }, 0) !==
                          0 ? (
                            <ModalCautela data={militares} dataMaterial={res} refetch={refetch} />
                          ) : (
                            <Badge
                              as="span"
                              variant="outline"
                              colorScheme="red"
                            >
                              SEM MATERIAL
                            </Badge>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th textAlign="center">Material</Th>
                      <Th textAlign="center">Condições</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">SU</Th>
                      <Th textAlign="center">Dependência</Th>
                      <Th textAlign="center">Cauteladas</Th>
                      <Th textAlign="center">Disponíveis</Th>
                      <Th textAlign="center">Categoria</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
