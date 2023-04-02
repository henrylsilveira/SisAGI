import {
  Badge,
  Button,
  Circle,
  Flex,
  Grid,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Square,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MaterialArray } from "../../@types/types";
import { TiInfoLarge } from "react-icons/ti";

export function ListarMaterialCompanhias(props) {
  const cia = props.companhia as string;
  const materiais = props.materiais as MaterialArray;

  return (
    <Grid gridTemplateRows="auto 1fr">
      <Grid
        gridTemplateRows="auto 1fr"
        bg="gray.990"
        boxShadow="buttonShadow"
        m={2}
        textAlign="center"
      >
        <Heading size="md" p={2}>
          {cia === "1 CIA"
            ? "1ª Companhia de Fuzileiro de Selva"
            : cia === "2 CIA"
            ? "2ª Companhia de Fuzileiro de Selva"
            : cia === "3 CIA"
            ? "3ª Companhia de Fuzileiro de Selva"
            : cia === "CCAp"
            ? "Companhia de Comando e Apoio"
            : cia === "EM"
            ? "Estado Maior"
            : cia}
        </Heading>
      </Grid>
      <Flex
        bgGradient="linear(to-tr, gray.900, gray.990, gray.900)"
        boxShadow="buttonShadow"
        rounded="lg"
        justifyContent="center"
        m={2}
      >
        <TableContainer w="100%">
          <Table size="xs" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th textAlign="center">Material</Th>
                <Th textAlign="center">Informações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {materiais
                ?.filter((mat) => mat.sub_unidade === cia).sort((x, y) => {
                  let a = x.nome.toUpperCase(),
                    b = y.nome.toUpperCase();
                  return a == b ? 0 : a > b ? 1 : -1;
                })
                .map((res) => (
                  <Tr key={res.id + res.condicoes}>
                    <Td textAlign="center">{res.nome}</Td>
                    <Td textAlign="center">
                      <Popover placement="top-start">
                        <PopoverTrigger>
                          <Circle
                            size="30px"
                            bg="green.600"
                            _hover={{ bgColor: "green.800" }}
                            boxShadow="buttonShadow"
                            py={1}
                            my={1}
                            mx="auto"
                          >
                            <Icon boxSize={6} as={TiInfoLarge} />
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
                            Informações sobre o material
                          </PopoverHeader>
                          <PopoverArrow bg="gray.990" />
                          <PopoverCloseButton />
                          <PopoverBody
                            as="div"
                            wordBreak="normal"
                            h="auto"
                            py={6}
                            overflow="scroll"
                          >
                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              Dependência
                              <Flex
                                p={2}
                                rounded="lg"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                              >
                                {res.dependencia}
                              </Flex>
                            </Flex>
                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              Quantidade
                              <Circle
                                size="40px"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                              >
                                {res.quantidade}
                              </Circle>
                            </Flex>

                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              Disponíveis{" "}
                              <Circle
                                size="40px"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                              >
                                {res.quantidade -
                                  res.cautelas
                                    ?.filter((c: any) => c.status === "ativo")
                                    .reduce((total = 0, cautela) => {
                                      return total + cautela.quantidade;
                                    }, 0)}{" "}
                              </Circle>
                            </Flex>
                            <Flex
                              boxShadow="buttonShadow"
                              px={4}
                              py={1}
                              m={1}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              Condições{" "}
                              <Circle
                                size="40px"
                                bg="green.700"
                                boxShadow="buttonShadow"
                                fontWeight="bold"
                                _hover={{ bgColor: "green.800" }}
                              >
                                <Popover>
                                  <PopoverTrigger>
                                    <Icon boxSize={6} as={TiInfoLarge} />
                                  </PopoverTrigger>
                                  <PopoverContent
                                    bg="gray.990"
                                    border="1px"
                                    borderColor="green.700"
                                  >
                                    <PopoverHeader
                                      bg="gray.990"
                                      boxShadow="buttonShadow"
                                      m={4}
                                      justifyContent="space-between"
                                      alignItems="center"
                                      py={2}
                                      borderBottom="none"
                                    >
                                      Condições do material
                                    </PopoverHeader>
                                    <PopoverArrow bg="gray.990" />
                                    <PopoverCloseButton />
                                    <PopoverBody
                                      as="div"
                                      wordBreak="normal"
                                      h="auto"
                                      py={6}
                                      overflow="scroll"
                                    >
                                      <Flex
                                        boxShadow="buttonShadow"
                                        px={4}
                                        py={1}
                                        m={1}
                                        alignItems="center"
                                        justifyContent="space-between"
                                      >
                                        {res.condicoes}
                                      </Flex>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </Circle>
                            </Flex>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th textAlign="center">Material</Th>
                <Th textAlign="center">Informações</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </Grid>
  );
}
