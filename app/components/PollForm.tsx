"use client";

import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/app/lib/cn";
import { DISTRICTS, GENDERS, AGE_RANGES, OCCUPATIONS, DRAFT_ANNOUNCEMENT_URL } from "@/app/lib/constants";
import SurveyCountdown from "./SurveyCountdown";

export interface FormData {
  district: string;
  gender: string;
  ageRange: string;
  occupation: string;
  opinion: "agree" | "disagree" | "";
}

interface PollFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

export default function PollForm({ onSubmit, isSubmitting }: PollFormProps) {
  const [data, setData] = useState<FormData>({
    district: "",
    gender: "",
    ageRange: "",
    occupation: "",
    opinion: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

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

  const handleSubmit = () => {
    if (validate()) onSubmit(data);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 space-y-6">
      {/* Announcement / Explanation Card */}
      <div className="rounded-2xl bg-white p-6 shadow-lg shadow-blue-900/5 ring-1 ring-gray-100 sm:p-8">
        <div className="flex items-start gap-3 mb-4">
          <FileText className="mt-0.5 h-6 w-6 shrink-0 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              ร่างประกาศองค์การบริหารส่วนจังหวัดเชียงราย
            </h2>
            <p className="text-sm text-blue-600 font-medium">
              เรื่อง การงดจัดเก็บภาษีน้ำมันในเขตจังหวัดเชียงราย
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-blue-50/70 px-4 py-4 text-sm leading-relaxed text-gray-700 space-y-3">
          <p>
            องค์การบริหารส่วนจังหวัดเชียงราย (อบจ.เชียงราย)
            ได้จัดทำ<strong>ประชาพิจารณ์</strong>เพื่อรับฟังความคิดเห็นของประชาชน
            ตาม<strong>ร่างประกาศ อบจ.เชียงราย เรื่อง การงดจัดเก็บภาษีน้ำมัน</strong>ในเขตจังหวัดเชียงราย
            ซึ่งมีวัตถุประสงค์เพื่อบรรเทาภาระค่าครองชีพด้านพลังงานให้แก่ประชาชนในพื้นที่
          </p>
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <CalendarClock className="h-4 w-4" />
            <span>ระยะเวลาเปิดรับฟังความคิดเห็น: 3 – 5 เมษายน 2569 (3 วัน)</span>
          </div>
          <SurveyCountdown />
          <div className="flex items-start gap-2 pt-1 text-gray-600 border-t border-blue-100">
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

      {/* Draft Announcement Link */}
      {DRAFT_ANNOUNCEMENT_URL && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-amber-900">
                อ่านร่างประกาศฉบับเต็ม
              </h3>
              <p className="mt-1 text-xs text-amber-700/80">
                กรุณาศึกษาร่างประกาศ อบจ.เชียงราย ก่อนแสดงความคิดเห็น
              </p>
              <a
                href={DRAFT_ANNOUNCEMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
              >
                <ExternalLink className="h-4 w-4" />
                เปิดอ่านร่างประกาศ
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-2xl bg-white p-6 shadow-lg shadow-blue-900/5 ring-1 ring-gray-100 sm:p-8 space-y-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Users className="h-5 w-5 text-blue-600" />
          แบบสอบถามประชาพิจารณ์
        </h2>

        {/* District */}
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
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="mt-1 text-sm text-red-500">{errors.district}</p>
          )}
        </div>

        {/* Gender */}
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

        {/* Age Range */}
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

        {/* Occupation */}
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
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-500">{errors.occupation}</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Opinion: Agree / Disagree */}
        <div>
          <p className="mb-1 text-sm font-medium text-gray-700">
            ท่านเห็นด้วยหรือไม่กับร่างประกาศ อบจ.เชียงราย เรื่อง การงดจัดเก็บภาษีน้ำมันในเขตจังหวัดเชียงราย?
          </p>
          <p className="mb-4 text-xs text-gray-500">
            เพื่อบรรเทาภาระค่าครองชีพด้านพลังงานให้แก่ประชาชน
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* Agree */}
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
                  data.opinion === "agree"
                    ? "text-green-600"
                    : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-base font-semibold",
                  data.opinion === "agree"
                    ? "text-green-700"
                    : "text-gray-600"
                )}
              >
                เห็นด้วย
              </span>
            </label>

            {/* Disagree */}
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
                onChange={() =>
                  setData((d) => ({ ...d, opinion: "disagree" }))
                }
                className="sr-only"
              />
              <ThumbsDown
                className={cn(
                  "h-8 w-8",
                  data.opinion === "disagree"
                    ? "text-red-600"
                    : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-base font-semibold",
                  data.opinion === "disagree"
                    ? "text-red-700"
                    : "text-gray-600"
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

        {/* Submit */}
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
    </div>
  );
}
