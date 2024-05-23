/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  HStack,
  Heading,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
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
  VStack,
  Icon
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Input } from "../../../components/Form/Input";

import { SlRefresh } from "react-icons/sl";

import { CautelaViatura, PedidoViatura, Viatura } from "../../../@types/types";
import { convertDate } from "../../../utils/scripts";
import { NotLoaded } from "../../../components/NotLoaded";
import { NotData } from "../../../components/NotData";
import { HiOutlineInformationCircle } from "react-icons/hi";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import { MdSearch } from "react-icons/md";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GiCheckMark, GiTruck } from "react-icons/gi";
import { CautelaViaturaModal } from "../../../components/Modal/Viatura/ModalCautela";
import { DescautelaModal } from "../../../components/Modal/Viatura/ModalDescautela";
import { ModalRecusa } from "../../../components/Modal/Viatura/ModalRecusa";
import { AutorizaViaturaModal } from "../../../components/Modal/Viatura/ModalAutoriza";
import { RxCross1 } from "react-icons/rx";
import { useSession } from "../../../services/context/auth";


export default function Viaturas() {
  const { user: session } = useSession();
  const [search, setSearch] = useState("");
  const [searchPedidos, setSearchPedidos] = useState("");
  const [searchCia, setSearchCia] = useState("")
  const toast = useToast();
  const initRef = React.useRef()

  useEffect(() => {
    if (!session?.Funcao.find((func) => func.funcao === "s4")) {
      Router.push("/");
      toast({
        title: "Acesso não autorizado.",
        description: 'Você não tem autorização para acessar essa área.',
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [session, toast]);

  const { isLoading, error, data: pedidosViatura, refetch: refetchPedidos } = useQuery(
    ["todosPedidosViaturas"],
    async () => {
      const result = await api.get<PedidoViatura[]>("/veiculos/pedidos");
      return result;
    }
  );

  const { data: viaturas } = useQuery(
    ["todasViaturas"],
    async () => {
      const result = await api.get<Viatura[]>("/veiculos");
      return result;
    }
  );
  const { isLoading: isLoadingCautelas, data: viaturasCauteladas, refetch } = useQuery(
    ["todasViaturasCauteladas"],
    async () => {
      const result = await api.get<CautelaViatura[]>("/veiculos/cautelas");
      return result;
    }
  );





  return (
    <>
      <Head>
        <title>SisAGI | S/4 - Viatura</title>
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
              p={4}
              direction="column"
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                px={2}
                my={4}
                gap={2}
                rounded="base"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" my="4">
                  Pedidos ( FURRIEL )
                </Heading>
                <Flex bg="gray.990"
                  boxShadow="buttonShadow"
                  px={1}
                  my={1}
                  ml="auto"
                  rounded="base"
                  alignItems="center"
                  justifyContent="space-between"
                  w="auto"
                >
                  <Flex p={2} alignItems="center" gap={2}>
                    <MdSearch fontSize={30} />
                    <FormControl>
                      <Input
                        as="select"
                        rounded="base"
                        focusBorderColor="green.500"
                        name="search"
                        bgColor="gray.990"
                        textColor="gray.200"
                        variant="filled"
                        _hover={{ bgColor: "gray.900" }}
                        size="sm"
                        placeholder="Selecione"
                        onChange={e => setSearch(e.target.value)}
                        w={200}
                        h={10}
                      >
                        <option value="">Todos - {pedidosViatura?.data.length}</option>
                        <option value="finalizado">Finalizado - {pedidosViatura?.data.filter(res => res.status === "finalizado").length}</option>
                        <option value="aguardando">Aguardando - {pedidosViatura?.data.filter(res => res.status === "aguardando").length}</option>
                        <option value="recusado">Recusado - {pedidosViatura?.data.filter(res => res.status === "recusado").length}</option>
                        <option value="autorizado">Autorizado - {pedidosViatura?.data.filter(res => res.status === "autorizado").length}</option>
                      </Input>
                    </FormControl>
                  </Flex>
                </Flex>
                <IconButton
                  bg="blue.700"
                  float="right"
                  color="white"
                  _hover={{ bgColor: "blue.900" }}
                  onClick={() => refetchPedidos()}
                  aria-label="Atualizar tabela"
                  icon={<SlRefresh />}
                />
              </Flex>

              {isLoading ? <NotLoaded /> : pedidosViatura?.data.length === 0 ? <NotData textoComponent="Não existe dados" /> :
                <TableContainer maxH="50vh" overflowY="scroll" py={4}>
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Data do Pedido</Th>
                        <Th textAlign="center">Data Desejada</Th>
                        <Th textAlign="center">Data Devolução</Th>
                        <Th textAlign="center">Missão</Th>
                        <Th textAlign="center">Itinerário</Th>
                        <Th textAlign="center">Chefe Viatura</Th>
                        <Th textAlign="center">Motorista</Th>
                        <Th textAlign="center">Apresentar para</Th>
                        <Th textAlign="center">Furriel</Th>
                        <Th textAlign="center">Situação</Th>
                        <Th textAlign="center"></Th>
                        <Th textAlign="center"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>

                      {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).map((res) => (
                        <Tr key={res.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                          <Td textAlign="center">{convertDate(res.created_at)}</Td>
                          <Td textAlign="center">{convertDate(res.dataDesejada)}</Td>
                          <Td textAlign="center">{convertDate(res.dataDevolucao)}</Td>
                          <Td textAlign="center">{res.missao}</Td>
                          <Td textAlign="center">{res.intinerario}</Td>
                          <Td textAlign="center">{res.chefeViatura}</Td>
                          <Td textAlign="center">{res.motorista}</Td>
                          <Td textAlign="center">{res.apresentar}</Td>
                          <Td textAlign="center">{res.militar.post_grad + " " + res.militar.nome_guerra}</Td>
                          <Td textAlign="center" fontSize="small" color={res.status === "aguardando" ? "orange.500" : res.status === "recusado" ? "red.500" : res.status === "autorizado" ? "blue.500" : "green.500"}>{res?.status?.toUpperCase()}</Td>
                          <Td textAlign="center">
                            {res?.status === "recusado" && res.observacao !== "" ?
                              <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
                                {({ isOpen }) => (
                                  <>
                                    <PopoverTrigger>
                                      <Button _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs" bgColor={isOpen ? 'yellow.500' : 'green.500'}><HiOutlineInformationCircle color="white" size={18} /></Button>
                                    </PopoverTrigger>
                                    <Portal>
                                      <PopoverContent bg="gray.990" border="1px" borderColor="green.700">
                                        <PopoverHeader>Observação do pedido</PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                          <Box>
                                            {res.observacao}
                                          </Box>
                                        </PopoverBody>
                                      </PopoverContent>
                                    </Portal>
                                  </>
                                )}
                              </Popover> : (res?.status === "finalizado" && (res?.CautelaViatura?.length !== 0)) ?
                              <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
                                {({ isOpen }) => (
                                  <>
                                    <PopoverTrigger>
                                      <Button _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs" bgColor={isOpen ? 'yellow.500' : 'blue.500'}>
                                        <GiTruck color="white" size={18} />
                                      </Button>
                                    </PopoverTrigger>
                                    <Portal>
                                      <PopoverContent bg="gray.990" border="1px" borderColor="green.700">
                                        <PopoverHeader>Observação da descautela</PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                          <Box>
                                            {res?.CautelaViatura[0].observacao}
                                          </Box>
                                        </PopoverBody>
                                      </PopoverContent>
                                    </Portal>
                                  </>
                                )}
                              </Popover> : "-"}
                          </Td>
                          <Td textAlign="center">
                          { res.status === "aguardando" && res.autorizado === false ? (
                              <AutorizaViaturaModal pedido={res} atualizar={refetchPedidos}  />
                          ) :  res.autorizado === true ? 
                            <GiCheckMark color="green.600" />
                           : null}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th textAlign="center">Data do Pedido</Th>
                        <Th textAlign="center">Data Desejada</Th>
                        <Th textAlign="center">Data Devolução</Th>
                        <Th textAlign="center">Missão</Th>
                        <Th textAlign="center">Itinerário</Th>
                        <Th textAlign="center">Chefe Viatura</Th>
                        <Th textAlign="center">Motorista</Th>
                        <Th textAlign="center">Apresentar para</Th>
                        <Th textAlign="center">Furriel</Th>
                        <Th textAlign="center">Situação</Th>
                        <Th textAlign="center"></Th>
                        <Th textAlign="center"></Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              }
            </Flex>
            <Flex bgGradient="linear(to-tr, gray.990, gray.990, green.900)" rounded="base"
              boxShadow="buttonShadow" flexDir="column" my={2} px={4}>
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
                  Pedidos ( PMT ) {isLoading ? <Spinner ml={8} /> : ""}{" "}
                </Heading>
                <Flex bg="gray.990"
                  boxShadow="buttonShadow"
                  px={1}
                  my={1}
                  ml="auto"
                  rounded="base"
                  alignItems="center"
                  justifyContent="space-between"
                  w="auto"
                >
                  {isLoading ? <NotLoaded /> :
                    <Flex p={2} alignItems="center" gap={2}>
                      <MdSearch fontSize={30} />
                      <FormControl>
                        <Input
                          as="select"
                          rounded="base"
                          focusBorderColor="green.500"
                          name="search"
                          bgColor="gray.990"
                          textColor="gray.200"
                          variant="filled"
                          _hover={{ bgColor: "gray.900" }}
                          size="sm"
                          placeholder="Selecione"
                          onChange={e => setSearchPedidos(e.target.value)}
                          w={120}
                        >
                          <option value="">Todos - {pedidosViatura?.data.length}</option>
                          <option value="finalizado">Finalizado - {pedidosViatura?.data.filter(res => res.status === "finalizado").length}</option>
                          <option value="aguardando">Aguardando - {pedidosViatura?.data.filter(res => res.status === "aguardando").length}</option>
                          <option value="recusado">Recusado - {pedidosViatura?.data.filter(res => res.status === "recusado").length}</option>
                          <option value="autorizado">Autorizado - {pedidosViatura?.data.filter(res => res.status === "autorizado").length}</option>
                        </Input>
                      </FormControl>

                      <FormControl>
                        <Input
                          as="select"
                          rounded="base"
                          focusBorderColor="green.500"
                          name="search"
                          bgColor="gray.990"
                          textColor="gray.200"
                          variant="filled"
                          _hover={{ bgColor: "gray.900" }}
                          size="sm"
                          placeholder="Selecione"
                          onChange={e => setSearchCia(e.target.value)}
                          w={120}
                        >
                          <option value="">Todos - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).length}</option>
                          <option value="1 CIA">1 CIA - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === "1 CIA").length}</option>
                          <option value="2 CIA">2 CIA  - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === "2 CIA").length}</option>
                          <option value="3 CIA">3 CIA  - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === "3 CIA").length}</option>
                          <option value="CCAP">CCAP  - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === "CCAP").length}</option>
                          <option value="EM">EM - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === "EM").length}</option>
                          <option value="BANDA">BANDA - {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === "BANDA").length}</option>
                        </Input>
                      </FormControl>
                    </Flex>
                  }
                </Flex>
                <IconButton
                  bg="blue.700"
                  float="right"
                  color="white"
                  _hover={{ bgColor: "blue.900" }}
                  onClick={() => refetchPedidos()}
                  aria-label="Atualizar tabela"
                  icon={<SlRefresh />}
                />
              </Flex>
              {isLoading ? <NotLoaded /> :
                <TableContainer maxH="50vh" overflowY="scroll" py={4}>
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Data Desejada</Th>
                        <Th textAlign="center">Data Devolução</Th>
                        <Th textAlign="center">Missão</Th>
                        <Th textAlign="center">Itinerário</Th>
                        <Th textAlign="center">Chefe Viatura</Th>
                        <Th textAlign="center">Motorista</Th>
                        <Th textAlign="center">Apresentar para</Th>
                        <Th textAlign="center">Situação</Th>
                        <Th textAlign="center">S/4</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {pedidosViatura?.data.filter(res => searchPedidos ? res.status === searchPedidos : res.status).filter(res => searchCia ? res.companhia === searchCia : res.companhia).map((res) => (
                        <Tr key={res.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                          <Td textAlign="center">{convertDate(res.dataDesejada)}</Td>
                          <Td textAlign="center">{convertDate(res.dataDevolucao)}</Td>
                          <Td textAlign="center">{res.missao}</Td>
                          <Td textAlign="center">{res.intinerario}</Td>
                          <Td textAlign="center">{res.chefeViatura}</Td>
                          <Td textAlign="center">{res.motorista}</Td>
                          <Td textAlign="center">{res.apresentar}</Td>
                          <Td textAlign="center" fontSize="small" fontWeight="bold" color={res.status === "aguardando" ? "orange.500" : res.status === "autorizado" ? "blue.500" : res.status === "recusado" ? "red.500" : "green.500"}>{res.status.toUpperCase()}</Td>
                          { res.status === "aguardando" ? (
                            <Td textAlign="center" bg={res.autorizado ? "green.800" : "red.800"} shadow="buttonShadow">{res.autorizado ? <GiCheckMark /> : <RxCross1 />}</Td>
                          ) : <Td> - </Td>}
                          <Td textAlign="center" flex={1} display="flex">

                            {(res.status === "autorizado" || res.status === "finalizado" || res.status === "recusado") && res.observacao !== "" ?
                              <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
                                {({ isOpen }) => (
                                  <>
                                    <PopoverTrigger>
                                      <Button _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs" bgColor={isOpen ? 'yellow.500' : 'green.500'}><HiOutlineInformationCircle color="white" size={18} /></Button>
                                    </PopoverTrigger>
                                    <Portal>
                                      <PopoverContent bg="gray.990" border="1px" borderColor="green.700">
                                        <PopoverHeader>Observação</PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                          <Box>
                                            {res.observacao}
                                          </Box>
                                        </PopoverBody>
                                      </PopoverContent>
                                    </Portal>
                                  </>
                                )}
                              </Popover> : (res.status === "autorizado" || res.status === "finalizado" || res.status === "recusado") && res.observacao === "" ? "-" :
                                <Flex gap={2}>
                                  <CautelaViaturaModal pedido={res} viaturas={viaturas.data} atualizar={refetchPedidos} />
                                  <ModalRecusa pedido={res} atualizar={refetchPedidos} />

                                </Flex>
                            }

                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th textAlign="center">Data Desejada</Th>
                        <Th textAlign="center">Data Devolução</Th>
                        <Th textAlign="center">Missão</Th>
                        <Th textAlign="center">Itinerário</Th>
                        <Th textAlign="center">Chefe Viatura</Th>
                        <Th textAlign="center">Motorista</Th>
                        <Th textAlign="center">Apresentar para</Th>
                        <Th textAlign="center">Situação</Th>
                        <Th textAlign="center">S/4</Th>
                        <Th></Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              }

            </Flex>
            <Flex bgGradient="linear(to-tr, gray.990, gray.990, green.900)" rounded="base"
              boxShadow="buttonShadow" flexDir="column" my={2} px={4}>
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                px={2}
                my={4}
                rounded="base"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex align="center">
                  <Heading fontSize="2xl" my="4" flex={1}>
                  Viaturas cauteladas {isLoading ? <Spinner ml={8} /> : ""}{" "} -
                </Heading>
                 <Text fontSize="2xl" pl={2} color="red.600">{viaturasCauteladas?.data.filter(viatura => viatura.status === "autorizado").length}</Text>
                </Flex>
                
                
                <IconButton
                  bg="blue.700"
                  float="right"
                  color="white"
                  _hover={{ bgColor: "blue.900" }}
                  onClick={() => refetchPedidos()}
                  aria-label="Atualizar tabela"
                  icon={<SlRefresh />}
                />
              </Flex>
              {isLoadingCautelas ? <NotLoaded /> :
                <TableContainer maxH="50vh" overflowY="scroll" py={4}>
                  {viaturasCauteladas?.data.filter(viatura => viatura.status === "autorizado") ?
                    <Table size="sm" colorScheme="whiteAlpha">
                      <Thead>
                        <Tr>
                          <Th textAlign="center">Data Desejada</Th>
                          <Th textAlign="center">Data Devolução</Th>
                          <Th textAlign="center">Missão</Th>
                          <Th textAlign="center">Itinerário</Th>
                          <Th textAlign="center">Chefe Viatura</Th>
                          <Th textAlign="center">Motorista</Th>
                          <Th textAlign="center">Apresentar para</Th>
                          <Th textAlign="center">Situação</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {viaturasCauteladas?.data.filter(viatura => viatura.status === "autorizado").map((res) => (
                          <Tr key={res.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                            <Td textAlign="center">{convertDate(res.pedido?.dataDesejada)}</Td>
                            <Td textAlign="center">{convertDate(res.pedido?.dataDevolucao)}</Td>
                            <Td textAlign="center">{res.pedido?.missao}</Td>
                            <Td textAlign="center">{res.pedido?.intinerario}</Td>
                            <Td textAlign="center">{res.pedido?.chefeViatura}</Td>
                            <Td textAlign="center">{res.pedido?.motorista}</Td>
                            <Td textAlign="center">{res.pedido?.apresentar}</Td>
                            <Td textAlign="center" fontSize="small" color={res.pedido?.status === "aguardando" ? "red.500" : res.pedido?.status === "autorizado" ? "yellow.500" : "green.500"}>{res.status.toUpperCase()}</Td>
                            <Td textAlign="center" flex={1} display="flex">
                              {res.pedido.status === "autorizado" ? <DescautelaModal pedido={res} atualizar={refetch} /> :
                                <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
                                  {({ isOpen }) => (
                                    <>
                                      <PopoverTrigger>
                                        <Button _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs" bgColor={isOpen ? 'yellow.500' : 'green.500'}><HiOutlineInformationCircle color="white" size={18} /></Button>
                                      </PopoverTrigger>
                                      <Portal>
                                        <PopoverContent bg="gray.990" border="1px" borderColor="green.700">
                                          <PopoverHeader>Observação</PopoverHeader>
                                          <PopoverCloseButton />
                                          <PopoverBody>
                                            <Box>
                                              {res.observacao}
                                            </Box>
                                          </PopoverBody>
                                        </PopoverContent>
                                      </Portal>
                                    </>
                                  )}
                                </Popover>
                              }
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th textAlign="center">Data Desejada</Th>
                          <Th textAlign="center">Data Devolução</Th>
                          <Th textAlign="center">Missão</Th>
                          <Th textAlign="center">Itinerário</Th>
                          <Th textAlign="center">Chefe Viatura</Th>
                          <Th textAlign="center">Motorista</Th>
                          <Th textAlign="center">Apresentar para</Th>
                          <Th textAlign="center">Situação</Th>
                          <Th></Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                    :
                    <NotData textoComponent="Sem viaturas cauteladas" />
                  }
                </TableContainer>
              }
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex >
    </>
  );
}
