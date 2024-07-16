import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Button,
    useToast,
    Text,
    Stack,
    Switch
} from "@chakra-ui/react";

import Head from "next/head";
import { api } from "../../../services/api";
import { CgLayoutList } from "react-icons/cg";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { ControleGuardaRegistros } from '../../../@types/types';
import { PesquisarMilitarCivil } from "../../../components/Drawer/CmtGda";
import { useQuery } from "react-query";
import { useState } from "react";
import ViewTable from "../../../components/ViewData/ViewTable";
import ViewGrid from "../../../components/ViewData/ViewGrid";

export default function ControleGuarda() {
    const [finalizados, setFinalizados] = useState(false)
    const [changeView, setChangeView] = useState(false)
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
                    title: "Controle da Guarda",
                    description: `O dado de ${tipo} foi cadastrado no sistema.`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                refetch()
            } else {
                toast({
                    title: "Controle da Guarda",
                    description: "Não foi possível cadastrar no sitema",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Controle da Guarda",
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
                                    p={2} gap={2} alignItems={"center"}>
                                    <Stack direction='row'>
                                        <Switch onChange={(e) => setFinalizados(e.target.checked)} colorScheme='green' size='md' />
                                    </Stack>
                                    <Text fontSize="sm">Finalizados</Text>
                                    <Flex shadow={"buttonShadow"} bg={"gray.990"} rounded={"base"}>
                                        <Button bg={"transparent"} colorScheme={"green"} onClick={() => setChangeView(true)}>
                                            <TfiLayoutListThumb color="green.600" fontSize={"20"} />
                                        </Button>
                                        <Button bg={"transparent"} colorScheme={"green"} onClick={() => setChangeView(false)}>
                                            <CgLayoutList color="green.600" fontSize={"20"} />
                                        </Button>
                                    </Flex>
                                </Flex>
                                <PesquisarMilitarCivil refresh={refetch} />
                            </Flex>
                            {/* CONTINUAR COM UM MODAL OU JANELA QUE SALVE O DESTINO DE QUEM ENTROU */}
                            { changeView ? 
                            <ViewGrid data={data?.data} handleSubmitForm={handleSubmitForm} finalizados={finalizados} refetch={refetch} />
                        : <ViewTable data={data?.data} handleSubmitForm={handleSubmitForm} finalizados={finalizados} refetch={refetch} />}
                            
                            

                        </Flex>
                    </Box>
                </SimpleGrid>
            </Flex>
        </>
    );
}
