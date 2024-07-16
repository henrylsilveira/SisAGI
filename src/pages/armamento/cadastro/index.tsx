
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
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
import { Armamento } from "../../../@types/types";
import { useSession } from "../../../services/context/auth";
import { DrawerEditarArmamento } from "../../../components/Armeiro/DrawerEditarArmamento";
import { returnNomesArmamentos } from "../../../utils/scripts";
import { DrawerManutencaoArmamento } from "../../../components/Armeiro/DrawerManutencaoArmamento";

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
  const { user: session, status } = useSession();
  const [result, setResult] = useState({});
  const [nomesArmamentos, setNomesArmamentos] = useState([] as string[]);
  const toast = useToast();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todosArmamentosCia"],
    async () => {
      const result = await api.get(`/armamentos/${session?.companhia}`);
      setResult(result);
      return result;
    }
  );

  useQuery(
    ["todosNomesArmamentosCia"],
    async () => {
      const result = await api.get("/armamentos/nomes");
      if (result.data) {
        setNomesArmamentos(returnNomesArmamentos(result?.data as Armamento[]))
      }
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
        refetch();
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
                Cadastro de armamentos
              </Heading>
            </Flex>
            <Grid
              gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
              gap={4}
            >
              <FormControl>
                <Input
                  array={nomesArmamentos}
                  size="sm"
                  rounded="lg"
                  label="Nome"
                  name="nome"
                  type="text"
                  error={errors.nome}
                  {...register("nome")}
                />

              </FormControl>
              <FormControl>
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
              <FormControl>
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
              <FormControl>
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
              <FormControl>
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
            </Grid>
            <Button
              bg="green.800"
              _hover={{ bg: "green.900" }}
              size="sm"
              type="submit"
              isLoading={formState.isSubmitting}
              textColor={"white"}
              w="24"
              mt={4}
              ml="auto"
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
                Armamentos
              </Heading>
              <IconButton
                bg="blue.700"
                float="right"
                color={"white"}
                boxShadow="buttonShadow"
                _hover={{ bgColor: "blue.900" }}
                onClick={() => refetch()}
                aria-label="Atualizar tabela"
                icon={<SlRefresh />}
              />
            </Flex>

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
                    <Th textAlign="center">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data.map((res: Armamento) => (
                    <Tr key={res.id}>
                      <Td textAlign="center">{res.nome}</Td>
                      <Td textAlign="center">{res.nr_serie}</Td>
                      <Td textAlign="center">{res.tipo}</Td>
                      <Td textAlign="center">{res.emprego}</Td>
                      <Td textAlign="center">{res.condicoes}</Td>
                      <Td textAlign="center">{res.companhia}</Td>
                      <Td textAlign="center">
                        {res.status !== "disponivel" ? (
                          <Badge variant="outline" colorScheme="red">
                            {res.status}
                          </Badge>
                        ) : (
                          <Badge variant="outline" colorScheme="green">
                            {res.status}
                          </Badge>
                        )}
                      </Td>
                      <Td textAlign="center">
                        <DrawerEditarArmamento armamento={res} refetch={refetch} />
                        <DrawerManutencaoArmamento armamento={res} />
                      </Td>
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
                    <Th textAlign="center">Ações</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Flex>

        </Box>
      </SimpleGrid>
    </Flex>
  );
}
