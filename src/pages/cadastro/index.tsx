import {
  Flex,
  Button,
  Stack,
  Image,
  Heading,
  Link,
  Select,
  FormLabel,
  FormControl,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";
import Router from "next/router";

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

export default function Home() {
  const toast = useToast()
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
      const result = await api.post('/militar/create', values )
      if(result.status == 201) {
          toast({
          title: 'Militar cadastrado.',
          description: "Os dados do militar foram cadastrados no sistema.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        Router.push('/')
      }else {
        toast({
        title: 'Militar não cadastrado.',
        description: "Talvez a identidade já esteja cadastrada.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      }
    } catch (error) {
      toast({
        title: 'Militar não cadastrado.',
        description: "Verifique os dados do militar.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    
  };

  return (
    <Flex w="100vw" h="100vh" flexDir="row" align="center" justify="center">
      <Flex bg="gray.800" rounded="lg" px={8}>
        <Flex align="center" justify="center">
          <Image src="./img/CFRN5BIS.png" alt="brasão Cmdo Fron RN / 5 BIS" />
        </Flex>
        <Flex
          as="form"
          w="100%"
          flexDir="column"
          maxWidth={360}
          p="8"
          borderRadius={8}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Flex align="center" justify="center" flexDir="column">
              <Heading as="h1" size="2xl" pb={4}>
                SisAGI
              </Heading>
              <Heading as="h2" size="md">
                Cmdo Fron RN / 5 BIS
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
                bgColor="gray.900"
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
              </Input>
            <Input
              name="senha"
              label="Senha"
              type="password"
              error={errors.senha}
              {...register("senha")}
            />
          </Stack>
          <Flex flexDir="row" justifyContent="space-between">
            <Button
              type="submit"
              mt="6"
              colorScheme="blue"
              size="lg"
              isLoading={formState.isSubmitting}
            >
              Cadastrar
            </Button>
            <Link href="/">
              <Button mt="6" colorScheme="yellow" size="lg">
                Voltar
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
