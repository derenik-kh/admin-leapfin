import type { User } from "@/types";

import { cookies } from "next/headers";

import { baseUrl } from "@/lib/constants";

export async function currentUser() {
  try {
    const res = await fetch(`${baseUrl}/me`, {
      method: "GET",
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

    const json: { activeUser: User } = await res.json();

    return json.activeUser;
  } catch (err) {
    console.error(err);
  }
}
