"use client";

import { CheckCircle2, PartyPopper, ShieldCheck } from "lucide-react";

export default function SuccessScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100">
        <PartyPopper className="mx-auto mb-2 h-10 w-10 text-yellow-500" />
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          ขอบคุณสำหรับการมีส่วนร่วม!
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          องค์การบริหารส่วนจังหวัดเชียงราย ขอขอบคุณท่านเป็นอย่างยิ่ง
          ที่สละเวลาร่วมแสดงความคิดเห็นในการประชาพิจารณ์ครั้งนี้
        </p>
        <p className="mt-3 text-gray-600 leading-relaxed">
          ความคิดเห็นของท่านจะถูกนำไปประกอบการพิจารณา
          <strong>ร่างประกาศ อบจ.เชียงราย เรื่อง การงดจัดเก็บภาษีน้ำมัน</strong>
          เพื่อให้เกิดประโยชน์สูงสุดแก่ประชาชนชาวเชียงราย
        </p>
        <div className="mt-6 rounded-xl bg-green-50 px-4 py-4 text-sm text-green-700 space-y-2">
          <p className="font-semibold">✅ บันทึกข้อมูลเรียบร้อยแล้ว</p>
          <div className="flex items-start justify-center gap-1.5 text-green-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <p>ข้อมูลของท่านจะถูกเก็บรักษาเป็นความลับตามกฎหมาย</p>
          </div>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          หากท่านต้องการแก้ไขความคิดเห็น สามารถส่งแบบสอบถามได้อีกครั้งหลังจาก 1 ชั่วโมง
        </p>
      </div>
    </div>
  );
}
