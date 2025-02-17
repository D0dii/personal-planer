import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const GoogleContinue = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      disabled={isLoading}
      className="mx-auto mb-6 rounded-lg p-10 text-2xl"
    >
      <img src="/google-icon.svg" alt="Google logo" className="mr-2 h-6 w-6" />
      Continue with Google
    </Button>
  );
};
