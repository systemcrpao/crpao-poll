import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ประชาพิจารณ์: การงดเก็บภาษีน้ำมันเพื่อชาวเชียงราย",
  description:
    "ร่วมแสดงความคิดเห็นต่อนโยบายการงดจัดเก็บภาษีน้ำมันในจังหวัดเชียงราย ระหว่างวันที่ 3-5 เมษายน 2569",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
