import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { api } from "../../../services/api";

export default NextAuth({
    providers: [
      CredentialProvider({
        name: "credentials",
        credentials: {
          identidade: {label: "Identidade", type: "text", placeholder: "Identidade"},
          senha: { label: "Senha", type: "password" },
        },
        authorize: async (credentials) => {
          try {
            const user = await api.post("/auth", {
                identidade: credentials.identidade,
                senha: credentials.senha,
            });
            if (user) {
              const userAccount = user.data.result;
  
              return userAccount;
            } else {
              return null;
            }
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
      session: async ({ session, token }) => {
        if (token) {
          session.id = token.id as string;
        }
        const militar = await api.get(`/me/${session.id}` );
        return {
          ...session,
          militar: militar.data
        };
      },
    },
    secret: process.env.SECRET_KEY_JWT,
    pages: {
      signIn: "/dashboard", 
      error: "/", 
    },
    jwt: {
      secret: process.env.SECRET_KEY_JWT,
    },
    session: {
      maxAge: 24 * 60 * 60,
    }
  });
  
  