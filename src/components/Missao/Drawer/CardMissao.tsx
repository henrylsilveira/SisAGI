import { Grid, Flex, Avatar, AvatarBadge, Text, Divider, Icon, Button } from "@chakra-ui/react";
import { convertDate, convertISODateToInputValue, formatarDataHora, generateNowISOTime, returnAvatarImage } from "../../../utils/scripts";
import { Militar, Missao, MissaoArray } from "../../../@types/types";
import { memo, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useQuery } from "react-query";
import { api } from "../../../services/api";

function CardMissaoComponent(props) {
  const missoes = props.missoes;
  const [militar,setMilitar] = useState({})
  
  async function getMilitarId(id: string, type: "nome" | "avatar") {
    const result = await api.get<Militar>(`/militar/${id}`)
    if(type === 'nome'){
      return result.data.nome_completo
    }else if(type === 'avatar'){
      return result.data.nome_completo
    }
    return setMilitar(militar)
  }

  return missoes.map((missao: Missao, index) => (
    <Grid
      gridTemplateColumns="1fr 3fr"
      bg="gray.990"
      boxShadow="buttonShadow"
      borderRadius="lg"
      key={missao.id + index}
      alignItems="center"
      mb={2}
      border={convertDate(missao.data_finalizacao) === convertDate(generateNowISOTime()) ? "1px" : "0px"}
      borderColor={convertDate(missao.data_finalizacao) == convertDate(generateNowISOTime()) ? "red.700" : ""}
    >
      <Flex flexDirection="column" alignItems="center" p={2}>
        <Avatar
          size="lg"
          name={missao.militar.nome_completo}
          bg="green.700"
          mx={4}
          my={1}
          src={returnAvatarImage(missao.militar.avatar_url)}
        >
          <AvatarBadge borderColor="gray.990" boxSize="1.1em" bg="green.500" />
        </Avatar>
        <Text boxShadow="buttonShadow" fontSize="xs" p={2}>{missao.militar.post_grad + " " + missao.militar.nome_guerra}</Text>
      </Flex>
      <Flex flexDirection="column" p={4}>
        <Text
          textAlign="center"
          ml="auto"
          fontWeight="bold"
        >
          {convertDate(missao.data_finalizacao)}
        </Text>
        <Divider borderColor="green.700" />
        <Text p={2}
        >
          <Text textTransform="uppercase" color="red.700">Missão: </Text>{missao.descricao}
        </Text>
        <Divider borderColor="green.700" />
        <Flex gap={2} ml="auto">
          <Button bg="gray.990"
            size="md"
            _hover={{ border: "1px", borderColor: "green.700" }}
            py="1"
            boxShadow="buttonShadow">
            <Icon as={FiCheck} />
          </Button>
          <Button bg="gray.990"
            size="md"
            _hover={{ border: "1px", borderColor: "green.700" }}
            py="1"
            boxShadow="buttonShadow">
            <Icon as={FiCheck} />
          </Button>
        </Flex>

      </Flex>
    </Grid>
  ));
}

export const CardMissao = memo(
  CardMissaoComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.props, nextProps.props);
  }
);
