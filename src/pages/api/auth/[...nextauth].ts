import NextAuth from "next-auth"
import { api } from "../../../services/api";
import { Militar } from "../../../@types/types";
import CredentialsProvider  from "next-auth/providers/credentials";
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
        
        const res = await api.post('/auth', {
          identidade: credentials?.identidade,
          senha: credentials?.senha,
          ip: credentials?.ip
        });
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
    signOut: "/",
    error: "/"
  },
  debug: process.env.NODE_ENV === 'development',
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
})