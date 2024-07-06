
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
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
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Input } from "../../../components/Form/Input";

import { SlRefresh } from "react-icons/sl";
import { Municao } from "../../../@types/types";
import { convertDate, generateNowISOTime } from "../../../utils/scripts";
import { DrawerFurriel } from '../../../components/Drawer/Furriel/index';
import Head from "next/head";
import Router from "next/router";
import { useSession } from "../../../services/context/auth";

const signInFormSchema = yup.object().shape({
  nrPedido: yup.string().required("Obrigatório."),
  municaoPedida: yup.number().required("Obrigatório."),
  unidade: yup.string(),
  tipoMunicao: yup.string().required("Obrigatório."),
  dataInstrucao: yup.date().required("Obrigatório."),
  instrucao: yup.string().required("Obrigatório"),
  companhia: yup.string().required("Obrigatório"),
});

export default function FurrielMunicao() {
  const { user: session, status } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (!session?.Funcao.find((func) => func.funcao === "furriel")) {
      Router.push("/dashboard");
      toast({
        title: "Acesso não autorizado.",
        description: 'Você não tem autorização para acessar essa área.',
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [session, toast]);

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todosMunicao"],
    async () => {
      return await api.get("/municao");
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

  const handleSignIn: SubmitHandler<Municao> = async (values) => {
    values = {
      ...values,
      militarId: session?.id
    }
    try {
      const result = await api.post("/furriel/municao/create", values);
      if (result.status == 201) {
        toast({
          title: "Pedido de munição cadastrado.",
          description: "Os dados do pedido foram cadastrados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch()
      }
    } catch (error) {
      toast({
        title: "Pedido não cadastrado.",
        description: "Verifique os dados do pedido.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>SisAGI | Furriel - Munição</title>
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
              as="form"
              direction="column"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <Heading fontSize="2xl" mb="4">
                Cadastro de pedidos de munição
              </Heading>

              <Flex>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Número do pedido"
                    name="nrPedido"
                    type="text"
                    error={errors.nrPedido}
                    {...register("nrPedido")}
                  />
                </FormControl>
                <FormControl px={4}>
                  <Input
                    size="sm"
                    rounded="lg"
                    label="Munição pedida"
                    name="municaoPedida"
                    type="number"
                    error={errors.municaoPedida}
                    {...register("municaoPedida")}
                  />
                </FormControl>
                <FormControl pr={4}>
                  <Input
                    as='select'
                    size="sm"
                    rounded="lg"
                    label="Unidade"
                    name="unidade"
                    type="text"
                    error={errors.unidade}
                    {...register("unidade")}
                  >
                    <option value="kilograma">Kilograma</option>
                    <option value="unidade">Unidade</option>
                  </Input>
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    htmlSize={2}
                    rounded="lg"
                    label="Tipo de munição"
                    type="text"
                    name="tipoMunicao"
                    error={errors.tipoMunicao}
                    {...register("tipoMunicao")}
                  />
                </FormControl>
                <FormControl px={4}>
                  <Input
                    size="sm"
                    htmlSize={2}
                    rounded="lg"
                    type="date"
                    label="Data da instrução"
                    name="dataInstrucao"
                    error={errors.dataInstrucao}
                    {...register("dataInstrucao")}
                  />
                  <FormHelperText> Mês / Dia / Ano</FormHelperText>
                </FormControl>

              </Flex>
              <Flex>
                <FormControl>
                  <Input
                    size="sm"
                    htmlSize={2}
                    rounded="lg"
                    label="Qual instrução?"
                    type="text"
                    name="instrucao"
                    error={errors.instrucao}
                    {...register("instrucao")}
                  />
                </FormControl>
                <FormControl px={4}>
                  <Input
                    size="sm"
                    htmlSize={2}
                    rounded="lg"
                    label="Companhia"
                    type="text"
                    name="companhia"
                    isReadOnly
                    value={session?.companhia}
                    error={errors.companhia}
                    {...register("companhia")}
                  />
                </FormControl>
              </Flex>
              <Button
                colorScheme="green"
                size="sm"
                type="submit"
                isLoading={formState.isSubmitting}
                w="24"
                mt={4}
                ml="auto"
              >
                OK
              </Button>
            </Flex>
            <Heading fontSize="2xl" my="4">
              Pedidos {isLoading ? <Spinner ml={8} /> : ""}{" "}
              <IconButton
                bg="blue.700"
                float="right"
                _hover={{ bgColor: "blue.900" }}
                onClick={() => refetch()}
                aria-label="Atualizar tabela"
                icon={<SlRefresh />}
              />
            </Heading>
            <TableContainer>
              <Table size="sm" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Nr Pedido</Th>
                    <Th textAlign="center">Munição Pedida</Th>
                    <Th textAlign="center">Unidade</Th>
                    <Th textAlign="center">Tipo de Munição</Th>
                    <Th textAlign="center">Data Instrução</Th>
                    <Th textAlign="center">Instrução</Th>
                    <Th textAlign="center">Companhia</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data.map((res: Municao) => (
                    <Tr key={res.id}>
                      <Td textAlign="center">{res.nr_pedido}</Td>
                      <Td textAlign="center">{res.municao_pedida}</Td>
                      <Td textAlign="center">{res.unidade}</Td>
                      <Td textAlign="center">{res.tipo_municao}</Td>
                      <Td textAlign="center">{convertDate(res.data_instrucao)}</Td>
                      <Td textAlign="center">{res.companhia}</Td>
                      <Td textAlign="center">{res.status === 'ativo' ? <Badge variant='outline' colorScheme='teal'>{res.status}</Badge> : <Badge variant='outline' colorScheme='orange'>{res.status}</Badge>}</Td>
                      <Td textAlign="center">{res.status === 'ativo' ? <DrawerFurriel data={res} /> : null}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th textAlign="center">Nr Pedido</Th>
                    <Th textAlign="center">Munição Pedida</Th>
                    <Th textAlign="center">Unidade</Th>
                    <Th textAlign="center">Tipo de Munição</Th>
                    <Th textAlign="center">Data Instrução</Th>
                    <Th textAlign="center">Instrução</Th>
                    <Th textAlign="center">Companhia</Th>
                    <Th></Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </SimpleGrid>
      </Flex>
    </>


  )
}
