import {
    Flex,
    Button,
    Heading,
    FormControl,
    useToast,
    Box,
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
    Tr
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { SubmitHandler } from "react-hook-form/dist/types";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { Input } from "../../../components/Form/Input";
  import { api } from "../../../services/api";
import { Armamento, Manutencao } from "../../../@types/types";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { SlRefresh } from "react-icons/sl";
import { convertDate } from "../../../utils/scripts";
  
  const signInFormSchema = yup.object().shape({
    tipoManutencao: yup.string().required("Obrigatório."),
    dataManutencao: yup.date().required("Obrigatório."),
    armamentoId: yup.string().required("Obrigatório."),
  });
  
  export default function ManutencaoArmamento() {
    const { data: session } = useSession()
    const [nomeArmamentos, setNomeArmamentos] = useState([]);
    const [armamento, setArmamento] = useState('');
    const toast = useToast();
  
    const { data } = useQuery(
        ["todosArmamentos"],
        async () => {
          const result = await api.get("/armamentos");
          var data = [] // CONJUNTO DE INSTRUCAO FILTRA OS NOME DE TODOS ARMAMENTOS NO BANCO E TIRA OS REPETIDOS
          result.data.map((el: Armamento) => { return data.push( el.local === session.militar.local ? el.nome : null) })
          const filtered = Array.from(new Set(data)).filter(function (res) {
            return res != null;
          });
          setNomeArmamentos(filtered)
          return result;
        }
      );

      const { isLoading, data: manutencoes, refetch } = useQuery(
        ["todasManutencoes"],
        async () => {
          const result = await api.get("/armamentos/manutencao");
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
        const result = await api.post("/armamento/manutencao/create", values);
        if (result.status == 201) {
          toast({
            title: "Manutenção cadastrada.",
            description: "Os dados da manutenção foram cadastrados no sistema.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Manutenção não cadastrada.",
          description: "Verifique os dados da manutenção.",
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
                    Cadastro de manutenções
                  </Heading>
  
                  <Flex>
                    <FormControl>
                      <Input
                        size="sm"
                        rounded="lg"
                        label="Tipo de Manutenção"
                        name="tipoManutencao"
                        type="text"
                        error={errors.tipoManutencao}
                        {...register("tipoManutencao")}
                      />
                    </FormControl>
                    <FormControl px={4}>
                      <Input
                        size="sm"
                        rounded="lg"
                        label="Data"
                        isReadOnly
                        value={convertDate(Date.now())}
                        name="dataManutencao"
                        type="text"
                        error={errors.dataManutencao}
                        {...register("dataManutencao")}
                      />
                    </FormControl>
                  </Flex>
                  <Flex>
                    <FormControl>
                      <Input
                        as='select'
                        size="sm"
                        rounded="lg"
                        label="Armamento"
                        type="text"
                        name="armamento"
                        value={armamento}
                        onChange={(e) => setArmamento(e.target.value)}
                      >
                      {nomeArmamentos.map( (arm, index) => (
                          <option value={arm} key={index}>{arm}</option>
                      ))}
                      </Input>
                    </FormControl>
                    <FormControl px={4}>
                      <Input
                      as='select'
                        size="sm"
                        rounded="lg"
                        label="Nr Serie"
                        type="text"
                        name="armamentoId"
                        error={errors.armamentoId}
                        {...register("armamentoId")}
                      >
                      {data?.data ? data?.data.filter( (el: Armamento) => el.nome === armamento).map((arm: Armamento, index) => (
                          <option value={arm.id} key={index}>{arm.nr_serie}</option>
                      )) : <option value=''>Sem número de série</option>}
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
                  Manutenções {isLoading ? <Spinner ml={8} /> : ""}{" "}
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
                        <Th textAlign="center">Data da Manutenção</Th>
                        <Th textAlign="center">Tipo</Th>
                        <Th textAlign="center">Armamento</Th>
                        <Th textAlign="center">Nr Série</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {manutencoes?.data.map((res: Manutencao) => (
                        <Tr key={res.id}>
                          <Td textAlign="center">{convertDate(res.dataManutencao)}</Td>
                          <Td textAlign="center">{res.tipoManutencao}</Td>
                          <Td textAlign="center">{res.armamento.nome}</Td>
                          <Td textAlign="center">{res.armamento.nr_serie}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                      <Th textAlign="center">Data da Manutenção</Th>
                        <Th textAlign="center">Tipo</Th>
                        <Th textAlign="center">Armamento</Th>
                        <Th textAlign="center">Nr Série</Th>
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
  