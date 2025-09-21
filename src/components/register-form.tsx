"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

export const RegisterForm = () => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const name = String(formData.get("name"));
    if (!name) return toast.error("Please enter your name");
    const email = String(formData.get("email"));
    if (!email) return toast.error("Please enter your email");
    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your password");

    await signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {},
      }
    );
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

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
};
