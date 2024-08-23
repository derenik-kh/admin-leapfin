"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { baseUrl } from "@/lib/constants";

export async function login(_currentState: unknown, formData: FormData) {
  try {
    const res = await fetch(`${baseUrl}/login-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cache: "no-cache",
      },
      credentials: "include",

      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      next: {
        revalidate: 1,
      },
    });

    const headerValue = res.headers.get("Set-Cookie") || "";

    const cookieString = headerValue?.split(";")[0];

    if (cookieString) {
      const [name, value] = cookieString.split("=");

      const maxAgeMatch = headerValue.match(/Max-Age=(\d+)/);
      const maxAge = maxAgeMatch
        ? Number.parseInt(maxAgeMatch[1], 10)
        : undefined;

      const expiresMatch = headerValue.match(/Expires=([^;]+)/);
      const expires = expiresMatch ? new Date(expiresMatch[1]) : null;

      const sameSiteMatch = headerValue.match(/SameSite=([^;]+)/);
      const sameSite = sameSiteMatch?.[1]?.toLowerCase() as
        | true
        | false
        | "lax"
        | "strict"
        | "none"
        | undefined;

      cookies().set(name, value, {
        expires: expires || new Date(Date.now() + (maxAge ?? 0) * 1000),
        maxAge:
          maxAge ||
          (expires ? (expires.getTime() - Date.now()) / 1000 : undefined),
        sameSite: sameSite,
      });
    }

    // Extract the name and value

    if (!res.ok) {
      if (res.status === 401) {
        return { error: "Invalid email or password" };
      }
    } else {
      redirect("/organizations");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logout() {
  try {
    const res = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cache: "no-cache",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 1,
      },
    });

    cookies().delete("PLAY_SESSION");

    if (res.ok) {
      redirect("/login");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
