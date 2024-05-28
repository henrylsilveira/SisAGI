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

import { CautelaViatura, PedidoViatura } from "../../../@types/types";
import { convertDate } from "../../../utils/scripts";
import { NotLoaded } from "../../../components/NotLoaded";
import { NotData } from "../../../components/NotData";
import { HiOutlineInformationCircle } from "react-icons/hi";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import { MdSearch } from "react-icons/md";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GiTruck } from "react-icons/gi";
import { useSession } from "../../../services/context/auth";

const signInFormSchema = yup.object().shape({
  dataDesejada: yup.date().required("Campo obrigatório."),
  dataDevolucao: yup.date().required("Campo obrigatório."),
  missao: yup.string().required("Campo obrigatório."),
  intinerario: yup.string().required("Campo obrigatório."),
  chefeViatura: yup.string().required("Campo obrigatório."),
  motorista: yup.string().required("Campo obrigatório."),
  apresentar: yup.string().required("Campo obrigatório."),
  militarId: yup.string(),
  companhia: yup.string(),
});

export default function FurrielPedidoViatura() {
  const { user: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [createPedido, setCreatePedido] = useState(false);
  const toast = useToast();
  const initRef = React.useRef()

  useEffect(() => {
    if (!session?.Funcao.find((func) => func.funcao === "furriel")) {
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

  const { isLoading, error, data: dataPedidoViatura, isFetching, refetch } = useQuery(
    ["pedidosViatura"],
    async () => {
      const result = await api.get<PedidoViatura[]>(`/veiculos/pedidos/furriel/${session.companhia}`);
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
    values = {
      ...values,
      militarId: session.id,
      companhia: session.companhia
    }
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
        <title>SisAGI | Furriel - Viatura</title>
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
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                px={2}
                mb={4}
                rounded="base"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" p={2}>
                  Cadastro de pedido
                </Heading>

                  <Button display="flex" boxShadow="buttonShadow" mr={2} colorScheme='whatsapp' size='sm' onClick={() => (createPedido ? setCreatePedido(false) : setCreatePedido(true))}>
                    <Icon as={TbShoppingCartPlus} w={6} h={6} pr={2} /> Criar pedido
                  </Button>
              </Flex>
              {createPedido ?
                <>
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
                        placeholder="Descrever a missão"
                        name="missao"
                        type="text"
                        error={errors.missao}
                        {...register("missao")}
                      />
                      <FormHelperText>Ex: Transporte de tropa, transporte de munição, transporte de material</FormHelperText>
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
                      <FormHelperText>Ex: 13BIB-CIGC-13BIB</FormHelperText>
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
                      <FormHelperText>Ex: local, militar</FormHelperText>
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
                  </Button>
                </>
                : null}


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
                  Pedidos
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
                          <option value="">Todos - {dataPedidoViatura?.data.length}</option>
                          <option value="finalizado">Finalizado - {dataPedidoViatura?.data.filter(res => res.status === "finalizado").length}</option>
                          <option value="aguardando">Aguardando - {dataPedidoViatura?.data.filter(res => res.status === "aguardando").length}</option>
                          <option value="recusado">Recusado - {dataPedidoViatura?.data.filter(res => res.status === "recusado").length}</option>
                          <option value="autorizado">Autorizado - {dataPedidoViatura?.data.filter(res => res.status === "autorizado").length}</option>
                        </Input>
                      </FormControl>
                    </Flex>
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

              {isLoading ? <NotLoaded /> : dataPedidoViatura?.data.length === 0 ? <NotData textoComponent="Não existe dados" /> :
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
                        <Th textAlign="center">Situação</Th>
                        <Th textAlign="center"></Th>
                        <Th textAlign="center"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>

                      {dataPedidoViatura?.data.filter(res => search ? res.status === search : res.status).map((res) => (
                        <Tr key={res.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                          <Td textAlign="center">{convertDate(res.created_at)}</Td>
                          <Td textAlign="center">{convertDate(res.dataDesejada)}</Td>
                          <Td textAlign="center">{convertDate(res.dataDevolucao)}</Td>
                          <Td textAlign="center">{res.missao}</Td>
                          <Td textAlign="center">{res.intinerario}</Td>
                          <Td textAlign="center">{res.chefeViatura}</Td>
                          <Td textAlign="center">{res.motorista}</Td>
                          <Td textAlign="center">{res.apresentar}</Td>
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
                              </Popover> : "-"}
                          </Td>
                          <Td textAlign="center">
                            {(res?.status === "finalizado" && (res?.CautelaViatura?.length !== 0)) ?
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
                        <Th textAlign="center">Situação</Th>
                        <Th textAlign="center"></Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              }
            </Flex>

          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
