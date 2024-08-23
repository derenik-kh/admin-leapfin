export const dynamic = "force-dynamic";

import { getOrganizations } from "@/data/organizations";

export async function GET() {
  const res = await getOrganizations();

  return Response.json({ res });
}
