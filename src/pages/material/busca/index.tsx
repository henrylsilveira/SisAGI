import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { FormEvent, useEffect, useState } from "react";
import { convertDate } from "../../../utils/scripts";

export default function Busca() {
  const [result, setResult] = useState({})
  const [militar, setMilitar] = useState('')
  const [material, setMaterial] = useState('')
  const { isLoading, error, data, isFetching } = useQuery(['todasCautelas'], async () => {
      const result = await api.get("/cautela")
      setResult(result)
      return result
    }
  );
  console.log(militar)
  console.log(material)

  function handleFilter(event: FormEvent){
    
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  

  if (error) return "An error has occurred: " + error;
  return (
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
              <Flex direction='column'>
                <Heading fontSize="2xl" mb="4">
                  Buscar
                </Heading>
                <Flex direction='row' gap={4}>
                  <FormControl>
                    <FormLabel>Militar</FormLabel>
                    <Input onChange={(e) => setMilitar(e.target.value)} type='text' />
                    <FormHelperText>Filtre a busca pelo nome</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Material</FormLabel>
                    <Input onChange={(e) => setMaterial(e.target.value)} type='text' />
                    <FormHelperText>Filtre a busca pelo material</FormHelperText>
                  </FormControl>
                </Flex>
              </Flex>
              <Heading fontSize="2xl" my="4">
                Cautelas {isLoading ? <Spinner ml={8} /> : ''}
              </Heading>
              <TableContainer>
                <Table size="sm" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      {isWideVersion && <Th textAlign='center'>Data de cadastro</Th>}
                      <Th textAlign='center'>Local</Th>
                      <Th textAlign='center'>Material</Th>
                      <Th textAlign='center'>Resp Cautela</Th>
                      <Th textAlign='center'>Cautelou</Th>
                      <Th textAlign='center'>Validado</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { data?.data.map((res) => 
                      (<Tr key={res.id} >
                        <Td textAlign='center'>{convertDate(res.data_cautela)}</Td>
                        <Td textAlign='center'>{res.local}</Td>
                        <Td textAlign='center'>{res.material?.nome}</Td>
                        <Td textAlign='center'>{res.resp_cautela}</Td>
                        <Td textAlign='center'>{res.cautelou?.nome_guerra}</Td>
                        <Td textAlign='center'>{res.validado ? 'SIM' : 'NÃO'}</Td>
                    </Tr>)
                    )}
                    
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      {isWideVersion && <Th textAlign='center'>Data de cadastro</Th>}
                      <Th textAlign='center'>Local</Th>
                      <Th textAlign='center'>Material</Th>
                      <Th textAlign='center'>Resp Cautela</Th>
                      <Th textAlign='center'>Cautelou</Th>
                      <Th textAlign='center'>Validado</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
          </SimpleGrid>


        </Flex>
      </Flex>
    </Flex>
  );
}
