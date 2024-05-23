import { Flex, Grid, Heading, Tab, Text, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import Router from "next/router";
import { formatarDataHora } from "../utils/scripts";
import Head from "next/head";
import { ComumComponentDashboard } from "../components/Dashboard/Comum";
import { useSession } from "../services/context/auth";
import { ArmamentoComponentPainel } from "../components/Painel/Armamento";
import { CautelasComponentPainel } from "../components/Painel/Cautelas";
import { SessaoComponentPainel } from "../components/Painel/Sessao";
import { NotLoaded } from "../components/NotLoaded";

export default function Dashboard() {
  // const { data: session, status } = useSession();
  const { user: session, status } = useSession();
  const toast = useToast();
  const idLogado = "toastNaoLogado";
  const id = "toastLogin";
  useEffect(() => {
    if (session) {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: "Autenticação válida.",
          description: `Seu token de acesso tem validade de 24horas . `,
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      Router.push("/");
      if (!toast.isActive(idLogado)) {
        toast({
          id: idLogado,
          title: "Autenticação inválida.",
          description: `Seu token de acesso venceu, realize o login novamente. `,
          status: "warning",
          duration: 1000,
          isClosable: true,
        });
      }
    }
  }, [session, toast]);

  return (
    <>
      <Head>
        <title>SisAGI | Painel Principal</title>
      </Head>
      <Flex
        bg="gray.800"
        borderRadius={8}
        w="100%"
        p={4}
      >
        <Tabs isFitted variant='enclosed' w="100%" mt={6}>
          <TabList>
            <Tab bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                 color="white" border={0}>AVISOS</Tab>
            <Tab bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                 color="white" border={0}>PAINEL</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                boxShadow="buttonShadow"
                rounded="lg"
                transition="ease-in-out"
                w="100%"
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
                    AVISOS
                  </Heading>
                </Flex>
                <Flex flexDirection="column">
                    <Heading size="xl" mx="auto" p={2}>
                    SisAGI
                    </Heading>
                    <Text m={6}>
                    Gostaríamos de informá-lo que nosso sistema está atualmente em fase de construção e aprimoramento. Durante este período, você pode encontrar algumas falhas ou instabilidades.
                    </Text>
                
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              {session ? <ComumComponentDashboard />
              : <NotLoaded />}
              
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Flex>
    </>
  );
}
