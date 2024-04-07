/* eslint-disable react/no-unescaped-entities */
import {
    Box,
    Button,
    Flex,
    FormControl,
    Grid,
    Heading,
    Icon,
    IconButton,
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
    PopoverTrigger,
    Portal,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";

import { CiInboxIn } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { CautelaViatura, PedidoViatura, Viatura } from "../../../@types/types";
import { convertDate } from "../../../utils/scripts";
import { CautelaViaturaModal } from "../../../components/Modal/Viatura/ModalCautela";
import { MdHighlightOff, MdSearch } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";
import { DescautelaModal } from "../../../components/Modal/Viatura/ModalDescautela";
import { NotLoaded } from "../../../components/NotLoaded";
import React, { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { NotData } from "../../../components/NotData";
import { ModalRecusa } from "../../../components/Modal/Viatura/ModalRecusa";
import Router from "next/router";
import Head from "next/head";
import { Input } from "../../../components/Form/Input";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const signInFormSchema = yup.object().shape({
    dataDesejada: yup.date().required("Campo obrigatório."),
    dataDevolucao: yup.date().required("Campo obrigatório."),
    missao: yup.string().required("Campo obrigatório."),
    intinerario: yup.string().required("Campo obrigatório."),
    chefeViatura: yup.string().required("Campo obrigatório."),
    motorista: yup.string().required("Campo obrigatório."),
    apresentar: yup.string().required("Campo obrigatório."),
});

export default function CautelaViaturaPage() {
    const { data: session } = useSession();
    const toast = useToast();
    const initRef = React.useRef()
    const [search, setSearch] = useState("")
    const [searchCia, setSearchCia] = useState("")

    useEffect(() => {
        if (!session?.militar.Funcao.find((func) => func.funcao === "enc pmt")) {
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

    const { isLoading, error, data: pedidosViatura, isFetching, refetch: refetchPedidos } = useQuery(
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
    const {
        register,
        handleSubmit,
        formState,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInFormSchema),
    });

    const handleSignIn: SubmitHandler<PedidoViatura> = async (values) => {
        try {
            const result = await api.post("/veiculo/pedido/create", values);
            if (result.status == 201) {
                toast({
                    title: "Pedido de viatura cadastrado.",
                    description: "Os dados do pedido de viatura foram cadastrados no sistema.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                refetch();
            }
        } catch (error) {
            toast({
                title: "Pedido de viatura não cadastrado.",
                description: "Verifique os dados do pedido de viatura.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Head>
                <title>SisAGI | Encarregado do PMT</title>
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
                            as="form"
                            direction="column"
                            onSubmit={handleSubmit(handleSignIn)}
                        >
                            {/* <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                px={2}
                mb={4}
                rounded="base"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" p={2}>
                  Cadastro de Viaturas
                </Heading>
              </Flex>
              <Grid
                gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
                gap={4}
                mb={2}
              >
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Data desejada"
                    name="dataDesejada"
                    type="date"
                    error={errors.dataDesejada}
                    {...register("dataDesejada")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Data de Devolução"
                    name="dataDevolucao"
                    type="date"
                    error={errors.dataDevolucao}
                    {...register("dataDevolucao")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Missão"
                    name="missao"
                    type="text"
                    error={errors.missao}
                    {...register("missao")}
                  />
                </FormControl>
  
  
              </Grid>
              <Grid
                gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr 1fr"]}
                gap={4}
              >
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Itinerário"
                    name="intinerario"
                    type="text"
                    error={errors.intinerario}
                    {...register("intinerario")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Chefe de Viatura"
                    name="chefeViatura"
                    type="text"
                    error={errors.chefeViatura}
                    {...register("chefeViatura")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Motorista de Viatura"
                    name="motorista"
                    type="text"
                    error={errors.motorista}
                    {...register("motorista")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Apresentar-se-a"
                    name="apresentar"
                    type="text"
                    error={errors.apresentar}
                    {...register("apresentar")}
                  />
                </FormControl>
  
              </Grid>
              <Button
                bg="green.800"
                _hover={{ bg: "green.900" }}
                size="sm"
                type="submit"
                isLoading={formState.isSubmitting}
                w="24"
                mt={4}
                ml="auto"
                textColor="white"
                boxShadow="buttonShadow"
              >
                OK
              </Button> */}
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
                                    Pedidos de viaturas {isLoading ? <Spinner ml={8} /> : ""}{" "}
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
                                                    onChange={e => setSearch(e.target.value)}
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
                                            {pedidosViatura?.data.filter(res => search ? res.status === search : res.status).filter(res => searchCia ? res.companhia === searchCia : res.companhia).map((res) => (
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
                                    Viaturas cauteladas {isLoading ? <Spinner ml={8} /> : ""}{" "}
                                </Heading>
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
