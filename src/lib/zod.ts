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

export const newSpendingFormSchema = z.object({
  description: z.string(),
  amount: z.coerce.number().nonnegative(),
});

export const newSpendingDataLayerSchema = newSpendingFormSchema.extend({
  date: z.coerce.date(),
});

export const newSpendingSchema = newSpendingDataLayerSchema.extend({
  userId: z.string(),
});

export const newEventFormSchema = z.object({
  title: z.string(),
});

export const newEventSchema = newEventFormSchema.extend({
  start: z.coerce.date(),
  end: z.coerce.date(),
  userId: z.string(),
});
