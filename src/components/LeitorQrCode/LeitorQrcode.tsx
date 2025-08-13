import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Militar } from "../../@types/types";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { Input } from "../Form/Input";
import { useToast } from "@chakra-ui/react";
import { convertDateAndTime, generateNowISOTime } from "../../utils/scripts";

export default function LeitorDeQRCode({
  setMilitar,
  session,
  refetch,
}: {
  setMilitar: Dispatch<SetStateAction<Militar>>;
  session: Militar;
  refetch: () => void;
}) {
  const [qrCodeData, setQrCodeData] = useState("");
  const inputRef = useRef(null);
  const toast = useToast();
  // Foca no input quando o componente é montado
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    setQrCodeData(e.target.value);
    const result = await api.get<Militar>(`/militar/${e.target.value}`);
    setMilitar(result.data);
    if (result.data) {
      try {
        const getRegistro = await api.get(
          `/controGuarda/registros/${e.target.value}/militar`
        );
        if (
          getRegistro.data[0] &&
          !getRegistro.data[0].saida &&
          getRegistro.data[0].entrada
        ) {
          const result = await api.put(
            `/controleGuarda/update/${getRegistro.data[0].id}/saida`
          );
          setTimeout(async () => {
            setQrCodeData("");
            setMilitar(null);
            inputRef.current.focus();
          }, 2000);
          if (result.status == 201) {
            toast({
              title: "Controle Guarda",
              description: `SAIDA do militar registrada ${convertDateAndTime(
                generateNowISOTime()
              )}`,
              status: "warning",
              duration: 2000,
              isClosable: true,
            });
            refetch();
          } else {
            toast({
              title: "Controle Guarda",
              description: "Erro ao registrar a saida.",
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          }
        } else {
          const response = await api.post<Militar>(
            "/controleGuarda/registrar/entrada/militar",
            {
              militarId: result.data.id,
              militarServicoId: session.id,
              status: "entrada",
            }
          );
          setTimeout(async () => {
            setQrCodeData("");
            setMilitar(null);
            inputRef.current.focus();
          }, 2000);
          if (response.status == 201) {
            toast({
              title: "Controle Guarda",
              description: `ENTRADA do militar registrada ${convertDateAndTime(
                generateNowISOTime()
              )}`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            refetch();
          } else {
            toast({
              title: "Controle Guarda",
              description: "Erro ao registrar a entrada.",
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          }
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Controle Guarda",
          description: "Erro interno.",
          status: "error",
          duration: 500,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Controle Guarda",
        description: "Nenhum militar encontrado.",
        status: "error",
        duration: 500,
        isClosable: true,
      });
      setTimeout(async () => {
        setQrCodeData("");
        setMilitar(null);
        inputRef.current.focus();
      }, 2000);
    }
  };

  return (
    <div>
      <Input
        borderY={"solid 2px"}
        textColor={"green.500"}
        fontWeight={"bold"}
        borderColor={"green.600"}
        borderX={"none"}
        ref={inputRef}
        type="text"
        value={qrCodeData}
        onChange={handleChange}
        placeholder="Aguardando leitura do QR Code..."
        style={{ opacity: 1 }} // Você pode deixar o input visível ou escondê-lo com opacity: 0
        name={""}
      />
    </div>
  );
}
