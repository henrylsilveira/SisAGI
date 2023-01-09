/* eslint-disable react/no-unescaped-entities */
import {
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
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { AiFillMinusCircle } from "react-icons/ai";

import { SlRefresh } from "react-icons/sl";
import { TiInfoLarge } from "react-icons/ti";
import { BsBoxArrowRight, BsBoxArrowUp } from "react-icons/bs";
import { ModalCautela } from "../../../components/Modal/Material/ModalCautela";
import Head from "next/head";
import { Armamento } from "../../../@types/types";

export default function CautelaArmamento() {
  const [nomeArmamentos, setNomeArmamentos] = useState([]);
  const [militares, setMilitares] = useState({});
  const toast = useToast();

  const { isLoading: militarLoading, data: militarData } = useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get("/militar");
      setMilitares(result);
    }
  );

  const { isLoading, data, refetch } = useQuery(
    ["todosArmamentos"],
    async () => {
      const result = await api.get("/armamentos");
      var data = [] // CONJUNTO DE INSTRUCAO FILTRA OS NOME DE TODOS ARMAMENTOS NO BANCO E TIRA OS REPETIDOS
      result.data.map((el) => { return data.push(el.nome) })
      const filtered = Array.from(new Set(data)).filter(function (res) {
        return res != null;
      });
      setNomeArmamentos(filtered)
      return result;
    }
  );

  return (
    <>
      <Head>
        <title>Siscau | Armamento</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my={6} maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          <Flex direction="column" flex="1" gap={4}>
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              alignItems="flex-start"
            >
              <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                <Heading fontSize="2xl" my="4">
                  Armamentos {isLoading ? <Spinner ml={8} /> : ""}{" "}
                  <IconButton
                    bg="blue.700"
                    float="right"
                    _hover={{ bgColor: "blue.900" }}
                    onClick={() => refetch()}
                    aria-label="Atualizar tabela"
                    icon={<SlRefresh />}
                  />
                </Heading>

                <Accordion bg='gray.800' border='1px' borderColor='gray.600' rounded='2xl' boxShadow='lg' >
                  {nomeArmamentos.map((arm, index) => (
                    <AccordionItem key={index} borderTop='0' borderBottom='0' >
                      <h2>
                        <AccordionButton bg='blue.700' _hover={{ bg: 'blue.800'}} rounded='2xl' border='1px' borderColor='blackAlpha.500'>
                          <Box as="span" flex="1" textAlign="left">
                            {arm}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {data?.data.filter((elem) => { return elem.nome === arm }).map((arma: Armamento, index) => (
                          <Tag
                          boxShadow='md'
                            size='lg'
                            key={index}
                            borderRadius='full'
                            variant='solid'
                            colorScheme={arma.status === 'disponivel' ? 'green' : 'red'}
                            mr={4}
                          >
                            <TagLabel pr={2}>{arma.nome} - {arma.nr_serie}</TagLabel>
                            <BsBoxArrowUp />
                          </Tag>
                        ))}

                      </AccordionPanel>
                    </AccordionItem>
                  ))}

                </Accordion>
                <Flex flexDirection='column'>
                  <Heading fontSize="2xl" my='4'>Tabela de armamentos</Heading>
                  <Center>
                  <TableContainer w='full'>
                    <Table size="sm" colorScheme="whiteAlpha">
                      <Thead>
                        <Tr>
                          <Th textAlign="center">Nome</Th>
                          <Th textAlign="center">Nr de série</Th>
                          <Th textAlign="center">Condições</Th>
                          <Th textAlign="center">Local</Th>
                          <Th textAlign="center">Status</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.data.map((res) => (
                          <Tr key={res.id}>
                            <Td textAlign="center">{res.nome}</Td>
                            <Td textAlign="center">{res.nr_serie}</Td>
                            <Td textAlign="center">
                              <Popover placement="top-start">
                                <PopoverTrigger>
                                  <Button
                                    bg="green.400"
                                    size="xs"
                                    _hover={{ bgColor: "green.600" }}
                                    py="1"
                                  >
                                    <Icon boxSize={6} as={TiInfoLarge} />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent bg="gray.900" border="0">
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
                            <Td textAlign="center">{res.local}</Td>
                            <Td textAlign="center">{res.status !== 'disponivel' ? <Badge variant='outline' colorScheme='red'>{res.status}</Badge> : <Badge variant='outline' colorScheme='green'>{res.status}</Badge>}</Td>
                            <Td>
                              <ModalCautela data={militares} dataMaterial={res} />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                        <Th textAlign="center">Nome</Th>
                          <Th textAlign="center">Nr de série</Th>
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
        </Flex>
      </Flex>
    </>
  );
}
