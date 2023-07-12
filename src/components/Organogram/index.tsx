import {
  Avatar,
  AvatarBadge,
  Badge,
  Flex,
  Grid,
  Heading,
  VStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { MilitarArray } from "../../@types/types";
import { api } from "../../services/api";
import { returnAvatarImage } from "../../utils/scripts";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import {
  OrganogramGCArray,
  OrganogramGpCmdoArray,
  OrganogramPELArray,
} from "../../utils/staticArray";
import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { NotLoaded } from "../NotLoaded";

export function Organogram() {
  const { data: session } = useSession();
  const [mil, setMil] = useState<MilitarArray>();

  const { isLoading, refetch } = useQuery(["todosMilitares"], async () => {
    const result = await api.get<MilitarArray>("/militar");
    setMil(
      result.data.filter(
        (mil) =>
          mil.companhia === session?.militar.companhia &&
          mil.pelotao === session?.militar.pelotao
      )
    );
  });

  return (
    <>
      <Flex
        bg="gray.990"
        boxShadow="buttonShadow"
        m={4}
        alignItems="center"
        justifyContent="space-between"
        borderRadius="base"
      >
        <Heading size="md" p={2}>
          MILITARES
        </Heading>
        <IconButton
          boxShadow="buttonShadow"
          colorScheme="twitter"
          float="right"
          mr={2}
          my={2}
          onClick={() => refetch()}
          aria-label="Atualizar tabela"
          icon={<SlRefresh />}
        />
      </Flex>
      <VStack mb={4}>
        <Flex
          bg="gray.990"
          boxShadow="buttonShadow"
          m={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading size="md" p={2}>
            Grupo de Comando
          </Heading>
        </Flex>
        {isLoading ? <NotLoaded /> : OrganogramGpCmdoArray.map((funcao, index) =>
          mil
            ?.filter((mil) => mil.funcao_fracao === funcao)
            .map((mil) => (
              <Grid
                gridTemplateColumns="1fr 2fr"
                bg="gray.990"
                boxShadow="buttonShadow"
                borderRadius="lg"
                key={funcao + index + funcao}
              >
                <Flex flexDirection="column" alignItems="center">
                  <Avatar
                    size="lg"
                    name={mil.nome_completo}
                    bg="green.700"
                    mx={4}
                    my={1}
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
                    zIndex="base"
                  >
                    {funcao}
                  </Badge>
                </Flex>
                <Flex flexDirection="column" p={4}>
                  <Text
                    textAlign="center"
                    w="100%"
                    bg="blue.700"
                    px={2}
                    my={1}
                    py={1}
                    borderRadius="md"
                    boxShadow="buttonShadow"
                  >
                    {mil.post_grad + " " + mil.nome_guerra}
                  </Text>
                  <Text
                    textAlign="center"
                    w="100%"
                    bg="red.700"
                    px={2}
                    py={1}
                    borderRadius="md"
                    boxShadow="buttonShadow"
                  >
                    {mil.tipo_sanguineo ? mil.tipo_sanguineo : "Não cadastrado"}
                  </Text>
                </Flex>
              </Grid>
            ))
        )}
      </VStack>
      <Grid gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} my={4}>
        {OrganogramPELArray.map((gc, index) => (
          <VStack key={gc + index + gc} mx={2}>
            <Flex
              bg="gray.990"
              boxShadow="buttonShadow"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
            >
              <Heading size="md" p={2} mx="auto">
                {gc}
              </Heading>
            </Flex>
            {isLoading ? <NotLoaded /> : OrganogramGCArray.map((funcao, index) =>
              mil?.filter((mil) => (mil.funcao_fracao === funcao && mil.fracao === gc)).map((mil) => 
                
                <Grid
                    gridTemplateColumns="1fr 2fr"
                    bg="gray.990"
                    boxShadow="buttonShadow"
                    borderRadius="lg"
                    key={funcao + index + funcao}
                  >
                    <Flex flexDirection="column" alignItems="center">
                      <Avatar
                        size="lg"
                        name={mil.nome_completo}
                        bg="green.700"
                        mx={4}
                        my={1}
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
                        zIndex="base"
                      >
                        {funcao}
                      </Badge>
                    </Flex>
                    <Flex flexDirection="column" p={4}>
                      <Text
                        textAlign="center"
                        w="100%"
                        bg="blue.700"
                        px={2}
                        my={1}
                        py={1}
                        borderRadius="md"
                        boxShadow="buttonShadow"
                      >
                        {mil.post_grad + " " + mil.nome_guerra}
                      </Text>
                      <Text
                        textAlign="center"
                        w="100%"
                        bg="red.700"
                        px={2}
                        py={1}
                        borderRadius="md"
                        boxShadow="buttonShadow"
                      >
                        {mil.tipo_sanguineo
                          ? mil.tipo_sanguineo
                          : "Não cadastrado"}
                      </Text>
                    </Flex>
                </Grid>
                ))
                
            }
          </VStack>
        ))}
      </Grid>
    </>
  );
}
