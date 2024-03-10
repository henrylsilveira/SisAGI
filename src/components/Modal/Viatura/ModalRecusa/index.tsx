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


import { CautelaViatura, PedidoViatura, Viatura } from '../../../../@types/types';
import { MdCheck, MdHighlightOff } from "react-icons/md";
import { api } from "../../../../services/api";

import { Input } from "../../../Form/Input";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { convertISODateToInputValue } from "../../../../utils/scripts";
import { CiInboxIn } from "react-icons/ci";

const signInFormSchema = yup.object().shape({
    observacao: yup.string().required("Campo obrigatório."),
});

interface ModalProps {
    pedido: PedidoViatura
    atualizar: () => void
}

export function ModalRecusa({ pedido, atualizar }: ModalProps) {
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


    const handleSignIn: SubmitHandler<PedidoViatura> = async (values) => {
        values = {
            ...values,
            id: pedido.id,
            status: "finalizado"
        }
        try {
            const result = await api.put("/veiculo/update", values);
            if (result.status == 200) {
                toast({
                    title: "Pedido de viatura",
                    description: "Os dados do pedido foram atualizados no sistema.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                atualizar();
            }
        } catch (error) {
            toast({
                title: "Pedido de viatura",
                description: "Erro ao atualizar os dados.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };


    return (
        <>
            <Button
                bg="red.600"
                size="sm"
                _hover={{ backgroundColor: "red.800" }}
                onClick={onOpen}
                py="1"
                boxShadow="buttonShadow"
            >
                <Icon as={MdHighlightOff} color="white" size={20} />
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="gray.990" border="1px" borderColor="green.700">
                    <ModalHeader roundedTop={4}>
                        <Heading textAlign="center" size="lg">
                            Observação para recusa de pedido
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
                            as="form"
                            direction="column"
                            onSubmit={handleSubmit(handleSignIn)}>
                            <FormControl>
                                <Input
                                    size="sm"
                                    rounded="lg"
                                    label="Observação"
                                    name="observacao"
                                    type="text"
                                    error={errors.observacao}
                                    {...register("observacao")}
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
