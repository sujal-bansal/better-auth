"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export const SignOutButton = () => {
  const router = useRouter();
  async function handleClick() {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  }
  return (
    <Button onClick={handleClick} variant="destructive" size="sm">
      SignOut
    </Button>
  );
};
