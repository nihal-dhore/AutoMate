import NextAuth from "next-auth";
import { authOptions } from "./app/api/auth/lib/authOptions";

export const { handlers: { GET, POST }, signIn, signOut } = NextAuth(authOptions);
