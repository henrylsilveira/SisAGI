import axios from 'axios';

export function setupAPIClient() {

  const api = axios.create({
    //Colocar endereço com barra no final para nao quebrar a rota dos avatares
    baseURL: 
    process.env.NODE_ENV === "development"
        ? process.env.URL_API_DEV
        : process.env.URL_API_PROD,

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
