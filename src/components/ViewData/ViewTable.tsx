import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Popover, PopoverTrigger, Portal, PopoverContent, PopoverHeader, PopoverCloseButton, PopoverBody, Box, Tfoot, Avatar } from "@chakra-ui/react";
import { Tooltip } from "leaflet";
import { BsInfoCircle } from "react-icons/bs";
import { GiTruck } from "react-icons/gi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdDoubleArrow } from "react-icons/md";
import { ControleGuardaRegistros } from "../../@types/types";
import { convertDateAndTime, convertDate, returnAvatarImage } from "../../utils/scripts";
import { DescautelaModal } from "../Modal/Viatura/ModalDescautela";
import { NotData } from "../NotData";
import { GoSignIn, GoSignOut, GoX } from "react-icons/go";

export default function ViewTable({ data, handleSubmitForm, finalizados }: { data: ControleGuardaRegistros[], handleSubmitForm: Function, finalizados: boolean }) {

    return (

        data?.filter(item => item.status === "ativo").length !== 0 ?
            <TableContainer maxH="50vh" overflowY="scroll" py={4}>
                <Table size="sm" colorScheme="whiteAlpha">
                    <Thead>
                        <Tr>
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
                                <Td textAlign="center">
                                    <Avatar size='sm' name={registro.militar?.nome_guerra ? registro.militar?.nome_guerra : registro.civil?.nomeCompleto} src={registro.militar?.nome_guerra ? returnAvatarImage(registro.militar?.avatar_url) : returnAvatarImage(registro.civil?.foto)} />
                                </Td>
                                <Td textAlign="center">{registro.entrada ? convertDateAndTime(registro.entrada) : "-"}</Td>
                                <Td textAlign="center">{registro.saida ? convertDateAndTime(registro.saida) : "-"}</Td>
                                <Td textAlign="center">{registro.civilId ? registro.civil?.nomeCompleto.toUpperCase() : registro.militar.post_grad + " " + registro.militar?.nome_guerra.toUpperCase()}</Td>
                                <Td textAlign="center">{registro.destino}</Td>
                                <Td textAlign="center" gap={2}>
                                    <Button onClick={() => handleSubmitForm(registro.id, "entrada")} isDisabled={registro.entrada ? true : false} size="xs" bg="green.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} gap={1} justifyContent="space-between">
                                        Entrada<GoSignIn color="white" />
                                    </Button>
                                    <Button mx={2} onClick={() => handleSubmitForm(registro.id, "saida")} isDisabled={registro.saida ? true : false} size="xs" bg="orange.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} gap={1} justifyContent="space-between">
                                        Saida<GoSignOut color="white" />
                                    </Button>
                                    <Button onClick={() => handleSubmitForm(registro.id, "finalizar")} size="xs" bg="red.600" borderRadius={4} boxShadow="buttonShadow" _hover={{ boxShadow: "innerShadow" }} gap={1} justifyContent="space-between">
                                        Finalizar<GoX color="white" />
                                    </Button>
                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
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