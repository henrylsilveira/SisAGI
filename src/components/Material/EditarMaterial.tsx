import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useDisclosure,
  FormControl,
  Divider,
  Icon,
  FormHelperText,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormLabel,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Material } from "../../@types/types";
import { Input } from "../Form/Input";
import { BiEdit } from "react-icons/bi";
import { api } from "../../services/api";
import { FormEvent, memo } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

function EditarMaterialComponent(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const material = props.material;
  const type = props.type;
  const refetch = props.refetch
  const toast = useToast();

  async function handleSubmitForm(
    inputObject: { name: string; value: string },
    e: FormEvent
  ) {
    e.preventDefault();
    try {
      const result = await api.post(`/material/update/${material.id}`, {
        inputObject,
      });

      if (result.status == 201) {
        toast({
          title: "Material atualizado.",
          description: "Os dados do material foram atualizados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        refetch()
      }
    } catch (error) {
      toast({
        title: "Material não atualizado.",
        description: "Verifique os dados do material.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleDeleteMaterial(e: FormEvent) {
    e.preventDefault();
    try {
      const result = await api.post(`/material/delete/${material.id}`);

      if (result.status == 200) {
        toast({
          title: "Material",
          description: "O material foi deletado com sucesso..",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose()
        refetch()
      }
    } catch (error) {
      toast({
        title: "Material",
        description: "Não foi possível deletar o material.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      onClose()
    }
  }

  return (
    <>
      {type === "edit" ? (
        <Button
          boxShadow="buttonShadow"
          size="sm"
          variant="ghost"
          bg="blue.700"
          _hover={{ bg: "blue.600" }}
          onClick={onOpen}
        >
          <Icon as={BiEdit} color="white" />
        </Button>
      ) : (
        <Button
          boxShadow="buttonShadow"
          size="sm"
          variant="ghost"
          bg="red.700"
          _hover={{ bg: "red.600"}}
          onClick={onOpen}
        >
          <Icon as={RiDeleteBin2Line} color="white" />
        </Button>
      )}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.990" border="1px" borderColor="green.800">
          <ModalHeader textAlign="center">{material.nome}</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column">
              <FormControl>
                <Input
                  label="Nome"
                  name="nome"
                  bgColor="gray.990"
                  border="1px"
                  borderColor="gray.700"
                  _hover={{ bgColor: "gray.990" }}
                  defaultValue={material.nome}
                  isDisabled={type === "edit" ? false : true}
                  onBlur={(e) =>
                    handleSubmitForm(
                      { name: e.target.name, 
                        value: e.target.value },
                        e as FormEvent
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  label="Código"
                  name="codigo"
                  bgColor="gray.990"
                  border="1px"
                  borderColor="gray.700"
                  _hover={{ bgColor: "gray.990" }}
                  defaultValue={material.codigo}
                  isDisabled={type === "edit" ? false : true}
                  onBlur={(e) =>
                    handleSubmitForm(
                      { name: e.target.name, value: e.target.value },
                      e
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  as="textarea"
                  label="Condições"
                  name="condicoes"
                  bgColor="gray.990"
                  border="1px"
                  borderColor="gray.700"
                  _hover={{ bgColor: "gray.990" }}
                  defaultValue={material.condicoes}
                  isDisabled={type === "edit" ? false : true}
                  onBlur={(e) =>
                    handleSubmitForm(
                      { name: e.target.name, value: e.target.value },
                      e
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantidade</FormLabel>
                <NumberInput
                  focusBorderColor="green.500"
                  bg="gray.990"
                  border="1px"
                  borderColor="gray.700"
                  name="quantidade"
                  rounded="base"
                  min={Number(
                    material.quantidade -
                      material.cautelas
                        ?.filter((c: any) => c.status === "ativo")
                        .reduce((total = 0, cautela) => {
                          return total + cautela.quantidade;
                        }, 0)
                  )}
                  defaultValue={material?.quantidade}
                  isDisabled={type === "edit" ? false : true}
                  onBlur={(e) =>
                    handleSubmitForm(
                      { name: e.target.name, value: e.target.value },
                      e
                    )
                  }
                >
                  <NumberInputField rounded="base" border={0} />
                  <NumberInputStepper>
                    <NumberIncrementStepper color="whiteAlpha.700" />
                    <NumberDecrementStepper color="whiteAlpha.700" />
                  </NumberInputStepper>
                </NumberInput>
                
                {type === "edit" ? (
                  <FormHelperText fontSize="md">
                    O valor não pode ser menor que a quantidade cautelada.
                    <Text color="red.600" decoration="underline">
                      Cauteladas: {material.cautelas.length}
                    </Text>
                  </FormHelperText>
                ) : (
                  <>
                    <Divider my={4} />
                    <Button
                    float="right"
                      boxShadow="buttonShadow"
                      size="md"
                      variant="ghost"
                      bg="red.700"
                      _hover={{ bg: "red.600" }}
                      onClick={(e) => handleDeleteMaterial(e)}
                      m={4}
                       color="white"
                    >
                      Excluir
                    </Button>
                  </>
                
                )}
              </FormControl>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const EditarMaterial = memo(
  EditarMaterialComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.props, nextProps.props);
  }
);
