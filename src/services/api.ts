// import axios from "axios";

// export const api = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3333/"
//       : "https://siscau.vercel.app/api",
//   // headers: {
//   //     Authorization: `Bearer ${cookies['nextauth.token']}`,
//   // }
// });



import { setupAPIClient} from './apiClient'

export const api = setupAPIClient()


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

// import axios from 'axios';
// import { getSession, useSession } from 'next-auth/react';

// const baseURL = process.env.SOME_API_URL || 'http://localhost:1337';

// const ApiClient = () => {
//   const defaultOptions = {
//     baseURL,
//   };

//   const instance = axios.create(defaultOptions);

//   instance.interceptors.request.use(async (request) => {
//     const session = await getSession();
//     if (session) {
//       request.headers.Authorization = `Bearer ${session.jwt}`;
//     }
//     return request;
//   });

//   instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       console.log(`error`, error);
//     },
//   );

//   return instance;
// };

// export default ApiClient();