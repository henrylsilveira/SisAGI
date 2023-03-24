/* eslint-disable react/no-unescaped-entities */
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Circle,
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
  useToast,
  Text,
  Center,
  Grid,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";

import { SlRefresh } from "react-icons/sl";
import { TiInfoLarge } from "react-icons/ti";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Cautela, CautelaArray } from "../../../@types/types";
import { convertDate } from "../../../utils/scripts";
import { BiLock } from "react-icons/bi";
import { ModalValidate } from "../../../components/Modal/Material/ModalValidate";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { ArmamentoComponentPainel } from "../../../components/Painel/Armamento";
import { CautelasComponentPainel } from "../../../components/Painel/Cautelas";
import { NotData } from '../../../components/NotData/index';

export default function MinhasCautelas() {
  const { data: session } = useSession();

  const [cautelaFechada, setCautelaFechada] = useState(Boolean);
  const [search, setSearch] = useState([]);

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasCautelasDoMilitar"],
    async () => {
      const result = await api.get(`/cautela/${session?.militar.id}`);
      setSearch(result.data)
      return result;
    }
  );

  function filterResult(e) {
    setCautelaFechada(e.target.checked)
    setSearch(
      data?.data.filter((res) => (cautelaFechada ? res : res.status === "ativo"))
    );
  }

  return (
    <>
      <Head>
        <title>SisAGI | Minhas Cautelas</title>
      </Head>

      <Flex direction="column" flex="1" gap={4}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Grid gridTemplateColumns={["1fr","1fr 1fr "]} gap={4} justifyContent="space-between">
              <CautelasComponentPainel />
              <ArmamentoComponentPainel />
            </Grid>
            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="buttonShadow"
              flexDirection="column"
              rounded="lg"
              px={4}
              w="100%"
              mt={4}
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
                  CAUTELAS {isLoading ? <Spinner ml={8} /> : ""}
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
              
                
                <Flex
                bg="gray.990"
                mx="auto"
                p="2"
                w="auto"
                rounded="md"
                boxShadow="buttonShadow"
                justifyContent="space-between"
              >
                <Text mr={4}>FILTRO</Text>
                <Checkbox
                  size="lg"
                  colorScheme="blue"
                  onChange={(e) => filterResult(e)}
                  mr={4}
                >
                  Fechada?
                </Checkbox>
              </Flex>
              {!(search?.length === 0) ? (
              <TableContainer my={6}>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Material</Th>
                      <Th textAlign="center">Obs</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">SU</Th>
                      <Th textAlign="center">Dependência</Th>
                      <Th textAlign="center">Cautelou</Th>
                      <Th textAlign="center">Data Cautela</Th>
                      <Th textAlign="center">Situação</Th>
                      <Th textAlign="center">Validado?</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {search ? search?.map((res: Cautela) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{res.material.nome}</Td>
                        <Td textAlign="center">
                          <Popover placement="top-start">
                            <PopoverTrigger>
                            <Circle
                            size="30px"
                            bg="green.600"
                            _hover={{ bgColor: "green.800" }}
                            boxShadow="buttonShadow"
                            py={1}
                            my={1}
                            mx="auto"
                          >
                                <Icon boxSize={6} as={TiInfoLarge} />
                              </Circle>
                            </PopoverTrigger>
                            <PopoverContent bg="gray.990" border="1px" borderColor="green.700">
                              <PopoverHeader fontWeight="bold">
                                Observação
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
                                {res.observacao}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                        <Td textAlign="center">{res.quantidade}</Td>
                        <Td textAlign="center">{res.sub_unidade}</Td>
                        <Td textAlign="center">{res.dependencia}</Td>
                        <Td textAlign="center">
                          {res.cautelou?.post_grad +
                            " " +
                            res.cautelou?.nome_guerra}
                        </Td>
                        <Td textAlign="center">
                          {convertDate(res.data_cautela)}
                        </Td>
                        <Td textAlign="center"><Badge variant="outline" colorScheme={res.status === "ativo" ? "whatsapp" : "orange"}>{res.status}</Badge></Td>
                        <Td textAlign="center">
                          {res.validado ? (
                            <Circle
                              mx="auto"
                              size="40px"
                              boxShadow="buttonShadow"
                              bg="gray.990"
                            >
                              <BiLock size={24} color="#00AA00" />
                            </Circle>
                          ) : (
                            <ModalValidate data={res} />
                          )}
                        </Td>
                      </Tr>
                    )): <Text>Vazio</Text>}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th textAlign="center">Material</Th>
                      <Th textAlign="center">Obs</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">SU</Th>
                      <Th textAlign="center">Dependência</Th>
                      <Th textAlign="center">Cautelou</Th>
                      <Th textAlign="center">Data Cautela</Th>
                      <Th textAlign="center">Situação</Th>
                      <Th textAlign="center">Validado?</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
              ) : <NotData textoComponent="Nenhuma cautela encontrada" />}
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
