import NextAuth from "next-auth"
import { api } from "../../../services/api";
import { Militar } from "../../../@types/types";
import Credentials from "next-auth/providers/credentials";


export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: 'credentials',
      name: "credentials",
      credentials: {
        identidade: { label: "Identidade", type: "text", placeholder: "Identidade" },
        senha: { label: "Senha", type: "password" },
        ip: { type: "text" }
      },
      async authorize(credentials, req) {
        try {
          const res = await api.post('/auth', {
            identidade: credentials?.identidade,
            senha: credentials?.senha,
            ip: credentials?.ip
          });
          console.log(res)
          if (res.status === 200) {
            const user = await res.data as Militar
            return user
          } 

          throw new Error("Erro na autenticação.");
        } catch (error) {
          const message = error.response.data.message;
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id as string;
      }
      const { data } = await api.get<Militar>(`/me/${session.id}`);
      return {
        ...session,
        militar: data,
        token: data.token
      };
    },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  debug: process.env.NODE_ENV === 'development',
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60*30*24, // 1 dia
  },
})
