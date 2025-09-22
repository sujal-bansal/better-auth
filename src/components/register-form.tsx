"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signUpEmailAction } from "@/actions/sign-up-email.action";

export const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const { error } = await signUpEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Registration Complete.You're all set");
      router.push("/auth/login");
    }

    // const name = String(formData.get("name"));
    // if (!name) return toast.error("Please enter your name");
    // const email = String(formData.get("email"));
    // if (!email) return toast.error("Please enter your email");
    // const password = String(formData.get("password"));
    // if (!password) return toast.error("Please enter your password");

    // await signUp.email(
    //   {
    //     name,
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
    //       toast.success("Registration Complete.You're all set");
    //       router.push("/auth/login");
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
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" className="w-full" />
      </div>

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
        Register
      </Button>
    </form>
  );
};
