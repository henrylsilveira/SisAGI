import {
  Avatar,
  Badge,
  Flex,
  Grid,
  Heading,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { MissaoArray } from "../../@types/types";
import { compareDate, convertDate } from "../../utils/scripts";

export function MissoesPainel(props: {
  missoes: MissaoArray;
  sessionId: string;
}) {
  const missoesDesignadas = props?.missoes?.filter(
    (missao) => missao.militar_origem === props.sessionId
  );
  const missoesRecebidas = props?.missoes?.filter(
    (missao) => missao.militar_destino === props.sessionId
  );
  return (
    <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
      <Flex flexDirection="column" m={2}>
        <Heading
          textAlign="center"
          boxShadow="buttonShadow"
          p={1}
          fontSize={16}
        >
          Recebidas
        </Heading>
        {missoesRecebidas?.map((missao, index) => (
          <Flex
            key={missao.id + index}
            boxShadow="buttonShadow"
            p={2}
            justifyContent="space-between"
            borderRadius="base"
            alignItems="center"
          >
            <Tag
              size="lg"
              bg="green.700"
              borderRadius="full"
              boxShadow="buttonShadow"
            >
              <TagLabel>{`${missao.militar.post_grad}  ${missao.militar.nome_guerra}`}</TagLabel>
            </Tag>
            <Text
              textAlign="center"
              color={compareDate(convertDate(missao.data_finalizacao))}
            >
              {convertDate(missao.data_finalizacao)}
            </Text>
            <Badge variant="outline" colorScheme="green">
              {missao.situacao}
            </Badge>
          </Flex>
        ))}
      </Flex>

      <Flex flexDirection="column" m={2}>
        <Heading
          textAlign="center"
          boxShadow="buttonShadow"
          p={1}
          fontSize={16}
        >
          Designadas
        </Heading>
        {missoesDesignadas?.map((missao, index) => (
          <Flex
            key={missao.id + index}
            boxShadow="buttonShadow"
            p={2}
            justifyContent="space-between"
            borderRadius="base"
            alignItems="center"
          >
            <Tag
              size="lg"
              bg="green.700"
              borderRadius="full"
              boxShadow="buttonShadow"
            >
              <TagLabel>{`${missao.militar.post_grad}  ${missao.militar.nome_guerra}`}</TagLabel>
            </Tag>
            <Text
              textAlign="center"
              color={compareDate(convertDate(missao.data_finalizacao))}
            >
              {convertDate(missao.data_finalizacao)}
            </Text>
            <Badge variant="outline" colorScheme="green">
              {missao.situacao}
            </Badge>
          </Flex>
        ))}
      </Flex>
    </Grid>
  );
}
