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
} from "@chakra-ui/react";
import React, { FormEvent, useContext, useState } from "react";

import { BsBoxArrowRight } from "react-icons/bs";

import { Input } from "../../../Form/Input";
import { Militar, MilitarArray, Missao } from "../../../../@types/types";
import { MdOutlineWorkOutline } from "react-icons/md";
import { api } from "../../../../services/api";
import { useQuery } from "react-query";
import { convertDateInputToISODate, returnAvatarImage } from "../../../../utils/scripts";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSession } from "../../../../services/context/auth";

export function MissaoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user: session } = useSession();
  const toast = useToast();

  const [militar, setMilitar] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataFinalizacao, setDataFinalizacao] = useState("");
  const [result, setResult] = useState<MilitarArray>();

  const finalRef = React.useRef(null);

    useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get<MilitarArray>("/militar");
      setResult(
        result.data.filter(
          (mil) => mil.companhia === session?.companhia
        )
      );
    }
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const values: Missao = {
      data_finalizacao: convertDateInputToISODate(dataFinalizacao),
      descricao,
      militar_origem: session.id,
      militar_destino: militar,
    };

    try {
      const result = await api.post("/missao/create", values);
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
        // onClick={onOpen}
        py="1"
        boxShadow="buttonShadow"
      >
        <Icon color="white" as={MdOutlineWorkOutline} size={20} />
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.990" border="1px" borderColor="green.700">
          <ModalHeader roundedTop={4}>
            <Heading textAlign="center" size="lg">
              Designar Missão
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody my={4}>
            <Grid py={2} display="flex" alignItems="center" justifyContent="space-evenly" gridTemplateColumns="2fr 1fr 2fr">
              <Avatar
                size="xl"
                name={session?.nome_completo}
                bg="green.700"
                src={returnAvatarImage(session?.avatar_url)}
              >
                <AvatarBadge
                  borderColor="gray.990"
                  boxSize="1.1em"
                  bg="green.500"
                />
              </Avatar>
              <Icon as={FaAngleDoubleRight} boxSize={20}  color="green.600" />
              <Avatar
                size="xl"
                name={ militar ? result?.find(mil => mil.id === militar ? mil.avatar_url : "")?.nome_guerra : "?"}
                bg="green.700"
                src={ militar ? returnAvatarImage(result?.find(mil => mil.id === militar ? mil.avatar_url : "")?.avatar_url) : null}
              >
                <AvatarBadge
                  borderColor="gray.990"
                  boxSize="1.1em"
                  bg="green.500"
                />
              </Avatar>
            </Grid>
            <FormControl py={4}>
              <FormLabel htmlFor="postoGrad">Militar</FormLabel>
              <Input
                as="select"
                focusBorderColor="green.500"
                name="militar"
                textColor="gray.200"
                variant="filled"
                _hover={{ bgColor: "gray.990" }}
                size="lg"
                placeholder="Selecione"
                onChange={(e) => setMilitar(e.target.value)}
              >
                <option value="">Selecione</option>
                {result
                  ?.sort((x, y) => {
                    let a = x.nome_guerra.toUpperCase(),
                      b = y.nome_guerra.toUpperCase();
                    return a == b ? 0 : a > b ? 1 : -1;
                  })
                  ?.filter(
                    (mil: Militar) =>
                      mil.id !== session.id
                  )
                  .map((militar: Militar) => (
                    <option key={militar.id} value={militar.id}>
                      {`${militar.nome_guerra} - ${militar.post_grad} (${militar.companhia})`}
                    </option>
                  ))}
              </Input>
              <FormHelperText>
                Militares listados em ordem alfabética
              </FormHelperText>
            </FormControl>
            <FormControl py={4}>
              <Input
                as="textarea"
                focusBorderColor="green.500"
                label="Descrição da missão"
                name="descricao"
                textColor="gray.200"
                variant="filled"
                size="lg"
                onChange={(e) => setDescricao(e.target.value)}
              >               
              </Input>
              <FormHelperText>
                Militares listados em ordem alfabética
              </FormHelperText>
            </FormControl>
            <FormControl>
          <Input
            type="date"
            label="Limite de execução"
            name="data_finalizacao"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onChange={(e) => setDataFinalizacao(e.target.value)}
          />
        </FormControl>
          </ModalBody>
          <Divider />
          <ModalFooter justifyContent="space-evenly" roundedBottom={4}>
            <Button
              boxShadow="buttonShadow"
              colorScheme="whatsapp"
              w="100%"
              mr={3}
              onClick={(e) => handleSubmit(e)}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
