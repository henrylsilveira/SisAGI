import { Button, Flex, Text } from "@chakra-ui/react";

import { FiDownload } from "react-icons/fi";
import { ControleGuardaRegistros } from "../../../@types/types";
import { convertDateAndTime, convertDate, getFullRank } from "../../../utils/scripts";
import { MutableRefObject, useRef } from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { NotLoaded } from "../../NotLoaded";
export default function GerarRelatorioRegistros({
  data,
  optionsRecord,
}: {
  data: ControleGuardaRegistros[];
  optionsRecord: { start: string; end: string; oficialDia: string; cmtGda: string };
}) {
  const options: any = {
    // default is `save`
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.MEDIUM,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "portrait",
      // name: `${optionsRecord.cmtGda} - ${convertDate(optionsRecord.start)} - ${convertDate(optionsRecord.end)}.pdf`,
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/png",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };
  const getTargetElement = () => document.getElementById("content-id");

  // function exportPdf() {
  //   htmlToImage
  //     .toPng(document.getElementById("exportRegistro"), { quality: 100 })
  //     .then(function (dataUrl) {
  //       var link = document.createElement("a");
  //       link.download = "my-image-name.jpeg";
  //       const pdf = new jsPDF();
  //       const imgProps = pdf.getImageProperties(dataUrl);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
  //       pdf.save("download.pdf");
  //     });
  // }
  async function downloadReport() {
    setTimeout(async () => {
      document.getElementById("content-id").style.display = "block";
      document.getElementById("loading").style.display = "flex";
    }, 1000);
    setTimeout(async () => {
      await generatePDF(getTargetElement, options).finally(
        () => (
          (document.getElementById("content-id").style.display = "none"),
          (document.getElementById("loading").style.display = "none")
        )
      );
    }, 2000);
  }
  return (
    <>
      <Flex
        id="loading"
        position={"absolute"}
        justifyContent={"center"}
        display={"none"}
        alignItems={"center"}
        flexDirection={"column"}
        top={"0"}
        left={"0"}
        zIndex={20}
        w={"100%"}
        h={"100%"}
        bg={"rgba(0, 0, 0, 0.6)"}
      >
        <NotLoaded />
        <Text>Carregando...</Text>
      </Flex>
      <Button
        colorScheme="blue"
        leftIcon={<FiDownload />}
        shadow="buttonShadow"
        onClick={downloadReport}
      >
        Gerar relatório
      </Button>
      <div style={{ color: "black" }}>
        <div
          id="content-id"
          style={{
            width: "100%",
            fontSize: "12px",
            backgroundColor: "white",
            padding: "12px",
            display: "none",
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Serviço do dia {convertDate(optionsRecord?.start)} para o dia {" " + convertDate(optionsRecord?.end)}
            </div>
          </div>
          <table style={{ width: "100%", border: "1px solid black" }}>
            <thead
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                border: "1px solid black",
                textAlign: "center",
                height: "40px",
              }}
            >
              <th>Posto/Gradução</th>
              <th>Nome</th>
              <th>Nome de Guerra</th>
              <th>Companhia</th>
              <th>Pelotão</th>
              <th>Local de trabalho</th>
              <th>Entrada</th>
              <th>Saída</th>
            </thead>
            <tbody
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid black",
              }}
            >
              {data?.map((data: ControleGuardaRegistros) => (
                <tr
                  key={data.id}
                  style={{
                    textAlign: "center",
                    border: "1px solid black",
                    fontSize: "14px",
                    height: "30px",
                  }}
                >
                  <td>{getFullRank(data.militar.post_grad)}</td>
                  <td>{data.militar.nome_completo}</td>
                  <td>{data.militar.nome_guerra}</td>
                  <td>{data.militar.companhia}</td>
                  <td>{data.militar.pelotao}</td>
                  <td>
                    {data.militar.local_cumpre_expediente
                      ? data.militar.local_cumpre_expediente
                      : "-"}
                  </td>
                  <td>{convertDateAndTime(data.entrada)}</td>
                  <td>{convertDateAndTime(data.saida)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "grid",
              border: "1px solid black",
              width: "100%",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div
              style={{
                borderRight: "1px solid black",
                display: "flex",
                justifyContent: "center",
                height: "120px",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <p>{optionsRecord?.cmtGda}</p>
                <p>Comandante da Guarda</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "120px",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <p>
                  {" "}
                  {optionsRecord?.oficialDia
                    ? optionsRecord?.oficialDia
                    : "**NOME DO OFICIAL DE DIA**"}
                </p>
                <p>Oficial de dia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
