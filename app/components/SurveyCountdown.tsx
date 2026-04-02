"use client";

import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { SURVEY_END } from "@/app/lib/constants";

function calcRemaining() {
  const diff = SURVEY_END.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export default function SurveyCountdown() {
  const [remaining, setRemaining] = useState(() => calcRemaining());
  const prevRef = useRef(remaining);

  useEffect(() => {
    if (!remaining) return;           // already expired

    const update = () => {
      const next = calcRemaining();
      if (!next) {
        setRemaining(null);
        return;
      }
      const prev = prevRef.current;
      if (
        prev &&
        prev.days === next.days &&
        prev.hours === next.hours &&
        prev.minutes === next.minutes
      ) return;                       // skip if nothing changed
      prevRef.current = next;
      setRemaining(next);
    };

    const id = setInterval(update, 60_000);

    // Recalc immediately when tab becomes visible (iPad resume)
    const onVisible = () => {
      if (document.visibilityState === "visible") update();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [remaining === null]);           // re-subscribe only on expired toggle

  if (!remaining) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
        <Timer className="h-4 w-4" />
        <span>ปิดรับฟังความคิดเห็นแล้ว</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
      <Timer className="h-4 w-4 shrink-0 text-amber-600" />
      <span>เหลือเวลาอีก</span>
      <span className="inline-flex items-center gap-1.5">
        {remaining.days > 0 && (
          <span className="rounded bg-amber-100 px-1.5 py-0.5 font-bold">
            {remaining.days} วัน
          </span>
        )}
        <span className="rounded bg-amber-100 px-1.5 py-0.5 font-bold">
          {remaining.hours} ชม.
        </span>
        <span className="rounded bg-amber-100 px-1.5 py-0.5 font-bold">
          {remaining.minutes} นาที
        </span>
      </span>
    </div>
  );
}
