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

import { Viatura } from "../../../@types/types";
import { FaTools } from "react-icons/fa";
import Router from "next/router";
import Head from "next/Head";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useSession } from "../../../services/context/auth";

const signInFormSchema = yup.object().shape({
  eb: yup.string().required("Campo obrigatório."),
  tipoTransporte: yup.string().required("Campo obrigatório."),
  tipo: yup.string().required("Campo obrigatório."),
});

export default function CadastroViatura() {
  const { user: session, status } = useSession();
  const [result, setResult] = useState({});
  const [createPedido, setCreatePedido] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!session?.Funcao.find((func) => func.funcao === "enc pmt")) {
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

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasViaturas"],
    async () => {
      const result = await api.get<Viatura[]>("/veiculos");
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

  const handleSignIn: SubmitHandler<Viatura> = async (values) => {
    try {
      const result = await api.post("/veiculo/create", values);
      if (result.status == 201) {
        toast({
          title: "Viatura cadastrada.",
          description: "Os dados da viatura foram cadastradas no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch();
      }
    } catch (error) {
      toast({
        title: "Viatura não cadastrada.",
        description: "Verifique os dados da viatura.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  async function handleUpdateStatus({ id, situacao }: Viatura) {
    try {
      const result = await api.put('/veiculo/update/status', { id, situacao });
      if (result.status == 200) {
        toast({
          title: "Viatura",
          description: "Os dados da viatura foram atualizados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch();
      }
    } catch (error) {
      toast({
        title: "Viatura",
        description: "Erro ao atualizar os dados.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

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
                  Cadastro de Viaturas
                </Heading>
                <Button display="flex" boxShadow="buttonShadow" mr={2} colorScheme='whatsapp' size='sm' onClick={() => (createPedido ? setCreatePedido(false) : setCreatePedido(true))}>
                  <Icon as={TbShoppingCartPlus} w={6} h={6} pr={2} /> Cadastrar viatura
                </Button>
              </Flex>
              {createPedido ?
                <>
                  <Grid
                    gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
                    gap={4}
                  >
                    <FormControl>
                      <Input
                        size="sm"
                        rounded="lg"
                        label="EB"
                        name="eb"
                        type="text"
                        error={errors.eb}
                        {...register("eb")}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        size="sm"
                        rounded="lg"
                        label="Tipo"
                        name="tipo"
                        type="text"
                        error={errors.tipo}
                        {...register("tipo")}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        as={"select"}
                        size="sm"
                        rounded="lg"
                        label="Tipo de transporte"
                        name="tipoTransporte"
                        {...register("tipoTransporte")}
                      >
                        <option value="tropa">Tropa</option>
                        <option value="material">Material</option>
                      </Input>
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
                rounded="base"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading fontSize="2xl" my="4">
                  Viaturas {isLoading ? <Spinner ml={8} /> : ""}{" "}
                </Heading>
                <IconButton
                  bg="blue.700"
                  float="right"
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
                      <Th textAlign="center">Eb</Th>
                      <Th textAlign="center">Tipo</Th>
                      <Th textAlign="center">Tipo de Transporte</Th>
                      <Th textAlign="center">Situação</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.data.map((res) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{res.eb}</Td>
                        <Td textAlign="center">{res.tipo}</Td>
                        <Td textAlign="center">{res.tipoTransporte}</Td>
                        <Td textAlign="center" fontWeight="bold" color={res.situacao === "disponivel" ? "green.500" : res.situacao === "indisponivel" ? "red.500" : "yellow.500"}>{res.situacao?.toLocaleUpperCase()}</Td>
                        <Td>
                          {res.situacao === "disponivel" ?
                            <Button
                              bg="yellow.600"
                              size="sm"
                              _hover={{ backgroundColor: "yellow.800" }}
                              onClick={() => handleUpdateStatus({ id: res.id, situacao: "indisponivel" })}
                              py="1"
                              boxShadow="buttonShadow"
                            >
                              <Icon as={FaTools} color="white" size={20} />
                            </Button>
                            : res.situacao === "indisponivel" ?
                              <Button
                                bg="green.600"
                                size="sm"
                                _hover={{ backgroundColor: "green.800" }}
                                onClick={() => handleUpdateStatus({ id: res.id, situacao: "disponivel" })}
                                py="1"
                                boxShadow="buttonShadow"
                              >
                                <Icon as={FaTools} color="white" size={20} />
                              </Button>
                              : null
                          }

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
            </Flex>

          </Box>
        </SimpleGrid>
      </Flex>
    </>

  );
}
