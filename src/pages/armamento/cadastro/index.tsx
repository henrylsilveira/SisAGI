/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Input } from "../../../components/Form/Input";

import { SlRefresh } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { Armamento } from "../../../@types/types";

const signInFormSchema = yup.object().shape({
  nome: yup.string().required("Nome do armamento obrigatório."),
  nr_serie: yup.string().required("Número de série obrigatório."),
  tipo: yup.string(),
  emprego: yup.string(),
  condicoes: yup.string(),
  companhia: yup.string(),
  cabide: yup.string(),
  status: yup.string().required("Status obrigatório"),
});

export default function Cadastro() {
  const { data: session } = useSession()
  const [result, setResult] = useState({});
  const toast = useToast();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todosArmamentos"],
    async () => {
      const result = await api.get("/armamentos");
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

  const handleSignIn: SubmitHandler<Armamento> = async (values) => {
    try {
      const result = await api.post("/armamento/create", values);
      if (result.status == 201) {
        toast({
          title: "Armamento cadastrado.",
          description: "Os dados do armamento foram cadastrados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch()
      }
    } catch (error) {
      toast({
        title: "Armamento não cadastrado.",
        description: "Verifique os dados do armamento.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
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
              <Flex
                as="form"
                direction="column"
                onSubmit={handleSubmit(handleSignIn)}
              >
                <Heading fontSize="2xl" mb="4">
                  Cadastro de armamentos
                </Heading>

                <Flex>
                  <FormControl>
                    <Input
                      size="sm"
                      rounded="lg"
                      label="Nome"
                      name="nome"
                      type="text"
                      error={errors.nome}
                      {...register("nome")}
                    />
                  </FormControl>
                  <FormControl px={4}>
                    <Input
                      size="sm"
                      rounded="lg"
                      label="Número de série"
                      name="nr_serie"
                      type="text"
                      error={errors.nr_serie}
                      {...register("nr_serie")}
                    />
                  </FormControl>
                  <FormControl px={4}>
                    <Input
                      size="sm"
                      rounded="lg"
                      label="Cabide"
                      name="nr_serie"
                      type="text"
                      error={errors.cabide}
                      {...register("cabide")}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      size="sm"
                      htmlSize={2}
                      rounded="lg"
                      label="Tipo"
                      type="text"
                      name="tipo"
                      error={errors.tipo}
                      {...register("tipo")}
                    />
                  </FormControl>
                  <FormControl px={4}>
                    <Input
                      size="sm"
                      htmlSize={2}
                      rounded="lg"
                      type="text"
                      label="Emprego"
                      name="emprego"
                      error={errors.emprego}
                      {...register("emprego")}
                    />
                  </FormControl>

                </Flex>
                <Flex>
                  <FormControl>
                    <Input
                      size="sm"
                      htmlSize={2}
                      rounded="lg"
                      label="Condições"
                      type="text"
                      name="condicoes"
                      error={errors.condicoes}
                      {...register("condicoes")}
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
                      value={session.militar.companhia}
                      error={errors.companhia}
                      {...register("companhia")}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      as={"select"}
                      size="sm"
                      rounded="lg"
                      label="Situação"
                      name="status"
                      {...register("status")}
                    >
                      <option value="disponivel">Disponível</option>
                      <option value="indisponivel">Indisponível</option>
                    </Input>
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
              <TableContainer>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Nome</Th>
                      <Th textAlign="center">Nr Série</Th>
                      <Th textAlign="center">Tipo</Th>
                      <Th textAlign="center">Emprego</Th>
                      <Th textAlign="center">Condições</Th>
                      <Th textAlign="center">Companhia</Th>
                      <Th textAlign="center">Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.data.map((res) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{res.nome}</Td>
                        <Td textAlign="center">{res.nr_serie}</Td>
                        <Td textAlign="center">{res.tipo}</Td>
                        <Td textAlign="center">{res.emprego}</Td>
                        <Td textAlign="center">{res.condicoes}</Td>
                        <Td textAlign="center">{res.companhia}</Td>
                        <Td textAlign="center">{res.status}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th textAlign="center">Nome</Th>
                      <Th textAlign="center">Condições</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">Companhia</Th>
                      <Th textAlign="center">Codigo</Th>
                      <Th textAlign="center">Cauteladas</Th>
                      <Th textAlign="center">Disponíveis</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}
