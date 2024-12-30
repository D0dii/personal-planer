import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import prisma from "./lib/db";
import { signInSchema } from "./lib/zod";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        username: {},
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedData = signInSchema.safeParse(credentials);
        if (!validatedData.success) {
          return null;
        }
        const { email, password } = validatedData.data;
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        if (!user || !user.password || !user.email) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
