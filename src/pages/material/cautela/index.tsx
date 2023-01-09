/* eslint-disable react/no-unescaped-entities */
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
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
  
  import { SlRefresh } from 'react-icons/sl'
  import { TiInfoLarge } from 'react-icons/ti'
import { BsBoxArrowRight } from "react-icons/bs";
import { ModalCautela } from "../../../components/Modal/Material/ModalCautela";
import Head from "next/head";
  
  export type MaterialDataProps = {
    id?: string;
    nome: string;
    condicoes: string;
    quantidade: number;
    local?: string;
    codigo?: string;
    subUnidade: string;
    dependencia: string;
    categoria: string;
    cautelas?: []
  };
  
  const signInFormSchema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório."),
    condicoes: yup.string().required("Condições obrigatória."),   
    quantidade: yup.number().required("Quantidade obrigatório."),
    codigo: yup.string(),
    subUnidade: yup.string().required("SU obrigatório"),
    dependencia: yup.string().required("Dependência obrigatório"),
    categoria: yup.string().required("Categoria obrigatório"),
  });
  
  export default function Cautela() {
    const [result, setResult] = useState({});
    const [militares, setMilitares] = useState({});
    const toast = useToast()

    const { isLoading: militarLoading, data: militarData } = useQuery(
        ["todosMilitares"],
        async () => {
          const result = await api.get("/militar");
          setMilitares(result);
        }
      );
  
    const { isLoading, data, refetch } = useQuery(
      ["todosMateriais"],
      async () => {
        const result = await api.get("/material");
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
  
    const handleSignIn: SubmitHandler<MaterialDataProps> = async (values) => {
  
      try {
        const result = await api.post('/material/create', values);
        if (result.status == 201) {
          toast({
            title: "Material cadastrado.",
            description: "Os dados do material foram cadastrados no sistema.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          
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
        <title>SisAGI | Material - Cautelar</title>
      </Head>
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
                <Heading fontSize="2xl" my="4">
                  Materiais {isLoading ? <Spinner ml={8} /> : ""} <IconButton bg='blue.700' float='right' _hover={{ bgColor: 'blue.900'}} onClick={() => refetch()} aria-label="Atualizar tabela" icon={<SlRefresh />} />
                </Heading>
                <TableContainer>
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Nome</Th>
                        <Th textAlign="center">Condições</Th>
                        <Th textAlign="center">Quantidade</Th>
                        <Th textAlign="center">Local</Th>
                        <Th textAlign="center">Codigo</Th>
                        <Th textAlign="center">Cauteladas</Th>
                        <Th textAlign="center">Disponíveis</Th>
                        <Th textAlign="center">Categoria</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.data.map((res: MaterialDataProps) => (
                        <Tr key={res.id}>
                          <Td textAlign="center">{res.nome}</Td>
                          <Td textAlign="center">
                            <Popover placement="top-start">
                              <PopoverTrigger>
                                <Button bg="green.400" size="xs" _hover={{ bgColor: 'green.600'}} py="1">
                                  <Icon boxSize={6} as={TiInfoLarge} />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent  bg="gray.900" border="0">
                                <PopoverHeader fontWeight="bold">
                                  Condições
                                </PopoverHeader>
                                <PopoverArrow bg="gray.800" />
                                <PopoverCloseButton />
                                <PopoverBody as="div" wordBreak='normal' h="auto" py={6} overflow="scroll">
                                {res.condicoes}
  
                                  </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Td>
                          <Td textAlign="center">{res.quantidade}</Td>
                          <Td textAlign="center">{res.local}</Td>
                          <Td textAlign="center">{res.codigo}</Td>
                          <Td textAlign="center">{res.cautelas?.length}</Td>
                          <Td textAlign="center">
                            {res.quantidade - (res.cautelas?.filter((c: any) => c.status === 'ativo')).length}
                          </Td>
                          <Td textAlign="center">
                            {res.categoria === 'controlado' ? <Badge as='span' variant='outline' colorScheme='red'>{res.categoria}</Badge> : <Badge as='span' variant='outline' colorScheme='green'>{res.categoria}</Badge>}
                          </Td>
                          <Td>
                            <ModalCautela data={militares} dataMaterial={res}  />
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
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex>
      </>
      
    );
  }
