# Hamster Hub — Project Build Skill

Next.js App Router + React + TypeScript. หน้าแนะนำคอร์ส Project Build Skill โดยใช้มาสคอตและภาพต้นฉบับของ Hamster Hub ในธีมครีม ส้ม และน้ำตาลเข้ม

## เริ่มใช้งาน

ต้องมี Node.js 20.9 ขึ้นไป

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

```bash
npm run typecheck
npm run build
```

โปรเจกต์ตั้งค่า `output: "export"` ไว้แล้ว หลัง build ไฟล์เว็บไซต์จะอยู่ใน `out/` และนำไปวางบน static hosting ได้ ไม่ต้องมีเซิร์ฟเวอร์ Node.js ในระบบจริง

ระหว่างพัฒนาใช้ `npm run dev` ส่วนระบบจริงให้นำ `out/` ไปวางบน static hosting หลัง build

## โครงสร้าง

- `src/app/page.tsx`: หน้าเว็บหลัก ประกอบ Server Components และส่วนโต้ตอบ
- `src/app/layout.tsx`: ภาษาเอกสาร metadata และ stylesheet
- `src/components/StaticSections.tsx`: Hero ข้อมูลคอร์ส ราคา FAQ และส่วนท้าย
- `src/components/Roadmap.tsx`: Roadmap 3×3 และตัวเลือก เกม / แอป / IoT
- `src/components/Showcase.tsx`: การ์ดผลงานสองหมวดและ carousel
- `src/components/CourseProvider.tsx`: สถานะสายเรียน dialog วิดีโอ เตรียมข้อความคุยกับทีม Quest และสรุปผู้ปกครอง
- `src/components/Header.tsx`: เมนู responsive
- `src/lib/course-data.ts`: ข้อมูลโปรเจกต์และตัวอย่างตามสายแบบมี TypeScript types
- `src/app/globals.css`: responsive styling และโทนแบรนด์
- `public/assets/`: มาสคอต โลโก้ และภาพผลงานจากเว็บที่ทีมให้มา

ปุ่มติดต่อใช้ LINE ที่พบจากเว็บไซต์หลัก ไม่ส่งข้อความให้อัตโนมัติ ไม่มีการเก็บข้อมูลส่วนตัวและไม่มีระบบรับชำระเงินในชุดนี้

## เนื้อหา

ราคา 19,990 บาท ระยะเวลา 12 เดือน 1 ธ.ค. 2569 – 1 ธ.ค. 2570 ตามข้อมูลที่ทีมให้มา วัน–เวลาเรียน รูปแบบการเรียน ผู้สอน และเงื่อนไขค่าใช้จ่ายเพิ่มเติมยังต้องยืนยันกับทีมก่อนเปิดรับสมัครจริง

รายการผลงานมาจากตารางที่ทีมแนบ ไม่ใช่ผลงานของรุ่นที่กำลังเปิด และไม่รับประกันรางวัลหรือการเข้ามหาวิทยาลัย แหล่งข้อมูลเปิดดูได้จากปุ่มแหล่งข้อมูลท้ายหน้า

อ้างอิงแบรนด์: https://pepesx231.github.io/Hamterco/slime.html?v=137 และ https://www.hamsterhub.co/

## สถานะการตรวจ

ดู `VALIDATION.md` สำหรับผลตรวจและข้อจำกัดของสภาพแวดล้อมที่ใช้สร้างงาน

ไฟล์ `design-reference.html` เป็นภาพอ้างอิงแบบ HTML ของหน้าที่ออกแบบไว้ก่อนย้ายเป็น React เปิดดูโทนสีและมาสคอตได้โดยตรง ไม่ใช่ผล build ของ Next.js และ Roadmap ในไฟล์อ้างอิงยังเป็นแบบ 3 ช่วง ส่วนในโค้ด React ปรับเป็น 9 การ์ดแบบ 3×3 แล้ว


## GitHub Pages

Repository: https://github.com/PepesX231/Buildskill

The workflow in `.github/workflows/deploy.yml` installs dependencies, checks TypeScript, builds Next.js static output, and deploys the `out/` artifact to GitHub Pages. Set the repository Pages source to **GitHub Actions**.

The deployment uses `NEXT_PUBLIC_BASE_PATH=/Buildskill` so both Next.js bundles and mascot images work below the repository path. Local development leaves that variable unset.
