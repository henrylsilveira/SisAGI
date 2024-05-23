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
  FormHelperText,
  Circle
} from "@chakra-ui/react";
import React, { FormEvent, useContext, useState } from "react";
import { Input } from "../../../Form/Input";
import { api } from "../../../../services/api";
import { BsBoxArrowRight, BsBoxArrowUp } from "react-icons/bs";
import { Militar, Armamento, MilitarArray } from '../../../../@types/types';
import { useSession } from "../../../../services/context/auth";


interface ModalCautelaProps {
  data: any;
  dataArmamento: Armamento;
  adapter: boolean;
  refresh: () => {}
}

export function ModalCautela({ data: militares,  dataArmamento: armamento, adapter, refresh }: ModalCautelaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user: session, status } = useSession();
  const toast = useToast();
  const [senha, setSenha] = useState("");
  const [observacao, setObservacao] = useState("");
  const [militar, setMilitar] = useState("");
  const finalRef = React.useRef(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const values = {
    militarNome: session.post_grad+' '+session.nome_guerra, //NOME DO MILITAR COM A SESSÃO
    armamentoId: armamento.id,
    cautelouId: militar,
    observacao,
    companhia: armamento.companhia,
    senha
    }

    try {
      const result = await api.post("/armamento/cautela/create", values);
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
        refresh();
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
    {adapter ? (<Circle
        bg="green.800"
        size="28px"
        rounded='full'
        _hover={{ bgColor: "green.900" }}
        boxShadow='buttonShadow'
        onClick={onOpen}
        py="1"
      >
        <Icon boxSize={4} as={BsBoxArrowUp} />
      </Circle>) : (<Button
        bg="green.800"
        size="xs"
        _hover={{ bgColor: "green.800" }}
        boxShadow='buttonShadow'
        onClick={onOpen}
        py="1"
      >
        <Icon boxSize={4} as={BsBoxArrowRight} pr={1} />
        Cautelar
      </Button>)}
      
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
                    <Text>Nome: {armamento.nome}</Text>
                <Text>Nr de Série: {armamento.nr_serie}</Text>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Text>SU: {armamento.companhia}</Text>
                    <Text>Situação: {armamento.status}</Text>
                </Flex>
                    <Text>Condição: {armamento.condicoes}</Text>
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
                {militares?.data ? militares?.data.map((militar: Militar) => (
                  <option key={militar.id} value={militar.id} >{militar.post_grad+' '+militar.nome_guerra}</option>
                )) : null}
              </Input>
            </FormControl>
            <FormControl my={2}>
              <Input
              as='textarea'
                name="observacao"
                isRequired
                value={observacao}
                label="Observacao"
                type="text"
                onChange={(e) => setObservacao(e.target.value)}
              />
              <FormHelperText>
                S/A ou descreva a alteração.
              </FormHelperText>
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
                Senha do militar que está cautelando.
              </FormHelperText>
              <FormHelperText color='yellow.500'>
                *Deixe em branco a senha para cautelar sem validação.
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
