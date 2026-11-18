"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CourseHero,MediaPlaceholder } from "./CourseHero";
import { CourseOffer } from "./CourseOffer";
import { LearningExplorer } from "./LearningExplorer";
import { assetPath } from "@/lib/assets";
import { DemonstrationVideo } from "./CourseExperience";
const asset=(name:string)=>"https://pepesx231.github.io/Hamterco/img/"+name;
const poster="https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png";

const lessons=[
 {title:"ทำงานที่เปิดให้\nคนอื่นลองได้จริง",text:"ฝึกจากโจทย์เล็ก ไปสู่โปรเจกต์หลักที่คิดเอง ลงมือทำ และสาธิตได้",result:"มีโปรเจกต์หลัก เกม เว็บ / แอป หรือ IoT อย่างน้อย 1 ชิ้น",kind:"game"},
 {title:"ลงลึกในสิ่งที่\nเรารับผิดชอบ",text:"Programmer ฝึก OOP เพื่อจัดโค้ดให้เป็นระบบ ส่วน Art ฝึก Shader เพื่อควบคุมงานภาพ",result:"มีชิ้นงานและทักษะตามบทบาทของตัวเอง",kind:"role"},
 {title:"รวมฝีมือของทุกคน\nเป็นงานของทีม",text:"แบ่งหน้าที่ วางแผน รวมงาน และแก้ปัญหาที่เกิดระหว่างการทำโปรเจกต์ร่วมกัน",result:"ฝึกทำงานร่วมกับคนอื่นจากโปรเจกต์ทีม",kind:"team"},
 {title:"ให้คนใช้จริง\nแล้วทำให้ดีกว่าเดิม",text:"นำเดโมไปทดลอง เก็บสิ่งที่คนใช้ติด แล้วปรับและทดสอบซ้ำ",result:"ฝึกเลือกสิ่งที่จะพัฒนาจากฟีดแบ็กจริง",kind:"testing"},
 {title:"เล่าคุณค่าของงาน\nและพาไปเจอสนามจริง",text:"คิด Business Idea ฝึกพิตช์ และเตรียมเดโมกับสื่อนำเสนอให้เหมาะกับเวที",result:"เตรียม NSC, TICTA หรือ TGS ตามงานและคุณสมบัติ",kind:"presentation"},
 {title:"เอาสิ่งที่ทำมา\nเล่าเป็นพอร์ตของเรา",text:"เรียบเรียงโจทย์ วิธีคิด บทบาท และผลทดสอบจากงานของตัวเอง",result:"เล่มพอร์ตที่มีหลักฐานและเรื่องจากประสบการณ์จริง",kind:"portfolio"}
];
export function WireframeCourse(){
 const [slide,setSlide]=useState(0),[paused,setPaused]=useState(false),[onScreen,setOnScreen]=useState(false);
 const highlight=useRef<HTMLDivElement>(null);
 const reasonRail=useRef<HTMLDivElement>(null);const [reason,setReason]=useState(0);const [reasonStops,setReasonStops]=useState<number[]>([0]);
 const syncReason=(el:HTMLDivElement,stops:number[])=>{const max=el.scrollWidth-el.clientWidth;if(max<=1||el.scrollLeft<=1){setReason(0);return;}if(el.scrollLeft>=max-2){setReason(stops.length-1);return;}let chosen=0;stops.forEach((left,i)=>{if(Math.abs(left-el.scrollLeft)<Math.abs(stops[chosen]-el.scrollLeft))chosen=i;});setReason(chosen);};
 useEffect(()=>{const el=reasonRail.current;if(!el)return;const update=()=>{const cards=Array.from(el.children) as HTMLElement[];const origin=cards[0]?.offsetLeft||0,max=Math.max(0,el.scrollWidth-el.clientWidth);const stops=cards.map(c=>Math.min(max,Math.max(0,c.offsetLeft-origin))).filter((left,i,all)=>i===0||Math.abs(left-all[i-1])>2);setReasonStops(stops);syncReason(el,stops);};update();const observer=new ResizeObserver(update);observer.observe(el);Array.from(el.children).forEach(c=>observer.observe(c));return()=>observer.disconnect();},[]);
 useEffect(()=>{
   const el=highlight.current;if(!el)return;const observer=new IntersectionObserver(([e])=>setOnScreen(e.isIntersecting),{threshold:.35});observer.observe(el);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
   if(paused||!onScreen)return;const motion=window.matchMedia("(prefers-reduced-motion: reduce)");if(motion.matches)return;
   const timer=setInterval(()=>{if(!document.hidden&&!motion.matches)setSlide(s=>(s+1)%lessons.length);},7500);return()=>clearInterval(timer);
 },[paused,onScreen]);
 const pickReason=(i:number)=>{reasonRail.current?.scrollTo({left:reasonStops[i],behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});};
 return <main id="main" className="wire-course">
 <CourseHero />

 <section className="proof-highlights" id="highlights" aria-labelledby="lessons-title">
 <div className="wire-wrap"><h2 id="lessons-title">เรียนอะไรบ้าง</h2></div>
 <div ref={highlight} className="proof-gallery" role="region" aria-roledescription="carousel" aria-label="เนื้อหาที่จะได้เรียน" tabIndex={0}
 onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();setPaused(true);setSlide(v=>(v+(e.key==="ArrowRight"?1:lessons.length-1))%lessons.length);}}}>
 <div className="proof-deck" style={{"--slide":slide} as CSSProperties}>
 {lessons.map((l,i)=><article key={l.kind} className={`proof-slide proof-slide-${l.kind}`} aria-label={`เนื้อหา ${i+1} จาก ${lessons.length}`} aria-hidden={slide!==i} inert={slide!==i}>
 <div className="proof-slide-copy"><h3>{l.title.split("\n").map(t=><span key={t}>{t}</span>)}</h3><p>{l.text}</p><strong>{l.result}</strong></div>
 <figure className="proof-slide-media">{l.kind==="game"?<><DemonstrationVideo src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเล่นจริง SLASH//SPEED ผลงานจากคอมมูนิตี้ Hamster Hub"/><figcaption>ตัวอย่างงานที่เล่นได้จริง SLASH//SPEED · ดินสอ</figcaption></>:l.kind==="team"?<><img src={asset("photo-class.webp")} alt="บรรยากาศผู้เรียนและผู้สอนในกิจกรรมจริงของ Hamster Hub" width="1000" height="550" loading="lazy"/><figcaption>บรรยากาศกิจกรรมจริงของ Hamster Hub</figcaption></>:l.kind==="presentation"?<><img src={poster} alt="โปสเตอร์นำเสนอโครงงาน Veggie Dash ใน NSC 2024" width="1742" height="2488" loading="lazy"/><figcaption>ตัวอย่างสื่อนำเสนอจริง · โปสเตอร์ NSC 2024 ของทีม Veggie Dash</figcaption></>:<MediaPlaceholder title={l.kind==="role"?"โค้ด OOP และภาพ Shader จากโปรเจกต์จริง":l.kind==="testing"?"การทดสอบงานกับผู้ใช้จริง":"หน้าผลงานในเล่มพอร์ตจริง"}/>}</figure>
 </article>)}
 </div></div>
 <div className="wire-gallery-controls"><button type="button" className="gallery-arrow" aria-label="เนื้อหาก่อนหน้า" onClick={()=>{setPaused(true);setSlide(v=>(v+lessons.length-1)%lessons.length);}}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><div role="group" aria-label="เลือกเนื้อหาเรียน">{lessons.map((l,i)=><button type="button" key={l.kind} aria-label={l.title.replace("\n"," ")} aria-pressed={slide===i} onClick={()=>{setSlide(i);setPaused(true);}}><span /></button>)}</div><button type="button" className="wire-play" aria-label={paused?"เล่นสไลด์อัตโนมัติ":"หยุดสไลด์อัตโนมัติ"} onClick={()=>setPaused(!paused)}>{paused?<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6z" /></svg>:<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h3v12H6zm6 0h3v12h-3z" /></svg>}</button><button type="button" className="gallery-arrow" aria-label="เนื้อหาถัดไป" onClick={()=>{setPaused(true);setSlide(v=>(v+1)%lessons.length);}}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button></div>
 </section>

 <LearningExplorer />

 <section className="expert-section wire-wrap" id="mentors" aria-labelledby="mentor-title">
 <div className="wire-centered-heading"><h2 id="mentor-title">นักธุรกิจและอาจารย์มหาวิทยาลัย<br/>มาช่วยขัดผลงานทุกเดือน</h2><span>เราเชิญทั้งสองมุมมองมาดูงาน ให้น้องได้ลองพิตช์ รับคำแนะนำ และกลับไปพัฒนาโปรเจกต์ต่อ</span></div>
 <div className="expert-perspectives"><article><MediaPlaceholder title="ภาพเซสชันพิตช์กับนักธุรกิจ"/><p>มุมมองจากนักธุรกิจ</p><h3>ใครจะใช้<br/>ทำไมเขาถึงเลือกงานเรา</h3><ul><li>คุยเรื่องปัญหา คนใช้ และคุณค่าของโปรเจกต์</li><li>ฝึกเล่า Business Idea และพิตช์ให้คนฟังเข้าใจ</li></ul></article><article><MediaPlaceholder title="ภาพอาจารย์ให้คำแนะนำผลงาน"/><p>มุมมองจากอาจารย์มหาวิทยาลัย</p><h3>วิธีคิดชัดแค่ไหน<br/>ผลงานควรพัฒนาตรงไหน</h3><ul><li>นำเดโมและวิธีทำมาอธิบายเพื่อรับคำแนะนำ</li><li>นำข้อเสนอแนะกลับไปเลือกสิ่งที่ควรปรับต่อ</li></ul></article></div>
 <p className="expert-note">ผู้เชี่ยวชาญและวันนัดหมายของแต่ละเดือนให้ทีมแจ้งรายละเอียด</p>
 </section>

 <section className="wire-why" id="why" aria-labelledby="why-title"><div className="wire-wrap"><h2 id="why-title">ทำไมต้องเรียน<br/>Project Build Skill</h2><div ref={reasonRail} className="wire-reasons" onScroll={e=>syncReason(e.currentTarget,reasonStops)}>
 {[
 ["สร้างงานของตัวเอง","ฝึกทำให้จบสักครั้ง","เริ่มจากโจทย์ที่ทำไหว เรียนรู้กระบวนการตั้งแต่ไอเดียจนส่งงานได้"],
 ["สะสมงานของตัวเอง","เริ่มเก็บหลักฐานตั้งแต่ตอนทำ","มีทั้งต้นแบบ บันทึกการพัฒนา บทบาท และผลทดสอบให้ใช้เรียบเรียงพอร์ต"],
 ["ได้ลองทำงานกับคนอื่น","ฝึกทีมก่อนเจองานที่ใหญ่ขึ้น","แบ่งหน้าที่ รับฟีดแบ็ก และรวมงานให้เป็นโปรเจกต์เดียวกัน"],
 ["พร้อมอธิบายสิ่งที่ยื่น","มีเรื่องให้เล่าจากประสบการณ์","เข้าใจว่าทำไมเลือกโจทย์นี้ ทำอะไรเอง เจอปัญหาอะไร และเรียนรู้อะไรจากงาน"]
 ].map(([label,title,text],i)=><article key={label}><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}
 </div><div className="wire-reason-dots" style={reasonStops.length<2?{display:"none"}:undefined} role="group" aria-label="เลือกตำแหน่งรายการเหตุผล">{reasonStops.map((left,i)=><button type="button" key={left} aria-label={`ดูตำแหน่ง ${i+1} จาก ${reasonStops.length}`} aria-pressed={reason===i} onClick={()=>pickReason(i)}><span /></button>)}</div>
 <CourseOffer />
 <details className="wire-practical" id="faq"><summary>วันเรียน ราคา และสิ่งที่ควรรู้ก่อนสมัคร</summary><div><p>19,990 บาทเป็นราคาหลักสูตรตลอด 12 เดือน ทีมจะยืนยันวัน–เวลา รูปแบบเรียน อุปกรณ์ ค่าแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p><p>เหมาะกับเด็ก ม.ปลาย ทั้งคนที่ยังไม่มีผลงาน มีงานแล้วแต่ไม่มั่นใจ และคนที่เรียนเองมา ใช้ AI ช่วยได้โดยต้องเข้าใจ ทดสอบ และอธิบายสิ่งที่สร้างได้</p><p>การลง NSC, TICTA หรือ TGS ขึ้นอยู่กับงาน คุณสมบัติ และกำหนดรับสมัคร น้อง ม.6 ควรแจ้งรอบยื่นพอร์ตและกำหนดส่งให้ทีมตรวจความเหมาะสมของระยะเวลาก่อนสมัคร ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย</p></div></details>
 </div></section>

 </main>;
}
