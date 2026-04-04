"use client";

import { useState, useCallback } from "react";
import {
  MapPin,
  Users,
  Briefcase,
  ThumbsUp,
  ThumbsDown,
  Send,
  Loader2,
  ShieldCheck,
  FileText,
  CalendarClock,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  PartyPopper,
  X,
} from "lucide-react";
import { cn } from "@/app/lib/cn";
import {
  DISTRICTS,
  GENDERS,
  AGE_RANGES,
  OCCUPATIONS,
  DRAFT_ANNOUNCEMENT_URL,
} from "@/app/lib/constants";
import SurveyCountdown from "./SurveyCountdown";

export interface FormData {
  district: string;
  gender: string;
  ageRange: string;
  occupation: string;
  opinion: "agree" | "disagree" | "";
}

interface PollFormProps {
  onSubmit: (data: FormData) => Promise<boolean>;
  isSubmitting: boolean;
}

const STEPS = [
  { label: "ข้อมูลประกาศ" },
  { label: "ตอบแบบสอบถาม" },
  { label: "เสร็จสิ้น" },
] as const;

function Stepper({ step }: { step: number }) {
  return (
    <div className="mx-auto mt-5 mb-8 flex max-w-md items-center justify-center">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all",
                  done
                    ? "bg-green-500 text-white"
                    : active
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-gray-200 text-gray-500"
                )}
              >
                {done ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "mt-1.5 text-xs font-medium",
                  done
                    ? "text-green-600"
                    : active
                      ? "text-blue-700"
                      : "text-gray-400"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-12 rounded-full sm:w-20",
                  i < step ? "bg-green-400" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PollForm({ onSubmit, isSubmitting }: PollFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    district: "",
    gender: "",
    ageRange: "",
    occupation: "",
    opinion: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const scrollTop = useCallback(() => {
    document
      .getElementById("poll-wizard")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!data.district) newErrors.district = "กรุณาเลือกอำเภอ";
    if (!data.gender) newErrors.gender = "กรุณาเลือกเพศ";
    if (!data.ageRange) newErrors.ageRange = "กรุณาเลือกช่วงอายุ";
    if (!data.occupation) newErrors.occupation = "กรุณาเลือกอาชีพ";
    if (!data.opinion) newErrors.opinion = "กรุณาเลือกความคิดเห็น";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setStep(1);
    scrollTop();
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const ok = await onSubmit(data);
    if (ok) {
      setStep(2);
      scrollTop();
    }
  };

  const handleClose = () => {
    window.close();
    window.location.href = "about:blank";
  };

  return (
    <div id="poll-wizard" className="mx-auto w-full max-w-2xl px-4 space-y-6">
      <Stepper step={step} />

      {step === 0 && (
        <>
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-blue-900/5 ring-1 ring-gray-100 sm:p-8">
            <div className="mb-4 flex items-start gap-3">
              <FileText className="mt-0.5 h-6 w-6 shrink-0 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  ประกาศองค์การบริหารส่วนจังหวัดเชียงราย
                </h2>
                <p className="text-sm font-medium text-blue-600">
                  เรื่อง รับฟังความคิดเห็นของประชาชนเกี่ยวกับ ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย 
ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569

                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-xl bg-blue-50/70 px-4 py-4 text-sm leading-relaxed text-gray-700">
              <p>
                องค์การบริหารส่วนจังหวัดเชียงราย (อบจ.เชียงราย)
                ได้จัดทำแบบสอบถามเพื่อรับฟังความคิดเห็นของประชาชน
                เรื่อง <strong>ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569 </strong>
                โดยมีวัตถุประสงค์เพื่อรวบรวมความคิดเห็นของประชาชนชาวเชียงราย กับสถานการณ์ปัจจุบันที่เกิดภาวะสงครามในภูมิภาคตะวันออกกลางเป็นเหตุให้ราคาน้ำมันในตลาดโลกปรับตัวสูงขึ้นอย่างรวดเร็ว เพื่อเสนอต่อสภาองค์การบริหารส่วนจังหวัดเชียงราย ในการพิจารณาร่างข้อบัญญัติฯ ดังกล่าวต่อไป
              </p>
              <div className="flex items-center gap-2 font-medium text-blue-700">
                <CalendarClock className="h-4 w-4" />
                <span>ระยะเวลาเปิดรับฟังความคิดเห็น: 3 – 5 เมษายน 2569 (3 วัน)</span>
              </div>
              <SurveyCountdown />
              <div className="flex items-start gap-2 border-t border-blue-100 pt-1 text-gray-600">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <p>
                  ข้อมูลที่ท่านให้ไว้จะถูกเก็บรักษาเป็น<strong>ความลับ</strong>
                  ตามพระราชบัญญัติข้อมูลข่าวสารของราชการ พ.ศ. 2540
                  และพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                  โดยจะนำไปใช้ประกอบการพิจารณาร่างประกาศฯ ในภาพรวมเท่านั้น
                  จะไม่มีการเปิดเผยข้อมูลรายบุคคลใดๆ ทั้งสิ้น
                </p>
              </div>
            </div>
          </div>

          {DRAFT_ANNOUNCEMENT_URL && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-amber-900">
                    อ่านประกาศ
                  </h3>
                  <p className="mt-1 text-xs text-amber-700/80">
                    สามารถศึกษา ประกาศองค์การบริหารส่วนจังหวัดเชียงราย เพื่อแสดงความคิดเห็น ได้ตามลิงก์ด้านล่างนี้
                  </p>
                  <a
                    href={DRAFT_ANNOUNCEMENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    เปิดอ่านประกาศ
                  </a>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
          >
            ถัดไป
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {step === 1 && (
        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg shadow-blue-900/5 ring-1 ring-gray-100 sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Users className="h-5 w-5 text-blue-600" />
            แบบสอบถาม
          </h2>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-blue-500" />
              อำเภอที่อยู่อาศัย
            </label>
            <select
              value={data.district}
              onChange={(e) =>
                setData((d) => ({ ...d, district: e.target.value }))
              }
              className={cn(
                "w-full rounded-xl border bg-gray-50 px-4 py-3 text-gray-800 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none",
                errors.district ? "border-red-400" : "border-gray-200"
              )}
            >
              <option value="">-- เลือกอำเภอ --</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.district && (
              <p className="mt-1 text-sm text-red-500">{errors.district}</p>
            )}
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Users className="h-4 w-4 text-blue-500" />
              เพศ
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GENDERS.map((g) => (
                <label
                  key={g}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition hover:border-blue-300 hover:bg-blue-50",
                    data.gender === g
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                      : "border-gray-200 text-gray-600"
                  )}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={data.gender === g}
                    onChange={() => setData((d) => ({ ...d, gender: g }))}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                      data.gender === g
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    )}
                  >
                    {data.gender === g && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Users className="h-4 w-4 text-blue-500" />
              ช่วงอายุ
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {AGE_RANGES.map((age) => (
                <label
                  key={age}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition hover:border-blue-300 hover:bg-blue-50",
                    data.ageRange === age
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                      : "border-gray-200 text-gray-600"
                  )}
                >
                  <input
                    type="radio"
                    name="ageRange"
                    value={age}
                    checked={data.ageRange === age}
                    onChange={() => setData((d) => ({ ...d, ageRange: age }))}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                      data.ageRange === age
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    )}
                  >
                    {data.ageRange === age && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  {age}
                </label>
              ))}
            </div>
            {errors.ageRange && (
              <p className="mt-1 text-sm text-red-500">{errors.ageRange}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Briefcase className="h-4 w-4 text-blue-500" />
              อาชีพ
            </label>
            <select
              value={data.occupation}
              onChange={(e) =>
                setData((d) => ({ ...d, occupation: e.target.value }))
              }
              className={cn(
                "w-full rounded-xl border bg-gray-50 px-4 py-3 text-gray-800 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none",
                errors.occupation ? "border-red-400" : "border-gray-200"
              )}
            >
              <option value="">-- เลือกอาชีพ --</option>
              {OCCUPATIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-500">{errors.occupation}</p>
            )}
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">
              ท่านเห็นด้วยหรือไม่กับประกาศองค์การบริหารส่วนจังหวัดเชียงราย เรื่อง รับฟังความคิดเห็นของประชาชนเกี่ยวกับ ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย 
ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569
?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 p-5 transition hover:shadow-md",
                  data.opinion === "agree"
                    ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                )}
              >
                <input
                  type="radio"
                  name="opinion"
                  value="agree"
                  checked={data.opinion === "agree"}
                  onChange={() => setData((d) => ({ ...d, opinion: "agree" }))}
                  className="sr-only"
                />
                <ThumbsUp
                  className={cn(
                    "h-8 w-8",
                    data.opinion === "agree" ? "text-green-600" : "text-gray-400"
                  )}
                />
                <span
                  className={cn(
                    "text-base font-semibold",
                    data.opinion === "agree" ? "text-green-700" : "text-gray-600"
                  )}
                >
                  เห็นด้วย
                </span>
              </label>

              <label
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 p-5 transition hover:shadow-md",
                  data.opinion === "disagree"
                    ? "border-red-500 bg-red-50 ring-2 ring-red-200"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50"
                )}
              >
                <input
                  type="radio"
                  name="opinion"
                  value="disagree"
                  checked={data.opinion === "disagree"}
                  onChange={() => setData((d) => ({ ...d, opinion: "disagree" }))}
                  className="sr-only"
                />
                <ThumbsDown
                  className={cn(
                    "h-8 w-8",
                    data.opinion === "disagree" ? "text-red-600" : "text-gray-400"
                  )}
                />
                <span
                  className={cn(
                    "text-base font-semibold",
                    data.opinion === "disagree" ? "text-red-700" : "text-gray-600"
                  )}
                >
                  ไม่เห็นด้วย
                </span>
              </label>
            </div>
            {errors.opinion && (
              <p className="mt-2 text-sm text-red-500">{errors.opinion}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                กำลังส่งข้อมูล...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                ส่งแบบสอบถาม
              </>
            )}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100">
          <PartyPopper className="mx-auto mb-2 h-10 w-10 text-yellow-500" />
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            ขอบคุณสำหรับการมีส่วนร่วม!
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            องค์การบริหารส่วนจังหวัดเชียงราย ขอขอบคุณท่านเป็นอย่างยิ่ง
            ที่สละเวลาร่วมแสดงความคิดเห็นในการตอบแบบสอบถามครั้งนี้
          </p>
          <p className="mt-3 leading-relaxed text-gray-600">
            ความคิดเห็นของท่านจะถูกนำไปประกอบการพิจารณา
            <strong>ประกาศองค์การบริหารส่วนจังหวัดเชียงราย เรื่อง รับฟังความคิดเห็นของประชาชนเกี่ยวกับ ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย 
ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569
</strong>
            เพื่อให้เกิดประโยชน์สูงสุดแก่ประชาชนชาวเชียงราย
          </p>
          <div className="mt-6 space-y-2 rounded-xl bg-green-50 px-4 py-4 text-sm text-green-700">
            <p className="font-semibold">✅ บันทึกข้อมูลเรียบร้อยแล้ว</p>
            <div className="flex items-start justify-center gap-1.5 text-green-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <p>ข้อมูลของท่านจะถูกเก็บรักษาเป็นความลับตามกฎหมาย</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-gray-700 hover:shadow-lg active:scale-[0.98]"
          >
            <X className="h-5 w-5" />
            ปิดหน้าต่าง
          </button>

          <p className="mt-4 text-xs text-gray-400">
            หากท่านต้องการแก้ไขความคิดเห็น สามารถส่งแบบสอบถามได้อีกครั้งหลังจาก 1 ชั่วโมง
          </p>
        </div>
      )}
    </div>
  );
}