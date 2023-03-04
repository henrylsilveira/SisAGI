import {
    Flex,
    Circle,
    Text,
    Heading,
    Center,
    Badge,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Grid,
    HStack,
    VStack,
    Box,
    IconButton,
    Input,
    SimpleGrid,
    Spinner,
  } from "@chakra-ui/react";
  import { useSession } from "next-auth/react";
  import { useQuery } from "react-query";
  import { api } from "../../services/api";
  import { SessionArray } from "../../@types/types";
  import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import sessoes from "../../pages/superAdmin/sessoes";
import { formatarDataHora } from "../../utils/scripts";
  
  export function SessaoComponentPainel() {
    const { data: session } = useSession();
  
    const { isLoading, data, refetch } = useQuery(
        ["militarSession"],
        async () => {
          const result = await api.get<SessionArray>(`/sessions/${session.militar.id}`);
          return result.data
        }
      );
    
    return (
            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="buttonShadow"
              flexDirection="column"
              rounded="lg"
              mx={4}
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
                  SESSÕES ANTERIORES {isLoading ? <Spinner ml={8} /> : ""}
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
              <TableContainer px={4} mb={4}>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Data de Acesso</Th>
                      <Th textAlign="center">Validade da sessao</Th>
                      <Th textAlign="center">Ip Local</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.slice(0,5).map((res) => (
                      <Tr key={res.id}>
                        <Td textAlign="center">{formatarDataHora(res.access)}</Td>
                        <Td textAlign="center">{formatarDataHora(res.expires)}</Td>
                        <Td textAlign="center">{res.ipAccess}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th textAlign="center">Data de Acesso</Th>
                      <Th textAlign="center">Validade da sessao</Th>
                      <Th textAlign="center">Ip Local</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Flex>
    );
  }
  