import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Tfoot,
  Avatar,
  Flex,
} from "@chakra-ui/react";

import { GoSignIn, GoSignOut, GoX } from "react-icons/go";
import { TbMilitaryRank } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { ControleGuardaRegistros } from "../../../@types/types";
import { returnAvatarImage, convertDateAndTime } from "../../../utils/scripts";
import PopoverDestino from "../../CmtGda/PopoverDestino";
import { NotData } from "../../NotData";

export default function CatracaViewTable({
  data,
  handleSubmitForm,
  refetch,
}: {
  data: ControleGuardaRegistros[];
  handleSubmitForm: Function;
  refetch: () => void;
}) {
  return data?.filter((item) => item.status === "ativo").length !== 0 ? (
    <TableContainer overflowY="scroll" zIndex={0}>
      <Table size="sm" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center">Entrada</Th>
            <Th textAlign="center">Saída</Th>
            <Th textAlign="center">Nome</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            ?.sort((a, b) => Number(a.entrada) - Number(b.entrada))
            .filter((registro) => registro.militarId)
            .filter((registro) => registro.status === "ativo")
            .map((registro) => (
              <Tr
                key={registro.id}
                _hover={{
                  shadow: "innerShadow",
                  bg: "gray.990",
                  border: "2px",
                  borderColor: "green.900",
                  rounded: "lg",
                }}
              >
                <Td
                  textAlign="center"
                  bg={registro.civilId ? "green.900" : "blue.900"}
                  shadow={"buttonShadow"}
                  roundedRight={"full"}
                  color="white"
                  w={"50px"}
                >
                  <Flex justifyContent="start" alignItems={"center"} gap={2}>
                    <Avatar
                      size="sm"
                      name={
                        registro.militar?.nome_guerra
                          ? registro.militar?.nome_guerra
                          : registro.civil?.nomeCompleto
                      }
                      src={
                        registro.militar?.nome_guerra
                          ? returnAvatarImage(registro.militar?.avatar_url)
                          : returnAvatarImage(registro.civil?.foto)
                      }
                    />
                    {registro.civilId ? (
                      <Flex gap={2}> Civil</Flex>
                    ) : (
                      <Flex gap={2}>Militar</Flex>
                    )}
                  </Flex>
                </Td>
                <Td textAlign="center"></Td>
                <Td textAlign="center">
                  {registro.entrada
                    ? convertDateAndTime(registro.entrada)
                    : "-"}
                </Td>
                <Td textAlign="center">
                  {registro.saida ? convertDateAndTime(registro.saida) : "-"}
                </Td>
                <Td textAlign="center">
                  {registro.civilId
                    ? registro.civil?.nomeCompleto.toUpperCase()
                    : registro.militar.post_grad +
                      " " +
                      registro.militar?.nome_guerra.toUpperCase()}
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center">Entrada</Th>
            <Th textAlign="center">Saída</Th>
            <Th textAlign="center">Nome</Th> <Th textAlign="center"></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  ) : (
    <NotData textoComponent={"Não existem registros."} />
  );
}
