import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { api } from "../../../services/api";
import { Militar } from "../../../@types/types";


export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identidade: { label: "Identidade", type: "text", placeholder: "Identidade" },
        senha: { label: "Senha", type: "password" },
        ip: { type: "text" }
      },
      async authorize(credentials, req) {
        
        const res = await api.post('/auth', {
          identidade: credentials?.identidade,
          senha: credentials?.senha,
          ip: credentials?.ip
        });
        console.log(res.status)
        if (res.data) {
          return res.data
        } else {
          return null
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
    error: "/"
  },
  // jwt: {
  //   secret: process.env.SECRET_KEY_JWT,
  //   maxAge: 24 * 60 * 60,
  // },
})