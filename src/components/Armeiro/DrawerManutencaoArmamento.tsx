import { Button, Drawer, DrawerBody, Text, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useQuery } from "react-query";


import { Armamento, ManutencaoViatura, Viatura } from "../../@types/types";
import { api } from "../../services/api";
import { GiM3GreaseGun, GiTowTruck } from "react-icons/gi";
import { convertDateAndTime } from '../../utils/scripts';
import { VscTools } from "react-icons/vsc";
import { NotData } from "../NotData";
import { BsTools } from "react-icons/bs";

export function DrawerManutencaoArmamento({ armamento }: { armamento: Armamento }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <>
            <Button mr={2} boxShadow="buttonShadow" ref={btnRef} leftIcon={<BsTools fontSize="20" />} bg={"gray.700"} _hover={{ bg: "gray.800" }} size='sm' color={"white"} onClick={onOpen}>
                Relatório
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                size="xl"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg='gray.990' shadow="buttonShadow">
                    <DrawerCloseButton />
                    <DrawerHeader borderBottom="1px solid" borderColor="green.600">
                        <Text>Relatório de Manutenção</Text>
                        <Text color={"green.600"}>{armamento?.nome} - {armamento?.nr_serie}</Text>
                    </DrawerHeader>
                    <DrawerBody>
                        {armamento?.Manutencao?.length == 0 ? <NotData textoComponent={"Nenhuma manutenção registrada"} /> : (
                            <Grid gridTemplateColumns={["1fr 1fr 1fr"]} gap={2}>
                                {armamento?.Manutencao?.map((manutencao) => (
                                    <Flex key={manutencao.id} overflow={"hidden"} position={"relative"} gap={2} flexDir="column" bgGradient="linear(to-tr, gray.990, gray.990, green.900)" borderTop="1px" shadow={"buttonShadow"} borderColor="green.700" rounded={"md"} p={2}>
                                        <Flex flexDir={"column"}>
                                            <Text zIndex={1}>
                                                Data da manutenção:
                                            </Text>
                                            <Text color={"gray.500"}>{convertDateAndTime(manutencao.dataManutencao)}</Text>
                                        </Flex>
                                        <Flex flexDir={"column"}>
                                            <Text zIndex={1}>
                                                Tipo de Manutenção:
                                            </Text>
                                            <Text color={"gray.500"}>{manutencao.tipoManutencao}</Text>
                                        </Flex>
                                        <Flex zIndex={0} position={"absolute"} bottom={-10} right={-10}  color="green.600" opacity={0.3}>
                                        
                                            <GiM3GreaseGun fontSize="150" />
                                           
                                        </Flex>
                                    </Flex>
                                ))}
                            </Grid>
                        )}

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}