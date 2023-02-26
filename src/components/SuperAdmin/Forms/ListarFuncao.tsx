import { Flex, Grid, Heading, Tag, TagCloseButton, TagLabel, useToast } from "@chakra-ui/react";
import { FuncaoMilitar, Militar } from "../../../@types/types";
import { api } from "../../../services/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function ListarFuncao(props) {
    const mil = props.militar as Militar;
    const { data: session } = useSession();
  const { asPath } = useRouter();
    const toast = useToast();
    
    async function handleDeleteFuncao(id : string) {
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
              {mil.Funcao?.map((func: FuncaoMilitar, index: number) => (
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
                  {session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin" ? <TagCloseButton onClick={() => handleDeleteFuncao(func.id)} /> : null}
                </Tag>
              ))}
            </Grid>
        </>
    )
}
