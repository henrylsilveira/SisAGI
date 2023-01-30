import {
  Flex,
  Box,
  Heading,
  FormControl,
  Button,
  FormHelperText,
  Grid,
  Tag,
  TagCloseButton,
  TagLabel,
  TagRightIcon,
  color,
  useToast,
} from "@chakra-ui/react";
import { Input } from "../../Form/Input";
import { FuncaoMilitar, Militar } from "../../../@types/types";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdAdd } from "react-icons/md";
import { convertISODateToInputValue, convertDate, convertDateInputToISODate } from '../../../utils/scripts';
import { useState } from "react";
import { api } from "../../../services/api";

export function DadosMilitares(props) {
  const mil = props.militar as Militar;
  return (
    <Flex
      bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
      boxShadow="innerShadow"
      rounded="lg"
      transition="ease-in-out"
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
          Dados Militares
        </Heading>
        <Button
          boxShadow="buttonShadow"
          colorScheme="messenger"
          size="sm"
          mr={2}
        >
          <FcAcceptDatabase size={20} />
          Salvar
        </Button>
      </Flex>
      <Box m="auto" w="100%" h="100%" px={4} pb={4}>
        <FormControl>
          <Input
            type="date"
            label="Data de praça"
            name="dataPraca"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            value={convertISODateToInputValue(mil.data_praca)}
          />
          <FormHelperText>MM/DD/AAAA</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Companhia"
            name="companhia"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.companhia}>{mil.companhia}</option>
            <option value="1 CIA">1 CIA</option>
            <option value="2 CIA">2 CIA</option>
            <option value="3 CIA">3 CIA</option>
            <option value="CCAp">CCAp</option>
            <option value="EM">EM</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Pelotao"
            name="pelotao"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.pelotao}>{mil.pelotao}</option>
            <option value="Nenhum">Nenhum</option>
            <option value="1 PEL">1 PEL</option>
            <option value="2 PEL">2 PEL</option>
            <option value="3 PEL">3 PEL</option>
            <option value="PEL Ap">PEL Ap</option>
            <option value="SEC CMDO">SEC CMDO</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Status"
            name="status"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.status}>{mil.status}</option>
            <option value="ativo">ativo</option>
            <option value="encostado">encostado</option>
            <option value="baixado">baixado</option>
            <option value="adido">adido</option>
            <option value="incapaz">inativo</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            label="QMG/QMP"
            name="qmgQmp"
            value={mil.qmg_qmp}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Cargo no QCP"
            name="cargoQcp"
            value={mil.cargo_qcp}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Lugar que cumpre expediente"
            name="localCumpreExpediente"
            value={mil.local_cumpre_expediente}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Motocarro"
            name="motocarro"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.motocarro}>{mil.motocarro}</option>
            <option value="SIM">SIM</option>
            <option value="NÃO">NÃO</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Habilitação Militar"
            name="habMilitar"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.hab_militar}>{mil.hab_militar}</option>
            <option value="SIM">SIM</option>
            <option value="NÃO">NÃO</option>
          </Input>
        </FormControl>
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
                <TagCloseButton onClick={() => {}} />
              </Tag>
            ))}
        </Grid>
        <AtribuirFuncao militar={mil} />
      </Box>
    </Flex>
  );
}

export function DadosPessoais(props) {
  const mil = props.militar as Militar;

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
        <Button
          boxShadow="buttonShadow"
          colorScheme="messenger"
          size="sm"
          mr={2}
        >
          <FcAcceptDatabase size={20} />
          Salvar
        </Button>
      </Flex>
      <Box m="auto" w="100%" h="100%" px={4} pb={4}>
        <FormControl>
          <Input
            as="select"
            label="P/G"
            name="postoGrad"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.post_grad}>{mil.post_grad}</option>
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
            label="Nome Completo"
            name="nomeCompleto"
            value={mil.nome_completo}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Nome de guerra"
            name="nomeGuerra"
            value={mil.nome_guerra}
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Identidade"
            name="identidade"
            type="text"
            value={mil.identidade}
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Prec CP"
            name="precCp"
            type="text"
            value={mil.prec_cp}
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Naturalidade"
            name="naturalidade"
            value={mil.naturalidade}
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="CPF"
            name="cpf"
            value={mil.cpf}
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            type="date"
            label="Data de nascimento"
            name="dataNascimento"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            value={convertISODateToInputValue(mil.data_nascimento)}
          />
          <FormHelperText>MM/DD/AAAA</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            label="Nome do Pai"
            name="nomePai"
            value={mil.nome_pai}
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Nome da Mãe"
            name="nomeMae"
            value={mil.nome_mae}
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Sexo"
            name="sexo"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.sexo}>{mil.sexo}</option>
            <option value="masculino">MASCULINO</option>
            <option value="feminino">FEMININO</option>
          </Input>
        </FormControl>
        <FormControl>
          <Input
            label="Contato"
            name="telefone"
            value={mil.telefone}
            type="text"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            placeholder="(XX) XXXXX-XXXX"
          />
        </FormControl>
        <FormControl>
          <Input
            label="Email"
            name="email"
            value={mil.email}
            type="email"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            as="select"
            label="Tipo Sanguíneo"
            name="tipoSanguineo"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          >
            <option value={mil.tipo_sanguineo}>{mil.tipo_sanguineo}</option>
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

export function Endereco(props) {
  const mil = props.militar as Militar;

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
        <Button
          boxShadow="buttonShadow"
          colorScheme="messenger"
          size="sm"
          mr={2}
        >
          <FcAcceptDatabase size={20} />
          Salvar
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns="1fr 1fr"
        columnGap={4}
        m="auto"
        w="100%"
        h="100%"
        px={4}
        pb={4}
      >
        <FormControl>
          <Input
            label="Cidade"
            name="cidade"
            value={mil.cidade}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Estado"
            name="estado"
            value={mil.estado}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Bairro"
            name="bairro"
            value={mil.bairro}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Nr Rua"
            name="nrRua"
            value={mil.nr_rua}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Complemento"
            name="complemento"
            value={mil.complemento}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="CEP"
            name="cep"
            value={mil.cep}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
      </Grid>
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" p={2}>
          Mapa
        </Heading>
        <Button
          boxShadow="buttonShadow"
          colorScheme="messenger"
          size="sm"
          mr={2}
        >
          <FcAcceptDatabase size={20} />
          Salvar
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns="1fr 1fr"
        columnGap={4}
        m="auto"
        w="100%"
        h="100%"
        px={4}
        pb={4}
      >
        <FormControl>
          <Input
            label="Longitude"
            name="longitude"
            value={mil.longitude}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
        <FormControl>
          <Input
            label="Latitude"
            name="latitude"
            value={mil.latitude}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
          />
        </FormControl>
      </Grid>
    </Flex>
  );
}

export function AtribuirFuncao(props) {
  const [dataInicio,setDataInicio] = useState("")
  const [dataTermino,setDataTermino] = useState("")
  const [funcao,setFuncao] = useState("")

  const mil = props.militar as Militar;
  const toast = useToast()

  async function handleSubmitFunction() {

    const values = {
      funcao,
      data_inicio: convertDateInputToISODate(dataInicio),
      data_termino: convertDateInputToISODate(dataTermino),
      militarId: mil.id
    }
    try {
      const result = await api.post('/funcao/atribuir', values )
      if(result.status == 201) {
          toast({
          title: 'Função',
          description: "Função atribuída ao militar.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        setFuncao("")
      }else {
        toast({
        title: 'Função',
        description: "Função não atribuída ao militar.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      }
    } catch (error) {
      toast({
        title: 'Função',
        description: "Erro interno. Talvez o militar já tenha essa função.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
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
        <FormControl>
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
            <option value="super admin">Super Administrador</option>
            <option value="cmt cia">Comandante de Cia</option>
            <option value="enc mat">Encarregado de material</option>
            <option value="armeiro">Armeiro</option>
            <option value="cmt pel">Comandante de Pelotão</option>
            <option value="cmt gda">Comandante da Guarda</option>
            <option value="furriel">Furriel</option>
            <option value="comum">Comum</option>
          </Input>
          <FormHelperText>
            Selecione a função que deseja atribuir
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            type="date"
            label="Data de Início"
            name="dataInicio"
            bgColor="gray.990"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <FormHelperText>MM/DD/AAAA</FormHelperText>
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
            onChange={(e) => setDataTermino(e.target.value)}
          />
          <FormHelperText>MM/DD/AAAA</FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
}
