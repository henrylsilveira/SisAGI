import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Icon,
  Text,
  FormControl,
  FormLabel,
  Divider,
  Stack,
  Flex,
  Heading,
  FormHelperText
} from "@chakra-ui/react";
import React, { FormEvent, useContext, useState } from "react";
import { Input } from "../../../Form/Input";
import { api } from "../../../../services/api";
import { BsBoxArrowRight } from "react-icons/bs";
import { Militar } from '../../../../@types/types';
import { useSession } from 'next-auth/react';

export function ModalCautela({ data: militares,  dataMaterial: material}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession()
  const toast = useToast();

  const [senha, setSenha] = useState(" ");
  const [militar, setMilitar] = useState("");
  const finalRef = React.useRef(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const values = {
    militarNome: session.militar.nome_guerra, //NOME DO MILITAR COM A SESSÃO
    materialId: material.id,
    observacao: 'ALGUMA COISA',
    local: material.local,
    cautelouId: militar,
    senha
    }

    try {
      const result = await api.post("/cautela/create", values);
      if (result.status === 201) {
        toast({
          title: "Cautela",
          description: senha ? "A cautela foi criada e VALIDADA com sucesso." :  "A cautela foi criada com sucesso SEM VALIDAÇÃO.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSenha("");
        setMilitar("");
        onClose();
      } else {
        toast({
          title: "Cautela",
          description: "Senha incorreta.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro interno.",
        description: "Contate o desenvolvedor da aplicação",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button
        bg="green.400"
        size="xs"
        _hover={{ bgColor: "green.600" }}
        onClick={onOpen}
        py="1"
      >
        <Icon boxSize={4} as={BsBoxArrowRight} pr={1} />
        Cautelar
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader roundedTop={4} bg="gray.800">
            <Heading textAlign='center' size='lg'>
            Criar cautela

            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="gray.800">
            <Stack pb={4}>
                <Flex justifyContent='space-between'>
                    <Text>Nome: {material.nome}</Text>
                    <Text>Condição: {material.condicoes}</Text>

                </Flex>

                <Flex justifyContent='space-between'>
                    <Text>Dependência: {material.dependencia}</Text>
                    <Text>SU: {material.sub_unidade}</Text>
                </Flex>
                <Text>Categoria: {material.categoria}</Text>
            </Stack>
            <Divider />
            <FormControl py={4}>
              <FormLabel htmlFor="postoGrad">Militar</FormLabel>
              <Input
                as="select"
                focusBorderColor="green.500"
                name="militar"
                bgColor="gray.900"
                textColor="gray.200"
                variant="filled"
                _hover={{ bgColor: "gray.900" }}
                size="lg"
                placeholder="Selecione"
                onChange={(e) => setMilitar(e.target.value)}
              >
                <option value=''>Selecione</option>
                {militares.data?.map((militar: Militar) => (
                  <option key={militar.id} value={militar.id} >{militar.nome_guerra}</option>
                ))}
              </Input>
            </FormControl>
            <FormControl>
              <Input
                name="senha"
                value={senha}
                label="Senha para validar cautela"
                type="password"
                onChange={(e) => setSenha(e.target.value)}
              />
              <FormHelperText>
                Senha do militar que está cautelando
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent='space-evenly' roundedBottom={4} bg="gray.800">
            <Button
              boxShadow="md"
              colorScheme="yellow"
              mr={3}
              onClick={(e) => handleSubmit(e)}
              disabled={militar && !senha ? false : true}
            >
              Sem Validar
            </Button>
            <Button
              boxShadow="md"
              colorScheme="blue"
              mr={3}
              onClick={(e) => handleSubmit(e)}
              disabled={senha && militar ? false : true}
            >
              Validar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
