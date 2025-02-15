"use server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/db";

export const getUsers = async () => {
  const client = prisma;
  const users = await client.user.findMany();
  return users;
};

export const signUp = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

//TODO implement sign in in backend for errors
