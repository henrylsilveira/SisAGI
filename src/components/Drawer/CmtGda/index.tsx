import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, HStack, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useQuery } from "react-query";
import { CivilArray, MilitarArray } from "../../../@types/types";
import { api } from "../../../services/api";
import { Input } from "../../Form/Input";

import { useSession } from "../../../services/context/auth";
import { convertDateAndTime, generateNowISOTime } from "../../../utils/scripts";

export function PesquisarMilitarCivil(props: any) {
  const { refresh } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("militar");
  const { user: session, status } = useSession();
  const toast = useToast()

 
  const { refetch } = useQuery(
    ["todosCivis e todosMilitares"],
    async () => {
      if (searchCategory == "militar") {
        const result = await api.get<MilitarArray>("/militar");
        setResult(result.data);
        return
      }else{
        const result = await api.get<CivilArray>("/civil");
        setResult(result.data);
      }
      return
    }
  );
  useEffect(() => {
    refetch()
   }, [refetch, searchCategory])

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
            <Grid gridTemplateColumns={["2fr 1fr"]} borderBottom="1px solid" borderColor="green.600" gap={2}>
              <Flex flexDir="column" >
                <Input label="Pesquisar" name="pesquisar" mb={2} onChange={(e) => setSearch(e.target.value)} _placeholder={{ fontSize: "sm" }} placeholder='Pesquise por Cpf, Identidade ou nome' />
                <Text fontSize="xs" color="gray.400">Resultados: {filtered?.filter(pessoa => pessoa.identidade !== "0000000000").length}</Text>
              </Flex>
              <Flex flexDir="column" >
                <Input as="select" label="Buscar" name="buscar" mb={2} onChange={(e) => setSearchCategory(e.target.value)} _placeholder={{ fontSize: "sm" }}>
                  <option value="militar">Militar</option>
                  <option value="civil">Civil</option>
                </Input>
              </Flex>
            </Grid>

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