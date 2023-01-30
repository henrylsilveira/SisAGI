/* eslint-disable react/no-unescaped-entities */
import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useState } from "react";

import Head from "next/head";
import {
  Militar,
  MilitarArray,
} from "../../@types/types";
import { DadosMilitares, DadosPessoais, Endereco } from "../../components/SuperAdmin/Forms";
import { RxUpdate } from "react-icons/rx";

export default function SuperAdmin() {
  const [result, setResult] = useState<MilitarArray>([]);
  const [militar, setMilitar] = useState<Militar>();

  const [search, setSearch] = useState(result);

  const { refetch } = useQuery(
    ["todosMilitares"],
    async () => {
      const result = await api.get<MilitarArray>("/militar");
      setResult(result.data);
      return result;
    }
  );

  async function handleGetMilitar(id: string) {  
    const res = await api.get<Militar>(`/militar/${id}`); 
    setMilitar(res.data);
  }

  return (
    <>
      <Head>
        <title>SisAGI | Administração</title>
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
              boxShadow="buttonShadow"
              rounded="lg"
              w="100%"
              flexDirection="column"
              mb={4}
            >
              <Flex bg="gray.990" boxShadow="buttonShadow" m={4} alignItems='center' justifyContent='space-between'>
                <Heading size="md" p={2}>
                  Militares
                </Heading>
                <Button
          boxShadow="buttonShadow"
          colorScheme="messenger"
          size="xs"
          p={4}
          mr={2}
          onClick={() => refetch}
        >
          <RxUpdate size={16} />
        </Button>
              </Flex>
              <Box m="auto" w="100%" h="100%" px={2}>
                <Accordion allowToggle>
                  {result.map((mil: Militar, index) => (
                    <AccordionItem border="0" mb={2}  key={index} onClick={() => handleGetMilitar(mil.id)}>
                      <h2>
                        <AccordionButton
                          boxShadow="buttonShadow"
                          bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                          rounded={4}
                          px={4}
                          py="0.5"
                          w="full"
                          border="0"
                        >
                          <Box as="span" flex="1" textAlign="left" py={2}>
                            <Text
                              fontWeight="extrabold"
                              textTransform="uppercase"
                            >
                              {mil.nome_completo}
                              <Badge
                                variant="outline"
                                colorScheme="green"
                                ml={2}
                              >
                                {mil.post_grad + " " + mil.nome_guerra}
                              </Badge>
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        as="div"
                        pb={4}
                        border="0"
                        borderTop={0}
                        roundedBottom="lg"
                        borderColor="green.600"
                        bgColor="gray.990"
                        boxShadow="innerShadow"
                      >
                        <Flex
                          flexDirection="row"
                          gap={4}
                          justifyContent="space-between"
                        >
                          <DadosPessoais militar={{...mil, ...militar}} />
                          <DadosMilitares militar={{...mil, ...militar}} />
                        </Flex>
                        <Endereco militar={{...mil, ...militar}} />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                  </Accordion>
              </Box>
            </Flex>
            {/* <Flex flexDirection="row" gap={4} justifyContent="space-between">
              <Flex
                bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                boxShadow="buttonShadow"
                rounded="lg"
                w="100%"
                flexDirection="column"
              >
                <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
                  <Heading size="md" p={2}>
                    Dados Pessoais
                  </Heading>
                </Flex>
                <Box m="auto" w="100%" h="100%" px={2}></Box>
              </Flex>
              <Flex
                bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
                boxShadow="buttonShadow"
                rounded="lg"
                transition="ease-in-out"
                w="100%"
                flexDirection="column"
              >
                <Flex bg="gray.990" boxShadow="buttonShadow" m={4}>
                  <Heading size="md" p={2}>
                    Dados Militares
                  </Heading>
                </Flex>
              </Flex>
            </Flex> */}
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
