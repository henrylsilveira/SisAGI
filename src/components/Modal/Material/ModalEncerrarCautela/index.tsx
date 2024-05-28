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
    FormControl,
    Divider
  } from "@chakra-ui/react";
  import React, { FormEvent, useState } from "react";
  import { Input } from "../../../Form/Input";
  import { api } from "../../../../services/api";
  import { BiX } from 'react-icons/bi'
import { useSession } from "../../../../services/context/auth";


  
  export function ModalEncerrarCautela({ data, refetch }) {
    const { user: session, status } = useSession();
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
        militarId: session.id,
        senha,
        cautelaId: data.id
      }
  
      try {
        const result = await api.post('/cautela/encerrar', values);
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
          refetch()
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
        color="white"
      >
        <Icon as={BiX} boxSize={5} pr={1} color="white" />
        Encerrar
      </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.990" border="1px" borderColor="green.700">
            <ModalHeader roundedTop={4}>Encerrar cautela</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider borderColor="green.700" />
              <FormControl py={6}>
                <Input name="senha" value={senha} label="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
                <FormHelperText>
                Senha do militar responsável pela cautela
              </FormHelperText>

              </FormControl>
              <Divider borderColor="green.700" />
            </ModalBody>
            <ModalFooter roundedBottom={4}>
              <Button boxShadow="buttonShadow" colorScheme="yellow" mr={3} onClick={(e) => handleSubmit(e)} color="white">
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  