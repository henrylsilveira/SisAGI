import {
  Flex,
  Circle,
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
} from "@chakra-ui/react";
import { api } from "../../services/api";
import { useSession } from "next-auth/react";
import {
  CautelaArmamentoArray,
  VinculoArmamentoMilitarArray,
} from "../../@types/types";
import { useQuery } from "react-query";
import { convertISODateToInputValue, convertDate } from "../../utils/scripts";

export function ArmamentoComponentPainel() {
  const { data: session } = useSession();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["vinculoArmamentoMilitar"],
    async () => {
      const result = await api.get<VinculoArmamentoMilitarArray>(
        `/armamentos/viculados/${session.militar.id}`
      );
      return result;
    }
  );

  const { data: cautelaArmamento } = useQuery(
    ["cautelaArmamentoMilitar"],
    async () => {
      const result = await api.get<CautelaArmamentoArray>(
        `/armamento/cautela/${session.militar.id}`
      );
      return result;
    }
  );

  return (
    <Flex
      bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
      boxShadow="buttonShadow"
      rounded="lg"
      transition="ease-in-out"
      w="100%"
      flexDirection="column"
    >
      <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
        <Heading size="md" p={2}>
          {" "}
          Armamento
        </Heading>
      </Flex>

      {data?.data?.map((vinculo, index) => (
        <Flex
          flexDirection="row"
          p={2}
          borderBottom="1px"
          borderBottomStyle="solid"
          borderColor="green.800"
          style={{
            borderImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0), #00FF00, rgba(0, 0, 0, 0)) 1 100%;",
          }}
          m={2}
          key={vinculo.id + index}
        >
          <Center>
            <Heading size="md" p={2}>
              {vinculo?.armamento?.nome}
            </Heading>
            <Badge variant="outline" colorScheme="yellow" fontSize="sm">
              {vinculo?.armamento?.nr_serie}
            </Badge>
          </Center>

          <Circle
            boxShadow="buttonShadow"
            size={20}
            bg="green.700"
            ml="auto"
            mr={2}
          >
            <Center>
              <Circle
                boxShadow="buttonShadow"
                size={12}
                bg="gray.800"
                ml="auto"
              >
                {vinculo?.armamento?.companhia}
              </Circle>
            </Center>
          </Circle>
        </Flex>
      ))}

      <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
        <Heading size="md" p={2}>
          Últimas cautelas
        </Heading>
      </Flex>
      <Flex mx="auto">
        <TableContainer>
          <Table size="sm" colorScheme="whiteAlpha" w="fit-content">
            <Thead>
              <Tr>
                <Th textAlign="center">Data</Th>
                <Th textAlign="center">Armamento</Th>
                <Th textAlign="center">Observação</Th>
                <Th textAlign="center">Fechamento</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cautelaArmamento?.data.slice(0).map((arm, index) => (
                <Tr key={`${arm.id + index}`}>
                  <Td textAlign="center">{convertDate(arm.data_cautela)}</Td>
                  <Td textAlign="center">{arm.armamento.nome}</Td>
                  <Td textAlign="center">{arm.observacao}</Td>
                  <Td textAlign="center">
                    {arm.data_fechamento_cautela ? (
                      convertDate(arm.data_fechamento_cautela)
                    ) : (
                      <Badge variant="outline" colorScheme="orange">
                        aberta
                      </Badge>
                    )}
                  </Td>
                </Tr>
              ))}
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
  );
}
