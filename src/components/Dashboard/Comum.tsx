import { Flex, Grid, Heading, VStack } from "@chakra-ui/react";
import { ArmamentoComponentPainel } from '../Painel/Armamento';
import { CautelasComponentPainel } from '../Painel/Cautelas';
import { SessaoComponentPainel } from "../Painel/Sessao";

export function ComumComponentDashboard() {
    return (
        <Flex
        bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
        boxShadow="buttonShadow"
        rounded="lg"
        transition="ease-in-out"
        w="100%"
        flexDirection="column"
        mt={4}
      >
        <Flex
          bg="gray.990"
          boxShadow="buttonShadow"
          m={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md" p={2}>
            ESTATISTICAS
          </Heading>
        </Flex>
        <SessaoComponentPainel />
        <Grid
        gridTemplateColumns={["1fr","1fr 1fr "]}
          bg="gray.990"
          boxShadow="buttonShadow"
          rounded='md'
          m={4}
          gap={4}
          justifyContent="space-between"
          alignItems="center"
          p={4}
        >
            <CautelasComponentPainel />
            <ArmamentoComponentPainel />
        </Grid>
        </Flex>
    )
}