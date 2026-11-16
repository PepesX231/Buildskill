"use client";
import { assetPath } from "@/lib/assets";
import { tracks, type TrackKey } from "@/lib/course-data";
import { useCourse } from "./CourseProvider";

const phases = [
  { period:"เดือน 1", title:"ทำชิ้นแรกให้จบด้วยตัวเอง", items:[
    {title:"หาโจทย์ที่อยากทำ", text:"เริ่มจากความชอบ เลือกปัญหา และกำหนดขอบเขตโปรเจกต์ให้ทำจบได้", takeaway:"โจทย์และแผนที่ชัดเจน"},
    {title:"ลงมือสร้างต้นแบบ", text:"เห็นกระบวนการทั้งหมด ตั้งแต่วางแผน พัฒนา ไปจนถึงแก้ปัญหาระหว่างทาง", takeaway:"ทักษะที่ใช้กับงานจริง"},
    {title:"ทดสอบ แล้วทำให้จบ", text:"ลองใช้ ปรับจุดที่ติด และส่งงานชิ้นแรกที่ใช้งานได้ด้วยตัวเอง", takeaway:"ความมั่นใจในการจบงาน"},
  ]},
  { period:"เดือน 2–3", title:"รู้บทบาทตัวเอง แล้วสร้างไปด้วยกัน", items:[
    {title:"สร้างทีม แบ่ง Role", text:"ฝึกแบ่งหน้าที่และขอบเขตงาน ให้ความถนัดของแต่ละคนช่วยโปรเจกต์เดินหน้า", takeaway:"รู้บทบาทของตัวเอง"},
    {title:"พัฒนาทักษะเฉพาะทาง", text:"ต่อยอดสิ่งที่ต้องใช้ในงาน เช่น Programmer ฝึก OOP และ Art เรียนรู้ Shader", takeaway:"ความเข้าใจที่ลึกขึ้น"},
    {title:"เชื่อมงานให้เป็นชิ้นเดียว", text:"ฝึกสื่อสาร ทดสอบร่วมกัน และปรับงานของทุกคนให้กลายเป็นโปรเจกต์กลุ่ม", takeaway:"ทีมเวิร์กและงานที่ส่งต่อได้"},
  ]},
  { period:"เดือน 4–12", title:"พาโปรเจกต์ออกไปเจอโลกจริง", items:[
    {title:"ลองกับผู้ใช้จริง", text:"พัฒนาจากความต้องการจริง เก็บปัญหาที่พบ และทำให้โปรเจกต์มีคนใช้", takeaway:"ผลงานที่มีเหตุผลในการสร้าง"},
    {title:"เตรียมลงสนาม", text:"พาโปรเจกต์ไปเวทีที่เหมาะสม เป้าหมายคือ NSC, TICTA และ TGS ตามคุณสมบัติและกำหนดการ", takeaway:"ประสบการณ์นำเสนอและแข่งขัน"},
    {title:"พิตช์และเล่าในพอร์ต", text:"คิด Business Idea ฝึกพิตช์กับนักธุรกิจ และเรียบเรียงสิ่งที่ทำเป็นเล่มพอร์ตโฟลิโอ", takeaway:"เล่าได้ว่าทำอะไรและเรียนรู้อะไร"},
  ]},
];

export function Roadmap() {
  const { track, setTrack } = useCourse();
  return <section className="roadmap section" id="roadmap"><div className="wrap">
    <div className="section-heading"><div><h2>12 เดือน.<br /><span className="mint">3 ก้าวที่เห็นตัวเองโตขึ้น</span></h2></div><p>จากงานชิ้นแรก สู่ทีมแรก และผู้ใช้จริงคนแรก<br />ค่อย ๆ สร้างความมั่นใจด้วยสิ่งที่น้องทำได้</p></div>
    <div className="track-picker" role="group" aria-label="เลือกสายโปรเจกต์"><span>เลือกสายที่อยากลอง</span>
      {(Object.keys(tracks) as TrackKey[]).map(key => <button type="button" key={key} className={`track ${track===key ? "active" : ""}`} aria-pressed={track===key} onClick={() => setTrack(key)}>{tracks[key].name}</button>)}
    </div>
    <div className="phase-board">{phases.map((phase,i) => <div className={`phase-row phase-${i+1}`} key={phase.period}>
      <div className="phase-heading"><div><span className="phase-period">{phase.period}</span><h3>{phase.title}</h3></div><span className="phase-example" aria-live="polite">{tracks[track].examples[i]}</span></div>
      <div className="phase-cards">{phase.items.map((item) => <article key={item.title} className={`journey-card ${i===2?"featured":""}`}><h3>{item.title}</h3><p>{item.text}</p><div className="takeaway">สิ่งที่พกไปต่อ <b>{item.takeaway}</b></div></article>)}</div>
    </div>)}</div>
    <div className="roadmap-note"><img className="note-mascot" src={assetPath("/assets/crew27-hang.webp")} alt="" width="420" height="291" loading="lazy" /><p><b>สร้างงานที่เราเชื่อ แล้วพาไปลงสนาม</b><br />การเข้าร่วมขึ้นอยู่กับประเภทงาน คุณสมบัติ และกำหนดการของแต่ละเวที</p></div>
  </div></section>;
}
