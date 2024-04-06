import {
  Flex,
  Heading,
  FormControl,
  Button,
  FormHelperText,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { Input } from "../../Form/Input";
import { Militar } from "../../../@types/types";
import { MdAdd } from "react-icons/md";
import {
  convertDateInputToISODate,
} from "../../../utils/scripts";
import { memo, useState } from "react";
import { api } from "../../../services/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function AtribuirFuncaoComponent(props) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [funcao, setFuncao] = useState("");
  const { data: session } = useSession();

  const mil = props.militar as Militar;
  console.log(mil)
  const { asPath } = useRouter();
  const toast = useToast();

  async function handleSubmitFunction() {
    const values = {
      funcao,
      data_inicio: convertDateInputToISODate(dataInicio),
      data_termino: convertDateInputToISODate(dataTermino),
      militarId: mil.id,
    };
    try {
      const result = await api.post("/funcao/atribuir", values);
      if (result.status == 201) {
        toast({
          title: "Função",
          description: "Função atribuída ao militar.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setFuncao("");
      } else {
        toast({
          title: "Função",
          description: "Função não atribuída ao militar.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Função",
        description: "Erro interno. Talvez o militar já tenha essa função.",
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
          Atribuir função
        </Heading>
        <Button
          boxShadow="buttonShadow"
          colorScheme="whatsapp"
          size="xs"
          mr={2}
          onClick={() => handleSubmitFunction()}
        >
          <MdAdd size={20} />
          Atribuir
        </Button>
      </Flex>
      <Grid m={4}>
        <FormControl mb={2}>
          <Input
            as="select"
            name="habMilitar"
            bgColor="gray.990"
            border="1px"
            
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onChange={(e) => setFuncao(e.target.value)}
          >
            <option>Selecione</option>
            {session?.militar.Funcao.find((func) => func.funcao === "super admin" ) && asPath === "/superAdmin/usuarios" ? (
              <>
                <option value="super admin">Super Administrador</option>
                <option value="s2">S/2</option>
                <option value="s4">S/4</option>
              </>
            ) : (
              <>
                <option value="cmt cia">Comandante de Cia</option>
                <option value="enc mat">Encarregado de material</option>
                <option value="sgte">Sargenteante</option>
                <option value="armeiro">Armeiro</option>
                <option value="cmt pel">Comandante de Pelotão</option>
                <option value="cmt gda">Comandante da Guarda</option>
                <option value="enc pmt">Encarregado PMT</option>
                <option value="furriel">Furriel</option>
                <option value="comum">Comum</option>
              </>
            )}
            
          </Input>
          <FormHelperText>
            Selecione a função que deseja atribuir
          </FormHelperText>
        </FormControl>
        <Grid gridTemplateColumns={['1fr','1fr','1fr 1fr']} gap={2}>
          <FormControl>
          <Input
            type="date"
            label="Data de Início"
            name="dataInicio"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            isRequired
            onChange={(e) => setDataInicio(e.target.value)}
          />

        </FormControl>
        <FormControl>
          <Input
            type="date"
            label="Data de Término"
            name="dataTermino"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            isRequired
            onChange={(e) => setDataTermino(e.target.value)}
          />

        </FormControl>
          </Grid>
        
      </Grid>
    </>
  );
}

export const AtribuirFuncao = memo(
  AtribuirFuncaoComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.props, nextProps.props);
  }
);
