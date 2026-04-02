-- =============================================
-- Supabase SQL: สร้างตาราง poll_responses
-- ใช้สำหรับระบบประชาพิจารณ์ อบจ.เชียงราย
-- วิธีใช้: คัดลอก SQL ทั้งหมดนี้ไปวางใน
--   Supabase Dashboard → SQL Editor → กด Run
-- =============================================

-- 1. สร้างตาราง (สำหรับฐานข้อมูลใหม่)
CREATE TABLE IF NOT EXISTS poll_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  district TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT '',
  age_range TEXT NOT NULL,
  occupation TEXT NOT NULL,
  opinion TEXT NOT NULL CHECK (opinion IN ('agree', 'disagree')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- สำหรับฐานข้อมูลที่มีอยู่แล้ว: เพิ่มคอลัมน์ gender
-- (ถ้าสร้างตารางใหม่จากด้านบน ไม่ต้องรัน section นี้)
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'poll_responses' AND column_name = 'gender'
  ) THEN
    ALTER TABLE poll_responses ADD COLUMN gender TEXT NOT NULL DEFAULT '';
  END IF;
END $$;

-- 2. เปิด Row Level Security
ALTER TABLE poll_responses ENABLE ROW LEVEL SECURITY;

-- 3. อนุญาตให้ทุกคน INSERT ได้ (สำหรับส่งแบบสอบถาม)
CREATE POLICY "Allow public insert"
  ON poll_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. อนุญาตให้ anon SELECT ได้ (สำหรับดูข้อมูลทั่วไป)
CREATE POLICY "Allow public read"
  ON poll_responses
  FOR SELECT
  TO anon
  USING (true);

-- 5. อนุญาตให้ authenticated SELECT ได้ (สำหรับ admin dashboard)
CREATE POLICY "Allow authenticated read"
  ON poll_responses
  FOR SELECT
  TO authenticated
  USING (true);
