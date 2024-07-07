import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useToast,
    Icon,
    Divider,
    Heading,
    Flex,
    Text
} from "@chakra-ui/react";
import React from "react";
import { CautelaViatura, PedidoViatura } from "../../../../@types/types";
import { MdCheck } from "react-icons/md";
import { api } from "../../../../services/api";
import { SubmitHandler } from "react-hook-form";
import { convertDate, convertDateAndTime } from "../../../../utils/scripts";

interface CautelaModalProps {
    pedido: PedidoViatura,
    atualizar: () => void
}

export function AutorizaViaturaModal({ pedido, atualizar }: CautelaModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const finalRef = React.useRef(null);

    async function handleSignIn() {
        try {
            const result = await api.put(`/veiculos/pedidos/${pedido.id}`);
            if (result.status == 200) {
                toast({
                    title: "Cautela de viatura",
                    description: "Cautela de Viatura autorizada com sucesso.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                onClose()
                atualizar();
            }
        } catch (error) {
            toast({
                title: "Cautela de viatura",
                description: "Verifique os dados da cautela.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button
                bg="blue.600"
                rounded="full"
                size="sm"
                _hover={{ backgroundColor: "blue.800" }}
                onClick={onOpen}
                py="1"
                boxShadow="buttonShadow"
            >
                <Icon as={MdCheck} color="white" size={20} />
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="gray.990" border="1px" borderColor="green.700">
                    <ModalHeader roundedTop={4}>
                        <Heading textAlign="center" size="lg">
                            Pedido de Viatura
                        </Heading>
                    </ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody my={4}>
                        <Flex
                            rounded="lg"
                            w="100%"
                            flexDirection="column"
                            p={4}
                            gap={2}
                            direction="column">
                            <Heading textAlign="left" size="md">
                                Informações do pedido
                            </Heading>
                            <Divider />
                            <Flex flexDirection="column">
                                <Flex gap={2}>
                                    <Text>
                                        Data do pedido
                                    </Text>
                                    <Text color="gray.500">
                                        {convertDate(pedido.created_at)}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Data/Hora desejada
                                    </Text>
                                    <Text color="gray.500">
                                        {convertDateAndTime(pedido.dataDesejada)}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Data devolução
                                    </Text>
                                    <Text color="gray.500">
                                        {convertDate(pedido.dataDevolucao)}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Missão
                                    </Text>
                                    <Text color="gray.500">
                                        {pedido.missao}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Itinerário
                                    </Text>
                                    <Text color="gray.500">
                                        {pedido.intinerario}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Chefe de viatura
                                    </Text>
                                    <Text color="gray.500">
                                        {pedido.chefeViatura}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Motorista
                                    </Text>
                                    <Text color="gray.500">
                                        {pedido.motorista}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Apresentar para
                                    </Text>
                                    <Text color="gray.500">
                                        {pedido.apresentar}
                                    </Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Text>
                                        Situação do pedido
                                    </Text>
                                    <Text color={pedido.status === "aguardando" ? "red.500" : pedido.status === "autorizado" ? "yellow.500" : "green.500"}>
                                        {pedido.status.toUpperCase()}
                                    </Text>
                                </Flex>
                            </Flex>

                        </Flex>
                        <Divider />
                        <Flex
                            rounded="lg"
                            w="100%"
                            flexDirection="column"
                            p={4}
                            gap={2}
                            direction="column"
                        >

                            <Button
                                bg="green.800"
                                _hover={{ bg: "green.900" }}
                                size="sm"
                                w="24"
                                mt={4}
                                ml="auto"
                                textColor="white"
                                boxShadow="buttonShadow"
                                onClick={handleSignIn}
                            >
                                Autorizar
                            </Button>

                        </Flex>


                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
