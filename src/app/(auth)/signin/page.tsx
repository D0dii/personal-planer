import type { Metadata } from "next";

import SignInForm from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to personal planer",
};

export default function SignIn() {
  return <SignInForm />;
}
