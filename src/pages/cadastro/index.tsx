import {
  Flex,
  Button,
  Stack,
  Image,
  Heading,
  FormControl,
  useToast,
  Text,
  Grid,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";
import Router from "next/router";
import Link from "next/link";
import { verificaSenha } from '../../utils/scripts';
import { useState } from "react";
import Head from "next/head";


// CODIGO PARA SIMULAR MILITARES NO BANCO DE DADOS

//  import { faker } from '@faker-js/faker'
//  if(process.env.NODE_ENV === "development"){
//  const amountOfUsers = 80;

//   for (let i = 0; i < amountOfUsers; i++) {
//     const firstName = faker.name.firstName()
//     const lastName = faker.name.lastName()

//     const militar = {
//         nomeCompleto: faker.name.fullName({ firstName, lastName }),
//         nomeGuerra: faker.name.firstName(),
//         identidade: faker.random.numeric(10),
//         postoGrad: faker.helpers.arrayElement(['SD', 'CB', '3 SGT', '2 SGT', '1 SGT', 'SUB TEN', '2 TEN', '1 TEN', 'CAP', 'MAJ', 'TEN CEL', 'CEL']),
//         senha: '123456',
//         companhia: faker.helpers.arrayElement(['1 CIA', '2 CIA', '3 CIA', 'CCAp', 'EM']),
//         pelotao: faker.helpers.arrayElement(['1 PEL', '2 PEL', '3 PEL', 'SEC CMDO', 'PEL AP']),
//     };

//     const createMilitar = async () => await api.post("/militar/create", militar)
//     createMilitar()
//   }
// }




type SignInFormData = {
  nomeCompleto: string;
  nomeGuerra: string;
  identidade: string;
  senha: string;
  postoGrad: string;
  companhia: string;
  pelotao: string;
};

const signInFormSchema = yup.object().shape({
  nomeCompleto: yup.string().required("Obrigatório"),
  nomeGuerra: yup.string().required("Obrigatório"),
  identidade: yup.string().required("Identidade obrigatória."),
  postoGrad: yup.string().required("Obrigatório."),
  senha: yup.string().required("Senha obrigatória."),
  companhia: yup.string(),
  pelotao: yup.string(),
});

export default function Cadastro() {
  const toast = useToast();
  const [senha, setSenha] = useState("")

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      const result = await api.post("/militar/create", values);
      if (result.status == 201) {
        toast({
          title: "Militar cadastrado.",
          description: "Os dados do militar foram cadastrados no sistema.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        Router.push("/");
      } else {
        toast({
          title: "Militar não cadastrado.",
          description: "Talvez a identidade já esteja cadastrada.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Militar não cadastrado.",
        description: "Verifique os dados do militar.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Head>
        <title>SisAGI | Cadastro de usuário</title>
      </Head>
    <Flex w="100vw" flexDir="row" align="center" justify="center" my={4}>
      <Grid
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
        boxShadow="buttonShadow"
        bg="#1b1b1b44" backdropFilter="blur(5px)"
        rounded="2xl"
        px={8}
      >
        <Flex w={["200px", "300px", "300px"]} mx="auto" align="center" justify="center">
          <Image src="./img/logo13bib.png" alt="brasão Cmdo Fron RN / 5 BIS" />
        </Flex>
        <Flex
          as="form"
          w="100%"
          flexDir="column"
          maxWidth={420}
          p="8"
          borderRadius={8}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack
            spacing={2}
            border="1px"
            boxShadow="buttonShadow"
            borderColor="green.800"
            bg="gray.990"
            rounded="2xl"
            pb={4}
            px={6}
          >
            <Flex align="center" justify="center" flexDir="column">
              <Heading
                fontWeight="bold"
                letterSpacing="tight"
                bgGradient="linear(to-tr, green.300, gray.600, green.300 )"
                bgClip="text"
                size="2xl"
                mt={2}
                p={4}
              >
                SisAGI
              </Heading>
              <Text fontSize={["sm", "md", "lg"]}>
                Sistema de Apoio a Gestão Interna
              </Text>
              <Heading as="h2" size="md">
                13º BIB
              </Heading>
            </Flex>
            <Input
              name="nomeCompleto"
              label="Nome Completo"
              type="text"
              error={errors.nomeCompleto}
              {...register("nomeCompleto")}
            />
            <FormControl>
              <Input
                as="select"
                label="P/G"
                focusBorderColor="green.500"
                name="postoGrad"
                bgColor="gray.990"
                textColor="gray.200"
                variant="filled"
                _hover={{ bgColor: "gray.900" }}
                size="lg"
                placeholder="Selecione"
                {...register("postoGrad")}
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
            <Input
              name="nomeGuerra"
              label="Nome de Guerra"
              placeholder="Fulano (nome de guerra)"
              type="text"
              error={errors.nomeGuerra}
              {...register("nomeGuerra")}
            />
            <Input
              name="identidade"
              label="Nrº Identidade"
              type="text"
              error={errors.identidade}
              {...register("identidade")}
            />
            <Input
              name="local"
              label="Companhia"
              type="text"
              as="select"
              error={errors.companhia}
              {...register("companhia")}
            >
              <option value="1 CIA">1 CIA</option>
              <option value="2 CIA">2 CIA</option>
              <option value="3 CIA">3 CIA</option>
              <option value="CCAp">CCAp</option>
              <option value="EM">EM</option>
              <option value="BANDA">BANDA</option>
            </Input>
            <Input
              name="local"
              label="Pelotão"
              type="text"
              as="select"
              error={errors.pelotao}
              {...register("pelotao")}
            >
              <option value="Nenhum">Nenhum</option>
              <option value="1 PEL">1 PEL</option>
              <option value="2 PEL">2 PEL</option>
              <option value="3 PEL">3 PEL</option>
              <option value="PEL Ap">PEL Ap</option>
              <option value="SEC CMDO">SEC CMDO</option>
              <option value="MUSICA">MUSICA</option>
            </Input>
            <FormControl>
              <Input
                name="senha"
                label="Senha"
                type="password"
                error={errors.senha}
                onFocus={(e) => setSenha(verificaSenha(e.target.value))}
                {...register("senha")}
              />
              <FormHelperText color="red.600">{senha}</FormHelperText>
            </FormControl>
            <Flex flexDir="row" justifyContent="space-between">
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

              <Button
                boxShadow="buttonShadow"
                variant="ghost"
                w="100%"
                transition="0.3s"
                _hover={{ border: "1px", borderColor: "yellow.700" }}
                mt="6"
                colorScheme="yellow"
                size="lg"
              >
                <Link href="/">Voltar</Link>
              </Button>
            </Flex>
          </Stack>

          <Flex
            textAlign="center"
            boxShadow="buttonShadow"
            my={4}
            alignItems="center"
            w="full"
            bg="blackAlpha.500"
            rounded="lg"
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="tight"
              bgGradient="linear(to-tr, green.300, gray.600, green.300 )"
              bgClip="text"
              p={2}
              w="full"
            >
              Desenvolvido pelo 3ªSgt Henry - 2016
            </Text>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
    </>
  );
}
// REGEX PARA NAO USAR SENHAS FÁCEIS
// const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
