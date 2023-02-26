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
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect } from "react";
import Router from "next/router";
import { convertDate } from "../utils/scripts";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ComumComponentDashboard } from "../components/Dashboard/Comum";

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
  const { data: session, status } = useSession()
  const toast = useToast()

  useEffect(() => {
      if(session && status === 'authenticated') {
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
  }, [session, toast, status])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <>
    <Head>
        <title>SisAGI | Painel Principal</title>
    </Head>
    <Flex direction="column" flex="1" gap={4} bg="gray.800" borderRadius={8} p={4}>
        <ComumComponentDashboard />
    </Flex>
    </>
  );
}