import type {
  OrganizationType,
  OrganizationsType,
} from "@/components/organization-table/constants";

import { cookies } from "next/headers";

import { baseUrl } from "@/lib/constants";

export async function getOrganizations() {
  try {
    const res = await fetch(`${baseUrl}/admin/organizations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-cache",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 120,
        tags: ["organizations"],
      },
    });

    const json: { orgs: OrganizationsType } = await res.json();

    return json.orgs;
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function getOrganizationById(id: number) {
  const res = await fetch(`${baseUrl}/admin/organization/${id}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "no-cache",
      Cookie: cookies().toString(),
    },
    credentials: "include",
    next: {
      revalidate: 10,
      tags: [`${id}`],
    },
  });

  const data = (await res.json()) as OrganizationType;

  return data;
}
