import { Flex, Heading, Grid, Avatar, Button, Text } from "@chakra-ui/react";
import { GoSignIn, GoSignOut, GoX } from "react-icons/go";
import { MdCheck } from "react-icons/md";
import { ControleGuardaRegistros } from "../../@types/types";
import { returnAvatarImage, convertDateAndTime } from "../../utils/scripts";
import { NotData } from "../NotData";

export default function ViewGrid({ data, handleSubmitForm, finalizados }: { data: ControleGuardaRegistros[], handleSubmitForm: Function, finalizados: boolean }) {

    return (
        <Flex flexDirection="column">

            <Flex borderBottom="2px" borderColor="green.900" justifyContent={"space-between"}>
                <Heading size="md" p={2}>
                    Civis
                </Heading>

            </Flex>

            {data?.length !== 0 ? (
                <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}>
                    {data.filter(registro => finalizados ? registro : registro.status === "ativo").filter(registro => registro.civilId ? registro : null).map(registro => (
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
            ) : <NotData textoComponent={"Nenhum dado encontrado"} />}

            <Heading size="md" p={2} borderBottom="2px" borderColor="green.900">
                Militares
            </Heading>
            {data.length !== 0 ? (
                <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}>
                    {data.filter(registro => registro.militarId ? registro : null).filter(registro => finalizados ? registro : registro.status === "ativo").map(registro => (
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
            ) : <NotData textoComponent={"Nenhum dado encontrado"} />}
        </Flex>
    );
}