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
  refetch
}: {
  setMilitar: Dispatch<SetStateAction<Militar>>;
  refetch: () => void
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
        const response = await api.post<Militar>("/controleGuarda/registrar/entrada/militar", {
          militarId: result.data.id,
          militarServicoId: result.data.id,
          status: "entrada",
        });
        setTimeout(async () => {
          setQrCodeData("");
          setMilitar(null);
          inputRef.current.focus();
        }, 2000);
        if (response.status == 201) {
          toast({
            title: "Controle Guarda",
            description: `Entrada do militar registrada ${convertDateAndTime(
              generateNowISOTime()
            )}`,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          refetch()
        } else {
          toast({
            title: "Controle Guarda",
            description: "Erro ao registrar a entrada.",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
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
