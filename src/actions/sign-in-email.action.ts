"use server";

import { auth } from "@/lib/auth";
import { parseSetCookieHeader } from "better-auth/cookies";
import { cookies, headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };
  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    //Manual Cookie Setting

    // const setCookieHeader = res.headers.get("set-cookie");
    // console.log(setCookieHeader);
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   console.log(cookie);
    //   const cookieStore = await cookies();

    //   const [key, cookieAttributes] = [...cookie.entries()][0];
    //   console.log(key);
    //   console.log(cookieAttributes);

    //   const value = cookieAttributes.value;
    //   const maxAge = cookieAttributes["max-age"];
    //   const path = cookieAttributes.path;
    //   const httpOnly = cookieAttributes.httponly;
    //   const sameSite = cookieAttributes.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }

    //Ending Manual Cookie Setting

    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Oops! Something went wrong while logging in" };
    }
    return { error: "Internal Server Error" };
  }
}
