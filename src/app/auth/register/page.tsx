import { RegisterForm } from "@/components/register-form";
import { ReturnButton } from "@/components/return-button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto max-w-screen-md px-6 py-12">
      <div className="space-y-6 text-center">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Register
        </h1>
      </div>

      <div className="mt-8">
        <RegisterForm />

        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 text-center">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
