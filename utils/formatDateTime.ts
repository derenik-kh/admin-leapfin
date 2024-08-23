import { isDate } from "radash";

export function formatDateTime(date?: string): string {
  if (!date) return "No date provided";
  if (!isDate(new Date(date))) return "Not a valid date";
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(new Date(date));
}
