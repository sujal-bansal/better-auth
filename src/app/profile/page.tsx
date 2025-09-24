import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/auth/login");
  return (
    <div className="container mx-auto max-w-screen-md px-6 py-12">
      <div className="space-y-6 text-center">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Profile
        </h1>
      </div>

      <div className="mt-8 flex justify-center">
        <SignOutButton />
      </div>

      <pre className="mt-6 text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
