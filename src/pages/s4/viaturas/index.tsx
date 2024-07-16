
import {
  Box,
  Button,
  Flex,
  FormControl,
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
  Tooltip,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Accordion,
  Icon
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { Input } from "../../../components/Form/Input";

import { SlRefresh } from "react-icons/sl";

import { CautelaViatura, PedidosVariasViaturasProps, PedidoViatura, Viatura } from "../../../@types/types";
import { calculaDisponibilidade, convertDate, convertDateAndTime, returnComboios } from "../../../utils/scripts";
import { NotLoaded } from "../../../components/NotLoaded";
import { NotData } from "../../../components/NotData";
import { HiOutlineInformationCircle } from "react-icons/hi";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import { MdDoubleArrow, MdSearch } from "react-icons/md";
import { GiCheckMark, GiTruck } from "react-icons/gi";
import { CautelaViaturaModal } from "../../../components/Modal/Viatura/ModalCautela";
import { DescautelaModal } from "../../../components/Modal/Viatura/ModalDescautela";
import { ModalRecusa } from "../../../components/Modal/Viatura/ModalRecusa";
import { AutorizaViaturaModal } from "../../../components/Modal/Viatura/ModalAutoriza";
import { RxCross1 } from "react-icons/rx";
import { useSession } from "../../../services/context/auth";
import { BsInfoCircle } from "react-icons/bs";
import { DrawerManutencao } from "../../../components/CmtGda/DrawerManutencao";
import { CompanhiasArray } from "../../../utils/staticArray";


export default function Viaturas() {
  const { user: session } = useSession();
  const [search, setSearch] = useState("");
  const [searchPedidos, setSearchPedidos] = useState("");
  const [searchCia, setSearchCia] = useState("")
  const [pedidosVariasViaturas, setPedidosVariasViaturas] = useState([])
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
      setPedidosVariasViaturas(returnComboios(result.data))
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

              <Tabs isFitted variant='enclosed'>
                <TabList borderBottom={0} mb={1}>
                  <Tab border={0} bg={"gray.990"} _selected={{ bgGradient: "linear(to-tr, gray.990, gray.990, green.900)", fontWeight: "bold", boxShadow: "buttonShadow" }}
                    boxShadow="buttonShadow">Pedidos Viaturas</Tab>
                  <Tab border={0} bg={"gray.990"} _selected={{ bgGradient: "linear(to-tr, gray.990, gray.990, green.900)", fontWeight: "bold", boxShadow: "buttonShadow" }}
                    boxShadow="buttonShadow">Pedidos Comboios</Tab>
                  <Tab border={0} bg={"gray.990"} _selected={{ bgGradient: "linear(to-tr, gray.990, gray.990, green.900)", fontWeight: "bold", boxShadow: "buttonShadow" }}
                    boxShadow="buttonShadow">Manutenção</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* Tabela Pedidos Viaturas */}
                    <Flex bgGradient="linear(to-tr, gray.990, gray.990, green.900)" rounded="base"
                      boxShadow="buttonShadow" flexDir="column" my={2} px={4}>
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
                          AUTORIZAÇÃO - S/4
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
                          onClick={() => refetchPedidos}
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
                                <Th textAlign="center">S/4</Th>
                              </Tr>
                            </Thead>
                            <Tbody>

                              {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).map((res) => (
                                <Tr key={res.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                                  <Td textAlign="center">{convertDate(res.created_at)}</Td>
                                  <Td textAlign="center">{convertDateAndTime(res.dataDesejada)}</Td>
                                  <Td textAlign="center">{convertDate(res.dataDevolucao)}</Td>
                                  <Td textAlign="center">
                                    <Tooltip label={res.missao} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                      <Button bg={"blue.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><BsInfoCircle color="white" /></Button>
                                    </Tooltip>
                                  </Td>
                                  <Td textAlign="center">
                                    <Tooltip label={res.intinerario} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                      <Button bg={"transparent"} border={"1px"} borderColor={"green.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><GiTruck color="white" /><MdDoubleArrow color="white" /><GiTruck color="white" /></Button>
                                    </Tooltip>
                                  </Td>
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
                                    {res.status === "aguardando" && res.autorizado === false ? (
                                      <AutorizaViaturaModal pedido={res} atualizar={refetchPedidos} />
                                    ) : res.autorizado === true ?
                                      <Flex justifyContent="center" shadow={"shape"} p={2} color="green.400">
                                        <GiCheckMark />
                                      </Flex>
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
                                <Th textAlign="center">S/4</Th>
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
                          CAUTELA - PMT
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
                                  {CompanhiasArray.map((option, index) => (
                                    <option key={option + index} value={option}>{option + "-" + pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => res.companhia === option).length}</option>
                                  ))}
                                
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
                                <Th></Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {pedidosViatura?.data.filter(res => searchPedidos ? res.status === searchPedidos : res.status).filter(res => searchCia ? res.companhia === searchCia : res.companhia).map((res) => (
                                <Tr key={res.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                                  <Td textAlign="center">{convertDateAndTime(res.dataDesejada)}</Td>
                                  <Td textAlign="center">{convertDate(res.dataDevolucao)}</Td>
                                  <Td textAlign="center">
                                    <Tooltip label={res.missao} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                      <Button bg={"blue.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><BsInfoCircle color="white" /></Button>
                                    </Tooltip>
                                  </Td>
                                  <Td textAlign="center">
                                    <Tooltip label={res.intinerario} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                      <Button bg={"transparent"} border={"1px"} borderColor={"green.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><GiTruck color="white" /><MdDoubleArrow color="white" /><GiTruck color="white" /></Button>
                                    </Tooltip>
                                  </Td>
                                  <Td textAlign="center">{res.chefeViatura}</Td>
                                  <Td textAlign="center">{res.motorista}</Td>

                                  <Td textAlign="center">{res.apresentar}</Td>
                                  <Td textAlign="center" fontSize="small" fontWeight="bold" color={res.status === "aguardando" ? "orange.500" : res.status === "autorizado" ? "blue.500" : res.status === "recusado" ? "red.500" : "green.500"}>{res.status.toUpperCase()}</Td>
                                  {res.status === "aguardando" ? (
                                    <Td textAlign="center" bg={res.autorizado ? "green.800" : "red.800"} shadow="buttonShadow">
                                      <Flex justifyContent="center">
                                        {res.autorizado ? <GiCheckMark /> : <RxCross1 />}
                                      </Flex>
                                    </Td>
                                  ) : <Td textAlign="center"> - </Td>}
                                  <Td textAlign="center">

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
                                          <CautelaViaturaModal pedido={res} viaturas={viaturas.data} atualizar={refetchPedidos} atualizarCautela={refetch} />
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
                        <Flex align="center" gap={2}>
                          <Heading fontSize="2xl" my="4" flex={1}>
                            CAUTELADAS
                          </Heading>
                          <Text fontSize="2xl" fontWeight={"bold"} color="red.600" bg={"gray.900"} shadow={"buttonShadow"} rounded="full" px={2}>{viaturasCauteladas?.data.filter(viatura => viatura.status === "autorizado").length}</Text>
                        </Flex>


                        <IconButton
                          bg="blue.700"
                          float="right"
                          color="white"
                          _hover={{ bgColor: "blue.900" }}
                          onClick={() => refetch()}
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
                                    <Td textAlign="center">{convertDateAndTime(res.pedido?.dataDesejada)}</Td>
                                    <Td textAlign="center">{convertDate(res.pedido?.dataDevolucao)}</Td>
                                    <Td textAlign="center">
                                      <Tooltip label={res.pedido?.missao} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                        <Button bg={"blue.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><BsInfoCircle color="white" /></Button>
                                      </Tooltip>
                                    </Td>
                                    <Td textAlign="center">
                                      <Tooltip label={res.pedido?.intinerario} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                        <Button bg={"transparent"} border={"1px"} borderColor={"green.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><GiTruck color="white" /><MdDoubleArrow color="white" /><GiTruck color="white" /></Button>
                                      </Tooltip>
                                    </Td>
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
                  </TabPanel>
                  <TabPanel>
                    {/* Pedidos Viaturas Comboios */}
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
                        Comboios
                      </Heading>
                    </Flex>
                    <Accordion>
                      {pedidosVariasViaturas.filter((pedidos: PedidosVariasViaturasProps) => pedidos.count > 1).map((pedidos: PedidosVariasViaturasProps) => (
                        <AccordionItem key={pedidos.horaDesejada} border={0}>
                          <h2>
                            <AccordionButton shadow="buttonShadow" rounded="base" bg={"gray.990"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} borderTop={"transparent"}>
                              <Box as='span' flex='1' textAlign='left' position={"relative"}>
                                <Flex gap={2} alignItems={"center"}>

                                  <Flex bg={{ bgGradient: "linear(to-tr, gray.990, gray.990, green.900)" }} border={"1px"} borderColor={"green.900"} p={2} fontSize={"sm"} boxShadow={"buttonShadow"} color="white" rounded="base" gap={2}>
                                    {pedidos.companhia}
                                  </Flex>
                                  <Flex flexDirection={"column"}>
                                    <Flex gap={2}>
                                      <Text color="green.500">Missão: </Text>
                                      <Text color="gray.500">{pedidos.missao}</Text>
                                    </Flex>
                                    <Flex gap={2}>
                                      <Flex gap={2}>
                                        <Text color="green.500">Itinerário: </Text>
                                        <Text>
                                          <Tooltip label={pedidos.itinerario} placement='right-end' bg={"gray.900"} border={"1px"} borderColor={"green.900"}>
                                            <Button bg={"transparent"} border={"1px"} borderColor={"green.600"} _hover={{ bgColor: "rgba(0, 0, 0, 0.3)" }} size="xs"><GiTruck color="white" /><MdDoubleArrow color="white" /><GiTruck color="white" /></Button>
                                          </Tooltip>
                                        </Text>
                                      </Flex>
                                      <Flex gap={2}>
                                        <Text color="green.500"> Data/Hora Desejada: </Text>
                                        <Text color="gray.500">{convertDateAndTime(pedidos.horaDesejada)}</Text>
                                      </Flex>

                                    </Flex>
                                  </Flex>
                                </Flex>


                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>

                          <AccordionPanel pb={4}>
                            <TableContainer maxH="50vh" overflowY="scroll" py={4}>
                              <Table size="sm" colorScheme="whiteAlpha">
                                <Thead>
                                  <Tr>
                                    <Th textAlign="center">Data Desejada</Th>
                                    <Th textAlign="center">Data Devolução</Th>
                                    <Th textAlign="center">Chefe Viatura</Th>
                                    <Th textAlign="center">Motorista</Th>
                                    <Th textAlign="center">Tipo Viatura</Th>
                                    <Th textAlign="center">Apresentar para</Th>
                                    <Th textAlign="center">S/4</Th>
                                    <Th></Th>
                                    <Th></Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {pedidos.pedidos.map((pedido) => (
                                    <Tr key={pedido.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                                      <Td textAlign="center">{convertDateAndTime(pedido.dataDesejada)}</Td>
                                      <Td textAlign="center">{convertDate(pedido.dataDevolucao)}</Td>
                                      <Td textAlign="center">{pedido.chefeViatura}</Td>
                                      <Td textAlign="center">{pedido.motorista}</Td>

                                      <Td textAlign="center">{pedido.apresentar}</Td>
                                      <Td textAlign="center" fontSize="small" fontWeight="bold" color={pedido.status === "aguardando" ? "orange.500" : pedido.status === "autorizado" ? "blue.500" : pedido.status === "recusado" ? "red.500" : "green.500"}>{pedido.status.toUpperCase()}</Td>
                                      {pedido.status === "aguardando" ? (
                                        <Td textAlign="center" bg={pedido.autorizado ? "green.800" : "red.800"} shadow="buttonShadow">{pedido.autorizado ? <GiCheckMark /> : <RxCross1 />}</Td>
                                      ) : <Td textAlign="center"> - </Td>}
                                      <Td textAlign="center">

                                        {(pedido.status === "autorizado" || pedido.status === "finalizado" || pedido.status === "recusado") && pedido.observacao !== "" ?
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
                                                        {pedido.observacao}
                                                      </Box>
                                                    </PopoverBody>
                                                  </PopoverContent>
                                                </Portal>
                                              </>
                                            )}
                                          </Popover> : (pedido.status === "autorizado" || pedido.status === "finalizado" || pedido.status === "recusado") && pedido.observacao === "" ? "-" :
                                            <Flex gap={2}>
                                              <CautelaViaturaModal pedido={pedido} viaturas={viaturas.data} atualizar={refetchPedidos} atualizarCautela={refetch} />
                                              <ModalRecusa pedido={pedido} atualizar={refetchPedidos} />

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

                                    <Th textAlign="center">Chefe Viatura</Th>
                                    <Th textAlign="center">Motorista</Th>
                                    <Th textAlign="center">Tipo Viatura</Th>
                                    <Th textAlign="center">Apresentar para</Th>
                                    <Th textAlign="center">S/4</Th>
                                    <Th></Th>
                                  </Tr>
                                </Tfoot>
                              </Table>
                            </TableContainer>
                          </AccordionPanel>


                        </AccordionItem>
                      ))}

                    </Accordion>

                  </TabPanel>
                  <TabPanel>
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
                        Viaturas {isLoading ? <Spinner ml={8} /> : ""}{" "}
                      </Heading>
                      <Flex gap={2} alignItems={"center"}>
                        <Flex bg="gray.990"
                          boxShadow="buttonShadow" gap={2} align={"center"} p={2} fontWeight={"bold"} >
                          Disponibilidade: <Text w={"65px"} textAlign={"center"} boxShadow="buttonShadow" rounded={"full"} bg={Number(calculaDisponibilidade(viaturas?.data)) > 60 ? "green.800" : Number(calculaDisponibilidade(viaturas?.data)) < 60 && Number(calculaDisponibilidade(viaturas?.data)) > 30 ? "yellow.800" : "red.800"} color={"white"} p={2}>{calculaDisponibilidade(viaturas?.data)}%</Text>
                        </Flex>
                        <IconButton
                          color={"white"}
                          boxShadow="buttonShadow"
                          bg="blue.700"
                          float="right"
                          _hover={{ bgColor: "blue.900" }}
                          onClick={() => refetch()}
                          aria-label="Atualizar tabela"
                          icon={<SlRefresh />}
                        />
                      </Flex>
                    </Flex>

                    <TableContainer>
                      <Table size="sm" colorScheme="whiteAlpha">
                        <Thead>
                          <Tr>
                            <Th textAlign="center">Eb</Th>
                            <Th textAlign="center">Tipo</Th>
                            <Th textAlign="center">Tipo de Transporte</Th>
                            <Th textAlign="center">Situação</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {viaturas?.data.map((res) => (
                            <Tr key={res.id}>
                              <Td textAlign="center">{res.eb}</Td>
                              <Td textAlign="center">{res.tipo.toUpperCase()}</Td>
                              <Td textAlign="center">{res.tipoTransporte.toUpperCase()}</Td>
                              <Td textAlign="center" fontWeight="bold" color={res.situacao === "disponivel" ? "green.500" : res.situacao === "indisponivel" ? "red.500" : "yellow.500"}>{res.situacao?.toLocaleUpperCase()}</Td>
                              <Td>
                                <Flex gap={2}>
                                  <DrawerManutencao viatura={res} />
                                </Flex>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                        <Tfoot>
                          <Tr>
                            <Th textAlign="center">Eb</Th>
                            <Th textAlign="center">Tipo</Th>
                            <Th textAlign="center">Tipo de Transporte</Th>
                            <Th textAlign="center">Situação</Th>
                            <Th></Th>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>

          </Box>
        </SimpleGrid>
      </Flex >
    </>
  );
}
