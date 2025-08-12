import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverHeader, Text, PopoverCloseButton, PopoverBody, Box, PopoverFooter, FormControl, FormHelperText, PopoverArrow, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { Input } from "../Form/Input"
import { FiEdit } from "react-icons/fi";
import { api } from "../../services/api";

export default function PopoverDestino({ id, nome, refetch, small }: { id: string, nome: string, refetch: () => void, small?: boolean }) {
    const initRef = useRef()
    const [destino, setDestino] = useState("")
    const toast = useToast()
    const handleSubmitFormDestino = async (id: string, tipo: string) => {
        try {
            const result = await api.put(`/controleGuarda/update/${id}`, { destino });
            if (result.status == 201) {
                toast({
                    title: "Controle da Guarda",
                    description: `O dado de ${tipo.toUpperCase()} foi cadastrado no sistema.`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                refetch()
            } else {
                toast({
                    title: "Controle da Guarda",
                    description: "Não foi possível cadastrar no sistema",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Controle da Guarda",
                description: "Verifique os dados.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };
    return (
        <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button _hover={{ bgColor: "rgba(0, 0, 0, 0.001)" }} shadow={"buttonShadow"} size={small ? "xs" : "md"} rounded={"full"} textColor={"white"} bgColor={isOpen ? 'yellow.500' : 'green.500'}><FiEdit /></Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent bgGradient="linear(to-tr, gray.990, gray.990, green.900)" border="1px" borderColor="green.700">
                            <PopoverHeader textTransform={"uppercase"}>Anote um destino para o <Text fontWeight={"bold"} textColor={"green.500"}>{nome}</Text></PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverArrow bg={"#1B2E26"} borderColor="green.700" />
                            <PopoverBody>
                                <Box>
                                    <FormControl>
                                        <Input
                                            as={"textarea"}
                                            size="sm"
                                            rounded="lg"
                                            label="Destino"
                                            placeholder="Escreva o destino"
                                            name="missao"
                                            h={"auto"}
                                            type="text"
                                            onChange={e => setDestino(e.target.value)}
                                        />
                                    </FormControl>
                                </Box>
                                <Button
                                    mt={4}
                                    w={"full"}
                                    bg={"green.600"}
                                    textColor={"white"}
                                    shadow={"buttonShadow"}
                                    onClick={() => handleSubmitFormDestino(id, nome)}
                                    ref={initRef}
                                    _hover={{ bgColor: "rgba(0, 0, 0, 0.001)" }}
                                >
                                    Salvar
                                </Button>
                            </PopoverBody>
                            
                        </PopoverContent>
                    </Portal>
                </>
            )}
        </Popover>
    )
}
