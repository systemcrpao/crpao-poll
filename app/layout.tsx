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
  title: "รับฟังความคิดเห็น ร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย",
  description:
    "ร่วมแสดงความคิดเห็นเพื่อเป็นส่วนหนึ่งในการร่างข้อบัญญัติองค์การบริหารส่วนจังหวัดเชียงราย ว่าด้วยเรื่อง การเก็บภาษีบำรุงองค์การบริหารส่วนจังหวัด พ.ศ. 2555 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2569",
  icons: {
    icon: "/crpao-poll/images/logo-crpao.png",
  },
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
