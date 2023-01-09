import {
  Box,
  Flex,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  theme,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { api } from "../services/api";
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { useContext, useEffect } from "react";
import Router from "next/router";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { convertDate } from "../utils/scripts";
import { AxiosResponse } from "axios";
import { useUsers } from "../services/hooks/useUsers";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
//Dynamic permite carregar o componente somente quando for necessario, exemplo quando for clicar em um botao
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '40%'
    },
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: 'Quantidade'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
};

const series = [{
    name: 'Cautelado',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Em estoque',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }];

export default function Dashboard() {
  const { data: session } = useSession()
  const toast = useToast()
    useEffect(() => {
        if(session) {
            toast({
              title: 'Autenticação válida.',
              description: `Seu token de acesso é válido até dia ${convertDate(session.expires)}. `,
              status: 'info',
              duration: 2000,
              isClosable: true,
            })
          }else {
            Router.push('/')
            toast({
              title: 'Autenticação inválida.',
              description: `Seu token de acesso venceu, realize o login novamente. `,
              status: 'warning',
              duration: 3000,
              isClosable: true,
            })
            return
          }
    }, [session, toast])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  
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
              <Text fontSize="lg" mb="4">
                Material Cautelado
              </Text>
              <Chart options={options} series={series} type="bar" height="280" width='100%' />
            </Box>
          </SimpleGrid>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Cautelas abertas
              </Text>
              <TableContainer>
                <Table size="sm" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      Coluna 1
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width={8}></Th>
                  </Tr>
                </Thead>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
 
//   return {
//     props: {
      
//     }
//   }
// };