import { Flex, SimpleGrid, Heading, Spinner, IconButton, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Badge, Tfoot, Box } from "@chakra-ui/react";
import { Icon } from "leaflet";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { TiInfoLarge } from "react-icons/ti";
import { useQuery } from "react-query";
import { MaterialArray, Material, SessionArray } from "../../../@types/types";
import { ModalCautela } from "../../../components/Modal/Armamento/ModalCautela";
import { api } from "../../../services/api";
import Head from "next/head";
import { convertDate, convertISODateToInputValue, formatarDataHora } from "../../../utils/scripts";
import { Input } from "../../../components/Form/Input";


export default function Sessoes() {
    const [militarNome, setMilitarNome] = useState("");
    const [sessoes, setSessoes] = useState<SessionArray>()
  
    const { isLoading, refetch } = useQuery(
      ["todasSession"],
      async () => {
        const result = await api.get<SessionArray>("/sessions");
        setSessoes(result.data)
        return result.data
      }
    );
  
  
    return (
      <>
        <Head>
          <title>SisAGI | Administração - Sessões</title>
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
                boxShadow="innerShadow"
                flexDirection="column"
                rounded="lg"
                px={4}
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
                    SESSÕES {isLoading ? <Spinner ml={8} /> : ""}
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
                <Flex mx={4}>
                    <Input label="Filtrar por militar" name="nomeMilitar" type="text" px="8" mb={4} onChange={(e) => setMilitarNome(e.target.value)}/>
                </Flex>
                <TableContainer px={4} mb={4}>
                  <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Data de Acesso</Th>
                        <Th textAlign="center">Validade da sessao</Th>
                        <Th textAlign="center">Ip Local</Th>
                        <Th textAlign="center">Militar</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sessoes?.filter(s => militarNome !== "" ? s.militar.nome_guerra == militarNome : s).map((res) => (
                        <Tr key={res.id}>
                          <Td textAlign="center">{formatarDataHora(res.access)}</Td>
                          <Td textAlign="center">{formatarDataHora(res.expires)}</Td>
                          <Td textAlign="center">{res.ipAccess}</Td>
                          <Td textAlign="center">{res.militar.post_grad + " " + res.militar.nome_guerra}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th textAlign="center">Data de Acesso</Th>
                        <Th textAlign="center">Validade da sessao</Th>
                        <Th textAlign="center">Ip Local</Th>
                        <Th textAlign="center">Militar</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </>
    );
  }