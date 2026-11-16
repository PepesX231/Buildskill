"use client";
import { useRef, useState } from "react";
import { records, type ProofCategory } from "@/lib/course-data";
import { VideoButton } from "./CourseProvider";

export function Showcase() {
  const [category, setCategory] = useState<ProofCategory>("awards");
  const carousel=useRef<HTMLDivElement>(null);
  const changeCategory=(next:ProofCategory)=>{setCategory(next);if(carousel.current) carousel.current.scrollLeft=0;};
  const scroll=(direction:number)=>{
    const el=carousel.current;
    if (!el) return;
    const width=el.firstElementChild?.getBoundingClientRect().width??300;
    el.scrollBy({left:(width+20)*direction,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  return <section className="showcase section wrap" id="showcase">
    <div className="section-heading"><div><h2>ให้<span className="underline">ผลงานจริง</span>เล่าแทนเรา</h2></div><div className="carousel-controls"><button type="button" onClick={()=>scroll(-1)} aria-label="ผลงานก่อนหน้า">ก่อนหน้า</button><button type="button" onClick={()=>scroll(1)} aria-label="ผลงานถัดไป">ถัดไป</button></div></div>
    <div className="proof-heading-row"><div className="proof-tabs" role="group" aria-label="หมวดผลงาน">
      {([["awards","ผลงานแข่งขัน"],["admissions","เส้นทางมหาวิทยาลัย"]] as const).map(([key,label])=><button key={key} type="button" className={category===key?"active":""} aria-pressed={category===key} onClick={()=>changeCategory(key)}>{label}</button>)}
    </div><p>ผลงานจากชุมชน Hamster Hub · ข้อมูลที่ทีมรวบรวม</p></div>
    <div className="proof-carousel" ref={carousel} tabIndex={0} role="region" aria-label="รายการผลงาน เลื่อนซ้ายขวาเพื่อดูเพิ่มเติม" aria-live="polite">
      {records[category].map(record=><article className="proof-card" key={record.name}><div className={`proof-art ${record.color}`}>
        {record.image?<img className="actual-project-photo" src={record.image} alt="ไอดินและแอป REVOICE จากเว็บ Hamster Hub" loading="lazy" />:<><div className="proof-big">{record.graphic}</div></>}
        <span className="award">{record.badge}</span></div><div className="proof-card-body"><h3>{record.name}</h3><p>{record.body}</p><p className="contribution">{record.role}</p><a className="text-link" href={record.href} target="_blank" rel="noopener noreferrer">{record.link}</a></div></article>)}
    </div>
    <p className="proof-note">{category==="awards"?"ข้อมูลจากตารางผลงาน Hamster Hub ที่ทีมให้มา • ภาพ REVOICE จากเว็บ Hamster Hub ส่วนกราฟิกอื่นเป็นการ์ดชื่อผลงาน คลิกเพื่อดูคลิปต้นทาง • เป็นผลงานจากชุมชน ไม่ใช่ผลของคอร์สรุ่นที่กำลังเปิด และไม่ใช่การรับประกันรางวัล":"ข้อมูลจากบันทึกผู้เรียนปี 2024 และรายการมหาวิทยาลัยปี 2025 ที่ทีมให้มา • ผลการคัดเลือกเป็นประสบการณ์รายบุคคล ไม่ใช่การรับประกันผลเข้าศึกษา"}</p>
    <div className="video-feature"><VideoButton className="video-preview" aria-label="ดูคลิปตัวอย่างผลงาน"><img src="https://i.ytimg.com/vi/LhUO186ZWG8/hqdefault.jpg" alt="ภาพปกคลิปตัวอย่างผลงานที่ทีมคอร์สแนะนำ" loading="lazy" /><span className="video-overlay" /><span className="big-play">▶</span></VideoButton>
      <div><h3>ก่อนถามว่า “ทำได้แค่ไหน”<br />ลองดูว่า<span className="mint">สร้างอะไรได้บ้าง</span></h3><p>คลิปตัวอย่างผลงานที่ทีมเลือกมาให้ดู<br />เปิดภาพความเป็นไปได้ ก่อนเริ่มงานของน้องเอง</p><VideoButton className="text-link">เปิดคลิปตัวอย่าง</VideoButton></div>
    </div>
  </section>;
}
