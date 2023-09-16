/* eslint-disable react/no-unescaped-entities */
import {
  Checkbox,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
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
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  Circle,
  Text,
  Square,
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";

import { SlRefresh } from "react-icons/sl";
import { TiInfoLarge } from "react-icons/ti";
import { BsBoxArrowUp } from "react-icons/bs";
import { ModalCautela } from "../../../components/Modal/Armamento/ModalCautela";
import Head from "next/head";
import { Armamento, ArmamentoArray } from "../../../@types/types";
import { useSession } from "next-auth/react";

export default function CautelaArmamento() {
  const { data: session } = useSession();
  const [nomeArmamentos, setNomeArmamentos] = useState([]);
  const [militares, setMilitares] = useState({});

  useQuery(["todosMilitares"], async () => {
    const result = await api.get("/militar");
    setMilitares(result);
  });

  const { isLoading, data, refetch } = useQuery(
    ["todosArmamentos"],
    async () => {
      const result = await api.get<ArmamentoArray>("/armamentos");
      var data = []; // CONJUNTO DE INSTRUCAO FILTRA OS NOME DE TODOS ARMAMENTOS NO BANCO E TIRA OS REPETIDOS
      result.data.map((el: Armamento) => {
        return data.push(
          el.companhia === session.militar.companhia ? el.nome : null
        );
      });
      const filtered = Array.from(new Set(data)).filter(function (res) {
        return res != null;
      });
      setNomeArmamentos(filtered);
      return result;
    }
  );

  return (
    <>
      <Head>
        <title>SisAGI | Armamento - Cautelar</title>
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
              flexDirection="column"
              p={4}
              mb={4}
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" m="4">
                  Armamentos {isLoading ? <Spinner ml={8} /> : ""}{" "}
                </Heading>
                <IconButton
                  bg="blue.700"
                  float="right"
                  mr={4}
                  boxShadow="buttonShadow"
                  _hover={{ bgColor: "blue.900" }}
                  onClick={() => refetch()}
                  aria-label="Atualizar tabela"
                  icon={<SlRefresh />}
                />
              </Flex>

              <Accordion allowToggle m={4}>
                {nomeArmamentos?.map((arm, index) => (
                  <AccordionItem key={index} borderTop="0" borderBottom="0">
                    <h2>
                      <AccordionButton
                        boxShadow="buttonShadow"
                        bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                        rounded={4}
                        border="0"
                      >
                        <Box as="span" flex="1" textAlign="left">
                          {arm}
                        </Box>
                        <Tag
                          ml="auto"
                          fontSize="md"
                          fontWeight="black"
                          color="whiteAlpha.600"
                          boxShadow="buttonShadow"
                          bgGradient="linear(to-tr, gray.990, gray.990, gray.900)"
                        >
                          {
                            data.data
                              .filter((el) => {
                                return el.cautelaArmamento.length === 0;
                              })
                              .filter(
                                (arma: Armamento) =>
                                  arma.nome === arm &&
                                  arma.companhia === session.militar.companhia
                              ).length
                          }
                        </Tag>
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
                      {data?.data
                        .filter((el) => {
                          return el.cautelaArmamento.length === 0;
                        })
                        .filter((el) => {
                          return el.companhia === session.militar.companhia;
                        })
                        .filter((elem) => {
                          return elem.nome === arm;
                        })
                        .map((arma: Armamento, index) => (
                          <Tag
                            boxShadow="buttonShadow"
                            size="lg"
                            key={index + arma.id}
                            borderRadius="base"
                            variant="solid"
                            bg={
                              arma.status === "disponivel"
                                ? "green.700"
                                : "red.900"
                            }
                            mr={4}
                          >
                            <TagLabel pr={2}>
                              {arma.nome} - Nr {arma.nr_serie}{" "}
                              {arma.cabide ? " - " + arma.cabide : ""}
                            </TagLabel>
                            <ModalCautela
                              data={militares}
                              dataArmamento={arma}
                              adapter={true}
                              refresh={refetch}
                            />
                          </Tag>
                        ))}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" m="4">
                  Tabela de armamentos
                </Heading>
              </Flex>

              <Center>
                <TableContainer w="full">
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Nome</Th>
                        <Th textAlign="center">Nr de série</Th>
                        <Th textAlign="center">Cabide</Th>
                        <Th textAlign="center">Condições</Th>
                        <Th textAlign="center">Local</Th>
                        <Th textAlign="center">Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.data
                        .filter((el) => {
                          return el.companhia === session.militar.companhia;
                        })
                        .map((res: Armamento) => (
                          <Tr key={res.id}>
                            <Td textAlign="center">{res.nome}</Td>
                            <Td textAlign="center">{res.nr_serie}</Td>
                            <Td textAlign="center">
                              {res.cabide ? res.cabide : " - "}
                            </Td>
                            <Td textAlign="center">
                              <Popover placement="top-start">
                                <PopoverTrigger>
                                  <Button
                                    w={20}
                                    rounded="base"
                                    bg="green.900"
                                    _hover={{ bgColor: "green.800" }}
                                    boxShadow="buttonShadow"
                                    mx="auto"
                                  >
                                    <Icon
                                      boxSize={5}
                                      color="green.400"
                                      as={TiInfoLarge}
                                    />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  bg="gray.990"
                                  border="1px"
                                  borderColor="green.700"
                                >
                                  <PopoverHeader
                                    fontWeight="bold"
                                    bg="gray.990"
                                    boxShadow="buttonShadow"
                                    m={4}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    py={2}
                                    borderBottom="none"
                                    color="whiteAlpha.800"
                                  >
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
                                    color="white"
                                  >
                                    <Flex
                                      p={2}
                                      rounded="lg"
                                      bg="gray.990"
                                      boxShadow="buttonShadow"
                                      fontWeight="bold"
                                    >
                                      <Text>{res.condicoes}</Text>
                                    </Flex>
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </Td>
                            <Td textAlign="center">{res.companhia}</Td>
                            <Td textAlign="center">
                              {res.status !== "disponivel" ? (
                                <Badge variant="outline" colorScheme="red">
                                  {res.status}
                                </Badge>
                              ) : (
                                <Badge variant="outline" colorScheme="green">
                                  {res.status}
                                </Badge>
                              )}
                            </Td>
                            <Td>
                              {res.cautelaArmamento.length !== 0 ? (
                                <Badge variant="outline" colorScheme="orange">
                                  Cautelado
                                </Badge>
                              ) : (
                                <ModalCautela
                                  data={militares}
                                  dataArmamento={res}
                                  adapter={false}
                                  refresh={refetch}
                                />
                              )}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                      <Th textAlign="center">Nome</Th>
                        <Th textAlign="center">Nr de série</Th>
                        <Th textAlign="center">Cabide</Th>
                        <Th textAlign="center">Condições</Th>
                        <Th textAlign="center">Local</Th>
                        <Th textAlign="center">Status</Th>
                        <Th></Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Center>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
