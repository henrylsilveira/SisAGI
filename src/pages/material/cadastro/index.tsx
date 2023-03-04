/* eslint-disable react/no-unescaped-entities */
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
import { TiInfoLarge } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { CautelaArray, Material, MaterialArray } from "../../../@types/types";
import Head from "next/head";
import { NotData } from "../../../components/NotData";

interface MaterialDataProps extends Material {
  cautelas?: CautelaArray;
}

const signInFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório."),
  condicoes: yup.string().required("Condições obrigatória."),
  quantidade: yup.number().required("Quantidade obrigatório."),
  codigo: yup.string(),
  subUnidade: yup.string().required("SU obrigatório"),
  dependencia: yup.string().required("Dependência obrigatório"),
  categoria: yup.string().required("Categoria obrigatório"),
});

export default function Cadastro() {
  const [result, setResult] = useState({});
  const { data: session } = useSession();
  const toast = useToast();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todosMateriais"],
    async () => {
      const result = await api.get<MaterialArray>("/material");
      const filterData = result.data.filter(
        (result: Material) =>
          result.sub_unidade === session.militar.companhia &&
          result.dependencia === session.militar.pelotao
      );
      setResult(filterData);
      return filterData;
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

  const handleSignIn: SubmitHandler<MaterialDataProps> = async (values) => {
    try {
      const result = await api.post("/material/create", values);
      if (result.status == 201) {
        toast({
          title: "Material cadastrado.",
          description: "Os dados do material foram cadastrados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch;
      }
    } catch (error) {
      toast({
        title: "Material não cadastrado.",
        description: "Verifique os dados do material.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>SisAGI | Material - Cadastro</title>
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
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="buttonShadow"
              rounded="lg"
              w="100%"
              flexDirection="column"
              p={4}
              mb={4}
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                alignItems="center"
                py={2}
              >
                <Heading fontSize="2xl" pl={2}>
                  CADASTRO
                </Heading>
                <Button
                  colorScheme="green"
                  boxShadow="buttonShadow"
                  size="sm"
                  type="submit"
                  isLoading={formState.isSubmitting}
                  ml="auto"
                  mr={2}
                >
                  GRAVAR
                </Button>
              </Flex>
              <Grid gridTemplateColumns="1fr 1fr 1fr" gap="2" px={4}>
                <FormControl>
                  <Input
                    size="sm"
                    rounded="md"
                    label="Nome"
                    name="nome"
                    type="text"
                    error={errors.nome}
                    {...register("nome")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    as="textarea"
                    size="sm"
                    rounded="md"
                    label="Condições"
                    name="condicoes"
                    type="text"
                    error={errors.condicoes}
                    {...register("condicoes")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    size="sm"
                    htmlSize={2}
                    rounded="md"
                    label="Quantidade"
                    type="number"
                    name="quantidade"
                    error={errors.quantidade}
                    {...register("quantidade")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={session.militar.companhia}
                    isReadOnly
                    size="sm"
                    rounded="md"
                    name="subUnidade"
                    label="SU"
                    {...register("subUnidade")}
                  ></Input>
                </FormControl>
                <FormControl>
                  <Input
                    value={session.militar.pelotao}
                    isReadOnly
                    size="sm"
                    rounded="md"
                    label="SU"
                    name="dependencia"
                    {...register("dependencia")}
                  ></Input>
                </FormControl>
                <FormControl>
                  <Input
                    as="select"
                    size="sm"
                    rounded="md"
                    label="Categoria"
                    name="categoria"
                    {...register("categoria")}
                  >
                    <option value="">Selecione</option>
                    <option value="comum">Comum</option>
                    <option value="controlado">Controlado</option>
                  </Input>
                </FormControl>
              </Grid>
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
                py={2}
              >
                <Heading fontSize="2xl" pl={2}>
                  MATERIAIS {isLoading ? <Spinner ml={8} /> : ""}
                </Heading>
                <IconButton
                  boxShadow="buttonShadow"
                  colorScheme="twitter"
                  float="right"
                  mr={2}
                  onClick={() => refetch()}
                  aria-label="Atualizar tabela"
                  icon={<SlRefresh />}
                />
              </Flex>
              {!(data.length === 0) ? (
                <TableContainer>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Nome</Th>
                      <Th textAlign="center">Condições</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">SU</Th>
                      <Th textAlign="center">Dependência</Th>
                      <Th textAlign="center">Cauteladas</Th>
                      <Th textAlign="center">Disponíveis</Th>
                      <Th textAlign="center">Categoria</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((res: MaterialDataProps) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{res.nome}</Td>
                        <Td textAlign="center">
                          <Popover placement="top-start">
                            <PopoverTrigger>
                              <Button
                                bg="green.400"
                                size="xs"
                                _hover={{ bgColor: "green.600" }}
                                py={1}
                              >
                                <Icon boxSize={6} as={TiInfoLarge} />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent bg="gray.990"
                          border="1px"
                          borderColor="green.700">
                              <PopoverHeader fontWeight="bold">
                                Condições
                              </PopoverHeader>
                              <PopoverArrow bg="gray.800" />
                              <PopoverCloseButton />
                              <PopoverBody
                                as="div"
                                wordBreak="normal"
                                h="auto"
                                py={6}
                                overflow="scroll"
                              >
                                {res.condicoes}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                        <Td textAlign="center">{res.quantidade}</Td>
                        <Td textAlign="center">{res.sub_unidade}</Td>
                        <Td textAlign="center">{res.dependencia}</Td>
                        <Td textAlign="center">{res.cautelas?.length}</Td>
                        <Td textAlign="center">
                          {res.quantidade - res.cautelas?.length}
                        </Td>
                        <Td textAlign="center">
                          {res.categoria === "controlado" ? (
                            <Badge
                              as="span"
                              variant="outline"
                              colorScheme="red"
                            >
                              {res.categoria}
                            </Badge>
                          ) : (
                            <Badge
                              as="span"
                              variant="outline"
                              colorScheme="green"
                            >
                              {res.categoria}
                            </Badge>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th textAlign="center">Nome</Th>
                      <Th textAlign="center">Condições</Th>
                      <Th textAlign="center">Quantidade</Th>
                      <Th textAlign="center">Local</Th>
                      <Th textAlign="center">Codigo</Th>
                      <Th textAlign="center">Cauteladas</Th>
                      <Th textAlign="center">Disponíveis</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
              ) : <NotData textoComponent="Não foram encontrados materiais cadastrados." /> }
              
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
