import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-700">
          ระยะเวลาเปิดรับฟังความคิดเห็น: 3 – 5 เมษายน 2569
        </p>
        <p className="mt-2">
          จัดทำโดย องค์การบริหารส่วนจังหวัดเชียงราย
        </p>
        <p className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-400">
          สร้างด้วย <Heart className="h-3 w-3 text-red-400" /> เพื่อชาวเชียงราย
        </p>
      </div>
    </footer>
  );
}
