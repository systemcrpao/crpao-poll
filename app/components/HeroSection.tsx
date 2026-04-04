"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-sky-400 text-white">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="2" fill="currentColor" />
              <path
                d="M0 30 Q15 20 30 30 Q45 40 60 30"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:text-sm">
          <Image
            src="/crpao-poll/images/logo-crpao.png"
            alt="อบจ.เชียงราย"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>องค์การบริหารส่วนจังหวัดเชียงราย</span>
        </div>

        <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl">
          รับฟังความคิดเห็น <br />
          <span className="text-pink-300"> ประกาศองค์การบริหารส่วนจังหวัดเชียงราย 
          <br />
          เรื่อง รับฟังความคิดเห็นของประชาชนเกี่ยวกับ <br /> ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย <br />
ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 <br /> แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569
</span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">
          ร่วมแสดงความคิดเห็นเพื่อเป็นส่วนหนึ่งในการร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-blue-200 sm:text-sm">
          <span className="rounded-full bg-white/10 px-3 py-1">
            📅 3 – 5 เมษายน 2569
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1">
            ⏱️ ใช้เวลาเพียง 2 นาที
          </span>
        </div>

        <button
          onClick={onStart}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-xl active:scale-100 sm:px-8 sm:py-3.5 sm:text-lg"
        >
          เริ่มทำแบบสอบถาม
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}