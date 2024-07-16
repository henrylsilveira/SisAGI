import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Tfoot, Avatar, Flex } from "@chakra-ui/react";
import { ControleGuardaRegistros } from "../../@types/types";
import { convertDateAndTime, returnAvatarImage } from "../../utils/scripts";
import { NotData } from "../NotData";
import { GoSignIn, GoSignOut, GoX } from "react-icons/go";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import PopoverDestino from "../CmtGda/PopoverDestino";
export default function ViewTable({ data, handleSubmitForm, finalizados, refetch }: { data: ControleGuardaRegistros[], handleSubmitForm: Function, finalizados: boolean, refetch: () => void }) {

    return (

        data?.filter(item => item.status === "ativo").length !== 0 ?
            <TableContainer maxH="50vh" overflowY="scroll" py={4}>
                <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                        <Tr>
                            <Th textAlign="center"></Th>
                            <Th textAlign="center"></Th>
                            <Th textAlign="center">Entrada</Th>
                            <Th textAlign="center">Saída</Th>
                            <Th textAlign="center">Nome</Th>
                            <Th textAlign="center">Destino</Th>

                            <Th textAlign="center"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.filter(registro => finalizados ? registro : registro.status === "ativo").map((registro) => (
                            <Tr key={registro.id} _hover={{ shadow: "innerShadow", bg: "gray.990", border: "2px", borderColor: "green.900", rounded: "lg" }}>
                                <Td textAlign="center" bg={registro.civilId ? "green.900" : "blue.900"} shadow={"buttonShadow"} roundedRight={"full"} color="white">
                                    <Flex justifyContent="start">
                                        {registro.civilId ? <Flex gap={2}><IoPersonSharp /> Civil</Flex> : <Flex gap={2}><FaPersonMilitaryRifle />Militar</Flex>}
                                    </Flex>
                                </Td>
                                <Td textAlign="center">
                                    <Avatar size='sm' name={registro.militar?.nome_guerra ? registro.militar?.nome_guerra : registro.civil?.nomeCompleto} src={registro.militar?.nome_guerra ? returnAvatarImage(registro.militar?.avatar_url) : returnAvatarImage(registro.civil?.foto)} />
                                </Td>
                                <Td textAlign="center">{registro.entrada ? convertDateAndTime(registro.entrada) : "-"}</Td>
                                <Td textAlign="center">{registro.saida ? convertDateAndTime(registro.saida) : "-"}</Td>
                                <Td textAlign="center">{registro.civilId ? registro.civil?.nomeCompleto.toUpperCase() : registro.militar.post_grad + " " + registro.militar?.nome_guerra.toUpperCase()}</Td>
                                <Td textAlign="center">{registro.destino ? registro.destino : <PopoverDestino id={registro.id} nome={registro.militar?.nome_guerra ? registro.militar?.post_grad + " " + registro.militar?.nome_guerra : registro.civil?.nomeCompleto} refetch={refetch} />}</Td>
                                <Td textAlign="center" gap={2}>
                                    {registro.status === "finalizado" ? <Flex gap={2} justifyContent={"center"} bg={"green.600"} color="white" p={2} rounded="lg" shadow={"buttonShadow"}><GiCheckMark /> FINALIZADO</Flex> : (
                                        <>
                                            <Button onClick={() => handleSubmitForm(registro.id, "entrada")} isDisabled={registro.entrada ? true : false} size="xs" bg="green.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} gap={1} justifyContent="space-between">
                                                Entrada<GoSignIn color="white" />
                                            </Button>
                                            <Button mx={2} onClick={() => handleSubmitForm(registro.id, "saida")} isDisabled={registro.saida ? true : false} size="xs" bg="orange.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} gap={1} justifyContent="space-between">
                                                Saida<GoSignOut color="white" />
                                            </Button>
                                            <Button onClick={() => handleSubmitForm(registro.id, "finalizar")} size="xs" bg="red.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} gap={1} justifyContent="space-between">
                                                Finalizar<GoX color="white" />
                                            </Button>
                                        </>
                                    )}

                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th textAlign="center"></Th>
                            <Th textAlign="center"></Th>
                            <Th textAlign="center">Entrada</Th>
                            <Th textAlign="center">Saída</Th>
                            <Th textAlign="center">Nome</Th>
                            <Th textAlign="center">Destino</Th>
                            <Th textAlign="center"></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            : <NotData textoComponent={"Não existem registros."} />
    )

}