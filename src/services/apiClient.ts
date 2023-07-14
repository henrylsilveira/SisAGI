import axios from 'axios';

export function setupAPIClient() {

  const api = axios.create({
    baseURL: 
      process.env.NODE_ENV === "development"
        ? "http://localhost:3333/"
        : "http://localhost:10000/",
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