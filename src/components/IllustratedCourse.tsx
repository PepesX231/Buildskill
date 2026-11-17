"use client";
import { EnrollButton, ModalButton } from "./CourseProvider";
import { verifiedWork } from "@/lib/verified-work";
import { RealPreview } from "./ProductCourse";

export function IllustratedPackage() {
  return <section className="illustrated-package" id="pricing" aria-labelledby="package-title"><div className="wrap">
    <div className="package-layout"><div className="package-offer"><h2 id="package-title">ให้ปีนี้มีผลงาน<br /><span>ที่ภูมิใจว่าเราสร้างเอง</span></h2><p className="package-course">Project Build Skill · 12 เดือน</p><p className="package-outcome">เกม / แอป / IoT อย่างน้อย 1 โปรเจกต์ที่ใช้ได้จริง<br />พร้อมเล่มพอร์ตตรงคณะที่เล็ง และทักษะที่ทำเองได้</p><p className="big-course-price">19,990 <span>บาท</span></p><p className="package-dates">1 ธ.ค. 2569 – 1 ธ.ค. 2570 · ราคาตลอดหลักสูตร</p><EnrollButton className="btn dark">คุยกับทีม / สมัครเรียน</EnrollButton><p className="package-confirm">ยืนยันวัน–เวลาเรียน รูปแบบ และเงื่อนไขกับทีมก่อนสมัคร</p><div className="package-actions"><ModalButton kind="video" className="btn package-video">ดูคลิปตัวอย่างผลงาน</ModalButton><ModalButton kind="parents" className="btn package-parents">สรุปให้ผู้ปกครอง</ModalButton></div></div>
      <figure className="package-real-work"><RealPreview work={verifiedWork.projects.find(w=>w.title==="REVOICE")!} play={false} /><figcaption>ตัวอย่างงานจริง: REVOICE ของไอดิน<a href="https://drive.google.com/file/d/11dIXJKebTWAA7UZPVJVEV17t3G-JHRTh/view" target="_blank" rel="noopener noreferrer">ดูเอกสารผลงานจริง</a></figcaption></figure>
    </div>
    <div className="package-faq" id="faq"><div className="faq-illustrated-intro"><h3>ยังสงสัยอยู่ไหม?</h3><p>เรื่องที่ควรรู้<br />ก่อนตัดสินใจเรียน</p></div><div className="faq-answers">
      <details><summary>ไม่มีผลงาน เริ่มจากสายไหนดี?</summary><p>เริ่มได้ทั้งเกม แอป หรือ IoT เลือกจากสิ่งที่สนใจและคณะที่เล็ง แล้วคุยกับทีมเพื่อวางงานชิ้นเล็กที่ทำจบได้</p></details>
      <details><summary>ใช้ AI ช่วยทำได้ไหม?</summary><p>ใช้ได้ โดยต้องเข้าใจโค้ดและสิ่งที่สร้าง ทดสอบ แก้ปัญหา และอธิบายบทบาทของตัวเองได้ เป้าหมายคืองานที่ใช้งานหรือเล่นได้จริง มีคุณภาพ และมีไอเดียของน้อง</p></details>
      <details><summary>มีการันตีรางวัลหรือติดมหาวิทยาลัยไหม?</summary><p>ไม่มีการรับประกันผล เป้าหมายคือทักษะ โปรเจกต์ และพอร์ตของน้อง การแข่งขันและการรับเข้าขึ้นอยู่กับเกณฑ์ของแต่ละแห่ง</p></details>
      <details><summary>เรียนวันไหน มีค่าใช้จ่ายเพิ่มไหม?</summary><p>19,990 บาทเป็นราคาหลักสูตร 12 เดือน ให้ทีมยืนยันวัน–เวลา รูปแบบเรียน ค่าอุปกรณ์ ค่าสมัครแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p></details>
    </div></div>
  </div></section>;
}

export function CourseFooter() { return <footer className="course-footer wrap"><a href="#main" className="footer-wordmark">hamster<span>hub</span></a><a href="https://www.hamsterhub.co/" target="_blank" rel="noopener noreferrer">เว็บไซต์ Hamster Hub</a><ModalButton kind="sources">ข้อมูลอ้างอิง</ModalButton><small>© 2026 Hamster Hub</small></footer>; }
