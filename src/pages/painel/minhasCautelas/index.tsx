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
    Text,
    Center
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
    height: 430,
    animations: {
      enabled: true,
      easing: "easein"
   },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['#ffffff22']
  },
  tooltip: {
    enabled: false,
    shared: false
  },
  xaxis: {
    categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
  },
}

const series = [{
  name: "Abertas",
  data: [44, 55, 41, 64, 22, 43, 21]
}, {
  name: "Fechadas",
  data: [53, 32, 33, 52, 13, 44, 32]
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

            <Flex direction="column" flex="1" gap={4}>
                
                <SimpleGrid
                flex="1"
                gap="4"
                minChildWidth="320px"
                alignItems="flex-start"
                >
                  
                <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                  <Flex flexDirection='row' gap={4} justifyContent='space-between'>
                    <Flex bgGradient='linear(to-tr, gray.990, gray.990, green.900)' boxShadow="buttonShadow" rounded='lg' w="100%" flexDirection="column">
                  *TORNAR DINÂMICO ESSA PARTE TRAZENDO AS CAUTELAS DO MILITAR POR MÊS DO ANO, FECHADAS E ABERTAS 
                      <Flex bg='gray.990' boxShadow='buttonShadow' m={4}>
                        <Heading size="md" p={2}> Cautelas</Heading>
                      </Flex>
                        
                      <Box m='auto' w='100%' h='100%' px={2}>
                        <Chart options={options} series={series} type="bar" width='100%' height="auto"/>
                      </Box>
                    </Flex>
                    <Flex bgGradient='linear(to-tr, gray.990, gray.990, green.900)'
                          boxShadow='buttonShadow' rounded='lg' transition='ease-in-out' w="100%" flexDirection="column">
                          *TORNAR DINÂMICO ESSA PARTE TRAZENDO O ARMAMENTO VINCULADO AO MILITAR, DE QUAL CIA E SUAS ULTIMAS 3 CAUTELAS 
                      <Flex bg='gray.990' boxShadow='buttonShadow' m={4}>
                        <Heading size="md" p={2}> Armamento</Heading>
                      </Flex>
                      <Flex flexDirection="row" p={2} borderBottom='1px' borderBottomStyle='solid' borderColor='green.800' style={{ borderImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #00FF00, rgba(0, 0, 0, 0)) 1 100%;'}} m={2} >
                        <Center>

                          {/* TORNAR DINÂMICO ESSA PARTE TRAZENDO O ARMAMENTO VINCULADO AO MILITAR, DE QUAL CIA E SUAS ULTIMAS 3 CAUTELAS */}
                          <Heading size="md" p={2}> FUZIL IA2</Heading>
                          <Badge variant='outline' colorScheme='yellow' fontSize='sm'>
                          BR02934
                          </Badge>
                        </Center>
                        <Circle
                          boxShadow="buttonShadow"
                          size={20}
                          bg="green.700"
                          ml='auto'
                          mr={2}
                        >
                          <Center>
                              <Circle
                              boxShadow="buttonShadow"
                              size={12}
                              bg="gray.800"
                              ml='auto'
                            >
                              1 CIA
                            </Circle>

                          </Center>
                        </Circle>
                      </Flex>
                      <Flex bg='gray.990' boxShadow='buttonShadow' m={4}>
                        <Heading size="md" p={2}> Últimas cautelas</Heading>
                      </Flex>
                      <Flex mx='auto'>
                      <TableContainer>
                          <Table size='sm' colorScheme="whiteAlpha" w='fit-content'>
                            <Thead>
                              <Tr>
                                <Th textAlign="center">Data</Th>
                                <Th textAlign="center">Armamento</Th>
                                <Th textAlign="center">Observação</Th>
                                <Th textAlign="center">Fechamento</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td textAlign="center">25/24/2575</Td>
                                <Td textAlign="center">centimetres (cm)</Td>
                                <Td textAlign="center">centimetres (cm)</Td>
                                <Td textAlign="center">25/24/2575</Td>
                                
                              </Tr>
                              <Tr>
                                <Td textAlign="center">25/24/2575</Td>
                                <Td textAlign="center">centimetres (cm)</Td>
                                <Td textAlign="center">centimetres (cm)</Td>
                                <Td textAlign="center">25/24/2575</Td>
                                
                              </Tr>
                              <Tr>
                                <Td textAlign="center">25/24/2575</Td>
                                <Td textAlign="center">centimetres (cm)</Td>
                                <Td textAlign="center">centimetres (cm)</Td>
                                <Td textAlign="center">25/24/2575</Td>
                                
                              </Tr>
                            </Tbody>
                            <Tfoot>
                              <Tr>
                              <Th textAlign="center">Data</Th>
                                <Th textAlign="center">Armamento</Th>
                                <Th textAlign="center">Observação</Th>
                                <Th textAlign="center">Fechamento</Th>
                              </Tr>
                            </Tfoot>
                          </Table>
                        </TableContainer>
                      </Flex>
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

        </>
    );
  }
  