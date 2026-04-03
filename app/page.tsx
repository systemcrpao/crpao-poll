"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import HeroSection from "@/app/components/HeroSection";
import PollForm from "@/app/components/PollForm";
import type { FormData } from "@/app/components/PollForm";
import AlreadySubmitted from "@/app/components/AlreadySubmitted";
import Footer from "@/app/components/Footer";
import { COOLDOWN_MS, STORAGE_KEY, SURVEY_END } from "@/app/lib/constants";
import { supabase } from "@/app/lib/supabase";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [surveyExpired, setSurveyExpired] = useState(
    () => Date.now() >= SURVEY_END.getTime()
  );

  useEffect(() => {
    const lastSubmit = Number(localStorage.getItem(STORAGE_KEY) || "0");
    if (Date.now() - lastSubmit < COOLDOWN_MS) {
      setCooldownActive(true);
    }
  }, []);

  useEffect(() => {
    if (surveyExpired) return;        // already expired, no need to poll

    const check = () => {
      if (Date.now() >= SURVEY_END.getTime()) {
        setSurveyExpired(true);
      }
    };

    const id = setInterval(check, 10_000);

    // Re-check immediately when tab becomes visible (iPad resume)
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [surveyExpired]);

  const scrollToForm = useCallback(() => {
    const el = formRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleStart = () => {
    scrollToForm();
  };

  const handleSubmit = async (data: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(false);

    const { error } = await supabase.from("poll_responses").insert({
      district: data.district,
      gender: data.gender,
      age_range: data.ageRange,
      occupation: data.occupation,
      opinion: data.opinion,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setSubmitError(true);
      setIsSubmitting(false);
      return false;
    }

    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setIsSubmitting(false);
    return true;
  };

  return (
    <div className="flex min-h-full flex-col bg-gray-50">
      {/* Hero */}
      <HeroSection onStart={handleStart} />

      {/* Form area */}
      <div ref={formRef} className="-mt-6 flex-1 pb-16 pt-6 sm:pt-8">
        {surveyExpired ? (
          <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">ปิดรับฟังความคิดเห็นแล้ว</h2>
              <p className="mt-2 text-sm text-gray-500">
                ขอบคุณสำหรับความสนใจ ระยะเวลาการรับฟังความคิดเห็นได้สิ้นสุดลงแล้ว
              </p>
            </div>
          </div>
        ) : cooldownActive ? (
          <AlreadySubmitted />
        ) : (
          <>
            {submitError && (
              <div className="mx-auto mb-4 max-w-2xl px-4">
                <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                  เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง
                </div>
              </div>
            )}
            <PollForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
