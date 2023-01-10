import {
  Badge,
  Box,
  Circle,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
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
  Checkbox,
  useBreakpointValue,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tag,
  TagLabel
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { convertDate } from "../../../utils/scripts";
import { BsBoxArrowUp, BsSearch } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { SlRefresh } from "react-icons/sl";
import { Armamento, CautelaArmamento, CautelaArmamentoArray } from "../../../@types/types";
import { ModalValidate } from "../../../components/Modal/Armamento/ModalValidate";
import { ModalEncerrarCautela } from "../../../components/Modal/Armamento/ModalEncerrarCautela";
import Head from "next/head";
import { useSession } from "next-auth/react";

export default function BuscaArmamento() {
  const { data: session } = useSession()

  const [result, setResult] = useState([]);
  const [nomeArmamentos, setNomeArmamentos] = useState([]);
  const [cautelaFechada, setCautelaFechada] = useState(Boolean);
  const [search, setSearch] = useState(result);
  let [militar, setMilitar] = useState("");
  let [armamento, setArmamento] = useState("");

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasCautelasArmamento"],
    async () => {
      const result = await api.get("/armamento/cautela");
      var data = [] // CONJUNTO DE INSTRUCAO FILTRA OS NOME DE TODOS ARMAMENTOS NO BANCO E TIRA OS REPETIDOS
      result.data.map((el: CautelaArmamento) => { return data.push( el.local === session.militar.local ? el.armamento.nome : null) })
      const filtered = Array.from(new Set(data)).filter(function (res) {
        return res != null;
      });
      console.log(filtered)
      setNomeArmamentos(filtered)
      setResult(result.data as CautelaArmamentoArray);
      return result.data;
    }
  );
  useEffect(() => {
    if (militar == "" && armamento == "") {
      return setSearch(result.filter(res => cautelaFechada ? res : res.status === 'ativo'));
    } else {
      return setSearch(
        result.filter(res => armamento ? res.armamento.nome.toLowerCase().includes(armamento.toLowerCase()) : result).filter(
          (res) =>
            res.cautelou.nome_guerra
              .toLowerCase()
              .includes(militar.toLowerCase())
        ).filter(res => cautelaFechada ? res : res.status === 'ativo')
      );
    }
  }, [militar, armamento, result, cautelaFechada]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  if (error) return "An error has occurred: " + error;
  return (
    <>
    <Head>
        <title>SisAGI | Armamento - Buscar</title>
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
              <Flex direction="column">
                <Heading size='lg'>
                  Armamentos Cautelados
                </Heading>
              <Accordion bg='gray.800' border='1px' borderColor='gray.600' rounded='2xl' boxShadow='lg' my='5'>
                  {nomeArmamentos.map((arm, index) => (
                    <AccordionItem key={index} borderTop='0' borderBottom='0' >
                      <h2>
                        <AccordionButton bg='blue.700' _hover={{ bg: 'blue.800'}} rounded='2xl' border='1px' borderColor='blackAlpha.500'>
                          <Box as="span" flex="1" textAlign="left">
                            {arm}
                            <Tag ml='4' fontSize='md' fontWeight='black' color='black'>
                              {data.filter(arma => arma.armamento.nome === arm && arma.status === 'ativo').length}
                            </Tag>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {data
                        .filter((el: CautelaArmamento) => { return el.status === 'ativo'})
                        .filter((el: CautelaArmamento) => { return el.local === session.militar.local})
                        .filter((elem: CautelaArmamento) => { return elem.armamento.nome === arm })
                        .map((cautela: CautelaArmamento, index) => (
                          <Tag
                          boxShadow='md'
                            size='lg'
                            key={index}
                            borderRadius='full'
                            variant='solid'
                            colorScheme={cautela.status === 'ativo' ? 'green' : 'red'}
                            mr={4}
                          >
                            <TagLabel pr={2}>{cautela.armamento.nome} - {cautela.cautelou.nome_guerra} - Nr {cautela.armamento.nr_serie} { cautela.armamento.cabide ? ' - ' + cautela.armamento.cabide : ''}</TagLabel>
                            <BsBoxArrowUp />
                          </Tag>
                        ))}

                      </AccordionPanel>
                    </AccordionItem>
                  ))}

                </Accordion>
                <Heading fontSize="lg" mb="4">
                  <Flex alignItems="center">
                    <BsSearch size={20} />
                    <Flex px={4}>
                    Buscar cautela de armamento
                    </Flex>
                  </Flex>
                </Heading>
                <Flex direction="row" gap={4}>
                  <FormControl>
                    <FormLabel>Militar</FormLabel>
                    <Input
                      value={militar}
                      onChange={(e) => setMilitar(e.target.value)}
                      type="text"
                    />
                    <FormHelperText>Filtre a busca pelo nome</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Armamento</FormLabel>
                    <Input
                      value={armamento}
                      onChange={(e) => setArmamento(e.target.value)}
                      type="text"
                    />
                    <FormHelperText>
                      Filtre a busca pelo material
                    </FormHelperText>
                  </FormControl>
                </Flex>
              </Flex>
              <Heading size='lg' my="4">
                Cautelas {isLoading ? <Spinner ml={8} /> : ""}
               
                 <IconButton bg='blue.700' float='right' _hover={{ bgColor: 'blue.900'}} onClick={() => refetch()} aria-label="Atualizar tabela" icon={<SlRefresh />} />
              </Heading>
              <Flex bg='gray.990' p='2' rounded='2xl' boxShadow='lg'>
                <Text mr={4}>Filtros:</Text>
                  <Checkbox size='lg' colorScheme='blue' onChange={(e) => setCautelaFechada(e.target.checked)}>
                    Fechada?
                  </Checkbox>
                  </Flex>
              <TableContainer>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      {isWideVersion && (
                        <Th textAlign="center">Data de cautela</Th>
                      )}
                      <Th textAlign="center">Local</Th>
                      <Th textAlign="center">Armamento</Th>
                      <Th textAlign="center">Resp Cautela</Th>
                      <Th textAlign="center">Cautelou</Th>
                      <Th textAlign="center">Validado</Th>
                      <Th textAlign="center"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {search.map((res: CautelaArmamento) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">
                          {convertDate(res.data_cautela)}
                        </Td>
                        <Td textAlign="center">{res.local}</Td>
                        <Td textAlign="center">{res.armamento?.nome}</Td>
                        <Td textAlign="center">{res.resp_cautela}</Td>
                        <Td textAlign="center">{res.cautelou?.nome_guerra}</Td>
                        <Td justifyItems="center">
                          {res.validado ? (
                            <Circle mx="auto" size="40px" boxShadow='md' bg="gray.990">
                              <BiLock size={24} color="#00AA00" />
                            </Circle>
                          ) : (                           
                              <ModalValidate data={res} />
                          )}
                        </Td>
                        <Td justifyItems="center">
                          {res.status === 'ativo' ? (
                            <ModalEncerrarCautela data={res} />
                          ) : (                           
                            <Badge as='span' variant='outline' colorScheme='green'>Fechada</Badge>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      {isWideVersion && (
                        <Th textAlign="center">Data de cadastro</Th>
                      )}
                      <Th textAlign="center">Local</Th>
                      <Th textAlign="center">Armamento</Th>
                      <Th textAlign="center">Resp Cautela</Th>
                      <Th textAlign="center">Cautelou</Th>
                      <Th textAlign="center">Validado</Th>
                      <Th></Th>
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
