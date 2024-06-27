/* eslint-disable react/no-unescaped-entities */
import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";

import Head from "next/head";
import { Militar, MilitarArray } from "../../../@types/types";
import { RxUpdate } from "react-icons/rx";
import { DadosPessoais } from "../../../components/SuperAdmin/Forms/DadosPessoais";
import { DadosMilitares } from "../../../components/SuperAdmin/Forms/DadosMilitares";
import { Endereco } from "../../../components/SuperAdmin/Forms/Endereco";
import { NotLoaded } from "../../../components/NotLoaded";
import ReactPaginate from "react-paginate";
import { Input } from "../../../components/Form/Input";
import { PostoGraduacaoArray } from '../../../utils/staticArray';
import { useEffect } from 'react';

export default function SuperAdmin() {
  const [result, setResult] = useState<MilitarArray>([]);
  const [militar, setMilitar] = useState<Militar>();
  const [militarNome, setMilitarNome] = useState("");
  const [militarPostGrad, setMilitarPostGrad] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetch, isLoading } = useQuery(["todosMilitares"], async () => {
    const result = await api.get<MilitarArray>("/militar");
    setResult(
      result.data.sort((x, y) => {
        let a = x.nome_completo.toUpperCase(),
          b = y.nome_completo.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
      })
    );
    return result;
  });

  const itemsPerPage = 20;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(militarNome)
  const resultPaginated = result
    .filter((mil) => (militarNome ? mil.nome_completo.toLowerCase().includes(militarNome.toLowerCase()) : mil))
    .filter((mil) => (militarPostGrad ? mil.post_grad == militarPostGrad : mil))
    .slice(itemOffset, endOffset);
  const pageCount = Math.ceil(result.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % result.length;
    setItemOffset(newOffset);
  };
  
  async function handleGetMilitar(id: string) {
    if (militar?.id !== id) {
      setLoading(true);
      const res = await api.get<Militar>(`/militar/${id}`);
      setMilitar(res.data);
    }
    setLoading(false);
  }

  
  return (
    <>
      <Head>
        <title>SisAGI | Administração</title>
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
              rounded="lg"
              w="100%"
              flexDirection="column"
              mb={4}
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading size="md" p={4}>
                  MILITARES
                </Heading>
                <Button
                  boxShadow="buttonShadow"
                  colorScheme="messenger"
                  size="md"
                  p={4}
                  mr={2}
                  onClick={() => refetch}
                >
                  <RxUpdate size={16} />
                </Button>
              </Flex>
              {isLoading ? (
                <NotLoaded />
              ) : (
                <>
                  <Flex mx={4} gap={8}>
                    <Input
                      name="local"
                      label="P/G"
                      type="text"
                      as="select"
                      onChange={(e) => setMilitarPostGrad(e.target.value)}
                    >
                      <option value="">Todos</option>
                      {(
                        Array.from(
                          new Set(result?.map((item) => item.post_grad))
                        )
                          .sort((x, y) => {
                            let a = x.toUpperCase(),
                              b = y.toUpperCase();
                            return a == b ? 0 : a > b ? 1 : -1;
                          })
                          .map((postGrad, index) => (
                            <option key={postGrad + index} value={postGrad}>
                              {postGrad}
                            </option>
                          ))
                      )}
                    </Input>
                    <Input
                      label="Nome"
                      name="nomeMilitar"
                      type="text"
                      px="8"
                      mb={4}
                      onChange={(e) => setMilitarNome(e.target.value)}
                    />
                  </Flex>
                  <TableContainer px={4} mb={4}>
                    <Table size="sm" variant="simple" colorScheme="whiteAlpha">
                      <TableCaption>
                        QUADRO DE EFETIVO DA COMPANHIA
                      </TableCaption>
                      <>
                        <Thead>
                          <Tr>
                            {PostoGraduacaoArray?.map((postGrad, index) => (
                              <Th key={postGrad + index} textAlign="center">
                                {postGrad}
                              </Th>
                            ))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            {PostoGraduacaoArray?.map((postGrad, index) => (
                              <Td key={postGrad + index} textAlign="center">
                                {
                                  result?.filter(
                                    (mil) => mil.post_grad === postGrad
                                  ).length
                                }
                              </Td>
                            ))}
                          </Tr>
                        </Tbody>
                      </>
                    </Table>
                  </TableContainer>
                  <Box m="auto" w="100%" h="100%" px={2}>
                    <Accordion allowToggle>
                      {(
                        resultPaginated?.map((mil: Militar, index) => (
                          <AccordionItem
                            border="0"
                            mb={2}
                            key={index}
                            onClick={() => handleGetMilitar(mil.id)}
                          >

                            <h2>
                              <AccordionButton
                                boxShadow="buttonShadow"
                                bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                                rounded={4}
                                px={4}
                                py="0.5"
                                w="full"
                                border="0"
                              >
                                <Box as="span" flex="1" textAlign="left" py={2}>
                                  <Text
                                    fontWeight="extrabold"
                                    textTransform="uppercase"
                                  >
                                    {mil.nome_completo}
                                    <Badge
                                      variant="outline"
                                      colorScheme="green"
                                      ml={2}
                                    >
                                      {mil.post_grad + " " + mil.nome_guerra}
                                    </Badge>
                                  </Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel
                              as="div"
                              pb={4}
                              border="0"
                              borderTop={0}
                              roundedBottom="lg"
                              borderColor="green.600"
                              bgColor="gray.990"
                              boxShadow="innerShadow"
                            >
                              {!loading ? (
                                <>
                                  <Flex
                                    flexDirection="row"
                                    gap={4}
                                    justifyContent="space-between"
                                  >
                                    <DadosPessoais
                                      militar={{ ...mil, ...militar }}
                                    />
                                    <DadosMilitares
                                      militar={{ ...mil, ...militar }}
                                    />
                                  </Flex>
                                  <Endereco militar={{ ...mil, ...militar }} />
                                </>
                              ) : <NotLoaded />}

                            </AccordionPanel>

                          </AccordionItem>
                        ))
                      )}
                      <Flex>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">>>>"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          pageCount={pageCount}
                          previousLabel="<<<<"
                          renderOnZeroPageCount={null}
                          className="paginate"
                          selectedPageRel="canonical"
                        />
                      </Flex>
                    </Accordion>
                  </Box>
                </>
              )}
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
