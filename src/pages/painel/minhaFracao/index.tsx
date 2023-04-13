import { Flex, SimpleGrid, Box, Button, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { Organogram } from "../../../components/Organogram";
import { RxUpdate } from "react-icons/rx";

export default function minhaFracao() {
    return (
        <>
          <Head>
            <title>SisAGI | Minhas Cautelas</title>
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
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading size="md" p={2}>
                  MILITARES
                </Heading>
              </Flex>
                <Organogram />
                </Flex>
              </Box>
            </SimpleGrid>
          </Flex>
        </>
      );
}