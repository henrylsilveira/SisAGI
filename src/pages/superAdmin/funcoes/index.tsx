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
    Tag,
    Avatar,
    TagLabel,
    Circle,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
  } from "@chakra-ui/react";
  import { useQuery } from "react-query";
  import { api } from "../../../services/api";
  import { useState } from "react";
  
  import Head from "next/head";
  import {
    Militar,
    MilitarArray,
  } from "../../../@types/types";
  import { RxUpdate } from "react-icons/rx";
  import { DadosPessoais } from "../../../components/SuperAdmin/Forms/DadosPessoais";
  import { DadosMilitares } from "../../../components/SuperAdmin/Forms/DadosMilitares";
  import { Endereco } from "../../../components/SuperAdmin/Forms/Endereco";
import { FuncaoMilitarArray } from '../../../@types/types';
import { TiInfoLarge } from "react-icons/ti";
import { convertISODateToInputValue, convertDateFuncaoMilitar } from '../../../utils/scripts';
  
  export default function SuperAdminFuncoes() {
    const [result, setResult] = useState<MilitarArray>([]);
    const [militarFuncao, setMilitarFuncao] = useState<MilitarArray>([]);
  
    const [search, setSearch] = useState(result);
  
    const { data ,refetch } = useQuery(
      ["todasfuncoes"],
      async () => {
        const result = await api.get<FuncaoMilitarArray>("/funcoes");
        return result.data;
      }
    );
    const { data: militares ,refetch: refMilitares } = useQuery(
        ["todosMilitares"],
        async () => {
          const result = await api.get<MilitarArray>("/militar");
          return result.data;
        }
      );

      async function handleGetFunctionMilitar(militares: MilitarArray, funcao: string) {  
        const filterMilitarFuncao = militares.filter(mil => mil?.Funcao.find((fun) => fun.funcao == funcao.toLowerCase()))
        console.log(filterMilitarFuncao);
        setMilitarFuncao(filterMilitarFuncao);
      }
  
    return (
      <>
        <Head>
          <title>SisAGI | Administração - Funções</title>
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
                  {Array.from(new Set(data?.map((item) => item.funcao))).map(
                    (func, index) => (
                        <AccordionItem border="0" mb={2}  key={func + index} onClick={() => handleGetFunctionMilitar(militares, func)}>
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
                                {func}
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
                          {militarFuncao?.map(militar => (
                            <Tag mr={4} mt={2} size='lg' bg='green.800' borderRadius='full' key={militar.id + militar.identidade}>
                            <Avatar
                              src=""
                              size='xs'
                              name={militar.nome_completo}
                              bg="green.400"
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel mr={2} color="white">{`${militar.post_grad} ${militar.nome_guerra}`}</TagLabel>
                            <Popover placement="top-start">
                        <PopoverTrigger>
                          <Circle
                            size="20px"
                            bg="gray.990"
                            _hover={{ bgColor: "gray.700" }}
                            boxShadow="buttonShadow"
                            py={1}
                            mx="auto"
                          >
                            <Icon boxSize={5} color="green.600" as={TiInfoLarge} />
                          </Circle>
                        </PopoverTrigger>
                        <PopoverContent
                          bg="gray.990"
                          border="1px"
                          borderColor="green.700"
                        >
                          <PopoverHeader
                            fontWeight="bold"
                            bg="gray.990"
                            boxShadow="buttonShadow"
                            m={4}
                            justifyContent="space-between"
                            alignItems="center"
                            py={2}
                            borderBottom="none"
                          >
                            Informações sobre militar
                          </PopoverHeader>
                          <PopoverArrow bg="gray.990" />
                          <PopoverCloseButton />
                          <PopoverBody
                            as="div"
                            wordBreak="normal"
                            h="auto"
                            py={6}
                            overflow="scroll"
                            color='white'
                          >
                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Flex
                                p={2}
                                rounded="lg"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                              >
                                Identidade
                              </Flex>
                              {militar.identidade}
                            </Flex>
                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Flex
                                p={2}
                                rounded="lg"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                              >
                                Data de Início
                              </Flex>
                              {/* {militar.Funcao.find(fun => fun.funcao === func.toLowerCase()).data_inicio} */}
                            </Flex>
                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Flex
                                p={2}
                                rounded="lg"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                              >
                                Data de Termino
                              </Flex>
                          {/* {convertDateFuncaoMilitar(militar, func)} */}
                            </Flex>
                            
                            
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                          </Tag>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    )
                )}
                    </Accordion>
                </Box>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </>
    );
  }
  