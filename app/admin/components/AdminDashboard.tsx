"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Users,
  ThumbsUp,
  ThumbsDown,
  Printer,
  BarChart3,
  PieChart,
  MapPin,
  CalendarDays,
  LogOut,
  TrendingUp,
  Loader2,
  RefreshCw,
  AlertCircle,
  Filter,
  X,
} from "lucide-react";
import { computeStats } from "@/app/lib/stats";
import type { PollResponse, StatGroup } from "@/app/lib/stats";
import { cn } from "@/app/lib/cn";
import { supabase } from "@/app/lib/supabase";
import { DISTRICTS, GENDERS, AGE_RANGES, OCCUPATIONS } from "@/app/lib/constants";

function BarChart({
  items,
  color = "blue",
}: {
  items: StatGroup[];
  color?: "blue" | "green" | "purple" | "amber";
}) {
  const max = Math.max(...items.map((i) => i.count), 1);
  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 text-sm">
          <span className="w-36 shrink-0 truncate text-right text-gray-600 sm:w-44">
            {item.label}
          </span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className={cn("h-full rounded-full transition-all", colorMap[color])}
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="w-16 shrink-0 text-right font-medium text-gray-700">
            {item.count}{" "}
            <span className="text-xs text-gray-400">({item.percent}%)</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PollResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [filterOccupation, setFilterOccupation] = useState("");
  const [filterOpinion, setFilterOpinion] = useState("");

  const hasFilters = filterDistrict || filterGender || filterAge || filterOccupation || filterOpinion;

  const clearFilters = () => {
    setFilterDistrict("");
    setFilterGender("");
    setFilterAge("");
    setFilterOccupation("");
    setFilterOpinion("");
  };

  const filteredData = useMemo(() => {
    return data.filter((d) => {
      if (filterDistrict && d.district !== filterDistrict) return false;
      if (filterGender && d.gender !== filterGender) return false;
      if (filterAge && d.ageRange !== filterAge) return false;
      if (filterOccupation && d.occupation !== filterOccupation) return false;
      if (filterOpinion && d.opinion !== filterOpinion) return false;
      return true;
    });
  }, [data, filterDistrict, filterGender, filterAge, filterOccupation, filterOpinion]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    // Ensure auth session is ready before querying
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setError("ไม่พบ session กรุณาเข้าสู่ระบบใหม่");
      setLoading(false);
      return;
    }

    const { data: rows, error: err, count } = await supabase
      .from("poll_responses")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: true });

    console.log("[Dashboard] fetch result:", { rowCount: rows?.length, count, error: err });

    if (err) {
      console.error("Supabase fetch error:", err);
      setError(err.message);
      setLoading(false);
      return;
    }

    const mapped: PollResponse[] = (rows || []).map((r) => ({
      id: r.id,
      district: r.district,
      gender: r.gender ?? "",
      ageRange: r.age_range,
      occupation: r.occupation,
      opinion: r.opinion,
      created_at: r.created_at,
    }));

    setData(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(() => computeStats(filteredData), [filteredData]);

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - hide in print */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/crpao-poll/images/logo-crpao.png"
              alt="อบจ.เชียงราย"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <h1 className="text-sm font-bold text-gray-800 sm:text-base">
                รายงานผลรับฟังความคิดเห็นของประชาชน 
              </h1>
              <p className="text-xs text-gray-500">
                ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย
ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555
แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              <span className="hidden sm:inline">รีเฟรช</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">พิมพ์รายงาน</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div ref={printRef} className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Print header - show only in print */}
        <div className="mb-6 hidden items-center gap-4 print:flex">
          <Image
            src="/crpao-poll/images/logo-crpao.png"
            alt="อบจ.เชียงราย"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              รายงานผลประชาพิจารณ์: การงดจัดเก็บภาษีน้ำมัน จ.เชียงราย
            </h1>
            <p className="text-sm text-gray-500">
              ระยะเวลาสำรวจ: 3 – 5 เมษายน 2569 | พิมพ์เมื่อ:{" "}
              {new Date().toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <p className="mt-4 text-gray-700 font-medium">ไม่สามารถโหลดข้อมูลได้</p>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              ลองใหม่
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && !error && (
        <>

        {stats.total === 0 && !hasFilters && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-amber-500" />
            <h3 className="mt-3 text-base font-semibold text-amber-800">
              ยังไม่มีข้อมูลการตอบแบบสอบถาม
            </h3>
            <p className="mt-1 text-sm text-amber-600">
              ข้อมูลจะแสดงเมื่อมีผู้ร่วมตอบแบบสอบถามแล้ว
            </p>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100 print:hidden sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Filter className="h-4 w-4 text-blue-600" />
              กรองข้อมูล
              {hasFilters && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {filteredData.length} / {data.length} รายการ
                </span>
              )}
            </h3>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5" />
                ล้างตัวกรอง
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">อำเภอ: ทั้งหมด</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">เพศ: ทั้งหมด</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <select
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">ช่วงอายุ: ทั้งหมด</option>
              {AGE_RANGES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <select
              value={filterOccupation}
              onChange={(e) => setFilterOccupation(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">อาชีพ: ทั้งหมด</option>
              {OCCUPATIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <select
              value={filterOpinion}
              onChange={(e) => setFilterOpinion(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">ความเห็น: ทั้งหมด</option>
              <option value="agree">เห็นด้วย</option>
              <option value="disagree">ไม่เห็นด้วย</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            icon={Users}
            label="จำนวนผู้ตอบทั้งหมด"
            value={stats.total.toLocaleString()}
            sub="คน"
            color="bg-blue-600"
          />
          <StatCard
            icon={ThumbsUp}
            label="เห็นด้วย"
            value={stats.agreeCount.toLocaleString()}
            sub={`${stats.agreePercent}%`}
            color="bg-green-600"
          />
          <StatCard
            icon={ThumbsDown}
            label="ไม่เห็นด้วย"
            value={stats.disagreeCount.toLocaleString()}
            sub={`${stats.disagreePercent}%`}
            color="bg-red-500"
          />
          <StatCard
            icon={TrendingUp}
            label="อัตราเห็นด้วย"
            value={`${stats.agreePercent}%`}
            color="bg-purple-600"
          />
        </div>

        {/* Opinion Donut */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
              <PieChart className="h-5 w-5 text-blue-600" />
              สัดส่วนความคิดเห็น
            </h3>
            <div className="flex items-center justify-center gap-8">
              {/* Simple donut using SVG */}
              <svg viewBox="0 0 100 100" className="h-40 w-40">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${stats.agreePercent * 2.51} ${100 * 2.51}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray={`${stats.disagreePercent * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={`-${stats.agreePercent * 2.51}`}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-700"
                />
                <text
                  x="50"
                  y="46"
                  textAnchor="middle"
                  className="fill-gray-800 text-lg font-bold"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  {stats.agreePercent}%
                </text>
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  className="fill-gray-500"
                  style={{ fontSize: "7px" }}
                >
                  เห็นด้วย
                </text>
              </svg>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600">
                    เห็นด้วย{" "}
                    <strong>
                      {stats.agreeCount} ({stats.agreePercent}%)
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-600">
                    ไม่เห็นด้วย{" "}
                    <strong>
                      {stats.disagreeCount} ({stats.disagreePercent}%)
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* By Gender */}
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
              <Users className="h-5 w-5 text-purple-600" />
              จำแนกตามเพศ
            </h3>
            <BarChart items={stats.byGender} color="purple" />
          </div>
        </div>

        {/* By Age */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
            <BarChart3 className="h-5 w-5 text-amber-600" />
            จำแนกตามช่วงอายุ
          </h3>
          <BarChart items={stats.byAge} color="amber" />
        </div>

        {/* By District */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
            <MapPin className="h-5 w-5 text-blue-600" />
            จำแนกตามอำเภอ
          </h3>
          <BarChart items={stats.byDistrict} color="blue" />
        </div>

        {/* By Occupation */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
            <BarChart3 className="h-5 w-5 text-green-600" />
            จำแนกตามอาชีพ
          </h3>
          <BarChart items={stats.byOccupation} color="green" />
        </div>

        {/* By Date */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            จำนวนผู้ตอบรายวัน
          </h3>
          <div className="space-y-2">
            {Object.entries(stats.byDate).map(([date, count]) => {
              const max = Math.max(...Object.values(stats.byDate), 1);
              return (
                <div key={date} className="flex items-center gap-3 text-sm">
                  <span className="w-36 shrink-0 text-right text-gray-600 sm:w-44">
                    {date}
                  </span>
                  <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${(count / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right font-medium text-gray-700">
                    {count} <span className="text-xs text-gray-400">คน</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 text-base font-semibold text-gray-800">
            รายละเอียดข้อมูลล่าสุด (20 รายการ)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="pb-2 pr-4 font-medium">#</th>
                  <th className="pb-2 pr-4 font-medium">วันที่</th>
                  <th className="pb-2 pr-4 font-medium">อำเภอ</th>
                  <th className="pb-2 pr-4 font-medium">เพศ</th>
                  <th className="pb-2 pr-4 font-medium">อายุ</th>
                  <th className="pb-2 pr-4 font-medium">อาชีพ</th>
                  <th className="pb-2 font-medium">ความเห็น</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(-20)
                  .reverse()
                  .map((row, i) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-2 pr-4 text-gray-400">{i + 1}</td>
                      <td className="py-2 pr-4 text-gray-600">
                        {new Date(row.created_at).toLocaleString("th-TH", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 pr-4 text-gray-700">{row.district}</td>
                      <td className="py-2 pr-4 text-gray-700">{row.gender}</td>
                      <td className="py-2 pr-4 text-gray-700">{row.ageRange}</td>
                      <td className="py-2 pr-4 text-gray-700">{row.occupation}</td>
                      <td className="py-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                            row.opinion === "agree"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          )}
                        >
                          {row.opinion === "agree" ? (
                            <>
                              <ThumbsUp className="h-3 w-3" /> เห็นด้วย
                            </>
                          ) : (
                            <>
                              <ThumbsDown className="h-3 w-3" /> ไม่เห็นด้วย
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer for print */}
        <div className="mt-8 hidden border-t border-gray-200 pt-4 text-center text-xs text-gray-400 print:block">
          <p>
            รายงานนี้จัดทำโดยระบบประชาพิจารณ์ออนไลน์ องค์การบริหารส่วนจังหวัดเชียงราย
          </p>
          <p>ข้อมูล ณ วันที่พิมพ์รายงาน</p>
        </div>

        </>)}
      </div>
    </div>
  );
}
