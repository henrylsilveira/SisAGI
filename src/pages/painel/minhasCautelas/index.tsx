/* eslint-disable react/no-unescaped-entities */
import {
    Badge,
    Box,
    Button,
    Checkbox,
    Circle,
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
    Text
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
  
  import { SlRefresh } from 'react-icons/sl'
  import { TiInfoLarge } from 'react-icons/ti'
  import { useSession } from "next-auth/react";
  import Head from "next/head";
  import { Cautela, CautelaArray, MaterialArray, Militar } from '../../../@types/types';
import { convertDate } from "../../../utils/scripts";
import { BiLock } from "react-icons/bi";
import { ModalValidate } from "../../../components/Modal/Material/ModalValidate";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
}

const series = [{
  data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
}]
  
  
  export default function Cadastro() {
    const { data: session } = useSession()
    const toast = useToast()

    const [cautelaFechada, setCautelaFechada] = useState(Boolean);
    const [result, setResult] = useState([]);
    const [search, setSearch] = useState(result);
  
    const { isLoading, error, data, isFetching, refetch } = useQuery(
      ["todasCautelas"],
      async () => {
        const result = await api.get("/cautela");
        setResult(result.data as CautelaArray);
        return result;
      }
    );

    useEffect(() => {
      return setSearch(result.filter((res) => (cautelaFechada ? res : res.status === "ativo")))
    }, [result, cautelaFechada]);
  
    return (
        <>
            <Head>
                <title>SisAGI | Minhas Cautelas</title>
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
                      <Flex flexDirection='row' gap={4} justifyContent='space-between'>
                        <Flex bg='gray.900' boxShadow="buttonShadow" rounded='lg' w="100%">
                          <Chart options={options} series={series} type="bar" width='100%' height='300px'  />
                        *Apresentar cautelas no nome do Militar
                        *Quantas não estao validadas
                        </Flex>
                        <Flex bg='gray.900' boxShadow='buttonShadow' rounded='lg' transition='ease-in-out' _hover={{border: "1px", borderColor: 'green.800'}} w="100%">
                        <Chart options={options} series={series} type="bar" width='100%' height='300px' />
                        Apresentar armamento vinculado ao militar
                        </Flex>
                      </Flex>
                        
                        <Heading fontSize="2xl" my="4">
                        Minhas Cautelas {isLoading ? <Spinner ml={8} /> : ""} <IconButton bg='blue.700' float='right' boxShadow="buttonShadow" _hover={{ bgColor: 'blue.900'}} onClick={() => refetch()} aria-label="Atualizar tabela" icon={<SlRefresh />} />
                        </Heading>
                        <Flex bg="gray.990" p="2" mb="2" boxShadow="buttonShadow" rounded="base">
                  <Text mr={4}>Filtros:</Text>
                  <Checkbox
                    size="lg"
                    colorScheme="blue"
                    onChange={(e) => setCautelaFechada(e.target.checked)}
                  >
                    Fechada?
                  </Checkbox>
                </Flex>
                        <TableContainer>
                        <Table size="sm" colorScheme="whiteAlpha">
                            <Thead>
                            <Tr>
                                <Th textAlign="center">Material</Th>
                                <Th textAlign="center">Obs</Th>
                                <Th textAlign="center">Quantidade</Th>
                                <Th textAlign="center">SU</Th>
                                <Th textAlign="center">Dependência</Th>
                                <Th textAlign="center">Cautelou</Th>
                                <Th textAlign="center">Data Cautela</Th>
                                <Th textAlign="center">Situação</Th>
                                <Th textAlign="center">Validado?</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {search.map((res: Cautela) => (
                                <Tr key={res.id}>
                                <Td textAlign="center">{res.material.nome}</Td>
                                <Td textAlign="center">
                                    <Popover placement="top-start">
                                    <PopoverTrigger>
                                        <Button bg="green.400" boxShadow="buttonShadow" size="xs" _hover={{ bgColor: 'green.600'}} py={1}>
                                        <Icon boxSize={6} as={TiInfoLarge} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent  bg="gray.900" border="0">
                                        <PopoverHeader fontWeight="bold">
                                        Observação
                                        </PopoverHeader>
                                        <PopoverArrow bg="gray.800" />
                                        <PopoverCloseButton />
                                        <PopoverBody as="div" wordBreak='normal' h="auto" py={6} overflow="scroll">
                                        {res.observacao}
        
                                        </PopoverBody>
                                    </PopoverContent>
                                    </Popover>
                                </Td>
                                <Td textAlign="center">{res.quantidade}</Td>
                                <Td textAlign="center">{res.sub_unidade}</Td>
                                <Td textAlign="center">{res.dependencia}</Td>
                                <Td textAlign="center">{ res.cautelou.post_grad + ' ' + res.cautelou.nome_guerra}</Td>
                                <Td textAlign="center">{convertDate(res.data_cautela)}</Td>
                                <Td textAlign="center">
                                    {res.status}
                                </Td>
                                <Td textAlign="center">
                                {res.validado ? (
                            <Circle mx="auto" size="40px" boxShadow="buttonShadow" bg="gray.990">
                              <BiLock size={24} color="#00AA00" />
                            </Circle>
                          ) : (                           
                              <ModalValidate data={res} />
                          )}
                                </Td>
                                </Tr>
                            ))}
                            </Tbody>
                            <Tfoot>
                            <Tr>
                                <Th textAlign="center">Material</Th>
                                <Th textAlign="center">Obs</Th>
                                <Th textAlign="center">Quantidade</Th>
                                <Th textAlign="center">SU</Th>
                                <Th textAlign="center">Dependência</Th>
                                <Th textAlign="center">Cautelou</Th>
                                <Th textAlign="center">Data Cautela</Th>
                                <Th textAlign="center">Situação</Th>
                                <Th textAlign="center">Validado?</Th>
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
  