"use client";

import type { OrganizationType } from "@/components/organization-table/constants";

import { Accordion, AccordionItem, Chip, Code } from "@nextui-org/react";

import { formatDateTime } from "@/utils/formatDateTime";

type Props = {
  data: OrganizationType;
};

export function OrganizationDetails({ data }: Props) {
  const quickLoadApi = data.integrations.find((el) => el.name);

  return (
    <Accordion isCompact defaultExpandedKeys={["details"]} variant="shadow">
      <AccordionItem
        key="details"
        aria-label="Test Run Details"
        title={
          <div className="flex justify-between items-center">
            <span>Details</span>
            <div className="flex items-center gap-4">
              <Chip
                classNames={{
                  content: "capitalize",
                }}
                color={data.organization.isActive ? "success" : "danger"}
                variant="bordered"
              >
                {data.organization.isActive ? "Active" : "Inactive"}
              </Chip>
              <Chip
                classNames={{
                  content: "capitalize",
                }}
                color={
                  !quickLoadApi || !quickLoadApi?.isActive
                    ? "danger"
                    : "success"
                }
                variant="bordered"
              >
                {!quickLoadApi
                  ? "Quick Load API not connected"
                  : quickLoadApi?.isActive
                    ? "Quick Load API connected and active"
                    : "Quick Load API inactive"}
              </Chip>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-3 gap-2 pb-4 pt-2 text-start">
          {data?.organization?.name && (
            <div className="space-x-2 text-small">
              <span className="text-default-500">Name:</span>
              <span className="font-semibold">{data?.organization?.name}</span>
            </div>
          )}
          {data?.organization?.createdAt ? (
            <div className="space-x-2 text-small">
              <span className="text-default-500">Created At:</span>
              <span className="font-semibold">
                {formatDateTime(data?.organization?.createdAt)}
              </span>
            </div>
          ) : null}
          {data?.organization?.updatedAt ? (
            <div className="space-x-2 text-small">
              <span className="text-default-500">Updated At:</span>
              <span className="font-semibold">
                {formatDateTime(data?.organization?.updatedAt)}
              </span>
            </div>
          ) : null}
          {data?.organization?.defaultCurrency ? (
            <div className="space-x-2 text-small">
              <span className="text-default-500">Default Currency:</span>
              <span className="font-medium">
                {data?.organization?.defaultCurrency}
              </span>
            </div>
          ) : null}
          {data?.organization?.nameId ? (
            <div className="space-x-2 text-small">
              <span className="text-default-500">NameID:</span>
              <span className="font-medium">{data?.organization?.nameId}</span>
            </div>
          ) : null}
          {data?.organization?.timeZone ? (
            <div className="space-x-2 text-small">
              <span className="text-default-500">Timezone:</span>
              <span className="font-medium">
                {data?.organization?.timeZone}
              </span>
            </div>
          ) : null}
          <div className="space-x-2 text-small">
            <span className="text-default-500">Is Demo:</span>
            <span className="font-medium">
              {data?.organization?.isDemo ? "Yes" : "No"}
            </span>
          </div>
          <div className="space-x-2 text-small">
            <span className="text-default-500">Is Stripe Customer:</span>
            <span className="font-medium">
              {data?.organization?.isStripeCustomer ? "Yes" : "No"}
            </span>
          </div>

          {data?.organization?.category ? (
            <div className="space-x-2 text-small">
              <span className="text-default-500">Category:</span>
              <span className="font-medium">
                {data?.organization?.category}
              </span>
            </div>
          ) : null}

          {data?.integrations.length ? (
            <div className="col-span-full flex items-center gap-2">
              <span className="text-default-500">Integrations:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {data?.integrations?.map((int) => (
                  <Code key={int.type} className="font-medium">
                    {int.name ?? int.type}
                  </Code>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
