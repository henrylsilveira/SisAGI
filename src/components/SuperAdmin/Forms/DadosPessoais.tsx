import {
  Flex,
  Heading,
  Button,
  FormControl,
  FormHelperText,
  Box,
  useToast,
  Avatar,
  AvatarBadge,
  Badge,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { memo, FormEvent } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { Militar } from "../../../@types/types";
import {
  convertISODateToInputValue,
  returnAvatarImage,
} from "../../../utils/scripts";
import { Input } from "../../Form/Input";
import { api } from "../../../services/api";
import { useRouter } from "next/router";

function DadosPessoaisComponent(props) {
  const { data: session } = useSession();
  const mil = props.militar as Militar;
  const toast = useToast();
  const { asPath } = useRouter();

  async function handleSubmitForm(
    inputObject: { name: string; value: string },
    id: string,
    e: FormEvent
  ) {
    if (inputObject.name == "data_nascimento" && inputObject.value !== "") {
      inputObject.value = `${inputObject.value}T00:00:00.000Z`;
    }

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
      w="100%"
      flexDirection="column"
    >
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" p={2}>
          Dados Pessoais
        </Heading>
      </Flex>
      <Box m="auto" w="100%" h="100%" px={4} pb={4}>
        <Flex flexDirection="column" alignItems="center">
          <Avatar
            size="2xl"
            name={mil.nome_completo}
            bg="green.700"
            border="5px"
            borderColor="gray.400"
            boxShadow="buttonShadow"
            src={returnAvatarImage(mil.avatar_url)}
          >
            <AvatarBadge
              borderColor="gray.990"
              boxSize="1.1em"
              bg="green.500"
            />
          </Avatar>

          <Badge
            variant="outline"
            colorScheme="yellow"
            mx="auto"
            zIndex="toast"
          >
            {mil.companhia} / {mil.pelotao}
          </Badge>
        </Flex>
        <FormControl>
          <Input
            as="select"
            label="P/G"
            name="post_grad"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            defaultValue={mil.post_grad}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          >
            <option value="SD">SD</option>
            <option value="CB">CB</option>
            <option value="3 SGT">3 SGT</option>
            <option value="2 SGT">2 SGT</option>
            <option value="1 SGT">1 SGT</option>
            <option value="SUB TEN">SUB TEN</option>
            <option value="2 TEN">2 TEN</option>
            <option value="1 TEN">1 TEN</option>
            <option value="CAP">CAP</option>
            <option value="MAJ">MAJ</option>
            <option value="TEN CEL">TEN CEL</option>
            <option value="CEL">CEL</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Nome Completo"
            name="nome_completo"
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.nome_completo}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Nome de guerra"
            name="nome_guerra"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.nome_guerra}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Identidade"
            name="identidade"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.identidade}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Prec CP"
            name="prec_cp"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.prec_cp}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Naturalidade"
            name="naturalidade"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.naturalidade}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="CPF"
            name="cpf"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.cpf}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            type="date"
            label="Data de nascimento"
            name="data_nascimento"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={convertISODateToInputValue(mil.data_nascimento)}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          />
          <FormHelperText>MM/DD/AAAA</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Nome do Pai"
            name="nome_pai"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.nome_pai}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Nome da Mãe"
            name="nome_mae"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.nome_mae}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            as="select"
            label="Sexo"
            name="sexo"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.sexo}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          >
            <option value="masculino">MASCULINO</option>
            <option value="feminino">FEMININO</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Contato"
            name="telefone"
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            placeholder="(XX) XXXXX-XXXX"
            defaultValue={mil.telefone}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            label="Email"
            name="email"
            type="email"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.email}
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
            isDisabled={
              session?.militar.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            as="select"
            label="Tipo Sanguíneo"
            name="tipo_sanguineo"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            defaultValue={mil.tipo_sanguineo}
            onBlur={(e) =>
              handleSubmitForm(
                { name: e.target.name, value: e.target.value },
                mil.id,
                e
              )
            }
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Input>
        </FormControl>
      </Box>
    </Flex>
  );
}

export const DadosPessoais = memo(
  DadosPessoaisComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.props, nextProps.props);
  }
);
