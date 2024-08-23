import type { OrganizationsType } from "@/components/organization-table/constants";

export async function getOrganizationsClient() {
  try {
    const res = await fetch("/api/organizations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json: { res: OrganizationsType } = await res.json();

    return json.res;
  } catch (err) {
    console.error(err);

    return null;
  }
}
