/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
  Text,
  Grid,
  Avatar,
  AvatarBadge,
  VStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";

import { useSession } from "next-auth/react";
import Head from "next/head";
import { FuncaoMilitar, Militar } from "../../../@types/types";
import { DadosMilitares } from "../../../components/SuperAdmin/Forms/DadosMilitares";
import { DadosPessoais } from "../../../components/SuperAdmin/Forms/DadosPessoais";
import { Endereco } from "../../../components/SuperAdmin/Forms/Endereco";
import { returnAvatarImage } from "../../../utils/scripts";

// const Chart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

export default function Perfil() {
  const { data: session } = useSession();
  const toast = useToast();

  const { isLoading, error, data: militar, isFetching, refetch } = useQuery(
    ["dadosMilitar"],
    async () => {
      const res = await api.get<Militar>(`/militar/${session?.militar.id}`);
      return res.data;
    }
  );
 

  // const series = [{ data: () => new Array(Object.values(data?._count))}];

  // const options: ApexOptions = {
  //   chart: {
  //     type: 'bar',
  //     height: 380
  //   },
  //   plotOptions: {
  //     bar: {
  //       barHeight: '100%',
  //       distributed: true,
  //       horizontal: true,
  //       dataLabels: {
  //         position: 'bottom'
  //       },
  //     }
  //   },
  //   colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
  //     '#f48024', '#69d2e7'
  //   ],
  //   dataLabels: {
  //     enabled: true,
  //     textAnchor: 'start',
  //     style: {
  //       colors: ['#fff']
  //     },
  //     formatter: function (val, opt) {
  //       return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
  //     },
  //     offsetX: 0,
  //     dropShadow: {
  //       enabled: true
  //     }
  //   },
  //   subtitle: {
  //     text: 'Dados onde seu nome está relacionado',
  //     align: 'center',
  // },
  //   stroke: {
  //     width: 1,
  //     colors: ['#ffffff11']
  //   },
  //   xaxis: {
  //     categories: ["Cautelas","Logins","Armamentos","Vinculos","Munição","Combustível","Funções"],
  //     labels: {
  //       show: false
  //     }
  //   },
  //   yaxis: {
  //     labels: {
  //       show: false
  //     }
  //   },
  //   tooltip: {
  //     theme: 'dark',
  //     x: {
  //       show: false
  //     },
  //     y: {
  //       title: {
  //         formatter: function () {
  //           return ''
  //         }
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <Head>
        <title>SisAGI | Meu Perfil</title>
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
              rounded="lg"
              transition="ease-in-out"
              w="100%"
              flexDirection="column"
              my={4}
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading size="md" p={2}>
                  PERFIL
                </Heading>
              </Flex>
              <Grid
                gridTemplateColumns="1fr 2fr 2fr"
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar
                  size="2xl"
                  name={session?.militar.nome_completo}
                  bg="green.700"
                  m={4}
                  src={returnAvatarImage(session?.militar.avatar_url)}
                >
                  <AvatarBadge
                    borderColor="gray.990"
                    boxSize="1.1em"
                    bg="green.500"
                  />
                </Avatar>

                <Flex>
                  <VStack alignItems="start">
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Nome Completo:{" "}
                    </Text>
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Nome de Guerra:{" "}
                    </Text>
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Email:{" "}
                    </Text>
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Telefone:{" "}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems="end"
                    borderRight="1px"
                    borderRightColor="gray.800"
                    px={2}
                  >
                    <Text color="gray.400" rounded="lg" px={1}>
                      {session?.militar.nome_completo}
                    </Text>
                    <Text color="gray.400" rounded="lg" px={1}>
                      {session?.militar.nome_guerra}
                    </Text>
                    <Text color="gray.400" rounded="lg" px={1}>
                      {session?.militar.email}
                    </Text>
                    <Text color="gray.400" rounded="lg" px={1}>
                      {session?.militar.telefone}
                    </Text>
                  </VStack>
                </Flex>
                <Flex bg="gray.990" boxShadow="buttonShadow"></Flex>
                <Grid gridTemplateColumns="1fr 1fr" m={2}>
                  {militar?.Funcao.map((func: FuncaoMilitar, index: number) => (
                    <Tag
                      justifyContent="space-between"
                      borderRadius="base"
                      variant="outline"
                      colorScheme="whatsapp"
                      boxShadow="buttonShadow"
                      key={index}
                    >
                      <TagLabel>{func.funcao.toUpperCase()}</TagLabel>
                    </Tag>
                  ))}
                </Grid>
              </Grid>
            </Flex>

            <Grid gridTemplateColumns="1fr 1fr" gap={4}>
              <DadosPessoais militar={{ ...session.militar,...militar }} />
              <DadosMilitares militar={{ ...session.militar,...militar }} />
            </Grid>
            <Flex>
              <Endereco militar={{ ...session.militar,...militar }} />
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
