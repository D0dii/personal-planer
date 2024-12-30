import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label>
        Email
        <Input name="email" type="email" />
      </label>
      <label>
        Password
        <Input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
