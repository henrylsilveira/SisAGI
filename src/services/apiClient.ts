import axios from 'axios';

export function setupAPIClient() {

  const api = axios.create({
    baseURL: 
    // 'https://b0cd-18-228-7-33.ngrok.io'
      process.env.NODE_ENV === "development"
        ? "http://localhost:3333/"
        : 'https://a166-2803-9810-4064-a800-946c-29e6-bd0e-a20d.ngrok-free.app',
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