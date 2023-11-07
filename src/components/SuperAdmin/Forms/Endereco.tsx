import {
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FormEvent, memo } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { Militar } from "../../../@types/types";
import { Input } from "../../Form/Input";
import { Mapa } from "./Mapa";
import { api } from "../../../services/api";
import { useRouter } from "next/router";

function EnderecoComponent(props) {
  const { data: session } = useSession();
  const { asPath } = useRouter();
  const mil = props.militar as Militar;

  const toast = useToast();

  async function handleSubmitForm(
    inputObject: { name: string; value: string },
    id: string,
    e: FormEvent
  ) {
    e.preventDefault();
    try {
      const result = await api.post("/militar/dados", { ...inputObject, id });
      if (result.status == 201) {
        toast({
          title: "Militar",
          description: "Dados atualizados.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Militar",
          description: "Dados não atualizados.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Militar",
        description: "Erro interno",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex
      bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
      boxShadow="innerShadow"
      rounded="lg"
      transition="ease-in-out"
      w="100%"
      flexDirection="column"
      mt={4}
    >
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" p={2}>
          Endereço
        </Heading>
      </Flex>
        <Grid gridTemplateColumns={['1fr','1fr','1fr 1fr']} gap={2} px={4} pb={4}>
        <FormControl>
          <Input
            label="Cidade"
            name="cidade"
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.cidade}
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
        </FormControl>
        <FormControl>
          <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            label="Estado"
            name="estado"
            defaultValue={mil.estado}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
        </FormControl>
        <FormControl>
          <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            label="Bairro"
            name="bairro"
            defaultValue={mil.bairro}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
        </FormControl>
        <FormControl>
          <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            label="Nr Rua"
            name="nr_rua"
            defaultValue={mil.nr_rua}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
        </FormControl>
        <FormControl>
          <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            label="Complemento"
            name="complemento"
            defaultValue={mil.complemento}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
        </FormControl>
        <FormControl>
          <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            label="CEP"
            name="cep"
            defaultValue={mil.cep}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
        </FormControl>
      </Grid>
      {/* <Mapa militar={mil} /> */}
    </Flex>
  );
}

export const Endereco = memo(EnderecoComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.props, nextProps.props);
});
