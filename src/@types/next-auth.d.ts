import NextAuth, { DefaultSession } from "next-auth"
import { Militar } from "./types"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id?: string;
    militar: Militar,
    user: {
      /** The user's postal address. */
      address: string
    } & DefaultSession["user"]
  }
}