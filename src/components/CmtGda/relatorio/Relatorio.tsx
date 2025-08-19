import { Image } from "@chakra-ui/react";

import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { FiDownload } from "react-icons/fi";
import { ControleGuardaRegistros } from "../../../@types/types";
import { convertDateAndTime } from "../../../utils/scripts";
export default function GerarRelatorioRegistros({data}: {data: ControleGuardaRegistros[]}){

     function exportPdf() {
    htmlToImage
      .toPng(document.getElementById("exportRegistro"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      });
  }
    return (
        <>
        <button onClick={() => exportPdf()}>FiDownload</button>
        <div
        id="exportRegistro"
        style={{ border: "1px solid black", width: "100%", color: "black" }}
      >
        <div style={{ width: "100%", fontSize: "12px" }}>
          <div
            style={{
              display: "grid",
              border: "1px solid black",
              width: "100%",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "1px solid black",
              }}
            >
              <Image src={"/img/logo3.png"} alt="" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Servico do dia tal para o dia tal
            </div>
          </div>
          <table style={{ width: "100%" }}>
            <thead
              style={{
                width: "100%",
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid black",
              }}
            >
              <th>Posto/Gradução</th>
              <th>Nome</th>
              <th>Nome de Guerra</th>
              <th>Cia</th>
              <th>Pel</th>
              <th>Local de trabalho</th>
              <th>Entrada</th>
              <th>Saida</th>
            </thead>
            <tbody>
              {data?.map((data: ControleGuardaRegistros) => (
                <tr key={data.id} style={{ textAlign: "center" }}>
                  <td>{data.militar.post_grad}</td>
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
                height: "90px",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>2ºSGT HENRY LEAO DA SILVEIRA</p>
                <p>Comandante da Guarda</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "90px",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>
                  {" "}
                  2º TEN FULANO DE TAL ESTOLANO DA SILVA ALBUQUERQUE POTYGUARA
                </p>
                <p>Oficial de dia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}