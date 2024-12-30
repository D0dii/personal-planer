import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import "next-auth/jwt";

import prisma from "@/lib/db";

import authConfig from "./auth.config";

// declare module "next-auth" {
//   interface Session {
//     user: PrismaUser & DefaultSession["user"];
//   }
//   interface User extends PrismaUser {}
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     email: string;
//     username: string;
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
