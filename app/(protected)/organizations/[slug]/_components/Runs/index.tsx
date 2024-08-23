"use client";

import type { Run } from "@/components/organization-table/constants";

import { Card as NextUiCard } from "@nextui-org/react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { useState, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";
import { formatDateTime } from "@/utils/formatDateTime";

const chartConfig = {
  airflow: {
    label: "Daily",
    color: "hsl(var(--chart-1))",
  },
  scribe: {
    label: "Importer",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const statusMap: Record<string, string> = {
  success: "green",
  failed: "red",
  running: "orange",
  skipped: "pink",
  queued: "#444",
};

const formatDuration = (
  miliseconds: number,
  options = {
    d: true,
    hr: true,
    min: true,
    sec: true,
    ms: false,
  },
) => {
  const ms = Math.abs(miliseconds);
  // If milliseconds are negative, convert them to positive

  // Define an object 'time' to store the duration components
  const time = {
    d: Math.floor(ms / 86400000), // Calculate number of days
    hr: Math.floor(ms / 3600000) % 24, // Calculate number of hours (mod 24 to get the remaining hours)
    min: Math.floor(ms / 60000) % 60, // Calculate number of minutes (mod 60 to get the remaining minutes)
    sec: Math.floor(ms / 1000) % 60, // Calculate number of seconds (mod 60 to get the remaining seconds)
    ms: Math.floor(ms) % 1000, // Calculate number of milliseconds (mod 1000 to get the remaining milliseconds)
  };

  // If the 'options' object is provided, update the 'time' object with the provided options
  //
  if (options) {
    if (options.d === false) time.d = 0;
    if (options.hr === false) time.hr = 0;
    if (options.min === false) time.min = 0;
    if (options.sec === false) time.sec = 0;
    if (options.ms === false) time.ms = 0;
  }

  // Convert the 'time' object to an array of key-value pairs, filter out components with a value of 0, and format each component
  return Object.entries(time)
    .filter((val) => val[1] !== 0) // Filter out components with a value of 0
    .map((val) => `${val[1]} ${val[1] !== 1 ? `${val[0]}` : val[0]}`) // Format each component
    .join(", "); // Join the formatted components with a comma and space
};

export function Runs({
  chartsData,
}: {
  chartsData: {
    airflow: (Run & { duration: number })[];
    scribe: (Run & { duration: number })[];
  };
}) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("scribe");

  const total = useMemo(
    () => ({
      scribe: chartsData.scribe.length,
      airflow: chartsData.airflow.length,
    }),
    [chartsData],
  );

  return (
    <NextUiCard>
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>{chartConfig[activeChart].label}</CardTitle>
            <CardDescription>
              Showing total runs for the last 3 months
            </CardDescription>
          </div>
          <div className="flex">
            {["scribe", "airflow"].map((key) => {
              const chart = key as keyof typeof chartConfig;

              return (
                <button
                  key={chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  data-active={activeChart === chart}
                  type="button"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total]}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            className="aspect-auto h-[450px] w-full"
            config={chartConfig}
          >
            <BarChart
              accessibilityLayer
              data={chartsData[activeChart]}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="execution_date"
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);

                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                dataKey={"duration"}
                minTickGap={8}
                tickFormatter={(v) =>
                  formatDuration(v, {
                    d: true,
                    hr: true,
                    min: false,
                    sec: false,
                    ms: false,
                  })
                }
                tickMargin={8}
              />
              <ChartLegend content={<CustomLegend />} />

              <ChartTooltip
                content={
                  <CustomTooltip />
                  // <ChartTooltipContent
                  //   className="w-[150px]"
                  //   formatter={(v) =>
                  //     `Duration: ${formatDuration(v as number)}`
                  //   }
                  //   labelFormatter={(value) => {
                  //     return `Date: ${new Date(value).toLocaleDateString(
                  //       "en-US",
                  //       {
                  //         month: "short",
                  //         day: "numeric",
                  //         year: "numeric",
                  //       },
                  //     )}`;
                  //   }}
                  //   nameKey="duration"
                  // />
                }
              />
              <Bar
                isAnimationActive
                dataKey={"duration"}
                fill={`var(--color-${activeChart})`}
              >
                {chartsData[activeChart].map((entry, index) => (
                  <Cell
                    key={`cell-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    fill={statusMap[entry.state]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </NextUiCard>
  );
}

const CustomLegend = () => (
  <div className="flex items-center gap-4 justify-center">
    {Object.entries(statusMap).map(([key, value]) => (
      <div key={key} className="capitalize">
        <span style={{ color: value }}>●</span> {key}
      </div>
    ))}
  </div>
);

export const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload: Run & { duration: number } }[];
  label?: string;
}) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-md p-3 shadow-md flex flex-col items-start justify-start">
        <span>
          <span className="font-semibold text-default-700">
            Execution Date:
          </span>{" "}
          {formatDateTime(label)}
        </span>
        <span className="capitalize">
          <span className="font-bold inline-block mr-2 text-default-700">
            Status:
          </span>
          {payload[0].payload.state}
        </span>
        <span>
          <span className="font-bold inline-block mr-2 text-default-700">
            Duration:
          </span>
          {formatDuration(payload[0].payload.duration)}
        </span>
        <span>
          <span className="font-bold inline-block mr-2 text-default-700">
            Dag ID:
          </span>
          {payload[0].payload.dag_id}
        </span>
        <span>
          <span className="font-bold inline-block mr-2 text-default-700">
            Dag Run ID:
          </span>
          {payload[0].payload.dag_run_id}
        </span>
        <span>
          <span className="font-bold inline-block mr-2 text-default-700">
            Start Date:
          </span>
          {formatDateTime(payload[0].payload.start_date)}
        </span>
        {payload[0].payload.end_date && (
          <span>
            <span className="font-bold inline-block mr-2 text-default-700">
              End Date:
            </span>
            {formatDateTime(payload[0].payload.end_date)}
          </span>
        )}
        <span>
          <span className="font-bold inline-block mr-2 text-default-700">
            External Trigger:
          </span>
          {payload[0].payload.external_trigger ? "Yes" : "No"}
        </span>
        <span>
          <span className="font-bold inline-block mr-2 text-default-700">
            Run Type:
          </span>
          {payload[0].payload.run_type}
        </span>
      </div>
    );
  }

  return null;
};
