
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


import Head from "next/head";
import { FuncaoMilitar, Militar, MissaoArray } from "../../../@types/types";
import { DadosMilitares } from "../../../components/SuperAdmin/Forms/DadosMilitares";
import { DadosPessoais } from "../../../components/SuperAdmin/Forms/DadosPessoais";
import { Endereco } from "../../../components/SuperAdmin/Forms/Endereco";
import { returnAvatarImage } from "../../../utils/scripts";
import { MissoesPainel } from "../../../components/Painel/Missoes";
import { NotLoaded } from "../../../components/NotLoaded";
import { useState } from "react";
import { useSession } from "../../../services/context/auth";

// const Chart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

export default function Perfil() {
  const { user: session, status } = useSession();
  const [missoes, setMissoes] = useState<MissaoArray>();
  const [sessionId, setSessionId] = useState("");
  const {
    isLoading,
    error,
    data: militar,
    isFetching,
    refetch,
  } = useQuery(["dadosMilitar"], async () => {
    const res = await api.get<Militar>(`/militar/${session?.id}`);
    return res.data;
  });

  useQuery(["todasMissoesMilitar"], async () => {
    const res = await api.get<MissaoArray>(`/missao/${session?.id}`);
    setMissoes(res.data);
    setSessionId(session.id)
  });

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
                gridTemplateColumns={["1fr"]}
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex justifyContent="space-evenly" p={4}>
                  <Avatar
                    size="2xl"
                    name={session?.nome_completo}
                    bg="green.700"
                    m={4}
                    src={returnAvatarImage(session?.avatar_url)}
                  >
                    <AvatarBadge
                      borderColor="gray.990"
                      boxSize="1.1em"
                      bg="green.500"
                    />
                  </Avatar>
                  <VStack alignItems="start">
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Nome Completo:{session?.nome_completo}
                    </Text>
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Nome de Guerra:{session?.nome_guerra}
                    </Text>
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Email:{session?.email}
                    </Text>
                    <Text borderBottom="1px" borderBottomColor="gray.800">
                      Contato:{session?.telefone}
                    </Text>
                  </VStack>
                </Flex>
                {/* <MissoesPainel
                  missoes={missoes}
                  sessionId={sessionId}
                /> */}
              </Grid>
            </Flex>

            <Grid gridTemplateColumns="1fr 1fr" gap={4}>
              <DadosPessoais militar={{ ...session, ...militar }} />
              <DadosMilitares militar={{ ...session, ...militar }} />
            </Grid>
            <Flex>
              <Endereco militar={{ ...session, ...militar }} />
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
