import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { api } from "../../../services/api";

export default NextAuth({
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

            const user = await api.post("/auth", {
                identidade: credentials?.identidade,
                senha: credentials?.senha,
                ip: credentials?.ip
            });

            if (user?.data) {
              const userAccount = user?.data?.result;
              return userAccount;
            }else{
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
      session: async ({ session, token }) => {
        if (token) {
          session.id = token.id as string;
        }
        const militar = await api.get(`/me/${session.id}` );
        return {
          ...session,
          militar: militar?.data?.result,
          token: militar?.data?.token
        };
      },
    },
    secret: process.env.SECRET_KEY_JWT,
    pages: {
      signIn: "/dashboard", 
      signOut: "/",
      error: "/", 
    },
    jwt: {
      secret: process.env.SECRET_KEY_JWT,
    },
    session: {

      maxAge: 24 * 60 * 60,
    }
  });
  
  