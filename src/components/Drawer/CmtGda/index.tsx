import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, Text, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex, VStack, HStack, useToast } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdOutlinePersonSearch } from "react-icons/md"
import { GoSignOut, GoSignIn } from "react-icons/go";
import { Civil, CivilArray, MilitarArray } from "../../../@types/types"
import { api } from "../../../services/api"
import { useQuery } from "react-query"
import { Input } from "../../Form/Input"

import { Router } from "next/router";
import { convertDate, convertDateAndTime, generateNowISOTime } from "../../../utils/scripts";
import { useSession } from "../../../services/context/auth";

export function PesquisarMilitarCivil(props: any) {
  const { refresh } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const { user: session, status } = useSession();
  const toast = useToast()
  useQuery(
    ["todosCivis e todosMilitares"],
    async () => {
      const resultC = await api.get<CivilArray>("/civil");
      const resultM = await api.get<MilitarArray>("/militar");
      setResult([...resultC.data, ...resultM.data]);
      return
    }
  );

  useEffect(() => {
    setFiltered(result.filter((res) =>
      res.nomeCompleto?.toLowerCase().includes(search.toLowerCase()) ||
      res.nome_completo?.toLowerCase().includes(search.toLowerCase()) ||
      res.identidade?.toLowerCase().includes(search) ||
      res.cpf?.toLowerCase().includes(search)))
  }, [result, search])

  async function handleSubmitMilitar(militarId: string, status: string) {
    try {
      const result = await api.post('/controleGuarda/registrar/entrada/militar', { militarId, militarServicoId: session.id, status });
      if (result.status == 201) {
        toast({
          title: "Controle Guarda",
          description: `Entrada do militar registrada ${convertDateAndTime(generateNowISOTime())}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refresh()
        onClose()
      } else {
        toast({
          title: "Controle Guarda",
          description: "Erro ao registrar a entrada.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Controle Guarda",
        description: "Erro interno.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleSubmitCivil(civilId: string, status: string) {
    try {
      const result = await api.post('/controleGuarda/registrar/entrada/civil', { civilId, militarServicoId: session.id, status });
      if (result.status == 201) {
        toast({
          title: "Controle Guarda",
          description: `Entrada do civil registrada ${convertDateAndTime(generateNowISOTime())}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refresh()
        onClose()
      } else {
        toast({
          title: "Controle Guarda",
          description: "Erro ao registrar a entrada.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Controle Guarda",
        description: "Erro interno.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button mr={2} boxShadow="buttonShadow" ref={btnRef} leftIcon={<MdOutlinePersonSearch fontSize="20" />} colorScheme='whatsapp' size='sm' onClick={onOpen}>
        Pesquisar
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
          <DrawerHeader borderBottomWidth='1px' borderColor='gray.700'>
            Pesquisar
          </DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" borderBottom="1px solid" borderColor="green.600">
              <Input label="Pesquisar" name="pesquisar" mb={2} onChange={(e) => setSearch(e.target.value)} _placeholder={{ fontSize: "sm" }} placeholder='Pesquise por Cpf, Identidade ou nome' />
              <Text fontSize="xs" color="gray.400">Resultados: {filtered?.length}</Text>
            </Flex>
            <VStack mt={2}>
              {filtered.sort((x, y) => {
                let a = x.nomeCompleto ? x.nomeCompleto.toUpperCase() : x.nome_guerra.toUpperCase(),
                  b = y.nomeCompleto ? y.nomeCompleto.toUpperCase() : y.nome_guerra.toUpperCase();
                return a == b ? 0 : a > b ? 1 : -1;
              }).map(pessoa => pessoa.identidade !== "0000000000" ? (
                <Flex key={pessoa.id} position="relative" justifyContent="left" pl={2} gap={2} borderBottom="1px solid" borderColor="green.600" rounded="lg" transition="ease-in .2s" _hover={{ bg: "blackAlpha.400", boxShadow: "innerShadow" }} w="full" alignItems="center" h={14} bgGradient="linear(to-tl, gray.990, gray.990, green.900)" boxShadow="buttonShadow">
                  <Flex flexDirection="column">
                    <Text>{pessoa.nome_completo ? pessoa.post_grad : null} {pessoa.nomeCompleto ? pessoa.nomeCompleto : pessoa.nome_completo}</Text>
                    <HStack>
                      <Text color="gray.400" fontSize="xs">CPF: {pessoa.cpf}</Text>
                      <Text color="gray.400" fontSize="xs">Id:{pessoa.identidade}</Text>
                    </HStack>
                  </Flex>
                  <Flex flexDirection="column" position="absolute" right={0} >
                    <Button bg="green.700" borderLeftRadius={0} borderBottomRightRadius={0} h={7} onClick={pessoa.post_grad ? () => handleSubmitMilitar(pessoa.id, "entrada") : () => handleSubmitCivil(pessoa.id, "entrada")} _hover={{ bg: "green.900", boxShadow: "innerShadow" }}><GoSignIn color="white" /></Button>
                    <Button bg="red.700" borderLeftRadius={0} borderTopRightRadius={0} h={7} onClick={pessoa.post_grad ? () => handleSubmitMilitar(pessoa.id, "saida") : () => handleSubmitCivil(pessoa.id, "saida")} _hover={{ bg: "red.900", boxShadow: "innerShadow" }}><GoSignOut color="white" /></Button>
                  </Flex>
                </Flex>
              ) : null)}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}