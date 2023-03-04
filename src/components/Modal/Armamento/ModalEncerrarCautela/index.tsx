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
    FormHelperText,
    FormControl
  } from "@chakra-ui/react";
  import React, { FormEvent, useState } from "react";
  import { Input } from "../../../Form/Input";
  import { api } from "../../../../services/api";
  import { BiX } from 'react-icons/bi'
import { useSession } from "next-auth/react";

  
  export function ModalEncerrarCautela({ data }) {
    const { data: session } = useSession()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const [ senha, setSenha ] = useState('')
  
    const finalRef = React.useRef(null);
  
    async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      if(data.validado === false) {
        toast({
            title: "Cautela",
            description: "A cautela precisa estar validada para ser encerrada.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          onClose();
          return;
      }
  
      const values = {
        militarId: session.militar.id,
        senha,
        cautelaId: data.id
      }
  
      try {
        const result = await api.post('/armamento/cautela/encerrar', values);
        if (result.status === 200) {
          toast({
            title: "Cautela",
            description: "A cautela foi encerrada",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setSenha('')
          onClose()
        } else {
          toast({
            title: "Validação",
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
        bg="red.600"
        boxShadow="buttonShadow"
        size="xs"
        _hover={{ bgColor: "red.800" }}
        onClick={onOpen}
        py="1"
      >
        <Icon as={BiX} boxSize={5} pr={1} />
        Encerrar
      </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader roundedTop={4} bg="gray.800">Encerrar cautela</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="gray.800">
              <FormControl>
                <Input name="senha" value={senha} label="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
                <FormHelperText>
                Senha do militar responsável pela cautela
              </FormHelperText>

              </FormControl>
            </ModalBody>
            <ModalFooter roundedBottom={4} bg="gray.800">
              <Button boxShadow='md' colorScheme="blue" mr={3} onClick={(e) => handleSubmit(e)}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  