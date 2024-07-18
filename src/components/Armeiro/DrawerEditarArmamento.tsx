import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, FormControl, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { FiEdit } from "react-icons/pi";
import { Armamento } from "../../@types/types";
import { api } from "../../services/api";
import { Input } from "../Form/Input";

export function DrawerEditarArmamento({ armamento, refetch }: { armamento: Armamento, refetch: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast();

    async function handleSubmitForm(
        inputObject: { name: string; value: string },
        id: string,
        e: FormEvent
    ) {
        try {
            const result = await api.put("/armamento/dados", { ...inputObject, id });
            if (result.status == 201) {
                toast({
                    title: "Armamento",
                    description: "Dados atualizados.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                });
                refetch()
            } else {
                toast({
                    title: "Armamento",
                    description: "Dados não atualizados.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Armamento",
                description: "Erro interno",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    }
    return (
        <>
            <Button mr={2} boxShadow="buttonShadow" ref={btnRef} leftIcon={<FiEdit fontSize="20" />} bg={"blue.700"} _hover={{ bg: "blue.800" }} size='sm' color={"white"} onClick={onOpen}>
                Editar
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                size="md"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg='gray.990' shadow="buttonShadow">
                    <DrawerCloseButton />
                    <DrawerHeader borderBottom="1px solid" borderColor="green.600">
                        <Text>Editar Armamento</Text>
                        <Text color={"green.600"}>{armamento?.nome} - {armamento?.nr_serie}</Text>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack>
                            <FormControl>
                                <Input
                                    list="nome"
                                    label="Nome"
                                    name="nome"
                                    type="text"
                                    bgColor="gray.990"
                                    border="1px"
                                    borderColor="gray.700"
                                    _hover={{ bgColor: "gray.990" }}
                                    defaultValue={armamento.nome}
                                    onBlur={(e) =>
                                        handleSubmitForm(
                                            { name: e.target.name, value: e.target.value },
                                            armamento.id,
                                            e
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    label="Tipo"
                                    name="tipo"
                                    type="text"
                                    bgColor="gray.990"
                                    border="1px"
                                    borderColor="gray.700"
                                    _hover={{ bgColor: "gray.990" }}
                                    defaultValue={armamento.tipo}
                                    onBlur={(e) =>
                                        handleSubmitForm(
                                            { name: e.target.name, value: e.target.value },
                                            armamento.id,
                                            e
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    label="Emprego"
                                    name="emprego"
                                    type="text"
                                    bgColor="gray.990"
                                    border="1px"
                                    borderColor="gray.700"
                                    _hover={{ bgColor: "gray.990" }}
                                    defaultValue={armamento.emprego}
                                    onBlur={(e) =>
                                        handleSubmitForm(
                                            { name: e.target.name, value: e.target.value },
                                            armamento.id,
                                            e
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    label="Condições"
                                    name="condicoes"
                                    type="text"
                                    bgColor="gray.990"
                                    border="1px"
                                    borderColor="gray.700"
                                    _hover={{ bgColor: "gray.990" }}
                                    defaultValue={armamento.condicoes}
                                    onBlur={(e) =>
                                        handleSubmitForm(
                                            { name: e.target.name, value: e.target.value },
                                            armamento.id,
                                            e
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    label="Cabide"
                                    name="cabide"
                                    type="text"
                                    bgColor="gray.990"
                                    border="1px"
                                    borderColor="gray.700"
                                    _hover={{ bgColor: "gray.990" }}
                                    defaultValue={armamento.cabide}
                                    onBlur={(e) =>
                                        handleSubmitForm(
                                            { name: e.target.name, value: e.target.value },
                                            armamento.id,
                                            e
                                        )
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    as={"select"}
                                    label="Situação"
                                    name="status"
                                    bgColor="gray.990"
                                    border="1px"
                                    borderColor="gray.700"
                                    _hover={{ bgColor: "gray.990" }}
                                    defaultValue={armamento.status}
                                    onBlur={(e) =>
                                        handleSubmitForm(
                                            { name: e.target.name, value: e.target.value },
                                            armamento.id,
                                            e
                                        )
                                    }
                                >
                                    <option value="disponivel">Disponível</option>
                                    <option value="indisponivel">Indisponível</option>
                                </Input>
                            </FormControl>
                        </VStack>


                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
