import { ReturnButton } from "@/components/return-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") {
    return (
      <div className="container mx-auto max-w-screen-md px-6 py-12">
        <div className="space-y-6 text-center">
          <ReturnButton href="/profile" label="Profile" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Admin Dashboard
          </h1>
          <p className="p-2 rounded-md text-lg bg-red-700 text-white font-bold">
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="container mx-auto max-w-screen-md px-6 py-12">
      <div className="space-y-6 text-center">
        <ReturnButton href="/profile" label="Profile" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="p-2 rounded-md text-lg bg-green-700 text-white font-bold">
          ACCESS GRANTED
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">NAME</th>
              <th className="py-2 px-4">EMAIL</th>
              <th className="py-2 px-4 text-center">ROLE</th>
              <th className="py-2 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <th className="py-2 px-4">{user.id.slice(0.8)}</th>
                <th className="py-2 px-4">{user.name}</th>
                <th className="py-2 px-4">{user.email}</th>
                <th className="py-2 px-4 text-center">{user.role}</th>
                <th className="py-2 px-4 text-center">DELETE</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
