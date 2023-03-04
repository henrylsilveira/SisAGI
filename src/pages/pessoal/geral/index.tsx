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
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableCaption,
  Avatar,
  Circle,
  Tag,
  TagLabel,
  Grid,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";

import Head from "next/head";
import { FuncaoMilitar, Militar, MilitarArray } from "../../../@types/types";
import { RxUpdate } from "react-icons/rx";
import { DadosPessoais } from "../../../components/SuperAdmin/Forms/DadosPessoais";
import { DadosMilitares } from "../../../components/SuperAdmin/Forms/DadosMilitares";
import { Endereco } from "../../../components/SuperAdmin/Forms/Endereco";
import { useSession } from "next-auth/react";
import { TiInfoLarge } from "react-icons/ti";
import { ModalCautela } from "../../../components/Modal/Armamento/ModalCautela";

export default function GerenciamentoPessoal() {
  const { data: session } = useSession();
  const [result, setResult] = useState<MilitarArray>([]);
  const [militarPostGrad, setMilitarPostGrad] = useState<MilitarArray>([]);

  const { data, refetch } = useQuery(["todosMilitares"], async () => {
    const result = await api.get<MilitarArray>("/militar");
    
    return result.data.filter(mil => mil.companhia === session.militar.companhia);
  });

  async function handleGetFunctionMilitar(
    militares: MilitarArray,
    post_grad: string
  ) {
    const filterMilitarPostGrad = militares.filter((mil) =>
      mil?.post_grad === post_grad
    );
    setMilitarPostGrad(filterMilitarPostGrad);
  }

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
              
              <TableContainer px={4} mb={4}>
                <Table size="sm" variant="simple" colorScheme="whiteAlpha">
                  <TableCaption>QUADRO DE EFETIVO DA COMPANHIA</TableCaption>
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Capitão</Th>
                      <Th textAlign="center">1º Ten</Th>
                      <Th textAlign="center">2º Ten</Th>
                      <Th textAlign="center">Sub Ten</Th>
                      <Th textAlign="center">1º Sgt</Th>
                      <Th textAlign="center">2º Sgt</Th>
                      <Th textAlign="center">3º Sgt</Th>
                      <Th textAlign="center">Cb</Th>
                      <Th textAlign="center">Sd</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td textAlign="center">2</Td>
                      <Td textAlign="center">4</Td>
                      <Td textAlign="center">5</Td>
                      <Td textAlign="center">6</Td>
                      <Td textAlign="center">2</Td>
                      <Td textAlign="center">4</Td>
                      <Td textAlign="center">5</Td>
                      <Td textAlign="center">6</Td>
                      <Td textAlign="center">6</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Box m="auto" w="100%" h="100%" px={2}>
                <Accordion allowToggle>
                  {Array.from(new Set(data?.map((item) => item.post_grad))).map(
                    (post_grad, index) => (
                      <AccordionItem
                        border="0"
                        mb={2}
                        key={post_grad + index}
                        onClick={() =>
                          handleGetFunctionMilitar(data, post_grad)
                        }
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
                                {post_grad}
                              </Text>
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
                                data?.filter((fun) => fun.post_grad === post_grad)
                                  .length
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
                          {militarPostGrad?.map((militar) => (
                            <Tag
                              mr={4}
                              mt={2}
                              size="lg"
                              bg="green.800"
                              borderRadius="full"
                              key={militar.id + militar.identidade}
                            >
                              <Avatar
                                src=""
                                size="xs"
                                name={militar.nome_completo}
                                bg="green.400"
                                ml={-1}
                                mr={2}
                              />
                              <TagLabel
                                mr={2}
                                color="white"
                              >{`${militar.post_grad} ${militar.nome_guerra} - ${militar.companhia}`}</TagLabel>
                              <Popover placement="top-start">
                                <PopoverTrigger>
                                  <Circle
                                    size="20px"
                                    bg="gray.990"
                                    _hover={{ bgColor: "gray.700" }}
                                    boxShadow="buttonShadow"
                                    py={1}
                                    mx="auto"
                                  >
                                    <Icon
                                      boxSize={5}
                                      color="green.600"
                                      as={TiInfoLarge}
                                    />
                                  </Circle>
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
                                    Informações sobre militar
                                  </PopoverHeader>
                                  <PopoverArrow bg="gray.990" />
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
                                      boxShadow="buttonShadow"
                                      px={4}
                                      py={1}
                                      m={1}
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Flex
                                        p={2}
                                        rounded="lg"
                                        bg="green.700"
                                        boxShadow="buttonShadow"
                                        fontWeight="bold"
                                      >
                                        Identidade
                                      </Flex>
                                      {militar.identidade}
                                    </Flex>
                                    <Flex
                                      boxShadow="buttonShadow"
                                      px={4}
                                      py={1}
                                      mx={1}
                                      my={2}
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Flex
                                        p={2}
                                        rounded="lg"
                                        bg="green.700"
                                        boxShadow="buttonShadow"
                                        fontWeight="bold"
                                      >
                                        Funções
                                      </Flex>
                                      <Grid gridTemplateColumns='1fr 1fr'>
                                    {militar?.Funcao.filter((func: FuncaoMilitar, index) => {return func.status === 'ativo'}).map((func, index) =>(
                                        <Badge key={`${func}-${index}`} textAlign='center' variant="outline" colorScheme="green" mx={1} mb={1}>
                                        {func.funcao}
                                        </Badge>
                                    ))}
                                    </Grid>
                                    </Flex>
                                    
                                    
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </Tag>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
