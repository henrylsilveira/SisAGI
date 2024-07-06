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
    FormControl,
    Divider,
    Heading,
    Flex,
    Text
} from "@chakra-ui/react";
import React from "react";


import { CautelaViatura, PedidoViatura, Viatura } from "../../../../@types/types";
import { MdCheck } from "react-icons/md";
import { api } from "../../../../services/api";

import { Input } from "../../../Form/Input";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { convertDate, convertDateAndTime, convertISODateAndTimeToInputValue, convertISODateToInputValue } from "../../../../utils/scripts";

interface CautelaModalProps {
    pedido: PedidoViatura,
    viaturas: Viatura[]
    atualizar: () => void
    atualizarCautela?: () => void
}

const signInFormSchema = yup.object().shape({
    dataCautela: yup.date().required("Campo obrigatório."),
    dataEntrega: yup.date().required("Campo obrigatório."),
    motorista: yup.string().required("Campo obrigatório."),
    viaturaId: yup.string().required("Campo obrigatório."),
});


export function CautelaViaturaModal({ pedido, viaturas, atualizar, atualizarCautela }: CautelaModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const finalRef = React.useRef(null);

    const {
        register,
        handleSubmit,
        formState,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInFormSchema),
    });

    const handleSignIn: SubmitHandler<CautelaViatura> = async (values) => {
        values = {
            ...values,
            pedidoViaturaId: pedido.id
        }
        try {
            const result = await api.post("/veiculo/cautela/create", values);
            if (result.status == 201) {
                toast({
                    title: "Cautela de viatura",
                    description: "Viatura cautelada com sucesso.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                onClose()
                atualizar();
                atualizarCautela()
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

    // async function handleSubmit(e: FormEvent) {
    //     e.preventDefault();

    //     const values: CautelaViatura = {
    //         dataCautela,
    //         descricao,
    //         militar_origem: session.militar.id,
    //         militar_destino: militar,
    //     };

    //     try {
    //         const result = await api.post("/veiculo/cautela/create", values);
    //         if (result.status === 201) {
    //             toast({
    //                 title: "Missão",
    //                 description: "Missão foi designada com sucesso.",
    //                 status: "success",
    //                 duration: 2000,
    //                 isClosable: true,
    //             });
    //             onClose();
    //         } else {
    //             toast({
    //                 title: "Missão",
    //                 description: "Falha ao designada a missao",
    //                 status: "error",
    //                 duration: 2000,
    //                 isClosable: true,
    //             });
    //         }
    //     } catch (error) {
    //         toast({
    //             title: "Erro interno.",
    //             description: "Contate o desenvolvedor da aplicação",
    //             status: "error",
    //             duration: 2000,
    //             isClosable: true,
    //         });
    //     }
    // }

    return (
        <>
            <Button
                bg="green.600"
                size="sm"
                _hover={{ backgroundColor: "green.800" }}
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
                            as="form"
                            direction="column"
                            onSubmit={handleSubmit(handleSignIn)}>
                            <FormControl>
                                <Input
                                    size="sm"
                                    rounded="lg"
                                    label="Data/Hora Cautela"
                                    name="dataCautela"
                                    type="datetime-local"
                                    defaultValue={convertISODateAndTimeToInputValue(pedido.dataDesejada)}
                                    error={errors.dataCautela}
                                    {...register("dataCautela")}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    size="sm"
                                    rounded="lg"
                                    label="Data Entrega"
                                    name="dataEntrega"
                                    type="date"
                                    error={errors.dataEntrega}
                                    defaultValue={convertISODateToInputValue(pedido.dataDevolucao)}
                                    {...register("dataEntrega")}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    as="select"
                                    size="sm"
                                    rounded="lg"
                                    label="EB"
                                    name="viaturaId"
                                    type="text"
                                    error={errors.viaturaId}
                                    {...register("viaturaId")}
                                >
                                    <option value="">Selecione</option>
                                    {viaturas.filter(viatura => viatura.situacao == "disponivel").map((viatura: Viatura) => (
                                        <option key={viatura.id} value={viatura.id}>
                                            {`${viatura.eb} - ${viatura.tipo} (${viatura.tipoTransporte})`}
                                        </option>
                                    ))}
                                </Input>
                            </FormControl>
                            <FormControl>
                                <Input
                                    size="sm"
                                    rounded="lg"
                                    label="Motorista"
                                    name="motorista"
                                    type="text"
                                    defaultValue={pedido.motorista}
                                    error={errors.motorista}
                                    {...register("motorista")}
                                />
                            </FormControl>
                            <Button
                            bg="green.800"
                            _hover={{ bg: "green.900" }}
                            size="sm"
                            type="submit"
                            isLoading={formState.isSubmitting}
                            w="24"
                            mt={4}
                            ml="auto"
                            textColor="white"
                            boxShadow="buttonShadow"
                        >
                            Salvar
                        </Button>

                        </Flex>


                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
