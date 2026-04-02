import type { FormData } from "@/app/components/PollForm";
import {
  DISTRICTS,
  GENDERS,
  AGE_RANGES,
  OCCUPATIONS,
} from "@/app/lib/constants";

export interface PollResponse extends FormData {
  id: string;
  created_at: string;
}

export interface StatGroup {
  label: string;
  count: number;
  percent: number;
}

export function computeStats(data: PollResponse[]) {
  const total = data.length;
  const agreeCount = data.filter((d) => d.opinion === "agree").length;
  const disagreeCount = total - agreeCount;

  const byDistrict = groupBy(data, "district", DISTRICTS);
  const byGender = groupBy(data, "gender", GENDERS);
  const byAge = groupBy(data, "ageRange", AGE_RANGES);
  const byOccupation = groupBy(data, "occupation", OCCUPATIONS);

  // By date
  const byDate: Record<string, number> = {};
  data.forEach((d) => {
    const date = new Date(d.created_at).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
    });
    byDate[date] = (byDate[date] || 0) + 1;
  });

  return {
    total,
    agreeCount,
    disagreeCount,
    agreePercent: total > 0 ? Math.round((agreeCount / total) * 100) : 0,
    disagreePercent: total > 0 ? Math.round((disagreeCount / total) * 100) : 0,
    byDistrict,
    byGender,
    byAge,
    byOccupation,
    byDate,
  };
}

function groupBy(
  data: PollResponse[],
  key: keyof PollResponse,
  labels: readonly string[]
): StatGroup[] {
  const counts: Record<string, number> = {};
  labels.forEach((l) => (counts[l] = 0));
  data.forEach((d) => {
    const val = d[key] as string;
    counts[val] = (counts[val] || 0) + 1;
  });

  const total = data.length;
  return labels.map((label) => ({
    label,
    count: counts[label] || 0,
    percent: total > 0 ? Math.round(((counts[label] || 0) / total) * 100) : 0,
  }));
}
