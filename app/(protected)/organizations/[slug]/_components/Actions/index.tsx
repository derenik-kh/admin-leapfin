"use client";

import { Card } from "@nextui-org/react";

import { ChangeStatus } from "./ChangeStatus";
import { WipeData } from "./WipeData";
import { ConnectApi } from "./ConnectApi";
type Props = {
  status: "active" | "inactive";
  apiStatus?: boolean | null;
  organizationNameId: string;
  quickLoadApiIntegrationId?: number | string | null;
};

export function Actions({
  status,
  organizationNameId,
  apiStatus,
  quickLoadApiIntegrationId,
}: Props) {
  return (
    <div className="w-full">
      <Card className="w-full px-4 py-2">
        <div className="flex items-center justify-end gap-4">
          <ChangeStatus
            organizationNameId={organizationNameId}
            status={status}
          />
          <ConnectApi
            organizationNameId={organizationNameId}
            quickLoadApiIntegrationId={quickLoadApiIntegrationId}
            status={apiStatus}
          />
          <WipeData />
        </div>
      </Card>
    </div>
  );
}
