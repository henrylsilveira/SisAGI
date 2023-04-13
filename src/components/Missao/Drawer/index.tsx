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
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    Grid,
    Avatar,
    AvatarBadge,
    Input,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
  } from "@chakra-ui/react";
  import React, { FormEvent, useContext, useState } from "react";
  

  import { useSession } from "next-auth/react";

 
  import { MdOutlineWorkOutline } from "react-icons/md";
  
  import { useQuery } from "react-query";

  import { FaAngleDoubleRight } from "react-icons/fa";
import { MilitarArray, Missao, Militar, MissaoArray } from "../../../@types/types";
import { api } from "../../../services/api";
import { convertDateInputToISODate, returnAvatarImage } from "../../../utils/scripts";
import { RiNotificationLine } from "react-icons/ri";
import { CardMissao } from "./CardMissao";
  
  export function MissaoDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();
    const toast = useToast();

    const [result, setResult] = useState<MissaoArray>();
  
    const btnRef = React.useRef()
  
      useQuery(
      ["todasMissoesMilitar"],
      async () => {
        const result = await api.get<MissaoArray>(`/missao/${session.militar.id}`);
        setResult(result.data);
      }
    );
  
    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
  
    //   const values: Missao = {
    //     id
    //   };
  
      try {
        const result = await api.post("/missao/create");
        if (result.status === 201) {
          toast({
            title: "Missão",
            description: "Missão foi designada com sucesso.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        } else {
          toast({
            title: "Missão",
            description: "Falha ao designada a missao",
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
          bg="gray.990"
          size="md"
          _hover={{ border: "1px", borderColor: "green.700" }}
          onClick={onOpen}
          py="1"
          boxShadow="buttonShadow"
          ref={btnRef}
        >
          <Icon as={RiNotificationLine} size={20} />
        </Button>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.990">
          <DrawerCloseButton />
          <DrawerHeader mx="auto">Missões</DrawerHeader>
            <Divider borderColor="green.700" />
          <DrawerBody>
            <CardMissao missoes={result} />
          </DrawerBody>

        </DrawerContent>
      </Drawer>
      </>
    );
  }
  