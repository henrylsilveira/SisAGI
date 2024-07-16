import {
    useDisclosure,
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
    Divider,
    Button
  } from "@chakra-ui/react";
  import React, { FormEvent, useState } from "react";
  import { Input } from "../../../Form/Input";
  import { api } from "../../../../services/api";
  import { BiX } from 'react-icons/bi'
import { useSession } from "../../../../services/context/auth";


  
  export function ModalEncerrarCautela({ data }) {
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
        color={"white"}
        py="1"
      >
        <Icon as={BiX} boxSize={5} pr={1} />
        Encerrar
      </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={"gray.990"} border={"1px"} borderColor={"green.600"}>
            <ModalHeader roundedTop={4}>Encerrar cautela</ModalHeader>
            <ModalCloseButton />
            <Divider borderColor={"green.700"} />
            <ModalBody>
              <FormControl>
                <Input name="senha" value={senha} label="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
                <FormHelperText>
                Senha do militar responsável pela cautela
              </FormHelperText>

              </FormControl>
            </ModalBody>
            <Divider borderColor={"green.700"} />
            <ModalFooter roundedBottom={4}>
              <Button colorScheme="blue" mr={3} w={"full"} onClick={(e) => handleSubmit(e)} boxShadow="buttonShadow">
                Encerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  