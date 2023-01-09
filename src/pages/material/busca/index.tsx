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
  useBreakpointValue,
  Text,
  Checkbox
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { convertDate } from "../../../utils/scripts";
import { BsSearch } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { ModalValidate } from "../../../components/Modal/Material/ModalValidate";
import { SlRefresh } from "react-icons/sl";
import { Cautela } from "../../../@types/types";
import { ModalEncerrarCautela } from "../../../components/Modal/Material/ModalEncerrarCautela";
import Head from "next/head";

export default function Busca() {
  const [result, setResult] = useState([]);

  const [search, setSearch] = useState(result);
  const [cautelaFechada, setCautelaFechada] = useState(Boolean);
  let [militar, setMilitar] = useState("");
  let [material, setMaterial] = useState("");

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasCautelas"],
    async () => {
      const result = await api.get("/cautela");
      setResult(result.data as Cautela);
      return result.data;
    }
  );
  useEffect(() => {
    if (militar == "" && material == "") {
      return setSearch(result.filter(res => cautelaFechada ? res.status === 'inativo' : result));
    } else {
      return setSearch(
        result.filter(res => material ? res.material.nome.toLowerCase().includes(material.toLowerCase()) : result).filter(
          (res) =>
            res.cautelou.nome_guerra
              .toLowerCase()
              .includes(militar.toLowerCase())
        ).filter(res => cautelaFechada ? res.status === 'inativo' : result)
      );
    }
  }, [militar, material, result, cautelaFechada]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  if (error) return "An error has occurred: " + error;
  return (
    <>
    <Head>
        <title>SisAGI | Material - Busca</title>
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
                <Heading fontSize="2xl" mb="4">
                  <Flex alignItems="center">
                    <BsSearch size={25} />
                    <Flex px={4}>
                    Buscar cautela
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
                    <FormLabel>Material</FormLabel>
                    <Input
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      type="text"
                    />
                    <FormHelperText>
                      Filtre a busca pelo material
                    </FormHelperText>
                  </FormControl>
                </Flex>
              </Flex>
              <Heading fontSize="2xl" my="4">
                Cautelas {isLoading ? <Spinner ml={8} /> : ""} <IconButton bg='blue.700' float='right' _hover={{ bgColor: 'blue.900'}} onClick={() => refetch()} aria-label="Atualizar tabela" icon={<SlRefresh />} />
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
                        <Th textAlign="center">Data de cadastro</Th>
                      )}
                      <Th textAlign="center">Local</Th>
                      <Th textAlign="center">Material</Th>
                      <Th textAlign="center">Resp Cautela</Th>
                      <Th textAlign="center">Cautelou</Th>
                      <Th textAlign="center">Validado</Th>
                      <Th textAlign="center"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {search.map((res) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">
                          {convertDate(res.data_cautela)}
                        </Td>
                        <Td textAlign="center">{res.local}</Td>
                        <Td textAlign="center">{res.material?.nome}</Td>
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
                      <Th textAlign="center">Material</Th>
                      <Th textAlign="center">Resp Cautela</Th>
                      <Th textAlign="center">Cautelou</Th>
                      <Th textAlign="center">Validado</Th>
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
