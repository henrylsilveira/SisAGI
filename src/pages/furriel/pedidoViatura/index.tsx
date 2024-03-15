/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
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
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Input } from "../../../components/Form/Input";

import { SlRefresh } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { PedidoViatura } from "../../../@types/types";
import { convertDate } from "../../../utils/scripts";
import { NotLoaded } from "../../../components/NotLoaded";
import { NotData } from "../../../components/NotData";
import { HiOutlineInformationCircle } from "react-icons/hi";
import React from "react";

const signInFormSchema = yup.object().shape({
  dataDesejada: yup.date().required("Campo obrigatório."),
  dataDevolucao: yup.date().required("Campo obrigatório."),
  missao: yup.string().required("Campo obrigatório."),
  intinerario: yup.string().required("Campo obrigatório."),
  chefeViatura: yup.string().required("Campo obrigatório."),
  motorista: yup.string().required("Campo obrigatório."),
  apresentar: yup.string().required("Campo obrigatório."),
});

export default function FurrielPedidoViatura() {
  const { data: session } = useSession();
  const [result, setResult] = useState({});
  const toast = useToast();
  const initRef = React.useRef()
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasViaturas"],
    async () => {
      const result = await api.get<PedidoViatura[]>("/veiculos/pedidos");
      setResult(result);
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
                Pedidos {isLoading ? <Spinner ml={8} /> : ""}{" "}
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
                      <Th textAlign="center"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.data ? data?.data?.map((res) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{convertDate(res.dataDesejada)}</Td>
                        <Td textAlign="center">{convertDate(res.dataDevolucao)}</Td>
                        <Td textAlign="center">{res.missao}</Td>
                        <Td textAlign="center">{res.intinerario}</Td>
                        <Td textAlign="center">{res.chefeViatura}</Td>
                        <Td textAlign="center">{res.motorista}</Td>
                        <Td textAlign="center">{res.apresentar}</Td>
                        <Td textAlign="center" fontSize="small" color={res.status === "aguardando" ? "red.500" : res.status === "autorizado" ? "yellow.500" : "green.500"}>{res.status.toUpperCase()}</Td>
                        <Td textAlign="center">
                          {res.status === "finalizado" ? 
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
                          </Popover> : "-"}
                        </Td>
                      </Tr>
                    )) : <NotData textoComponent="Não existe dados" />}
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
  );
}
