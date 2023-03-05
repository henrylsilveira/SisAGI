import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { api } from "../../../services/api";
import { Militar } from "../../../@types/types";


export default NextAuth({
    secret: process.env.SECRET_KEY_JWT,
    providers: [
      CredentialProvider({
        id: "Credentials", 
        name: "Credentials",
        type: "credentials",
        credentials: {
          identidade: {label: "Identidade", type: "text", placeholder: "Identidade"},
          senha: { label: "Senha", type: "password" },
          ip: {type: "text"}
        },
        authorize: async (credentials) => {
            const { data } = await api.post("/auth", {
                identidade: credentials?.identidade,
                senha: credentials?.senha,
                ip: credentials?.ip
            });
            
            if (data) {
              return data
            }else{
              throw new Error();
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
      session: async ({ session, token }) => {
        if (token) {
          session.id = token.id as string;
        }
        const { data } = await api.get<Militar>(`/me/${session.id}` );
        return {
          ...session,
          militar: data,
          token: data['token']
        };
      },
    },
    pages: {
      signIn: "/dashboard", 
      signOut: "/",
      error: "/", 
    },
    jwt: {
      secret: process.env.SECRET_KEY_JWT,
      maxAge: 24 * 60 * 60,
    },
    debug: true,
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60,
    },
    useSecureCookies: true
  })