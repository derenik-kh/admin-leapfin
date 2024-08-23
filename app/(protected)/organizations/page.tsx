import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

import Table from "@/components/organization-table";
import { getOrganizations } from "@/data/organizations";

export default async function OrganizationsPage() {
  const organizations = await getOrganizations();

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <Table organizations={organizations ?? []} />
      </Suspense>
    </div>
  );
}
