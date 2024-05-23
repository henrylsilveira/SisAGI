/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
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
  Tag,
  TagLabel,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  PopoverFooter,
  Portal,
  Circle,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { FormEvent, useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { RxCrossCircled } from "react-icons/rx";
import Head from "next/head";
import {
  Armamento,
  Militar,
  MilitarArray,
  VinculoArmamentoMilitarArray,
  VinculoArmamentoMilitar,
} from "../../../@types/types";

import { GiBreakingChain } from "react-icons/gi";
import { Input } from "../../../components/Form/Input";
import { MdOutlineDangerous } from "react-icons/md";
import { useSession } from "../../../services/context/auth";

export default function ArmamentoViculados() {
  const { user: session, status } = useSession();
  const [nomeArmamentos, setNomeArmamentos] = useState([]);
  const [vinculosArmamento, setVinculosArmamento] =
    useState<VinculoArmamentoMilitarArray>([]);
  const [militarVinculo, setMilitarVinculo] = useState("");
  const [militares, setMilitares] = useState<MilitarArray>();
  const toast = useToast();

  const { isLoading: militarLoading, data: militarData } = useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get("/militar");
      setMilitares(result.data);
    }
  );

  const {
    isLoading: vinculosLoading,
    data: vinculosData,
    refetch: refetchVinculos,
  } = useQuery(["todosVinculosArmamentos"], async () => {
    const result = await api.get("/armamentos/viculados");
    setVinculosArmamento(result.data);
  });

  const { isLoading, data, refetch } = useQuery(
    ["todosArmamentos"],
    async () => {
      const result = await api.get("/armamentos");
      var data = []; // CONJUNTO DE INSTRUCAO FILTRA OS NOME DE TODOS ARMAMENTOS NO BANCO E TIRA OS REPETIDOS
      result.data.map((el: Armamento) => {
        return data.push(
          el.companhia === session.companhia ? el.nome : null
        );
      });
      const filtered = Array.from(new Set(data)).filter(function (res) {
        return res != null;
      });
      setNomeArmamentos(filtered);
      return result;
    }
  );

  async function handleSubmit(armamentoId: string, e: FormEvent) {
    e.preventDefault();
    const values = {
      armamentoId,
      militarId: militarVinculo,
    };

    try {
      const result = await api.post("/armamento/vinculo/create", values);
      if (result.status === 201) {
        toast({
          title: "Vinculo",
          description: "Armamento viculado ao militar.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch();
        refetchVinculos();
      } else {
        toast({
          title: "Vinculo",
          description: "Armamento não foi viculado ao militar.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro interno.",
        description: "Contate o desenvolvedor da aplicação",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function deleteVinculo(id: string) {
    try {
      const result = await api.delete(`/armamentos/delete/viculo/${id}`);
      if (result.status === 200) {
        toast({
          title: "Vinculo",
          description: "Armamento desvinculado.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch();
        refetchVinculos();
      } else {
        toast({
          title: "Vinculo",
          description: "Não foi possível desvincular o armamento.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro interno.",
        description: "Contate o desenvolvedor da aplicação",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Head>
        <title>SisAGI | Armamento - Viculados</title>
      </Head>
      <Flex direction="column" flex="1" gap={4}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box
            p={["6", "8"]}
            bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
            boxShadow="buttonShadow"
            borderRadius={8}
            pb="4"
          >
            <Flex
              bg="gray.990"
              boxShadow="buttonShadow"
              px={2}
              mb={4}
              rounded="base"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading fontSize="2xl" my="4">
                VINCULAR ARMAMENTOS
                {isLoading ? <Spinner ml={8} /> : ""}{" "}
              </Heading>
              <IconButton
                bg="blue.700"
                float="right"
                boxShadow="buttonShadow"
                _hover={{ bgColor: "blue.900" }}
                onClick={() => {
                  refetch();
                  refetchVinculos();
                }}
                aria-label="Atualizar tabela"
                icon={<SlRefresh />}
              />
            </Flex>

            <Accordion allowToggle>
              {nomeArmamentos?.map((arm, index) => (
                <AccordionItem key={index} borderTop="0" borderBottom="0">
                  <h2>
                    <AccordionButton
                      boxShadow="buttonShadow"
                      bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                      rounded={4}
                      px={4}
                      py={2}
                      w="full"
                      border="0"
                    >
                      <Box as="span" flex="1" textAlign="left">
                        {arm}
                      </Box>
                      <Tag
                        ml="4"
                        fontSize="md"
                        fontWeight="black"
                        color="whiteAlpha.600"
                        boxShadow="buttonShadow"
                        bgGradient="linear(to-tr, gray.990, gray.990, gray.900)"
                      >
                        {
                          data.data.filter(
                            (arma: Armamento) =>
                              arma.nome === arm &&
                              arma.companhia === session.companhia
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
                        return el.companhia === session.companhia;
                      })
                      .filter((elem) => {
                        return elem.nome === arm;
                      })
                      .map((arma: Armamento, index) => (
                        <Tag
                          boxShadow="buttonShadow"
                          size="lg"
                          key={index}
                          borderRadius="base"
                          variant="solid"
                          colorScheme={
                            arma.status === "disponivel" ? "green" : "red"
                          }
                          mr={4}
                        >
                          <TagLabel pr={2}>
                            {arma.nome} - Nr {arma.nr_serie}{" "}
                            {arma.cabide ? " - " + arma.cabide : ""}
                          </TagLabel>
                          <Popover>
                            {arma.ArmamentoMilitar.length === 0 ? (
                              arma.status !== "disponivel" ? (
                                <Circle
                                  bg="red.900"
                                  boxShadow="buttonShadow"
                                  size="26px"
                                >
                                  <Icon
                                    m={2}
                                    size="26px"
                                    as={MdOutlineDangerous}
                                  />
                                </Circle>
                              ) : (
                                <PopoverTrigger>
                                  <Circle
                                    bg="green.900"
                                    boxShadow="buttonShadow"
                                    _hover={{ bg: "green.900" }}
                                    size="26px"
                                  >
                                    <Icon as={GiBreakingChain}></Icon>
                                  </Circle>
                                </PopoverTrigger>
                              )
                            ) : (
                              <Tag
                                size="sm"
                                bg="yellow.400"
                                boxShadow="buttonShadow"
                              >
                                VINCULADO
                              </Tag>
                            )}
                            <Portal>
                              <PopoverContent
                                bg="gray.990"
                                border="1px"
                                borderColor="green.700"
                              >
                                <PopoverArrow bg="gray.800" />
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
                                  Vincular ao militar
                                </PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody
                                  as="div"
                                  wordBreak="normal"
                                  h="auto"
                                  py={6}
                                  overflow="scroll"
                                  color="white"
                                >
                                  <Input
                                    as="select"
                                    name="militar"
                                    bg="gray.700"
                                    label="Militar"
                                    onChange={(e) =>
                                      setMilitarVinculo(e.target.value)
                                    }
                                  >
                                    <option>Selecione</option>
                                    {militares?.map(
                                      (militar: Militar, index) => (
                                        <option key={index} value={militar.id}>
                                          {militar.post_grad +
                                            " " +
                                            militar.nome_guerra}
                                        </option>
                                      )
                                    )}
                                  </Input>
                                </PopoverBody>
                                <PopoverFooter>
                                  <Button
                                    float="right"
                                    bg="green.700"
                                    _hover={{ bg: "green.900" }}
                                    boxShadow="buttonShadow"
                                    onClick={(e) => handleSubmit(arma.id, e)}
                                  >
                                    Vincular
                                  </Button>
                                </PopoverFooter>
                              </PopoverContent>
                            </Portal>
                          </Popover>
                        </Tag>
                      ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Flex flexDirection="column">
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                px={2}
                my={4}
                rounded="base"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" my="4">
                  TABELA DOS VINCULOS
                </Heading>
              </Flex>
              <Center>
                <TableContainer w="full">
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Cabide</Th>
                        <Th textAlign="center">Militar</Th>
                        <Th textAlign="center">Armamento</Th>
                        <Th textAlign="center">Nr Série</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {vinculosArmamento
                        ?.filter((el) => {
                          return (
                            el.armamento.companhia === session.companhia
                          );
                        })
                        .sort((a, b) => {
                          return (
                            Number(a.armamento.cabide) -
                            Number(b.armamento.cabide)
                          );
                        })
                        .map((res: VinculoArmamentoMilitar) => (
                          <Tr key={res.id}>
                            <Td textAlign="center">{res.armamento.cabide}</Td>
                            <Td textAlign="center">
                              {res.militar.post_grad +
                                " " +
                                res.militar.nome_guerra}
                            </Td>
                            <Td textAlign="center">{res.armamento.nome}</Td>
                            <Td textAlign="center">{res.armamento.nr_serie}</Td>
                            <Td>
                              <Button
                              alignItems="center"
                                bg="red.700"
                                size="xs"
                                _hover={{bg: "red.900"}}
                                onClick={() => deleteVinculo(res.id)}
                              >
                                <Icon mr={1} as={RxCrossCircled} />
                                Desvincular
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th textAlign="center">Cabide</Th>
                        <Th textAlign="center">Militar</Th>
                        <Th textAlign="center">Armamento</Th>
                        <Th textAlign="center">Nr Série</Th>
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
