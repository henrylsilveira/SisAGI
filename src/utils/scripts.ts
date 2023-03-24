import { Militar } from "../@types/types";
import { api } from "../services/api";

export function convertDate(iso: string | number | Date) {
  const d = new Date(iso);
  const convertDate = d.toLocaleDateString("pt-BR");
  return convertDate;
}

export function generateNowISOTime() {
  const time = new Date();
  return time.toISOString();
}

export function convertDateInputToISODate(iso: string) {
  // const d = new Date(iso)
  // const date = d.toISOString()+"T"+d.getUTCHours()
  let darr = iso.split("-"); // ["29", "1", "2016"]
  let isoDate = new Date(
    parseInt(darr[2]),
    parseInt(darr[1]) - 1,
    parseInt(darr[0])
  );
  return isoDate;
}

export function convertISODateToInputValue(iso: String | Date) {
  if (typeof iso !== "string") {
    return String(iso).split("T")[0];
  }
  return iso.split("T")[0];
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
  const response = await api.get("https://api.ipify.org/?format=json");
  return response.data.ip;
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
