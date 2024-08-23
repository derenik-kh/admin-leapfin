import sortOn from "sort-on";

import { OrganizationDetails } from "./_components/OrganizationDetails";
import { Actions } from "./_components/Actions";
import { Runs } from "./_components/Runs";

import { getOrganizationById } from "@/data/organizations";
// import { chartsData } from "./_components/constants";

type Props = {
  params: {
    slug: string;
  };
};

function calculateDurationInMilliseconds(
  startDateStr: string,
  endDateStr: string,
): number {
  // Parse the dates
  const startDate: Date = new Date(startDateStr);
  const endDate: Date = new Date(endDateStr);

  // Calculate the difference in milliseconds
  const durationInMilliseconds: number =
    endDate.getTime() - startDate.getTime();

  return durationInMilliseconds;
}

export default async function OrganizationPage({ params }: Props) {
  const data = await getOrganizationById(Number(params.slug));

  console.log({ data });

  return (
    <div className="p-4 space-y-4 relative w-full min-h-[calc(100vh_-_66px_-_3rem)]">
      <OrganizationDetails data={data} />
      {!data.importerRuns?.length && !data.importerRuns?.length ? null : (
        <Runs
          chartsData={{
            airflow: data?.processingRuns
              ? sortOn(
                  data.processingRuns?.map((el) => ({
                    ...el,
                    duration: calculateDurationInMilliseconds(
                      el.start_date,
                      el.end_date ?? new Date().toString(),
                    ),
                  })),
                  "execution_date",
                )
              : [],
            scribe: data.importerRuns
              ? sortOn(
                  data.importerRuns?.map((el) => ({
                    ...el,
                    duration: calculateDurationInMilliseconds(
                      el.start_date,
                      el.end_date ?? new Date().toString(),
                    ),
                  })),
                  "execution_date",
                )
              : [],
          }}
        />
      )}
      <div className="absolute w-full bottom-0 left-0 right-0 p-4">
        <Actions
          apiStatus={
            data?.integrations?.find((el) => el.type === "leapfin-quick-load")
              ?.isActive ?? null
          }
          organizationNameId={String(data.organization.nameId)}
          quickLoadApiIntegrationId={
            data?.integrations?.find((el) => el.type === "leapfin-quick-load")
              ?.id ?? null
          }
          status={data.organization.isActive ? "active" : "inactive"}
        />
      </div>
    </div>
  );
}
