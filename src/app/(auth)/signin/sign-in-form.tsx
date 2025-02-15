"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    //TODO sign in with backend to handle errors
    signIn("credentials", { ...values, callbackUrl: "/" });
  };
  return (
    <div>
      <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign in with Google
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Link href="/signup">Don't have an account? Sign up</Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
