import {
  Avatar,
  AvatarBadge,
  Badge,
  Flex,
  Grid,
  Heading,
  VStack,
  Text,
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

export function Organogram() {
  const { data: session } = useSession();

  const { data, refetch, isLoading } = useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get<MilitarArray>("/militar");

      return result.data.filter(
        (mil) =>
          mil.companhia === session?.militar.companhia &&
          mil.pelotao === session?.militar.pelotao
      );
    }
  );

  return (
    <>
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
        {OrganogramGpCmdoArray.map((funcao, index) =>
          data
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
            {OrganogramGCArray.map((funcao, index) =>
              data
                ?.filter(
                  (mil) => mil.funcao_fracao === funcao && mil.fracao === gc
                )
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
                        {mil.tipo_sanguineo
                          ? mil.tipo_sanguineo
                          : "Não cadastrado"}
                      </Text>
                    </Flex>
                  </Grid>
                ))
            )}
          </VStack>
        ))}
      </Grid>
    </>
  );
}
