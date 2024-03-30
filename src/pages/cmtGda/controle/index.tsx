/* eslint-disable react/no-unescaped-entities */
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Grid,
    Avatar,
    Button,
    useToast,
    Text,
    Stack,
    Switch
} from "@chakra-ui/react";

import Head from "next/head";
import { returnAvatarImage, convertDateAndTime } from '../../../utils/scripts';
import { api } from "../../../services/api";

import { ControleGuardaRegistros } from '../../../@types/types';
import { PesquisarMilitarCivil } from "../../../components/Drawer/CmtGda";
import { useQuery } from "react-query";
import { GoSignIn, GoSignOut, GoX } from "react-icons/go";
import { useState } from "react";
import { MdCheck } from "react-icons/md";

export default function ControleGuarda() {
    const [finalizados, setFinalizados] = useState(false)
    const toast = useToast()

    const { data, isLoading, refetch } = useQuery(["todosRegistros"], async () => {
        const result = await api.get<ControleGuardaRegistros[]>(
            "/controGuarda/registros"
        );
        return result;
    });

    const handleSubmitForm = async (id: string, tipo: string) => {
        try {
            const result = await api.put(`/controleGuarda/update/${id}/${tipo}`);
            if (result.status == 201) {
                toast({
                    title: "Controle Guarda",
                    description: `O dado de ${tipo} foi cadastrado no sistema.`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                refetch()
            } else {
                toast({
                    title: "Controle Guarda",
                    description: "Não foi possível cadastrar no sitema",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Controle Guarda",
                description: "Verifique os dados do civil.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Head>
                <title>SisAGI | Controle Guarda</title>
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
                            w="full"
                            p={4}
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
                                    Controle de Entradas / Saídas
                                </Heading>
                                <Flex bg="gray.990"
                                    boxShadow="buttonShadow"
                                     p={2} gap={2}>
                                    <Stack direction='row'>
                                        <Switch onChange={(e) => setFinalizados(e.target.checked)} colorScheme='green' size='md' />
                                    </Stack>
                                    <Text fontSize="sm">Finalizados</Text>
                                </Flex>
                                <PesquisarMilitarCivil refresh={refetch} />
                            </Flex>
                            <Heading size="md" p={2} borderBottom="2px" borderColor="green.900">
                                    Civis
                                </Heading>
                            <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}>
                                {data?.data.filter(registro => finalizados ? registro : registro.status === "ativo" ).filter(registro => registro.civilId ? registro : null ).map(registro => (
                                    <Flex
                                    position="relative"
                                        key={registro.id}
                                        bg="gray.990"
                                        boxShadow="buttonShadow"
                                        m={4}
                                        h="auto" alignItems="center" gap={2} p={2} justify="space-between"
                                    >
                                        {finalizados && registro.status === "finalizado" ? (
                                            <Flex zIndex={10} w={10} h={10} justifyContent="center" borderBottomLeftRadius="full" shadow="buttonShadow" align="center" bgGradient="linear(to-tr, green.900, green.600, green.400)" position="absolute" right={0} top={0}>
                                                <Flex position="absolute" right={2} top={2}>
                                                   <MdCheck /> 
                                                </Flex>
                                                
                                            </Flex>
                                        ) : null}
                                        <Avatar size='xl' name={registro.militar?.nome_guerra ? registro.militar?.nome_guerra : registro.civil?.nomeCompleto} src={registro.militar?.nome_guerra ? returnAvatarImage(registro.militar?.avatar_url) : returnAvatarImage(registro.civil?.foto)} />
                                        <Flex flexDirection="column" gap={2}>
                                            <Text>{registro.militar?.nome_guerra ? registro.militar?.post_grad + " " + registro.militar?.nome_guerra : registro.civil?.nomeCompleto}</Text>
                                            <Flex alignItems="center" gap={2} bg="green.900" borderRadius={20} px={2}>
                                                <GoSignIn color="white" />
                                                <Text fontSize="sm" >{registro.entrada ? convertDateAndTime(registro.entrada) : "-"}</Text>
                                            </Flex>
                                            <Flex alignItems="center" gap={2} bg="red.900" borderRadius={20} px={2}>
                                                <Flex alignItems="center" gap={2}>
                                                    <GoSignOut color="white" />
                                                    <Text fontSize="sm">{registro.saida ? convertDateAndTime(registro.saida) : "-"}</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                            <Flex flexDirection="column" gap={1}>
                                        {registro.status === "finalizado" ? null : (
                                            <>
                                                <Button onClick={() => handleSubmitForm(registro.id, "entrada")} isDisabled={registro.entrada ? true : false} size="xs" bg="green.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} w="full" gap={1} justifyContent="space-between">
                                                    Entrada<GoSignIn color="white" />
                                                </Button>
                                                <Button onClick={() => handleSubmitForm(registro.id, "saida")} isDisabled={registro.saida ? true : false} size="xs" bg="orange.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} w="full" gap={1} justifyContent="space-between">
                                                    Saida<GoSignOut color="white" />
                                                </Button>
                                                <Button onClick={() => handleSubmitForm(registro.id, "finalizar")} size="xs" bg="red.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} w="full" gap={1} justifyContent="space-between">
                                                    Finalizar<GoX color="white" />
                                                </Button>
                                            </>
                                        )}
                                            </Flex>

                                    </Flex>
                                ))}
                            </Grid>
                            <Heading size="md" p={2} borderBottom="2px" borderColor="green.900">
                                    Militares
                                </Heading>
                            <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}>
                                {data?.data.filter(registro => registro.militarId ? registro : null ).filter(registro => finalizados ? registro : registro.status === "ativo").map(registro => (
                                    <Flex
                                    position="relative"
                                        key={registro.id}
                                        bg="gray.990"
                                        boxShadow="buttonShadow"
                                        m={4}
                                        h="auto" alignItems="center" gap={2} p={2} justify="space-between"
                                    >
                                        {finalizados && registro.status === "finalizado" ? (
                                            <Flex zIndex={10} w={10} h={10} justifyContent="center" borderBottomLeftRadius="full" shadow="buttonShadow" align="center" bgGradient="linear(to-tr, green.900, green.600, green.400)" position="absolute" right={0} top={0}>
                                                <Flex position="absolute" right={2} top={2}>
                                                   <MdCheck /> 
                                                </Flex>
                                                
                                            </Flex>
                                        ) : null}
                                        <Avatar size='xl' name={registro.militar?.nome_guerra ? registro.militar?.nome_guerra : registro.civil?.nomeCompleto} src={registro.militar?.nome_guerra ? returnAvatarImage(registro.militar?.avatar_url) : returnAvatarImage(registro.civil?.foto)} />
                                        <Flex flexDirection="column" gap={2}>
                                            <Text>{registro.militar?.nome_guerra ? registro.militar?.post_grad + " " + registro.militar?.nome_guerra : registro.civil?.nomeCompleto}</Text>
                                            <Flex alignItems="center" gap={2} bg="green.900" borderRadius={20} px={2}>
                                                <GoSignIn color="white" />
                                                <Text fontSize="sm" >{registro.entrada ? convertDateAndTime(registro.entrada) : "-"}</Text>
                                            </Flex>
                                            <Flex alignItems="center" gap={2} bg="red.900" borderRadius={20} px={2}>
                                                <Flex alignItems="center" gap={2}>
                                                    <GoSignOut color="white" />
                                                    <Text fontSize="sm">{registro.saida ? convertDateAndTime(registro.saida) : "-"}</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                            <Flex flexDirection="column" gap={1}>
                                        {registro.status === "finalizado" ? null : (
                                            <>
                                                <Button onClick={() => handleSubmitForm(registro.id, "entrada")} isDisabled={registro.entrada ? true : false} size="xs" bg="green.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} w="full" gap={1} justifyContent="space-between">
                                                    Entrada<GoSignIn color="white" />
                                                </Button>
                                                <Button onClick={() => handleSubmitForm(registro.id, "saida")} isDisabled={registro.saida ? true : false} size="xs" bg="orange.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} w="full" gap={1} justifyContent="space-between">
                                                    Saida<GoSignOut color="white" />
                                                </Button>
                                                <Button onClick={() => handleSubmitForm(registro.id, "finalizar")} size="xs" bg="red.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} w="full" gap={1} justifyContent="space-between">
                                                    Finalizar<GoX color="white" />
                                                </Button>
                                            </>
                                        )}
                                            </Flex>

                                    </Flex>
                                ))}
                            </Grid>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Flex>
        </>
    );
}
