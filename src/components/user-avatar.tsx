"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { UserDropdown } from "./user-dropdown";

export const UserProfile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Skeleton className="ml-1 size-[40px] rounded-full" />;
  }

  if (session === null || session?.user === undefined) {
    return (
      <Button size="sm" asChild={true}>
        <Link href={"/signin"}>Sign in</Link>
      </Button>
    );
  }
  return <UserDropdown user={session.user} />;
};
