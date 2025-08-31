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
  Grid,
  VStack,
} from "@chakra-ui/react";
import { memo, FormEvent, useState, useEffect } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { Militar } from "../../../@types/types";
import { QRCode } from "react-qrcode-logo";
import {
  convertISODateToInputValue,
  returnAvatarImage,
} from "../../../utils/scripts";
import { Input } from "../../Form/Input";
import { api } from "../../../services/api";
import { useRouter } from "next/router";
import { useSession } from "../../../services/context/auth";
import { FiDownload } from "react-icons/fi";
import { BiLock, BiLockOpen } from "react-icons/bi";

export function DadosPessoaisComponent(props) {
  const { user: session, status } = useSession();
  const mil = props.militar as Militar;
  const toast = useToast();
  const { asPath } = useRouter();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [passwordValid, setPasswordValid] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState({
    senha: "",
    confirmaSenha: "",
  });

  useEffect(() => {
    if (
      asPath === "/superAdmin/usuarios" &&
      session.Funcao.find((func) => func.funcao === "super admin")
    ) {
      setPasswordValid(true);
    }
  }, [asPath, session.Funcao]);

  function handleFileInputChange(event) {
    const newFile = event.target.files[0];
    if (newFile.size > 2 * 1024 * 1024) {
      toast({
        title: "Militar",
        description: "A imagem deve ter menos de 2MB.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setFile(newFile);

    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
  }

  async function handleSubmitImage(event: FormEvent, id: string) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatarMilitar", file);
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Militar",
        description: "A imagem deve ter menos de 2MB.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const result = await api.post(`/avatarMilitar/upload/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

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

  function downloadQrCode(name: string) {
    const canvas: any = document.getElementById("qrcode");

    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_${Date.now()}_${name}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  async function checkPassword() {
    try {
      const result = await api.post("/valid/password", {
        id: session.id,
        senha: password,
      });
      console.log(result);
      if (result.status == 200 && result.data) {
        toast({
          title: "Senha",
          description: "Resetar senha liberado.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setPasswordValid(true);
      } else {
        toast({
          title: "Senha",
          description: "Senha incorreta.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Senha",
        description:
          "Erro interno. Entre em contato com o administrador do sistema.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  async function handleSubmitNewPassword(id: string) {
    if (newPassword.senha !== newPassword.confirmaSenha) {
      toast({
        title: "Senha",
        description: "As senhas devem ser iguais.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await api.patch(`/militar/${id}`, {
        senha: newPassword.senha,
      });
      if (result.status == 201) {
        toast({
          title: "Senha",
          description: "Senha alterada com sucesso.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setPasswordValid(false);
        setNewPassword({ senha: "", confirmaSenha: "" });
      } else {
        toast({
          title: "Senha",
          description: "Problema ao resetar a senha.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Senha",
        description:
          "Erro interno. Entre em contato com o administrador do sistema.",
        status: "error",
        duration: 1000,
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
      <Flex
        alignItems="center"
        mx={4}
        justifyContent="space-evenly"
        mb={4}
        gap={6}
        pb={4}
        borderBottom="1px"
        borderStyle="solid"
        borderColor="green.600"
        style={{
          borderImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), #00FF00, rgba(0, 0, 0, 0)) 1 100%;",
        }}
      >
        <Flex flexDirection="column" alignItems="center">
          <Avatar
            size="2xl"
            name={mil.nome_completo}
            bg="green.700"
            border="5px"
            borderColor="gray.400"
            boxShadow="buttonShadow"
            src={previewUrl ? previewUrl : returnAvatarImage(mil.avatar_url)}
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
        <Flex flexDirection="column">
          <Input
            mx="auto"
            name="avatarMilitar"
            label="Selecione a imagem"
            className="uploadInput"
            type="file"
            onChange={handleFileInputChange}
            isDisabled={
              session?.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
          />
          <Button
            variant="outline"
            w="full"
            mx="auto"
            mt={8}
            _hover={{ bgColor: "green.800" }}
            isDisabled={
              session?.Funcao.find(
                (func) => func.funcao == "super admin" || func.funcao == "sgte"
              ) &&
              (asPath == "/superAdmin/usuarios" ||
                asPath == "/pessoal/gerenciamento")
                ? false
                : true
            }
            borderColor="green.800"
            onClick={(e) => handleSubmitImage(e, mil.id)}
          >
            Upload
          </Button>
        </Flex>
      </Flex>
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" p={2}>
          QRCode
        </Heading>
      </Flex>
      <Flex
        alignItems="center"
        pb={4}
        mb={4}
        justifyContent="center"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="green.600"
        style={{
          borderImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), #00FF00, rgba(0, 0, 0, 0)) 1 100%;",
        }}
      >
        <Box position={"relative"}>
          <QRCode
            fgColor="#067c33"
            bgColor="#ffffff0f"
            qrStyle="dots"
            size={180}
            quietZone={14}
            ecLevel="M"
            id="qrcode"
            value={mil.id}
          />
          <Button
            onClick={() =>
              downloadQrCode(mil.post_grad + "_" + mil.nome_guerra)
            }
            colorScheme={"green"}
            position={"absolute"}
            right={-4}
            bottom={0}
            w={6}
            h={10}
            boxShadow={"buttonShadow"}
            rounded={"full"}
            p={1}
          >
            <FiDownload size={14} />
          </Button>
        </Box>
      </Flex>
      {asPath == "/superAdmin/usuarios" ||
        (asPath == "/pessoal/gerenciamento" && (
          <>
            <Flex
              bg="gray.990"
              boxShadow="buttonShadow"
              m={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="md" p={2}>
                Resetar senha
              </Heading>
            </Flex>
            <Flex
              alignItems="center"
              pb={4}
              mb={4}
              position={"relative"}
              justifyContent="center"
              borderBottom="1px"
              borderStyle="solid"
              borderColor="green.600"
              style={{
                borderImage:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0), #00FF00, rgba(0, 0, 0, 0)) 1 100%;",
              }}
            >
              <VStack
                filter={passwordValid ? "none" : "blur(2px)"}
                spacing={4}
                p={4}
              >
                <Input
                  type="password"
                  name="password"
                  label="Nova senha"
                  placeholder="Nova senha"
                  onChange={(e) =>
                    setNewPassword({ ...newPassword, senha: e.target.value })
                  }
                />
                <Input
                  type="password"
                  name="password"
                  label="Confirmar senha"
                  placeholder="Confirmar senha"
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      confirmaSenha: e.target.value,
                    })
                  }
                />
                <Button
                  onClick={() => handleSubmitNewPassword(mil.id)}
                  colorScheme={"green"}
                  w={"full"}
                  h={10}
                  boxShadow={"buttonShadow"}
                  p={1}
                >
                  Salvar
                </Button>
              </VStack>

              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                pos={"absolute"}
                h={"100%"}
                w={"100%"}
                display={passwordValid ? "none" : "flex"}
              >
                <Flex>
                  <Input
                    w={"180px"}
                    type="password"
                    name="password"
                    label="Senha do sargenteante"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    onClick={() => checkPassword()}
                    colorScheme={"green"}
                    w={6}
                    h={10}
                    boxShadow={"buttonShadow"}
                    top={9}
                    left={2}
                    p={1}
                  >
                    <BiLockOpen size={14} />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        ))}

      <Grid
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
        gap={2}
        px={4}
        pb={4}
      >
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
              session?.Funcao.find(
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
      </Grid>
    </Flex>
  );
}

export const DadosPessoais = memo(
  DadosPessoaisComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.props, nextProps.props);
  }
);
