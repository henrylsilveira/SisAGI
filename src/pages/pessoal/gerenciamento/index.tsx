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
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";

import Head from "next/head";
import { Militar, MilitarArray } from "../../../@types/types";
import { RxUpdate } from "react-icons/rx";
import { DadosPessoaisComponent } from "../../../components/SuperAdmin/Forms/DadosPessoais";
import { DadosMilitares } from "../../../components/SuperAdmin/Forms/DadosMilitares";
import { Endereco } from "../../../components/SuperAdmin/Forms/Endereco";
import { useSession } from "next-auth/react";
import ReactPaginate from "react-paginate";
import { NotLoaded } from "../../../components/NotLoaded";
import { AtribuirFuncao } from "../../../components/SuperAdmin/Forms/AtribuirFuncao";

export default function GerenciamentoPessoal() {
  const { data: session } = useSession();
  const [result, setResult] = useState<MilitarArray>([]);
  const [militar, setMilitar] = useState<Militar>();

  const [search, setSearch] = useState(result);

  const { refetch, isLoading } = useQuery(["todosMilitares"], async () => {
    const result = await api.get<MilitarArray>("/militar");
    setResult(
      result.data
        .filter((mil) => mil.companhia === session?.militar.companhia)
        .sort((x, y) => {
          let a = x.nome_completo.toUpperCase(),
            b = y.nome_completo.toUpperCase();
          return a == b ? 0 : a > b ? 1 : -1;
        })
    );
    return result;
  });

  async function handleGetMilitar(id: string) {
    console.log(id)
    const res = await api.get<Militar>(`/militar/${id}`);
    setMilitar(res.data);
  }

  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const resultPaginated = result.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(result.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % result.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Head>
        <title>
          SisAGI | Gerencimento Pessoal - {session?.militar.companhia}
        </title>
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
                <Heading size="md" p={2}>
                  MILITARES - {session?.militar.companhia}
                </Heading>
                <Flex boxShadow="buttonShadow"
                  bg="gray.990" borderRadius="lg" border="1px" borderColor="green.700">
                    <Flex p={2} gap={2} >{" Total " + " : " }
                      <Text fontWeight="extrabold" color="red.600">{ " " + result.length}</Text>
                    </Flex>
                </Flex>
                <Button
                  boxShadow="buttonShadow"
                  colorScheme="messenger"
                  size="xs"
                  p={4}
                  mr={2}
                  onClick={() => refetch}
                >
                  <RxUpdate size={16} />
                </Button>
              </Flex>
              <Box m="auto" w="100%" h="100%" px={2}>
                <Accordion allowToggle>
                  {resultPaginated?.map((mil: Militar, index) => (
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
                          <Flex
                            flexDirection={["column","column","row"]}
                            gap={4}
                            justifyContent="space-between"
                          >
                            <DadosPessoaisComponent militar={{ ...mil, ...militar }} />
                            <DadosMilitares militar={{ ...mil, ...militar }} />
                          </Flex>
                          <Endereco militar={{ ...mil, ...militar }} />
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
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
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
