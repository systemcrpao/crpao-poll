"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { COOLDOWN_MS, STORAGE_KEY } from "@/app/lib/constants";

export default function AlreadySubmitted() {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const lastSubmit = Number(localStorage.getItem(STORAGE_KEY) || "0");
      const diff = COOLDOWN_MS - (Date.now() - lastSubmit);
      setRemaining(Math.max(0, diff));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  if (remaining <= 0) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            สามารถส่งแบบสอบถามได้อีกครั้ง
          </h2>
          <p className="mt-2 text-gray-500">
            กรุณารีเฟรชหน้าเว็บเพื่อเริ่มต้นใหม่
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            รีเฟรชหน้าเว็บ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">
          ขอบคุณสำหรับความคิดเห็นของท่าน!
        </h2>
        <p className="mt-3 text-gray-600">
          คุณได้แสดงความคิดเห็นแล้ว โปรดกลับมาใหม่ในอีก
        </p>

        {/* Countdown */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-blue-50 px-6 py-4">
          <Clock className="h-6 w-6 text-blue-600" />
          <span className="font-mono text-3xl font-bold text-blue-700">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          ระบบจำกัดการส่ง 1 ครั้งต่อชั่วโมง เพื่อป้องกันสแปม
        </p>
      </div>
    </div>
  );
}
