import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(3, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = signInSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .min(1, "Confirm password is required")
    .min(3, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const newSpendingSchema = z.object({
  description: z.string(),
  amount: z.coerce.number().nonnegative(),
  userId: z.string(),
  date: z.coerce.date(),
});

export const newEventSchema = z.object({
  title: z.string(),
  userId: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
});
