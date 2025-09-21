import { RegisterForm } from "@/components/register-form";
import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto max-w-screen-md px-6 py-12">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Register
        </h1>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
