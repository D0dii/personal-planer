"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { signIn } from "@/auth";
import { CustomAuthError } from "@/auth.config";
import prisma from "@/lib/db";
import { signInSchema, signUpSchema } from "@/lib/zod";

export const getUsers = async () => {
  const client = prisma;
  const users = await client.user.findMany();
  return users;
};

export const signUpAction = async ({
  name,
  email,
  password,
  confirmPassword,
}: z.infer<typeof signUpSchema>) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!name || !email || !password || !confirmPassword) {
    return "Missing parameters";
  }
  if (existingUser) {
    return "User already exists";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (user) {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  }

  return "Success";
};

export const signInAction = async (formData: z.infer<typeof signInSchema>) => {
  try {
    const user = await signIn("credentials", { ...formData, redirect: false });
    return "Success";
  } catch (error) {
    if (error instanceof CustomAuthError) {
      return error.message;
    }
    return "Server error during sign in";
  }
};
