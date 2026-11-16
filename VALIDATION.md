# ผลตรวจ

- ตรวจข้อมูลโครงสร้าง HTML ต้นแบบ: แท็กสมดุล ลิงก์ภายในครบ และไม่มี ID ซ้ำ
- ตรวจ JavaScript ต้นแบบด้วย `node --check`: ผ่าน
- นำเนื้อหาไปเป็น JSX components โดยไม่ใช้ `dangerouslySetInnerHTML`
- ใช้ React state สำหรับเลือกสายเรียน สลับหมวดผลงาน เมนูมือถือ และ dialog
- ตรวจ import ภายใน source 10 ไฟล์และ public assets 7 ไฟล์: ผ่าน ไม่มีการอ้างอิงไฟล์ที่ขาด
- ตรวจ syntax ของ `course-data.ts` และ `next.config.ts` ด้วย Node.js: ผ่าน (การตรวจนี้ไม่ใช่ TypeScript typecheck)

## ยังตรวจไม่ได้

การติดตั้งผ่าน npm ล้มเหลวด้วย `ENOTFOUND registry.npmjs.org` จึงยังไม่ได้รัน `next build`, `tsc --noEmit` หรือทดสอบส่วน React ผ่านเบราว์เซอร์จริง ไม่ได้เผยแพร่เป็น URL ออนไลน์

เมื่ออยู่ในเครื่องที่เชื่อมต่อ npm ได้ ให้รันตามลำดับ:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

ตรวจเลือกเกม/แอป/IoT สลับหมวดผลงาน เลื่อน carousel เปิด/ปิด dialog ด้วยปุ่มและ Escape คัดลอกข้อความ เปิด LINE ดูวิดีโอ และพิมพ์สรุปผู้ปกครองบนจอคอมและมือถือ
