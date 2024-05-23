import { Button, ButtonGroup, Flex, Text, Grid, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tag, TagLabel, Tooltip, useToast } from "@chakra-ui/react";
import { FuncaoMilitar, Militar } from "../../../@types/types";
import { api } from "../../../services/api";

import Router, { useRouter } from "next/router";
import { convertDate, generateNowISOTime } from "../../../utils/scripts";
import { MdBlock, MdCheck } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosTrash } from "react-icons/io";
import { useSession } from "../../../services/context/auth";

export function ListarFuncao(props) {
  const mil = props.militar as Militar;
  const { user: session, status } = useSession();
  const { asPath } = useRouter();
  const toast = useToast();

  async function handleDeleteFuncao(id: string) {
    try {
      const result = await api.post(`/funcao/deletar/${id}`);
      if (result.status == 201) {
        toast({
          title: "Função",
          description: "Função removida do militar.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Função",
          description: "Erro na remoção da função",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Função",
        description: "Erro interno.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  async function handleSuspendFuncao(id: string, status: string) {
    try {
      const result = await api.post(`/funcao/update/${id}/${status}`);
      if (result.status == 201) {
        toast({
          title: "Função",
          description: `A função foi inativada a partir de ${convertDate(generateNowISOTime())}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        Router.push("/")
      } else {
        toast({
          title: "Função",
          description: "Erro ao suspender a função",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Função",
        description: "Erro interno.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  return (
    <>
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" p={2}>
          Funções do militar
        </Heading>
      </Flex>
      <Grid m={4} gridTemplateColumns="1fr 1fr">
        {mil.Funcao?.filter(func => func.funcao !== "comum" && func.status === "ativo").map((func: FuncaoMilitar, index: number) => (
          <Tag
            flex={1}
            justifyContent="space-between"
            borderRadius="base"
            variant="solid"
            colorScheme="facebook"
            boxShadow="buttonShadow"
            key={index}
            m={2}
          >
            <TagLabel>{func.funcao.toUpperCase()}</TagLabel>
            {session?.Funcao.find((func) => func.funcao == "sgte") && asPath == "/pessoal/gerenciamento" ?
              <Popover>
                <PopoverTrigger>
                  <Button size="xs" rounded="full" bg="transparent" _hover={{ boxShadow: "buttonShadow", bg: "red.900" }}><MdBlock color="red" cursor="pointer" /></Button>
                </PopoverTrigger>
                <PopoverContent bg="gray.990"
                  border="1px"
                  borderColor="green.700">
                  <PopoverArrow bg="gray.990" />
                  
                  <PopoverHeader bg="gray.990"
                    fontSize="large"
                    boxShadow="buttonShadow"
                    m={4}
                    justifyContent="space-between"
                    alignItems="center"
                    py={2}
                    borderBottom="none">Inativar função <PopoverCloseButton /></PopoverHeader>
                  <PopoverBody>
                    <Text p={4}>Você irá inativar a função do militar, sendo necessário atribuir novamente futuramente.</Text>
                    <ButtonGroup display='flex' justifyContent='flex-end'>

                      <Button colorScheme='red' onClick={() => handleSuspendFuncao(func.id, "inativo")}>
                        Inativar
                      </Button>
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              </Popover>



              : null}
            {session?.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin" ?
              <IoIosTrash color="red.500" onClick={() => handleDeleteFuncao(func.id)} />
              : null}
          </Tag>
        ))}
      </Grid>
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" p={2}>
          Inativos
        </Heading>
      </Flex>
      <Grid m={4} gridTemplateColumns="1fr 1fr">
        {mil.Funcao?.filter(func => func.funcao !== "comum" && func.status === "inativo").map((func: FuncaoMilitar, index: number) => (
          <Tag
            flex={1}
            justifyContent="space-between"
            borderRadius="base"
            variant="solid"
            bgColor="red.600"
            boxShadow="buttonShadow"
            key={index}
            m={2}
          >
            <TagLabel>{func.funcao.toUpperCase()}</TagLabel>
            {session?.Funcao.find((func) => func.funcao == "sgte") && asPath == "/pessoal/gerenciamento" ?
              <Popover>
                <PopoverTrigger>
                  <Button size="xs" rounded="full" bg="transparent" _hover={{ boxShadow: "buttonShadow", bg: "green.900" }}><MdCheck color="green" cursor="pointer" /></Button>
                </PopoverTrigger>
                <PopoverContent bg="gray.990"
                  border="1px"
                  borderColor="green.700">
                  <PopoverArrow bg="gray.990" />
                  
                  <PopoverHeader bg="gray.990"
                    fontSize="large"
                    boxShadow="buttonShadow"
                    m={4}
                    justifyContent="space-between"
                    alignItems="center"
                    py={2}
                    borderBottom="none">Ativar função <PopoverCloseButton /></PopoverHeader>
                  <PopoverBody>
                    <Text p={4}>Você irá ativar a função do militar.</Text>
                    <ButtonGroup display='flex' justifyContent='flex-end'>

                      <Button colorScheme='green' onClick={() => handleSuspendFuncao(func.id, "ativo")}>
                        Ativar
                      </Button>
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              </Popover>



              : null}
            {session?.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin" ?
              <IoIosTrash color="red.500" onClick={() => handleDeleteFuncao(func.id)} />
              : null}
          </Tag>
        ))}
      </Grid>
    </>
  )
}
