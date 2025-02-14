import { signUp } from "@/actions/user";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signUp(
          formData.get("username") as string,
          formData.get("email") as string,
          formData.get("password") as string,
        );
      }}
    >
      <label>
        Username
        <Input name="username" type="username" />
      </label>
      <label>
        Email
        <Input name="email" type="email" />
      </label>
      <label>
        Password
        <Input name="password" type="password" />
      </label>
      <button>Sign Up</button>
    </form>
  );
}
