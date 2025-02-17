"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signInAction } from "@/actions/user";
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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const status = await signInAction(values);
    if (status !== "Success") {
      setError(status);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push("/");
  };
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        disabled={isLoading}
        className="mx-auto mb-6 rounded-lg p-10 text-2xl"
      >
        <img
          src="/google-icon.svg"
          alt="Google logo"
          className="mr-2 h-6 w-6"
        />
        Continue with Google
      </Button>
      <span className="mx-auto mb-6 text-2xl">Or</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <Input type="password" {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Link href="/signup">Don't have an account? Sign up</Link>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {error && <p className="text-xl text-red-500">{error}</p>}
    </div>
  );
}
