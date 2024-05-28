import axios from 'axios';

export function setupAPIClient() {

  const api = axios.create({
    //Colocar endereço com barra no final para nao quebrar a rota dos avatares
    baseURL: process.env.NODE_ENV === "development"
        ? "http://localhost:3333/"
        : 'http://10.35.88.12:3333/',

    // headers: {
    //     Authorization: `Bearer ${cookies['nextauth.token']}`, 
    // }
  });
//   api.interceptors.request.use(async (request) => {
//     const session = await getSession();
//     console.log(session.token)
//     if (session) {
//       request.headers.Authorization = `Bearer ${session.token}`;
//     }
//     return request;
//   });
  
    return api
}
