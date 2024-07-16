import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverHeader, Text, PopoverCloseButton, PopoverBody, Box, PopoverFooter, FormControl, FormHelperText, PopoverArrow, useToast, Icon } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { Input } from "../Form/Input"
import { PiNotePencilDuotone } from "react-icons/pi";
import { api } from "../../services/api";
import { GiNotebook } from "react-icons/gi";

export default function PopoverManutencao({ refetch, viaturaId, nomeViatura }: {  refetch: () => void, viaturaId: string, nomeViatura: string }) {
    const initRef = useRef()
    const [motivo, setMotivo] = useState("")
    const toast = useToast()
    const handleSubmitFormManutencao = async () => {
        try {
            const result = await api.post(`/viatura/cadastra/manutencao`, { motivo, viaturaId });
            if (result.status == 201) {
                toast({
                    title: "Manutenção",
                    description: `O dado de ${nomeViatura.toUpperCase()} foi cadastrado no sistema.`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setMotivo("")
                refetch()
            } else {
                toast({
                    title: "Manutenção",
                    description: "Não foi possível cadastrar no sistema",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Manutenção",
                description: "Verifique os dados.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };
    return (
        <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
            {() => (
                <>
                    <PopoverTrigger>
                        <Button
                            color={"white"}
                            bg="blue.600"
                            size="sm"
                            _hover={{ backgroundColor: "blue.800" }}
                            py="1"
                            boxShadow="buttonShadow"
                        >
                            <Icon as={GiNotebook} color="white" size={20} />
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent bgGradient="linear(to-tr, gray.990, gray.990, green.900)" border="1px" borderColor="green.700">
                            <PopoverHeader textTransform={"uppercase"}>Manutenção da <Text fontWeight={"bold"} textColor={"green.500"}>{nomeViatura}</Text></PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverArrow bg={"#1B2E26"} borderColor="green.700" />
                            <PopoverBody>
                                <Box>
                                    <FormControl>
                                        <Input
                                            as={"textarea"}
                                            size="sm"
                                            rounded="lg"
                                            label="Motivo"
                                            placeholder="Descreva o motivo da manutenção"
                                            name="motivo"
                                            h={"auto"}
                                            type="text"
                                            onChange={e => setMotivo(e.target.value)}
                                        />
                                    </FormControl>
                                </Box>
                                <Button
                                    mt={4}
                                    w={"full"}
                                    bg={"green.600"}
                                    textColor={"white"}
                                    shadow={"buttonShadow"}
                                    onClick={handleSubmitFormManutencao}
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