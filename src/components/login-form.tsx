"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signInEmailAction } from "@/actions/sign-in-email.action";

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const { error } = await signInEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Login successfuly.Good to have you back");
      router.push("/profile");
    }

    // const email = String(formData.get("email"));
    // if (!email) return toast.error("Please enter your email");
    // const password = String(formData.get("password"));
    // if (!password) return toast.error("Please enter your password");

    // await signIn.email(
    //   {
    //     email,
    //     password,
    //   },
    //   {
    //     onRequest: () => {
    //       setIsPending(true);
    //     },
    //     onResponse: () => {
    //       setIsPending(false);
    //     },

    //     onError: (ctx) => {
    //       toast.error(ctx.error.message);
    //     },
    //     onSuccess: () => {
    //       toast.success("Login successfuly.Good to have you back");
    //       router.push("/profile");
    //     },
    //   }
    // );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 space-y-4 p-6 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" className="w-full" />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Login
      </Button>
    </form>
  );
};
