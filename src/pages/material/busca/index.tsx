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
  Checkbox,
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
import { Cautela, CautelaArray } from "../../../@types/types";
import { ModalEncerrarCautela } from "../../../components/Modal/Material/ModalEncerrarCautela";
import Head from "next/head";
import { Input } from "../../../components/Form/Input";
import { NotData } from "../../../components/NotData";
import { useSession } from "../../../services/context/auth";

export default function Busca() {
  const { user: session, status } = useSession();
  const [result, setResult] = useState([]);

  const [search, setSearch] = useState(result);
  const [cautelaFechada, setCautelaFechada] = useState(Boolean);
  let [militar, setMilitar] = useState("");
  let [material, setMaterial] = useState("");

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasCautelas"],
    async () => {
      const result = await api.get<CautelaArray>("/cautela");
      const filteredData = result.data.filter(
        (cautela) =>
          cautela.sub_unidade === session.companhia &&
          cautela.dependencia === session.pelotao
      );
      setResult(filteredData);
      return filteredData;
    }
  );

  useEffect(() => {
    if (militar == "" && material == "") {
      return setSearch(
        result.filter((res) => (cautelaFechada ? res : res.status === "ativo"))
      );
    } else {
      return setSearch(
        result
          .filter((res) =>
            material
              ? res.material.nome.toLowerCase().includes(material.toLowerCase())
              : result
          )
          .filter((res) =>
            res.cautelou.nome_guerra
              .toLowerCase()
              .includes(militar.toLowerCase())
          )
          .filter((res) => (cautelaFechada ? res : res.status === "ativo"))
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
              flexDirection="column"
              rounded="lg"
              p={4}
              w="100%"
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
                py={2}
              >
                <Heading fontSize="2xl" pl={2}>
                  BUSCAR CAUTELA
                </Heading>
              </Flex>
              <Flex direction="row" gap={4} mx={4}>
                <FormControl>
                  <Input
                    name="militar"
                    label="Militar"
                    value={militar}
                    onChange={(e) => setMilitar(e.target.value)}
                    type="text"
                  />
                  <FormHelperText>Filtre a busca pelo nome</FormHelperText>
                </FormControl>
                <FormControl>
                  <Input
                    name="material"
                    label="Material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    type="text"
                  />
                  <FormHelperText>Filtre a busca pelo material</FormHelperText>
                </FormControl>
              </Flex>
              
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
                py={2}
              >
                <Heading fontSize="2xl" pl={2}>
                  CAUTELAS {isLoading ? <Spinner ml={8} /> : ""}
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

              <Flex
                bg="gray.990"
                w="xl"
                mx="auto"
                p="2"
                rounded="md"
                boxShadow="buttonShadow"
                justifyContent="space-between"
              >
                <Text mr={4}>FILTRO</Text>
                <Checkbox
                  size="lg"
                  colorScheme="blue"
                  onChange={(e) => setCautelaFechada(e.target.checked)}
                  mr={4}
                >
                  Fechada?
                </Checkbox>
              </Flex>
              {!(search.length === 0) ? (
                <TableContainer my={4}>
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        {isWideVersion && (
                          <Th textAlign="center">Data de cadastro</Th>
                        )}
                        <Th textAlign="center">SU</Th>
                        <Th textAlign="center">Dependência</Th>
                        <Th textAlign="center">Quantidade</Th>
                        <Th textAlign="center">Material</Th>
                        <Th textAlign="center">Resp Cautela</Th>
                        <Th textAlign="center">Cautelou</Th>
                        <Th textAlign="center">Validado</Th>
                        <Th textAlign="center"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {search?.map((res: Cautela) => (
                        <Tr key={res.id}>
                          <Td textAlign="center">
                            {convertDate(res.data_cautela)}
                          </Td>
                          <Td textAlign="center">{res.sub_unidade}</Td>
                          <Td textAlign="center">{res.dependencia}</Td>
                          <Td textAlign="center">{res.quantidade}</Td>
                          <Td textAlign="center">{res.material?.nome}</Td>
                          <Td textAlign="center">{res.resp_cautela}</Td>
                          <Td textAlign="center">
                            {res.cautelou.post_grad +
                              " " +
                              res.cautelou?.nome_guerra}
                          </Td>
                          <Td justifyItems="center">
                            {res.validado ? (
                              <Circle
                                mx="auto"
                                size="40px"
                                boxShadow="buttonShadow"
                                bg="gray.990"
                              >
                                <BiLock size={24} color="#00AA00" />
                              </Circle>
                            ) : (
                              <ModalValidate data={res} refetch={refetch} />
                            )}
                          </Td>
                          <Td justifyItems="center">
                            {res.status === "ativo" ? (
                              <ModalEncerrarCautela data={res} refetch={refetch} />
                            ) : (
                              <Badge
                                as="span"
                                variant="outline"
                                colorScheme="green"
                              >
                                Fechada
                              </Badge>
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
                        <Th textAlign="center">SU</Th>
                        <Th textAlign="center">Dependência</Th>
                        <Th textAlign="center">Quantidade</Th>
                        <Th textAlign="center">Material</Th>
                        <Th textAlign="center">Resp Cautela</Th>
                        <Th textAlign="center">Cautelou</Th>
                        <Th textAlign="center">Validado</Th>
                        <Th textAlign="center"></Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              ) : (
                <NotData textoComponent="Não foram encontradas cautelas abertas." />
              )}
            </Flex>
            
            
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
