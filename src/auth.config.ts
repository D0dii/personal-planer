import bcrypt from "bcryptjs";
import { AuthError, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import prisma from "./lib/db";
import { signInSchema } from "./lib/zod";

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

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
        try {
          const validatedData = signInSchema.safeParse(credentials);
          if (!validatedData.success) {
            throw new CustomAuthError("Invalid credentials");
          }
          const { email, password } = validatedData.data;
          const user = await prisma.user.findFirst({
            where: {
              email: email,
            },
          });
          if (!user) {
            throw new CustomAuthError("User doesn't exist");
          }
          if (!user.password || !user.email) {
            throw new CustomAuthError("Server error during sign in");
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
          throw new CustomAuthError("Invalid credentials");
        } catch (error) {
          if (error instanceof CustomAuthError) {
            throw new CustomAuthError(error.message);
          }
          throw new CustomAuthError("Server error during sign in");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
