import type { Metadata } from "next";

import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to personal planer",
};

export default function SignUp() {
  return <SignUpForm />;
}
