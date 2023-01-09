import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";



export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/"
      : "https://siscau.vercel.app/api",
  // headers: {
  //     Authorization: `Bearer ${cookies['nextauth.token']}`,
  // }
});


// api.interceptors.response.use(function (response) {
//   // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
//   // Faz alguma coisa com os dados de resposta
//   console.log(response)
//   return response;
// }, function (error) {
//   // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
//   // Faz alguma coisa com o erro da resposta
//   return Promise.reject(error);
// });