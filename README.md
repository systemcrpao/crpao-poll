# CRPAO Poll - ระบบสำรวจความคิดเห็น 📊

ระบบเว็บแอปพลิเคชันสำหรับจัดทำแบบสำรวจและประเมินความคิดเห็น พัฒนาขึ้นสำหรับองค์การบริหารส่วนจังหวัดเชียงราย (อบจ.เชียงราย) โดยใช้ Next.js ร่วมกับ Supabase เป็นฐานข้อมูลหลัก

## 🚀 คุณสมบัติเด่น (Features)

- **📝 หน้าแบบฟอร์มสำหรับผู้ใช้งาน (Public Survey Form):** รองรับการกรอกข้อมูลที่ใช้งานง่าย รวดเร็ว ผ่าน Component อย่าง `PollForm`[cite: 1]
- **⏱️ ระบบนับถอยหลัง (Countdown Timer):** แสดงเวลาที่เหลือสำหรับการเปิดรับแบบสำรวจผ่าน `SurveyCountdown`[cite: 1]
- **🛡️ ระบบป้องกันการส่งซ้ำ (Duplicate Prevention):** ตรวจสอบและแสดงผลหน้า `AlreadySubmitted` สำหรับผู้ใช้งานที่เคยส่งแบบสอบถามไปแล้ว[cite: 1]
- **📊 แดชบอร์ดผู้ดูแลระบบ (Admin Dashboard):**
  - ระบบล็อกอินสำหรับผู้ดูแล (`AdminLogin`)[cite: 1]
  - หน้าแสดงผลสถิติและสรุปผลโหวตแบบเรียลไทม์ (`AdminDashboard`)[cite: 1]
- **🎨 UI ที่สวยงาม:** ปรับแต่งด้วย Tailwind CSS (อ้างอิงจาก `postcss.config.mjs` และ `globals.css`)[cite: 1] พร้อมหน้าจอเมื่อส่งสำเร็จ (`SuccessScreen`)[cite: 1]

## 🛠️ เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** Next.js (React)[cite: 1]
- **Language:** TypeScript (`tsconfig.json`)[cite: 1]
- **Styling:** Tailwind CSS[cite: 1]
- **Database & Auth:** Supabase (`app/lib/supabase.ts`)[cite: 1]
- **CI/CD:** GitHub Actions สำหรับการ Deploy อัตโนมัติ (`.github/workflows/deploy.yml`)[cite: 1]

## 📁 โครงสร้างโปรเจกต์ที่สำคัญ (Folder Structure)

```text
crpao-poll/
├── app/
│   ├── admin/             # ระบบหลังบ้าน แดชบอร์ด และระบบล็อกอิน
│   ├── components/        # UI Components ต่างๆ (PollForm, SuccessScreen, SurveyCountdown ฯลฯ)
│   ├── lib/               # ฟังก์ชันการทำงานและ Utils (supabase.ts, stats.ts, cn.ts, constants.ts)
│   ├── globals.css        # ไฟล์ CSS หลัก
│   ├── layout.tsx         # โครงสร้าง Layout ของระบบ
│   └── page.tsx           # หน้าหลัก (Home Page)
├── public/                # ไฟล์รูปภาพ โลโก้ (logo-crpao.png) และ Assets ต่างๆ
├── .github/workflows/     # ตั้งค่า GitHub Actions สำหรับ CI/CD (deploy.yml)
└── supabase-setup.sql     # สคริปต์ SQL สำหรับสร้างตารางบน Supabase
```

## ⚙️ การติดตั้งและรันโปรเจกต์ (Installation & Setup)

1. **โคลนโปรเจกต์ลงเครื่อง**
   ```bash
   git clone <repository-url>
   cd crpao-poll
   ```

2. **ติดตั้ง Dependencies** (อ้างอิงจาก `package.json` และ `package-lock.json`[cite: 1])
   ```bash
   npm install
   ```

3. **ตั้งค่า Environment Variables**
   - คัดลอกไฟล์ `.env.example`[cite: 1] แล้วเปลี่ยนชื่อเป็น `.env.local`
   - ใส่ค่าตัวแปรของ Supabase ลงไป
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **การตั้งค่าฐานข้อมูล (Supabase Setup)**
   - นำโค้ดจากไฟล์ `supabase-setup.sql`[cite: 1] ไปรันใน SQL Editor ของ Supabase เพื่อสร้างตารางและกำหนดสิทธิ์ให้เรียบร้อย

5. **รันเซิร์ฟเวอร์จำลอง (Development Server)**
   ```bash
   npm run dev
   ```
   - เปิดบราวเซอร์ไปที่ `http://localhost:3000` เพื่อดูหน้าแบบสำรวจ
   - เปิด `http://localhost:3000/admin` เพื่อดูระบบหลังบ้าน

## 🚀 การนำไปใช้งานจริง (Deployment)
ระบบมีการตั้งค่า GitHub Actions ไว้ใน `.github/workflows/deploy.yml`[cite: 1] ซึ่งจะทำงานอัตโนมัติเมื่อมีการอัปเดตโค้ดขึ้น Repository
