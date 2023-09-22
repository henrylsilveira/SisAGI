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
    Text,
    Icon
} from "@chakra-ui/react";

import Head from "next/head";
import { returnAvatarImage, convertISODateToInputValue } from '../../../utils/scripts';
import { FormEvent, useState } from "react";
import { api } from "../../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Form/Input";
import { HiOutlineIdentification } from 'react-icons/hi2'
import { PesquisarCivil } from "../../../components/Drawer/s2";

import { Civil } from '../../../@types/types';
import { FiAlertTriangle, FiUserPlus } from "react-icons/fi";



type DbqFormData = {
    nomeCompleto: string;
    identidade: string;
    cpf: string;
    nomePai: string;
    nomeMae: string;
    dataNascimento: string;
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
    dataNascimento: yup.string(),
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

export default function CadastroCivil() {
    const [file, setFile] = useState(null);
    const [civil, setCivil] = useState<Civil>();
    const [previewUrlFoto, setPreviewUrlFoto] = useState(null);
    const [previewUrlFotoDoc, setPreviewUrlFotoDoc] = useState(null);
    const toast = useToast()

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInFormSchema),
    });


    // function setDbqUpdate(dbq: Dbq){
    //   setCivil(dbq.civil)
    //   setDbq(dbq)
    // }

    function handleNovoCadastro() {
        setCivil(null)
        setPreviewUrlFoto(null)
        setPreviewUrlFotoDoc(null)
        reset()
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
            const result = await api.post("/civil/create", values);
            if (result.status == 201) {
                toast({
                    title: "Civil",
                    description: "Os dados do civil foram cadastrados no sistema.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setCivil(result?.data.civil)
            } else {
                toast({
                    title: "Civil",
                    description: "Talvez a identidade já esteja cadastrada.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Civil",
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
                                    <Button mr={2} colorScheme='facebook' size='sm' onClick={handleNovoCadastro}>
                                        <Icon as={FiUserPlus} w={4} h={4} />
                                    </Button>
                                    <PesquisarCivil civil={setCivil} />
                                </Flex>
                            </Flex>

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
                                    name="dataNascimento"
                                    label="Data de Nascimento"
                                    type="date"
                                    error={errors.dataNascimento}
                                    defaultValue={convertISODateToInputValue(civil?.dataNascimento)}
                                    {...register("dataNascimento")}
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
                                    name="profissao"
                                    label="Profissão"
                                    type="text"
                                    error={errors.profissao}
                                    {...register("profissao")}
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
                            <Flex
                                bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                                boxShadow="innerShadow"
                                rounded="lg"
                                w="full"
                                mt={4}
                                justifyContent="center"
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
                                    {civil?.id ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <Flex bg="blackAlpha.600" w="full" h="full" rounded="lg" border="1px solid" borderColor="red.600" justifyContent="center" alignItems={"center"}>
                                            <Icon color="red.600" as={FiAlertTriangle} />
                                            <Text ml={2}>Cadastre um DBQ primeiro para em seguida enviar uma foto.</Text>
                                        </Flex>
                                    )}

                                </Flex>

                            </Flex>
                        ) : null}

                    </Box>
                </SimpleGrid>
            </Flex>
        </>
    );
}
