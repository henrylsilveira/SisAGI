import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { api } from "../../../services/api";
import { ControleGuardaRegistros } from "../../../@types/types";
import { useQuery } from "react-query";
import ViewTable from "../../../components/ViewData/ViewTable";
import { NotData } from "../../../components/NotData";
import { GiCheckMark, GiMagnifyingGlass } from "react-icons/gi";
import { GoSignIn, GoSignOut, GoX } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { TbMilitaryRank } from "react-icons/tb";
import PopoverDestino from "../../../components/CmtGda/PopoverDestino";
import { returnAvatarImage, convertDateAndTime, convertDate, getFullRank } from "../../../utils/scripts";
import { Input } from "../../../components/Form/Input";
import GerarRelatorioRegistros from "../../../components/CmtGda/relatorio/Relatorio";
import { useSession } from "../../../services/context/auth";

export default function ReportPage() {
  const { user: session } = useSession();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [oficialDia, setOficialDia] = useState("");
  const [recordData, setRecordData] = useState<ControleGuardaRegistros[]>([]);
  // const { data, isLoading, refetch } = useQuery(
  //   ["todosRegistros"],
  //   async () => {
  //     const result = await api.get<ControleGuardaRegistros[]>(
  //       `/controGuarda/registros`
  //     );
  //   }
  // );
  async function handleGetFilterRercord() {
    const newStart = new Date(start);
    const newEnd = new Date(end);
    if (start && end) {
      const result = await api.get<ControleGuardaRegistros[]>(
        `/controGuarda/registros/relatorio/${newStart.getTime()}/${newEnd.getTime()}`
      );

      setRecordData(result.data);
      return result;
    }
    return;
  }

  

  return (
    <>
      <Head>
        <title>SisAGI | Relatório de Entradas / Saídas</title>
      </Head>
      <Flex
        direction="column"
        flex="1"
        gap={4}
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["2", "4"]} bg="gray.800" borderRadius={8}>
            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="innerShadow"
              rounded="lg"
              flexDirection="column"
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading size="md" p={2}>
                  Controle de Entradas / Saídas
                </Heading>
                <Flex gap={2} alignContent={"center"} mr={2}>
                  <Input
                    h={"30px"}
                    type="datetime-local"
                    name="start"
                    onChange={(e) => setStart(e.target.value)}
                  />
                  <Input
                    h={"30px"}
                    type="datetime-local"
                    name="end"
                    onChange={(e) => setEnd(e.target.value)}
                  />
                  <Button
                    onClick={handleGetFilterRercord}
                    h={"30px"}
                    colorScheme="green"
                    size="md"
                    px={8}
                    leftIcon={<GiMagnifyingGlass />}
                    shadow={"buttonShadow"}
                  >
                    Buscar
                  </Button>
                </Flex>
              </Flex>
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                py={2}
                justifyContent="space-between"
                alignItems="center"
                flexDirection={"column"}
              >
                <Flex w={"100%"} p={2}>
                  {recordData?.length !== 0 && (
                    <Flex
                      ml={"auto"}
                      mr={2}
                      borderBottom={"1px"}
                      borderColor={"green.900"}
                      p={2}
                      justifyContent={"space-between"}
                      w={"100%"}
                    >
                      <Input
                        w={"360px"}
                        h={"30px"}
                        type="text"
                        name="oficialDia"
                        placeholder="Posto/Graduação e nome"
                        label="Oficial de dia"
                        onChange={(e) => setOficialDia(e.target.value)}
                      />
                      <GerarRelatorioRegistros optionsRecord={{start, end, oficialDia, cmtGda: session.post_grad + " " + session.nome_completo}} data={recordData} />
                    </Flex>
                  )}
                </Flex>
                {recordData?.length !== 0 ? (
                  <TableContainer w={"100%"} overflowY="scroll" py={4}>
                    <Table size="sm" colorScheme="whiteAlpha">
                      <Thead>
                        <Tr>
                          <Th textAlign="center">Posto/Graduação</Th>
                          <Th textAlign="center">Nome de Guerra</Th>
                          <Th textAlign="center">Nome Completo</Th>
                          <Th textAlign="center">Cia</Th>
                          <Th textAlign="center">Pel</Th>
                          <Th textAlign="center">Local de Trabalho</Th>
                          <Th textAlign="center">Entrada</Th>
                          <Th textAlign="center">Saída</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {recordData?.map((registro) => (
                          <Tr key={registro.id}>
                            <Td textAlign="center">
                              {getFullRank(registro.militar?.post_grad)}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar?.nome_guerra}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar?.nome_completo}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar?.companhia}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar?.pelotao}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar?.local_cumpre_expediente
                                ? registro.militar?.local_cumpre_expediente
                                : "-"}
                            </Td>
                            <Td textAlign="center">
                              {registro.entrada
                                ? convertDateAndTime(registro.entrada)
                                : "-"}
                            </Td>
                            <Td textAlign="center">
                              {registro.saida
                                ? convertDateAndTime(registro.saida)
                                : "-"}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th textAlign="center">Posto/Graduação</Th>
                          <Th textAlign="center">Nome de Guerra</Th>
                          <Th textAlign="center">Nome Completo</Th>
                          <Th textAlign="center">Cia</Th>
                          <Th textAlign="center">Pel</Th>
                          <Th textAlign="center">Local de Trabalho</Th>
                          <Th textAlign="center">Entrada</Th>
                          <Th textAlign="center">Saída</Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                ) : (
                  <NotData textoComponent={"Não existem registros."} />
                )}
              </Flex>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
