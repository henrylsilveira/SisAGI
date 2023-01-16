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
  PopoverFooter,
  Portal,
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { FormEvent, useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { RxCrossCircled } from "react-icons/rx";
import Head from "next/head";
import { Armamento, Militar, MilitarArray, VinculoArmamentoMilitarArray, VinculoArmamentoMilitar } from '../../../@types/types';
import { useSession } from "next-auth/react";
import { GiBreakingChain } from "react-icons/gi";
import { Input } from "../../../components/Form/Input";

export default function ArmamentoViculados() {
  const { data: session } = useSession();
  const [nomeArmamentos, setNomeArmamentos] = useState([]);
  const [vinculosArmamento, setVinculosArmamento] = useState<VinculoArmamentoMilitarArray>([]);
  const [militarVinculo, setMilitarVinculo] = useState('');
  const [militares, setMilitares] = useState<MilitarArray>();
  const toast = useToast();

  const { isLoading: militarLoading, data: militarData } = useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get("/militar");
      setMilitares(result.data);
    }
  );

  const { isLoading: vinculosLoading, data: vinculosData, refetch: refetchVinculos } = useQuery(
    ["todosVinculosArmamentos"],
    async () => {
      const result = await api.get("/armamentos/viculados");
      setVinculosArmamento(result.data)
    }
  );

  const { isLoading, data, refetch } = useQuery(
    ["todosArmamentos"],
    async () => {
      const result = await api.get("/armamentos");
      var data = []; // CONJUNTO DE INSTRUCAO FILTRA OS NOME DE TODOS ARMAMENTOS NO BANCO E TIRA OS REPETIDOS
      result.data.map((el: Armamento) => {
        return data.push(el.companhia === session.militar.companhia ? el.nome : null);
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
        militarId: militarVinculo
      }
      
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
          refetch()
          refetchVinculos()
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
          const result = await api.delete(`/armamentos/delete/viculo/${id}`)
        if (result.status === 200) {
          toast({
            title: "Vinculo",
            description: "Armamento desvinculado.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          refetch()
          refetchVinculos()
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
                  Vincular armamentos a militares{" "}
                  {isLoading ? <Spinner ml={8} /> : ""}{" "}
                  <IconButton
                    bg="blue.700"
                    float="right"
                    _hover={{ bgColor: "blue.900" }}
                    onClick={() => {refetch(); refetchVinculos()}}
                    aria-label="Atualizar tabela"
                    icon={<SlRefresh />}
                  />
                </Heading>

                <Accordion
                  bg="gray.800"
                  border="1px"
                  borderColor="gray.600"
                  rounded="2xl"
                  boxShadow="lg"
                >
                  {nomeArmamentos?.map((arm, index) => (
                    <AccordionItem key={index} borderTop="0" borderBottom="0">
                      <h2>
                        <AccordionButton
                          bg="blue.700"
                          _hover={{ bg: "blue.800" }}
                          rounded="2xl"
                          border="1px"
                          borderColor="blackAlpha.500"
                        >
                          <Box as="span" flex="1" textAlign="left">
                            {arm}
                          </Box>
                          <Tag
                            ml="4"
                            fontSize="md"
                            fontWeight="black"
                            color="black"
                          >
                            {
                              data.data.filter(
                                (arma: Armamento) =>
                                  arma.nome === arm &&
                                  arma.companhia === session.militar.companhia
                              ).length
                            }
                          </Tag>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {data?.data
                          .filter((el) => {
                            return el.companhia === session.militar.companhia;
                          })
                          .filter((elem) => {
                            return elem.nome === arm;
                          })
                          .map((arma: Armamento, index) => (
                            <Tag
                              boxShadow="md"
                              size="lg"
                              key={index}
                              borderRadius="full"
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
                                    <PopoverTrigger>
                                    <Button bg='green.700' _hover={{bg: 'green.900'}} size='xs' rounded='full'><Icon as={GiBreakingChain}></Icon></Button>
                                    </PopoverTrigger>
                                ):(
                                    <Tag size='sm' bg='yellow.400'>VINCULADO</Tag>
                                )}
                                <Portal>
                                  <PopoverContent bg='gray.800' border='1px' borderColor='gray.600'>
                                    <PopoverArrow bg='gray.800' />
                                    <PopoverHeader fontSize='lg'>Vincular ao militar</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                      <Input as='select' name="militar" bg='gray.700' label="Militar" onChange={(e) => setMilitarVinculo(e.target.value)}>
                                      <option>Selecione</option>
                                        {militares?.map((militar: Militar, index) => <option key={index} value={militar.id}>{ militar.post_grad + ' ' + militar.nome_guerra}</option>)}
                                      </Input>
                                    </PopoverBody>
                                    <PopoverFooter>
                                      <Button float='right' bg='green.700' boxShadow='md' onClick={(e) => handleSubmit(arma.id, e)}>Vincular</Button>
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
                  <Heading fontSize="2xl" my="4">
                    Tabela de Vinculos
                  </Heading>
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
                          {vinculosArmamento?.filter((el) => {
                              return el.armamento.companhia === session.militar.companhia;
                            })
                            .sort((a, b) => {return Number(a.armamento.cabide) - Number(b.armamento.cabide)})
                            .map((res: VinculoArmamentoMilitar) => (
                              <Tr key={res.id}>
                                <Td textAlign="center">{res.armamento.cabide}</Td>
                                <Td textAlign="center">{ res.militar.post_grad + ' ' + res.militar.nome_guerra}</Td>
                                <Td textAlign="center">{res.armamento.nome}</Td>
                                <Td textAlign="center">{res.armamento.nr_serie}</Td>
                                <Td><Button bg='red.700' size='xs' onClick={() => deleteVinculo(res.id)}><Icon mr={1} as={RxCrossCircled} />Desvincular</Button></Td>
                                
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
        </Flex>
      </Flex>
    </>
  );
}
