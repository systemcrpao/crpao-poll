"use client";

import { useState } from "react";
import { Lock, Mail, LogIn, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<string | null>;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errMsg = await onLogin(email, password);
    if (errMsg) {
      setError(errMsg);
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-indigo-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-500 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Glass card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10">
          {/* Logo & Title */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-md" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/logo-crpao.png"
                  alt="อบจ.เชียงราย"
                  width={56}
                  height={56}
                  className="rounded-full object-contain"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">
                ระบบจัดการประชาพิจารณ์
              </h1>
              <p className="mt-1 text-sm text-blue-200/70">
                องค์การบริหารส่วนจังหวัดเชียงราย
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-100/80">
                <Mail className="h-4 w-4" />
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3.5 text-white placeholder-white/30 transition focus:border-blue-400/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-100/80">
                <Lock className="h-4 w-4" />
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3.5 text-white placeholder-white/30 transition focus:border-blue-400/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400 hover:shadow-blue-400/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  เข้าสู่ระบบ
                </>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>เข้าสู่ระบบอย่างปลอดภัยผ่าน Supabase Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
