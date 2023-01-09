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
  Circle,
  useToast,
  Tooltip,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { Input } from "../../../Form/Input";
import { BiLock } from "react-icons/bi";
import { api } from "../../../../services/api";

export function ModalValidate({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [senha, setSenha] = useState("");

  const finalRef = React.useRef(null);

  async function handleSubmit(e: FormEvent) {
    console.log(data);
    e.preventDefault();

    const values = {
      militarId: data.cautelou.id,
      senha,
      cautelaId: data.id,
    };

    try {
      const result = await api.post("/cautela/validate", values);
      if (result.status === 202) {
        toast({
          title: "Validação",
          description: "A cautela agora foi validada",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSenha("");
        onClose();
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
      <Tooltip hasArrow label="Clique para validar." aria-label="A tooltip">
        <Circle
          onClick={onOpen}
          _hover={{ bg: "#003300" }}
          mx="auto"
          boxShadow="md"
          size="40px"
          bg="gray.990"
        >
          <BiLock size={24} color="#AA0000" />
        </Circle>
      </Tooltip>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader roundedTop={4} bg="gray.800">
            Validar cautela
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="gray.800">
            <FormControl>
              <Input
                name="senha"
                value={senha}
                label="Senha"
                type="text"
                onChange={(e) => setSenha(e.target.value)}
              />
            <FormHelperText>Senha do militar que realizou a cautela.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter roundedBottom={4} bg="gray.800">
            <Button
              boxShadow="md"
              colorScheme="blue"
              mr={3}
              onClick={(e) => handleSubmit(e)}
            >
              validar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
