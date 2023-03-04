import { Box, Flex, Grid, Heading, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import { ListarMaterialCompanhias } from '../../../components/Material/ListarMaterialCompanhias';
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { MaterialArray } from "../../../@types/types";

export default function MaterialGeral() {

    const { isLoading, error, data, isFetching, refetch } = useQuery(
        ["todosMateriais"],
        async () => {
          const result = await api.get<MaterialArray>("/material");
          return result.data;
        }
      );

  return (
    <>
      <Head>
        <title>SisAGI | Material - Geral</title>
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
              transition="ease-in-out"
              w="100%"
              flexDirection="column"
              my={4}
            >
              <Flex
                bg="gray.990"
                boxShadow="buttonShadow"
                m={4}
                justifyContent="center"
              >
                <Heading size="md" p={2}>
                  MATERIAIS DO BATALHÃO
                </Heading>
              </Flex>
              <Grid gridTemplateColumns={["1fr","1fr 1fr","1fr 1fr 1fr"]} gap={4}>
              {Array.from(new Set(data?.map((item) => item.sub_unidade))).map(
                    (cia, index) => (
                        <ListarMaterialCompanhias key={cia+index+cia} companhia={cia} materiais={data} />
                    )
                )}
              
            </Grid>
            </Flex>

            
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
