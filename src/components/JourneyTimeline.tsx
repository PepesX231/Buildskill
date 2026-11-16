"use client";
import { useState } from "react";
import { assetPath } from "@/lib/assets";
import { tracks, type TrackKey } from "@/lib/course-data";
import { useCourse } from "./CourseProvider";
const phases = [
  { period: "เดือน 1", title: "จบโปรเจกต์แรก", summary: "ลองทำด้วยตัวเอง ตั้งแต่ไอเดียจนเป็นชิ้นงาน", mascot: "t-sign.webp", color: "green", items: [
    { title: "เลือกสิ่งที่อยากสร้าง", text: "เริ่มจากความสนใจ เลือกปัญหา แล้ววางขอบเขตที่ทำจบได้จริง", result: "ไอเดียและแผนโปรเจกต์" },
    { title: "ลงมือทำให้ครบวงจร", text: "เรียนรู้เครื่องมือที่ต้องใช้ สร้างต้นแบบ ทดสอบ และค่อย ๆ แก้ปัญหาที่เจอ", result: "ต้นแบบที่ทดลองใช้ได้" },
    { title: "ทำจบ แล้วเล่าให้เป็น", text: "เก็บรายละเอียด ทดลองให้คนอื่นใช้ และอธิบายได้ว่าเราสร้างอะไรขึ้นมา", result: "โปรเจกต์เดี่ยวที่ทำจบ" },
  ]},
  { period: "เดือน 2–3", title: "สร้างงานเป็นทีม", summary: "แบ่งบทบาท ฝึกทักษะเฉพาะทาง แล้วประกอบงานเข้าด้วยกัน", mascot: "t-pitch.webp", color: "blue", items: [
    { title: "หาทีมและแบ่งบทบาท", text: "เลือกงานตามความถนัด วางแผนร่วมกัน และรู้ว่าส่วนของเราเชื่อมกับทีมอย่างไร", result: "ทีมและขอบเขตงานที่ชัดเจน" },
    { title: "ฝึกทักษะให้ลึกขึ้น", text: "เรียนตามบทบาท เช่น Programmer ฝึก OOP และสาย Art ทดลอง Shader", result: "ทักษะที่ใช้กับชิ้นงานจริง" },
    { title: "รวมงานให้ใช้งานได้", text: "ลองทำงานร่วมกัน รับฟีดแบ็ก และปรับสิ่งที่สร้างจนเป็นโปรเจกต์ของทีม", result: "โปรเจกต์กลุ่มและผลงานส่วนตัว" },
  ]},
  { period: "เดือน 4–12", title: "พาโปรเจกต์ออกสู่โลกจริง", summary: "หาคนใช้ พัฒนาต่อ เตรียมลงแข่ง พิตช์ และทำพอร์ต", mascot: "p-cheer.webp", color: "orange", items: [
    { title: "พัฒนาให้มีคนใช้จริง", text: "เข้า Startup Phase ทดลองกับผู้ใช้ เก็บฟีดแบ็ก แล้วปรับโปรเจกต์ให้แก้ปัญหาได้ดีขึ้น", result: "โปรเจกต์ที่ผ่านการทดลองใช้" },
    { title: "เตรียมตัวไปลงสนาม", text: "เตรียมผลงานและการนำเสนอ เลือกเวที NSC, TICTA หรือ TGS ตามความเหมาะสมและเกณฑ์รับสมัคร", result: "ประสบการณ์เตรียมและส่งผลงาน" },
    { title: "พิตช์และเล่าเรื่องลงพอร์ต", text: "คิด Business Idea ฝึกพิตช์กับนักธุรกิจ และเรียบเรียงบทบาทกับสิ่งที่เรียนรู้เป็นเล่มพอร์ต", result: "โปรเจกต์ แผนธุรกิจ และเล่มพอร์ต" },
  ]},
];
export function JourneyTimeline() {
  const { track, setTrack } = useCourse();
  const [selected, setSelected] = useState(0);
  const phase = phases[selected];
  return <section className="journey-section" id="roadmap" aria-labelledby="journey-title"><div className="wrap">
    <div className="journey-heading"><h2 id="journey-title">เส้นทางจากไอเดีย<br /><span>สู่โปรเจกต์ที่ใช้ได้จริง</span></h2><p>12 เดือน ค่อย ๆ สร้างฝีมือ<br />มีทีมช่วยคิดและพาไปต่อในแต่ละช่วง</p></div>
    <div className="mascot-journey">
      <svg className="journey-path path-desktop" viewBox="0 0 1200 520" preserveAspectRatio="none" fill="none" aria-hidden="true"><path className="path-bed" d="M190 175 C360 175 390 350 600 350 S840 175 1010 175" /><path className="path-lit" d="M190 175 C360 175 390 350 600 350 S840 175 1010 175" /></svg>
      <svg className="journey-path path-mobile" viewBox="0 0 330 590" preserveAspectRatio="none" fill="none" aria-hidden="true"><path className="path-bed" d="M72 118 C0 198 145 218 72 318 S10 458 72 518" /><path className="path-lit" d="M72 118 C0 198 145 218 72 318 S10 458 72 518" /></svg>
      <ol className="journey-stops">{phases.map((item, i) => <li key={item.period} className={`journey-stop stop-${i} ${item.color} ${selected===i?"selected":""}`}>
        <button className="journey-stop-button" type="button" aria-pressed={selected===i} aria-controls="phase-detail" onClick={() => setSelected(i)}>
          <span className="mascot-island"><span className="island-base" /><img src={assetPath(`/assets/${item.mascot}`)} alt="" width="180" height="220" loading="lazy" /></span>
          <span className="stop-copy"><span className="stop-period">{item.period}</span><strong>{item.title}</strong><span className="stop-summary">{item.summary}</span><span className="stop-action">{selected===i?"กำลังดูช่วงนี้":"ดูสิ่งที่จะได้ทำ"}</span></span>
        </button>
      </li>)}</ol>
    </div>
    <div className="journey-details" id="phase-detail" aria-live="polite" aria-atomic="true">
      <div className="journey-detail-heading"><h3>{phase.period} · {phase.title}</h3><p>{tracks[track].examples[selected]}</p></div>
      <div className="journey-track-picker" role="group" aria-label="เลือกสายที่สนใจ"><span>ลองดูเส้นทางของสาย</span>{(Object.keys(tracks) as TrackKey[]).map(key => <button type="button" key={key} className={track===key?"active":""} aria-pressed={track===key} onClick={() => setTrack(key)}>{tracks[key].name}</button>)}</div>
      <div className="journey-detail-grid">{phase.items.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.text}</p><p className="journey-result">{item.result}</p></article>)}</div>
    </div>
    <p className="journey-footnote">สร้างงานให้ดี แล้วเลือกเวทีที่เหมาะกับงาน · การเข้าร่วมขึ้นอยู่กับเกณฑ์และกำหนดการของแต่ละเวที</p>
  </div></section>;
}
