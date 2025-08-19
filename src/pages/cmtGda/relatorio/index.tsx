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
import { GiCheckMark } from "react-icons/gi";
import { GoSignIn, GoSignOut, GoX } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { TbMilitaryRank } from "react-icons/tb";
import PopoverDestino from "../../../components/CmtGda/PopoverDestino";
import { returnAvatarImage, convertDateAndTime } from "../../../utils/scripts";
import { Input } from "../../../components/Form/Input";

export default function ReportPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["todosRegistros"],
    async () => {
      const now = new Date();
      const newStart = new Date(start);
      const newEnd = new Date(end);
      if (start && end) {
        const result = await api.get<ControleGuardaRegistros[]>(
          `/controGuarda/registros/relatorio/${newStart.getTime()}/${newEnd.getTime()}`
        );
        return result;
      } else {
        const result = await api.get<ControleGuardaRegistros[]>(
          `/controGuarda/registros/relatorio/${now.toISOString()}/${
            now.getTime() + 86400000
          }`
        );
        return result;
      }
    }
  );
  return (
    <>
      <Head>
        <title>SisAGI | Controle Guarda</title>
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
                </Flex>
              </Flex>
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
              >
                {data?.data.filter((item) => item.status === "ativo").length !==
                0 ? (
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
                        {data?.data.map((registro) => (
                          <Tr key={registro.id}>
                            <Td textAlign="center">
                              {registro.militar.post_grad}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar.nome_guerra}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar.nome_completo}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar.companhia}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar.pelotao}
                            </Td>
                            <Td textAlign="center">
                              {registro.militar.local_cumpre_expediente
                                ? registro.militar.local_cumpre_expediente
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
