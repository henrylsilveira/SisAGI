
import { Militar, PedidosVariasViaturasProps, PedidoViatura, Viatura } from "../@types/types";
import { api } from "../services/api";

export function convertDate(iso: string | number | Date) {
  const d = new Date(iso);
  const convertDate = d.toLocaleDateString("pt-BR");
  return convertDate;
}

export function converterDataISOparaSchedule(dataISO: string | Date) {
  // Converter a string ISO em um objeto Date
  const dataObj = new Date(dataISO);
  
  // Obter o ano, mês e dia
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const dia = String(dataObj.getDate()).padStart(2, '0');
  
  // Formatar a data no formato "ano-mês-dia"
  const dataFormatada = `${ano}-${mes}-${dia}`;
  
  return dataFormatada;
}

export function convertDateAndTime(iso: string | number | Date) {
  const d = new Date(iso);
  const convertDate = d.toLocaleDateString("pt-BR");
  const convertTime = d.toLocaleTimeString("pt-BR");
  return convertDate + (convertTime === "00:00:00" ? " " : " às " + convertTime);
}

export function generateNowISOTime() {
  const time = new Date();
  return time.toISOString();
}

export function convertDateInputToISODate(iso: string) {
  let isoDate = new Date(iso).toISOString();
  return isoDate;
}

export function convertISODateToInputValue(iso: String | Date) {
  if (typeof iso !== "string") {
    return String(iso).split("T")[0];
  }
  return iso.split("T")[0];
}

export function convertISODateAndTimeToInputValue(iso: String | Date) {
  if (typeof iso !== "string") {
    return String(iso).slice(0, 16);
  }
  return iso.slice(0, 16);
}

export function convertDateFuncaoMilitar(militar: Militar, funcao: string) {
  const date = militar.Funcao.find(
    (fun) => fun.funcao === funcao.toLowerCase()
  ).data_inicio;
  if (typeof date !== "undefined") {
    return convertISODateToInputValue(date);
  }
  return "undefined";
}

export async function getUserIP() {
  await api
    .get("https://api.ipify.org/?format=json")
    .then((response) => {
      return response.data.ip;
    })
    .catch(() => {
      return "sem ip";
    });
}

export function formatarDataHora(iso: string | number | Date) {
  const data = new Date(iso);
  return data.toLocaleString("pt-BR");
}

export function verificaSenha(senha) {
  // Define a pontuação base e as variáveis para cada critério de verificação
  var pontuacao = 0;
  var comprimento = senha.length;
  var numeros = senha.match(/[0-9]/g);
  var simbolos = senha.match(/[^\w\s]/g);
  var letrasMinusculas = senha.match(/[a-z]/g);
  var letrasMaiusculas = senha.match(/[A-Z]/g);

  // Adiciona pontos com base em cada critério de verificação
  if (comprimento >= 8) {
    pontuacao += 2;
  }
  if (comprimento >= 12) {
    pontuacao += 1;
  }
  if (numeros && numeros.length >= 2) {
    pontuacao += 2;
  }
  if (simbolos && simbolos.length >= 2) {
    pontuacao += 2;
  }
  if (letrasMinusculas && letrasMinusculas.length >= 2) {
    pontuacao += 1;
  }
  if (letrasMaiusculas && letrasMaiusculas.length >= 2) {
    pontuacao += 1;
  }

  // Define o nível da senha com base na pontuação obtida
  if (pontuacao < 4) {
    return "Senha fraca";
  } else if (pontuacao < 8) {
    return "Senha razoável";
  } else if (pontuacao < 12) {
    return "Senha boa";
  } else if (pontuacao < 16) {
    return "Senha forte";
  } else {
    return "Senha muito forte";
  }
}

export function returnAvatarImage(avatar: string) {
  return api.defaults.baseURL + avatar;
}

export function compareDate(dateStr: string) {
  const [day, month, year] = dateStr.split("/");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return "green.700"; // Retorna com cor verde
  } else if (date < today) {
    return "red.600"; // Retorna com cor vermelha
  } else {
    return "white"; // Retorna normalmente
  }
}

export function formataArrayEmObjetosIguais(array: PedidoViatura[]) {
  const objetosIguais = [];

  // Percorre cada objeto no array
  for (let i = 0; i < array.length; i++) {
      let objetoAtual = array[i];
      let objetosIguaisEncontrados = [objetoAtual];

      // Compara com os objetos seguintes
      for (let j = i + 1; j < array.length; j++) {
          let objetoComparar = array[j];

          // Verifica se os objetos são idênticos
          if (saoObjetosIdenticos(objetoAtual, objetoComparar)) {
              objetosIguaisEncontrados.push(objetoComparar);
          }
      }

      // Se encontrou objetos iguais, adiciona ao array final
      if (objetosIguaisEncontrados.length > 1) {
          objetosIguais.push(objetosIguaisEncontrados);
      }
  }
  return objetosIguais;
}

function saoObjetosIdenticos(objeto1: PedidoViatura, objeto2: PedidoViatura) {
  // Converte os objetos para JSON e compara
  return objeto1.dataDesejada === objeto2.dataDesejada && objeto1.companhia === objeto2.companhia && objeto1.dataDevolucao === objeto2.dataDevolucao && objeto1.intinerario === objeto2.intinerario;
}

export function returnComboios(pedidos : PedidoViatura[]){
  const arrayComboios = pedidos.map(comboio => comboio.dataDesejada)

  const arrayHoraDesejadaComboio =  [...new Set([...arrayComboios])]
  return arrayHoraDesejadaComboio.map(hora => {
      return {
          horaDesejada: hora,
          companhia: pedidos.filter(comboio => comboio.dataDesejada === hora).map(comboio => comboio.companhia)[0],
          itinerario: pedidos.filter(comboio => comboio.dataDesejada === hora).map(comboio => comboio.intinerario)[0],
          missao: pedidos.filter(comboio => comboio.dataDesejada === hora).map(comboio => comboio.missao)[0],
          pedidos: pedidos.filter(comboio => comboio.dataDesejada === hora).length > 1 ? pedidos.filter(comboio => comboio.dataDesejada === hora) : null,
          count: pedidos.filter(comboio => comboio.dataDesejada === hora).length
      }
  })
}

export function calculaDisponibilidade(data: Viatura[]) {
  return ((data?.filter(viatura => viatura.situacao !== 'indisponivel').length / data?.length) * 100).toFixed(0)
}