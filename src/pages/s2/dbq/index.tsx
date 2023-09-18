/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Grid,
  Avatar,
  Button,
  useToast,
  AvatarGroup,
  HStack,
  VStack,
  Text,
  Icon
} from "@chakra-ui/react";

import Head from "next/head";
import { returnAvatarImage, convertDate } from '../../../utils/scripts';
import { FormEvent, useState } from "react";
import { api } from "../../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Form/Input";
import { HiOutlineIdentification } from 'react-icons/hi2'
import { PesquisarCivil } from "../../../components/Drawer/s2";

import { Civil, Dbq, DbqArray } from '../../../@types/types';
import { FiAlertTriangle, FiUserPlus } from "react-icons/fi";
import { useSession } from "next-auth/react";

import { BsEyeSlashFill, BsFillPeopleFill } from "react-icons/bs";
import { useRouter } from "next/router";


type DbqFormData = {
  nomeCompleto: string;
  identidade: string;
  cpf: string;
  nomePai: string;
  nomeMae: string;
  origem: string;
  destino: string;
  profissao: string;
  motivo: string;
  observacao: string;
  militarId: string;
};

const signInFormSchema = yup.object().shape({
  nomeCompleto: yup.string().required("Obrigatório"),
  identidade: yup.string(),
  cpf: yup.string(),
  nomePai: yup.string(),
  nomeMae: yup.string(),
  origem: yup.string(),
  destino: yup.string(),
  profissao: yup.string(),
  motivo: yup.string(),
  observacao: yup.string(),
  militarId: yup.string(),
});

export default function DbqPage() {
  const [file, setFile] = useState(null);
  const [civil, setCivil] = useState<Civil>();
  const [dbq, setDbq] = useState<Dbq>();
  const [dbqRecentes, setDbqRecentes] = useState<DbqArray>();
  const [previewUrlFoto, setPreviewUrlFoto] = useState(null);
  const [previewUrlFotoDoc, setPreviewUrlFotoDoc] = useState(null);
  const [previewUrlDbq, setPreviewUrlDbq] = useState(null);
  const [previewUrlDbqDoc, setPreviewUrlDbqDoc] = useState(null);
  const { data: session } = useSession()
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  async function handleGetDbq() {
    try {
      const result = await api.get<DbqArray>(`/civil/dbq/${session?.militar.id}`);
      return setDbqRecentes(result.data)
    } catch (error) {
      throw (error)
    }

  }

  function setDbqUpdate(dbq: Dbq){
    setCivil(dbq.civil)
    setDbq(dbq)
  }

  function handleNovoDBQ(){
    setCivil(null)
    setDbq(null)
    setDbqRecentes(null)
  }

  function handleFileInputChange(event, input) {
    const newFile = event.target.files[0];
    setFile(newFile);

    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onloadend = () => {
      if (input === "foto") {
        setPreviewUrlFoto(reader.result);
      } else if (input === "fotoDoc") {
        setPreviewUrlFotoDoc(reader.result);
      } else if (input === "fotoDocDbq") {
        setPreviewUrlDbqDoc(reader.result);
      } else if (input === "fotoDbq") {
        setPreviewUrlDbq(reader.result);
      }

    };
  }

  async function handleSubmitImage(event: FormEvent, id: string, type: "fotoCivil" | "fotoDoc" | "fotoDbq" | "fotoDocDbq") {
    event.preventDefault();

    const formData = new FormData();
    formData.append(type, file);
    try {
      const result = await api.post(`/civil/upload/${type}/${id}`,
        formData
        , {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })

      if (result.status == 201) {
        toast({
          title: "Foto Civil",
          description: "Dados atualizados.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

      } else {
        toast({
          title: "Foto Civil",
          description: "Dados não atualizados.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Foto Civil",
        description: "Erro interno",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const handleSubmitForm: SubmitHandler<DbqFormData> = async (values) => {
    try {
      const result = await api.post("/civil/dbq/create", { ...values, militarId: session?.militar.id });
      if (result.status == 201) {
        toast({
          title: "DBQ.",
          description: "Os dados do civil foram cadastrados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setCivil(result?.data.civil)
        setDbq(result?.data.dbq)
      } else {
        toast({
          title: "DBQ",
          description: "Talvez a identidade já esteja cadastrada.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "DBQ",
        description: "Verifique os dados do civil.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>SisAGI | DBQ</title>
      </Head>
      <Flex direction="column" flex="1" gap={4}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">

            <Flex
              bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
              boxShadow="innerShadow"
              rounded="lg"
              w="full"
              p={4}
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
                <Flex>
                <Button mr={2} leftIcon={<FiUserPlus fontSize="20" />} colorScheme='green' size='sm' onClick={handleNovoDBQ}>
                    Novo DBQ
                  </Button>
                {dbqRecentes ? (
                  <Button mr={2} leftIcon={<BsEyeSlashFill fontSize="20" />} colorScheme='orange' size='sm' onClick={() => setDbqRecentes(null)}>
                    DBQ Recentes
                  </Button>
                ) : (
                  <Button mr={2} leftIcon={<BsFillPeopleFill fontSize="20" />} colorScheme='facebook' size='sm' onClick={handleGetDbq}>
                    DBQ Recentes
                  </Button>)}
                  
                  <PesquisarCivil civil={setCivil} />

                </Flex>
              </Flex>
              {dbqRecentes ? (
                <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                py={2}
                px={2}
                mb={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack>
                  {dbqRecentes?.map(dbq => (
                    <Flex key={dbq.id} onClick={() => setDbqUpdate(dbq)} justifyContent="center" borderBottom="1px solid" borderColor="green.600" rounded="lg" transition="ease-in .2s" _hover={{ bg: "blackAlpha.400", boxShadow: "innerShadow" }} w="full" alignItems="center" h={14}  bg="gray.900" boxShadow="buttonShadow">
                      <VStack px={2}>
                        <Text fontSize="xs">{dbq.civil.nomeCompleto}</Text>
                        <HStack>
                          <Text color="gray.400" fontSize="xs">CPF: {dbq.civil.cpf}</Text>
                          <Text color="gray.400" fontSize="xs">Id:{dbq.civil.identidade}</Text>
                        </HStack>
                      </VStack>
                    </Flex>
                  ))}
                </HStack>
                </Flex>
              ) : null}


              <Grid gap={4} gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} as="form" onSubmit={handleSubmit(handleSubmitForm)}>
                <Flex mx="auto" justifyItems="center" alignItems="center" >
                  <AvatarGroup size='2xl' max={2}>
                    <Avatar
                      size="2xl"
                      bg="green.700"
                      border="5px"
                      borderColor="gray.400"
                      boxShadow="buttonShadow"

                      src={previewUrlFoto ? previewUrlFoto : returnAvatarImage(civil?.foto)}
                    />
                    <Avatar
                      size="2xl"
                      bg="green.700"
                      border="5px"
                      borderColor="gray.400"
                      boxShadow="buttonShadow"
                      icon={<HiOutlineIdentification fontSize='xl' />}
                      src={previewUrlFotoDoc ? previewUrlFotoDoc : returnAvatarImage(civil?.fotoDoc)}
                    />
                  </AvatarGroup>
                </Flex>
                <Input
                  name="nomeCompleto"
                  label="Nome Completo"
                  type="text"
                  error={errors.nomeCompleto}
                  defaultValue={civil?.nomeCompleto}
                  {...register("nomeCompleto")}
                />
                <Input
                  name="cpf"
                  label="CPF"
                  type="text"
                  error={errors.cpf}
                  defaultValue={civil?.cpf}
                  {...register("cpf")}
                />
                <Input
                  name="identidade"
                  label="Identidade"
                  type="text"
                  error={errors.identidade}
                  defaultValue={civil?.identidade}
                  {...register("identidade")}
                />


                <Input
                  name="nomePai"
                  label="Nome do pai"
                  type="text"
                  error={errors.nomePai}
                  defaultValue={civil?.nomePai}
                  {...register("nomePai")}
                />
                <Input
                  name="nomeMae"
                  label="Nome da Mãe"
                  type="text"
                  error={errors.nomeMae}
                  defaultValue={civil?.nomeMae}
                  {...register("nomeMae")}
                />
                <Input
                  name="origem"
                  label="Origem"
                  type="text"
                  error={errors.origem}
                  {...register("origem")}
                />
                <Input
                  name="destino"
                  label="Destino"
                  type="text"
                  error={errors.destino}
                  {...register("destino")}
                />
                <Input
                  name="profissao"
                  label="Profissão"
                  type="text"
                  error={errors.profissao}
                  {...register("profissao")}
                />
                <Input
                  name="motivo"
                  label="Motivo"
                  type="text"
                  error={errors.motivo}
                  {...register("motivo")}
                />
                <Input
                  name="observacao"
                  label="Observação"
                  type="text"
                  error={errors.observacao}
                  {...register("observacao")}
                />

                <Button
                  type="submit"
                  mt="6"
                  mr={4}
                  w="100%"
                  colorScheme="blue"
                  size="lg"
                  boxShadow="buttonShadow"
                  variant="ghost"
                  transition="0.3s"
                  _hover={{ border: "1px", borderColor: "blue.700" }}
                  isLoading={formState.isSubmitting}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Flex>
            {civil?.id ? (
              <Grid
                bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                boxShadow="innerShadow"
                rounded="lg"
                w="full"
                mt={4}
                p={4}
                gridTemplateColumns={["1fr", "1fr 1fr"]}
              >

                <Flex gap={4} flexDirection="column" alignItems="center" >
                  <Flex
                    bg="gray.990"
                    boxShadow="buttonShadow"
                    mx={4}
                    w="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading size="md" p={2}>
                      Fotos do Registro
                    </Heading>

                  </Flex>
                  <Flex flexDir={"row"} mb={2} gap={4} px={4} justifyItems="center" alignItems="center">
                    <Avatar
                      size="xl"
                      bg="green.700"
                      border="5px"
                      borderColor="gray.400"
                      boxShadow="buttonShadow"
                      src={previewUrlFoto ? previewUrlFoto : returnAvatarImage(civil.foto)}
                    />
                    <Input
                      name="fotoCivil"
                      label="Foto 3x4"
                      className="uploadInput"
                      type="file"
                      h={8}
                      onChange={(e) => handleFileInputChange(e, "foto")}
                    />
                    <Button variant="outline" size="lg" ml={2} mt={8} _hover={{ bgColor: "green.800" }}
                      borderColor="green.800" onClick={(e) => handleSubmitImage(e, civil.id, "fotoCivil")}>Upload</Button>

                  </Flex>
                  <Flex flexDir={"row"} gap={4} px={4} justifyItems="center" alignItems="center">
                    <Avatar
                      size="xl"
                      bg="green.700"
                      border="5px"
                      borderColor="gray.400"
                      boxShadow="buttonShadow"
                      icon={<HiOutlineIdentification fontSize='xl' />}
                      src={previewUrlFotoDoc ? previewUrlFotoDoc : returnAvatarImage(civil.fotoDoc)}
                    />


                    <Input
                      name="fotoDoc"
                      label="Foto do documento"
                      className="uploadInput"
                      h={8}
                      type="file"
                      onChange={(e) => handleFileInputChange(e, "fotoDoc")}
                    />
                    <Button variant="outline" size="lg" ml={2} mt={8} _hover={{ bgColor: "green.800" }}
                      borderColor="green.800" onClick={(e) => handleSubmitImage(e, civil.id, "fotoDoc")}>Upload</Button>

                  </Flex>
                </Flex>
                <Flex gap={4} ml={2} flexDirection="column" alignItems="center">
                  <Flex
                    bg="gray.990"
                    boxShadow="buttonShadow"
                    mx={4}
                    w="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading size="md" p={2}>
                      Fotos do DBQ
                    </Heading>

                  </Flex>

                  {dbq?.id ? (
                    <>
                        <HStack w="full" flex={1} justifyContent="center">
                          <Text>Código do DBQ:  </Text>
                          <Text color="gray.500">{dbq?.id}</Text>
                          <Text>Data do DBQ: </Text>
                          <Text color="gray.500">{convertDate(dbq?.created_at)}</Text>
                        </HStack>

                      <Flex flexDir={"row"} mb={2} gap={4} justifyItems="center" alignItems="center">
                        <Avatar
                          size="xl"
                          bg="green.700"
                          border="5px"
                          borderColor="gray.400"
                          boxShadow="buttonShadow"
                          src={previewUrlDbq ? previewUrlDbq : returnAvatarImage(dbq?.fotoDbq)}
                        />
                        <Input
                          name="fotoDbq"
                          label="Foto 3x4 DBQ"
                          className="uploadInput"
                          type="file"
                          h={8}
                          onChange={(e) => handleFileInputChange(e, "fotoDbq")}
                        />
                        <Button variant="outline" size="lg" ml={2} mt={8} _hover={{ bgColor: "green.800" }}
                          borderColor="green.800" onClick={(e) => handleSubmitImage(e, dbq?.id, "fotoDbq")}>Upload</Button>

                      </Flex>
                      <Flex flexDir={"row"} mb={2} gap={4} justifyItems="center" alignItems="center">
                        <Avatar
                          size="xl"
                          bg="green.700"
                          border="5px"
                          borderColor="gray.400"
                          boxShadow="buttonShadow"
                          icon={<HiOutlineIdentification fontSize='xl' />}
                          src={previewUrlDbqDoc ? previewUrlDbqDoc : returnAvatarImage(dbq?.fotoDocDbq)}
                        />
                        <Input
                          name="fotoDocDbq"
                          label="Foto do Documento DBQ"
                          className="uploadInput"
                          h={8}
                          type="file"
                          onChange={(e) => handleFileInputChange(e, "fotoDbqDoc")}
                        />
                        <Button variant="outline" size="lg" ml={2} mt={8} _hover={{ bgColor: "green.800" }}
                          borderColor="green.800" onClick={(e) => handleSubmitImage(e, dbq?.id, "fotoDocDbq")}>Upload</Button>

                      </Flex>
                    </>
                  ) :
                    <Flex bg="blackAlpha.600" w="full" h="full" rounded="lg" border="1px solid" borderColor="red.600" justifyContent="center" alignItems={"center"}>
                      <Icon color="red.600" as={FiAlertTriangle} />
                      <Text ml={2}>Cadastre um DBQ primeiro para em seguida enviar uma foto.</Text>
                    </Flex>
                  }

                </Flex>
              </Grid>
            ) : null}

          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
