import { Flex, Heading, Button, Grid, FormControl, FormHelperText, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FcAcceptDatabase } from "react-icons/fc";
import { Militar } from "../../../@types/types";
import { Input } from "../../Form/Input";
import { useState, FormEvent } from 'react';
import { api } from "../../../services/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

//Dynamic permite carregar o componente somente quando for necessario, exemplo quando for clicar em um botao
const MapWithNoSSR = dynamic(() => import("../../Map"), {
    loading: () => <p>Carregando...</p>,
  ssr: false,
});

export function Mapa(props) {
  const mil = props.militar as Militar;
  const { data: session } = useSession();
  const { asPath } = useRouter();
  const toast = useToast();

  const [latitude, setLatitude] = useState({});
  const [longitude, setLongitude] = useState({});

  async function handleSubmitMapaInfo(e: FormEvent) {
    e.preventDefault();
    try {
      const result =  await api.post('/militar/dados', {...latitude, id: mil.id} )
      const result2 =  await api.post('/militar/dados', {...longitude, id: mil.id} )

      if(result.status == 201 && result2.status == 201) {
          toast({
          title: 'Militar',
          description: "Dados atualizados.",
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      }else {
        toast({
        title: 'Militar',
        description: "Dados não atualizados.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      }
    } catch (error) {
      toast({
        title: 'Militar',
        description: "Erro interno",
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
          Mapa
        </Heading>
        {mil.longitude !== "" && mil.latitude !== "" ? (
          <Button
            boxShadow="buttonShadow"
            colorScheme="messenger"
            size="sm"
            mr={2}
            onClick={(e) => handleSubmitMapaInfo(e)}
          >
            <FcAcceptDatabase size={20} />
            Salvar
          </Button>
        ) : null}
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
            defaultValue={mil.longitude}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            onChange={(e) => setLongitude({name: e.target.name,value: e.target.value})}
          />
          <FormHelperText>
              Ex: -0.12625
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            label="Latitude"
            name="latitude"
            defaultValue={mil.latitude}
            bgColor="gray.990"
            type="text"
            border="1px"
            borderColor="gray.700"
            _hover={{ bgColor: "gray.990" }}
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin" || func.funcao == "sgte") && (asPath == "/superAdmin/usuarios" || asPath == "/pessoal/gerenciamento") ? false : true}
            onChange={(e) => setLatitude({name: e.target.name,value: e.target.value})}
          />
          <FormHelperText>
            Ex: -67.0745186
          </FormHelperText>
        </FormControl>
      </Grid>
      <Flex>
        <MapWithNoSSR />
      </Flex>
    </>
  );
}
