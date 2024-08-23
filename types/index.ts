import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ChartData = {
  date: string;
  duration: number;
  status: "failed" | "success";
};

export type ChartsDataType = {
  airflow: ChartData[];
  scribe: ChartData[];
};

export type User = {
  id: number;
  email: string;
  name: string;
  organizationId: number;
  isAdmin: boolean;
  isActive: boolean;
  status: string;
};
