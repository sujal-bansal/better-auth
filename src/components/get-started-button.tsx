"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button size="lg" className="opactiy-50" asChild>
        Get Started
      </Button>
    );
  }

  const href = session ? "/profile" : "/auth/login";

  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="lg" className="opactiy-50" asChild>
        <Link href={href}>Get Started</Link>
      </Button>

      {session && <p>Welcome back, {session.user.name}👋</p>}
    </div>
  );
};
