import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, Text, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex, VStack, HStack } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdOutlinePersonSearch } from "react-icons/md"
import { Civil, CivilArray } from "../../../@types/types"
import { api } from "../../../services/api"
import { useQuery } from "react-query"
import { Input } from "../../Form/Input"

export function PesquisarCivil(props: any) {
    const setCivil: Dispatch<SetStateAction<Civil>> = props.civil
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [result, setResult] = useState<CivilArray>([]);
    const [filtered, setFiltered] = useState<CivilArray>([]);
    const [search, setSearch] = useState("");

    useQuery(
        ["todosCivis"],
        async () => {
            const result = await api.get<CivilArray>("/civil");
            setResult(result.data);
            return
        }
    );

    useEffect(() => {
        setFiltered(result.filter((res) =>
            res.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
            res.identidade.toLowerCase().includes(search) ||
            res.cpf.toLowerCase().includes(search)))
    }, [result, search])

    function selectCivil(civil: Civil, onClose: () => void) {
        console.log(civil)
        setCivil(civil)
        onClose()
    }

    return (
        <>
            <Button mr={2} ref={btnRef} leftIcon={<MdOutlinePersonSearch fontSize="20" />} colorScheme='whatsapp' size='sm' onClick={onOpen}>
                Pesquisar
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg='gray.900'>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px' borderColor='gray.700'>
                        Pesquisar civil
                    </DrawerHeader>

                    <DrawerBody>
                        <Flex flexDir="column" borderBottom="1px solid" borderColor="green.600">
                            <Input label="Pesquisar" name="pesquisar" mb={2} onChange={(e) => setSearch(e.target.value)} _placeholder={{ fontSize: "sm" }} placeholder='Pesquise por Cpf, Identidade ou nome' />
                            <Text fontSize="xs" color="gray.400">Resultados: {filtered?.length}</Text>
                        </Flex>
                        <VStack mt={2}>
                            {filtered.map(civil => (
                            <Flex key={civil.id} justifyContent="center" borderBottom="1px solid" borderColor="green.600" rounded="lg" transition="ease-in .2s" _hover={{bg: "blackAlpha.400", boxShadow: "innerShadow"}} w="full" alignItems="center" h={14} onClick={() => selectCivil(civil, onClose)} bg="gray.900" boxShadow="buttonShadow">
                                    <VStack>
                                        <Text>{civil.nomeCompleto}</Text>
                                        <HStack>
                                            <Text color="gray.400" fontSize="xs">CPF: {civil.cpf}</Text>
                                            <Text color="gray.400" fontSize="xs">Id:{civil.identidade}</Text>
                                        </HStack>
                                    </VStack>
                                </Flex>
                            ))}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}