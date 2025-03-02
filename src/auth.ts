import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import "next-auth/jwt";

import prisma from "@/lib/db";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  ...authConfig,
});
