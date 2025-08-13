import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Button,
  useToast,
  Text,
  Stack,
  Switch,
  Grid,
  Avatar,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import Head from "next/head";
import { api } from "../../../services/api";
import { CgLayoutList } from "react-icons/cg";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { ControleGuardaRegistros, Militar } from "../../../@types/types";
import { PesquisarMilitarCivil } from "../../../components/Drawer/CmtGda";
import { useQuery } from "react-query";
import { SetStateAction, useState } from "react";
import CatracaViewTable from "../../../components/ViewData/CatracaViewDataTable/CatracaViewDataTable";
import { NotLoaded } from "../../../components/NotLoaded";
import LeitorDeQRCode from "../../../components/LeitorQrCode/LeitorQrcode";
import { returnAvatarImage } from "../../../utils/scripts";
import { useSession } from "../../../services/context/auth";

export default function CatracaGuarda() {
  const [militar, setMilitar] = useState<Militar>();
  const [toggle, setToggle] = useState(false);
  const toast = useToast();
  const { user: session } = useSession();

  const { data, isLoading, refetch } = useQuery(
    ["todosRegistros"],
    async () => {
      const result = await api.get<ControleGuardaRegistros[]>(
        "/controGuarda/registros/ativo"
      );
      return result;
    }
  );

  // const handleSubmitForm = async (id: string, tipo: string) => {
  //   try {
  //     const result = await api.put(`/controleGuarda/update/${id}/${tipo}`);
  //     if (result.status == 201) {
  //       toast({
  //         title: "Controle da Guarda",
  //         description: `O dado de ${tipo} foi cadastrado no sistema.`,
  //         status: "success",
  //         duration: 2000,
  //         isClosable: true,
  //       });
  //       refetch();
  //     } else {
  //       toast({
  //         title: "Controle da Guarda",
  //         description: "Não foi possível cadastrar no sitema",
  //         status: "error",
  //         duration: 2000,
  //         isClosable: true,
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Controle da Guarda",
  //       description: "Verifique os dados do civil.",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <>
      <Head>
        <title>SisAGI | Controle Guarda</title>
      </Head>
      <Flex direction="column" flex="1" gap={4}  position={toggle ? "fixed" : "unset"} w={toggle && "full"} h={toggle && "full"} top={0} left={0} right={0} bottom={0}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
          
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4"  w={toggle && "full"} h={toggle && "full"} >
            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="innerShadow"
              rounded="lg"
              p={4}
              flexDirection="column"
               w={toggle && "full"} h={toggle && "full"}
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading size="md" p={2}>
                  Controle de Entradas / Saídas
                </Heading>
                <Flex>
                    <PesquisarMilitarCivil refresh={refetch} />
                <Button
                  onClick={() => setToggle(!toggle)}
                  boxShadow={toggle ? "innerShadow" : "buttonShadow"}
                  colorScheme="blue"
                  mr={2}
                  size="sm"
                  rightIcon={toggle ? <AiOutlineFullscreenExit  /> : <AiOutlineFullscreen  />}
                >
                  {toggle ? "Sair" : "Tela Cheia"}
                </Button>
                </Flex>
                
              </Flex>
              <Grid templateColumns="repeat(2, 1fr)"  w={toggle && "full"} h={toggle && "full"} maxH={"100vh"}>
                <Flex
                  flexDirection={"column"}
                  bg="gray.990"
                  boxShadow="buttonShadow"
                  zIndex={1}
                  justifyContent="space-between"
                  alignItems="center"
                  rounded={"lg"}
                >
                  <Heading
                    size="lg"
                    p={2}
                    borderBottom={"1px solid gray"}
                    w={"full"}
                    textAlign={"center"}
                  >
                    Militar
                  </Heading>
                  <Flex
                    align={"center"}
                    alignItems={"center"}
                    h={"full"}
                    position={"relative"}
                    w={"full"}
                  >
                    <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} m={4} w={"full"} h={"100%"} minH={"60vh"}>
                      {militar ? (
                        <Flex flexDirection={["column","row"]} gap={4}>
                          <Avatar
                            w={"200px"}
                            h={"200px"}
                            rounded={"xl"}
                            name={militar?.nome_guerra && militar?.nome_guerra}
                            src={
                              militar?.nome_guerra &&
                              returnAvatarImage(militar?.avatar_url)
                            }
                          />
                          <VStack alignItems={"flex-start"}>
                            <Text
                              fontSize={"64px"}
                              fontWeight="medium"
                              color={"green.500"}
                            >
                              {militar?.post_grad + " " + militar?.nome_guerra}
                            </Text>
                            <Text fontSize={"32px"} fontWeight="medium">
                              {militar?.nome_completo}
                            </Text>
                            <Text fontSize={"32px"} fontWeight="medium">
                              {militar?.companhia + " - " + militar?.pelotao}
                            </Text>
                            <Text fontSize={"32px"} fontWeight="medium">
                              {militar?.local_cumpre_expediente}
                            </Text>
                          </VStack>
                        </Flex>
                      ) : (
                        <Flex
                          w={"full"}
                          minH={"300px"}
                          
                          flexDirection={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <NotLoaded />

                          <Text ml="4" size={"md"} fontWeight="medium">
                            Aguardando...
                          </Text>
                        </Flex>
                      )}
                      <Box
                        position={"absolute"}
                        bottom={"1"}
                        w={"full"}
                        left={"0"}
                      >
                        <LeitorDeQRCode
                          setMilitar={setMilitar}
                          session={session}
                          refetch={refetch}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
                <CatracaViewTable
                  data={data?.data}
                />
              </Grid>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
