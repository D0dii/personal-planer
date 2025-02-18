"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export const UserDropdown = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-1 cursor-pointer">
          <AvatarImage src={"/avatar_placeholder.png"} />
          <AvatarFallback>
            <Skeleton className="size-[40px] rounded-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-96 flex-col rounded-2xl p-2 shadow-md">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={"/avatar_placeholder.png"} />
            <AvatarFallback>
              <Skeleton className="size-[40px] rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-xl">{user.name}</h3>
            <h4 className="text-sm">{user.email}</h4>
          </div>
        </div>

        <DropdownMenuSeparator />
        <Button className="mx-auto" onClick={() => signOut()}>
          Sign out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
