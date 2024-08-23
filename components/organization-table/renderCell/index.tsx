import type {
  ColumnKey,
  OrganizationType,
  OrganizationsType,
} from "../constants";

import { Chip, type ChipProps } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { formatDateTime } from "@/utils/formatDateTime";

const statusMap: Record<string, ChipProps["color"]> = {
  success: "success",
  failed: "danger",
  running: "warning",
  skipped: "default",
  queued: "secondary",
};

export const renderCellOrganizations = (
  organization: OrganizationsType[number],
  columnKey: ColumnKey,
) => {
  const cellValue =
    organization.organization[
      columnKey as keyof OrganizationType["organization"]
    ];

  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col">
          <Link
            className="underline"
            href={`/organizations/${organization.organization.id}`}
          >
            <p className="group text-small font-semibold text-default-800 flex items-center gap-2 hover:gap-4 transition-all duration-75 hover:text-primary">
              <span>{organization.organization.name}</span>
              <Icon
                className="text-default-400 group-hover:text-primary"
                icon="akar-icons:arrow-right"
              />
            </p>
          </Link>
        </div>
      );
    // case "integrations":
    //   return organization?.integrations.length ? (
    //     <div className="col-span-full flex items-center gap-2">
    //       <span className="text-default-500">Integrations:</span>
    //       <div className="flex items-center gap-2 flex-wrap">
    //         {organization?.integrations?.slice(0, 3).map((int) => (
    //           <Code key={int.type} className="font-medium">
    //             {int.name ?? int.type}
    //           </Code>
    //         ))}
    //       </div>
    //     </div>
    //   ) : (
    //     "No Integrations"
    //   );

    case "processingRuns":
      return (
        <Chip
          className="capitalize ignore-mark"
          classNames={{
            content: "ignore-mark capitalize",
          }}
          color={
            statusMap[organization.processingRuns?.[0]?.state] ?? "default"
          }
          size="sm"
          variant={organization.processingRuns?.[0]?.state ? "dot" : "bordered"}
        >
          {organization.processingRuns?.[0]?.state ?? "No runs"}
        </Chip>
      );
    case "importerRuns":
      return (
        <Chip
          className="capitalize ignore-mark"
          classNames={{
            content: "ignore-mark capitalize",
          }}
          color={statusMap[organization.importerRuns?.[0]?.state] ?? "default"}
          size="sm"
          variant={organization.importerRuns?.[0]?.state ? "dot" : "bordered"}
        >
          {organization.importerRuns?.[0]?.state ?? "No runs"}
        </Chip>
      );

    case "quick-load-api":
      return (
        <Chip
          className="capitalize ignore-mark"
          classNames={{
            content: "ignore-mark capitalize",
          }}
          color={
            organization.integrations.find(
              (int) => int.type === "leapfin-quick-load",
            )?.isActive
              ? "success"
              : "warning"
          }
          size="sm"
          variant={"bordered"}
        >
          {organization.integrations.find(
            (int) => int.type === "leapfin-quick-load",
          )?.isActive
            ? "Connected"
            : "Not Connected"}
        </Chip>
      );
    case "isActive":
      return (
        <Chip
          className="capitalize ignore-mark"
          classNames={{
            content: "ignore-mark",
          }}
          color={organization.organization.isActive ? "success" : "danger"}
          size="sm"
          variant="dot"
        >
          {organization.organization.isActive ? "Active" : "Inactive"}
        </Chip>
      );
    case "createdAt":
    case "updatedAt":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-400 ignore-mark">
            {formatDateTime(cellValue?.toString())}
          </p>
        </div>
      );

    case "isDemo":
    case "isStripeCustomer":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-400 ignore-mark">
            {cellValue ? "Yes" : "No"}
          </p>
        </div>
      );
    default:
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-400 ignore-mark">
            {cellValue?.toString()}
          </p>
        </div>
      );
  }
};
