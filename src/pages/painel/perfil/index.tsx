/* eslint-disable react/no-unescaped-entities */
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Circle,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
  useToast,
  Text,
  Center,
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Input } from "../../../components/Form/Input";

import { SlRefresh } from "react-icons/sl";
import { TiInfoLarge } from "react-icons/ti";
import { useSession } from "next-auth/react";
import Head from "next/head";
import {
  Cautela,
  CautelaArray,
  MaterialArray,
  Militar,
} from "../../../@types/types";
import { convertDate } from "../../../utils/scripts";
import { BiLock } from "react-icons/bi";
import { ModalValidate } from "../../../components/Modal/Material/ModalValidate";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
};

const series = [
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
];

export default function Cadastro() {
  const { data: session } = useSession();
  const toast = useToast();

  const [cautelaFechada, setCautelaFechada] = useState(Boolean);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState(result);

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todasCautelas"],
    async () => {
      const result = await api.get("/cautela");
      setResult(result.data as CautelaArray);
      return result;
    }
  );

  useEffect(() => {
    return setSearch(
      result.filter((res) => (cautelaFechada ? res : res.status === "ativo"))
    );
  }, [result, cautelaFechada]);

  return (
    <>
      <Head>
        <title>SisAGI | Minhas Cautelas</title>
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
              <Flex
                    bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                    boxShadow="buttonShadow"
                    rounded="lg"
                    w="100%"
                    flexDirection="column"
                    mb={4}
                  >
                    <Flex bg="gray.990" boxShadow="buttonShadow" m={4} >
                      <Heading size="md" p={2}>
                        Perfil
                      </Heading>
                    </Flex>
                    <Box m="auto" w="100%" h="100%" px={2}>
                      
                    </Box>
                  </Flex>
                <Flex
                  flexDirection="row"
                  gap={4}
                  justifyContent="space-between"
                >
                  <Flex
                    bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                    boxShadow="buttonShadow"
                    rounded="lg"
                    w="100%"
                    flexDirection="column"
                  >
                    <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
                      <Heading size="md" p={2}>
                        Dados Pessoais
                      </Heading>
                    </Flex>
                    <Box m="auto" w="100%" h="100%" px={2}>
                      
                    </Box>
                  </Flex>
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
                        Dados Militares
                      </Heading>
                    </Flex>
                    
                    
                    
                  </Flex>
                </Flex>
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
