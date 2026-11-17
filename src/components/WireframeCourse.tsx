"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LearningExplorer } from "./LearningExplorer";
import { assetPath } from "@/lib/assets";
import { EnrollButton, ModalButton } from "./CourseProvider";
import { DemonstrationVideo } from "./CourseExperience";
const asset=(name:string)=>"https://pepesx231.github.io/Hamterco/img/"+name;
const poster="https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png";

const lessons=[
 {title:"สร้างเกมที่คิดเอง\nให้คนอื่นเล่นได้จริง",text:"เลือกเกม แอป หรือ IoT แล้วฝึกพางานตั้งแต่ไอเดียจนถึงเดโมที่เปิดให้คนอื่นลอง",result:"โปรเจกต์หลักอย่างน้อย 1 ชิ้น ที่ใช้เล่าความสามารถของเราได้",kind:"game"},
 {title:"มีทีมให้ลองทำงานด้วย\nมีคนช่วยตอนงานไปต่อไม่ถูก",text:"ฝึกแบ่งหน้าที่ ลงลึกในส่วนที่เลือก และนำงานของทุกคนมารวมกัน พร้อมรับฟีดแบ็กเพื่อปรับงาน",result:"ได้โปรเจกต์ทีม และรู้ว่าตัวเองรับผิดชอบส่วนไหนได้",kind:"team"},
 {title:"พาผลงานออกจากห้องเรียน\nไปเจอคนใช้และสนามจริง",text:"ทดลองกับคนใช้ ฝึกพิตช์ และเตรียมลงเวทีที่เหมาะกับงาน พร้อมเก็บวิธีคิดและหลักฐานลงเล่มพอร์ต",result:"เดโม สื่อนำเสนอ และเล่มพอร์ตจากงานของตัวเอง",kind:"presentation"}
];
export function WireframeCourse(){
 const [slide,setSlide]=useState(0),[paused,setPaused]=useState(false),[onScreen,setOnScreen]=useState(false);
 const highlight=useRef<HTMLDivElement>(null);
 const reasonRail=useRef<HTMLDivElement>(null);const [reason,setReason]=useState(0);
 useEffect(()=>{
   const el=highlight.current;if(!el)return;const observer=new IntersectionObserver(([e])=>setOnScreen(e.isIntersecting),{threshold:.35});observer.observe(el);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
   if(paused||!onScreen)return;const motion=window.matchMedia("(prefers-reduced-motion: reduce)");if(motion.matches)return;
   const timer=setInterval(()=>{if(!document.hidden&&!motion.matches)setSlide(s=>(s+1)%lessons.length);},7500);return()=>clearInterval(timer);
 },[paused,onScreen]);
 const pickReason=(i:number)=>{const rail=reasonRail.current,card=rail?.children[i] as HTMLElement|undefined;if(rail&&card)rail.scrollTo({left:card.offsetLeft-(rail.children[0] as HTMLElement).offsetLeft,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});};
 return <main id="main" className="wire-course">
 <section className="wire-hero" aria-labelledby="wire-title">
   <DemonstrationVideo className="wire-hero-film" src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเล่นจริงในเกม SLASH//SPEED ที่นักเรียนในคอมมูนิตี้ Hamster Hub สร้าง" />
   <div className="wire-hero-heading"><p>Project Build Skill</p><h1 id="wire-title">เปลี่ยนความชอบ<br/>ให้เป็นฝีมือที่ใครก็เห็น</h1><span>สร้างเกม เว็บ หรือ IoT ที่ใช้งานได้จริง พร้อมทำพอร์ตจากฝีมือของเรา</span></div>
   <div className="wire-hero-bottom"><div className="wire-offer-pill"><span>12 เดือน · <strong>19,990 บาท</strong></span><EnrollButton>สนใจเรียน</EnrollButton></div><p>คลิปผลงานจริง SLASH//SPEED · ดินสอ · คอมมูนิตี้ Hamster Hub</p></div>
 </section>

 <section className="proof-highlights" id="highlights" aria-labelledby="lessons-title">
 <div className="wire-wrap"><h2 id="lessons-title">เรียนอะไรบ้าง</h2></div>
 <div ref={highlight} className="proof-gallery" role="region" aria-roledescription="carousel" aria-label="เนื้อหาที่จะได้เรียน" tabIndex={0}
 onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();setPaused(true);setSlide(v=>(v+(e.key==="ArrowRight"?1:lessons.length-1))%lessons.length);}}}>
 <div className="proof-deck" style={{"--slide":slide} as CSSProperties}>
 {lessons.map((l,i)=><article key={l.kind} className={`proof-slide proof-slide-${l.kind}`} aria-label={`เนื้อหา ${i+1} จาก ${lessons.length}`} aria-hidden={slide!==i} inert={slide!==i}>
 <div className="proof-slide-copy"><h3>{l.title.split("\n").map(t=><span key={t}>{t}</span>)}</h3><p>{l.text}</p><strong>{l.result}</strong></div>
 <figure className="proof-slide-media">{i===0?<DemonstrationVideo src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเล่นจริง SLASH//SPEED ผลงานดินสอในคอมมูนิตี้ Hamster Hub" />:<img src={i===1?asset("photo-class.webp"):poster} alt={i===1?"บรรยากาศผู้เรียนและผู้สอนในกิจกรรมจริงของ Hamster Hub":"โปสเตอร์นำเสนอโครงงานจริง Veggie Dash ใน NSC 2024"} width={i===1?1000:1742} height={i===1?550:2488} loading="lazy" />}<figcaption>{i===0?"ตัวอย่างผลงานจริง SLASH//SPEED · ดินสอ":i===1?"บรรยากาศกิจกรรมจริงของ Hamster Hub":"โปสเตอร์ NSC 2024 ของทีม Veggie Dash · ตัวอย่างสื่อนำเสนอ"}</figcaption></figure>
 </article>)}
 </div></div>
 <div className="wire-gallery-controls"><button type="button" className="gallery-arrow" aria-label="เนื้อหาก่อนหน้า" onClick={()=>{setPaused(true);setSlide(v=>(v+lessons.length-1)%lessons.length);}}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><div role="group" aria-label="เลือกเนื้อหาเรียน">{lessons.map((l,i)=><button type="button" key={l.kind} aria-label={l.title.replace("\n"," ")} aria-pressed={slide===i} onClick={()=>{setSlide(i);setPaused(true);}}><span /></button>)}</div><button type="button" className="wire-play" aria-label={paused?"เล่นสไลด์อัตโนมัติ":"หยุดสไลด์อัตโนมัติ"} onClick={()=>setPaused(!paused)}>{paused?<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6z" /></svg>:<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h3v12H6zm6 0h3v12h-3z" /></svg>}</button><button type="button" className="gallery-arrow" aria-label="เนื้อหาถัดไป" onClick={()=>{setPaused(true);setSlide(v=>(v+1)%lessons.length);}}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button></div>
 </section>

 <LearningExplorer />

 <section className="expert-section wire-wrap" id="mentors" aria-labelledby="mentor-title">
 <div className="wire-centered-heading"><h2 id="mentor-title">นักธุรกิจและอาจารย์มหาวิทยาลัย<br/>มาช่วยขัดผลงานทุกเดือน</h2><span>เราเชิญทั้งสองมุมมองมาดูงาน ให้น้องได้ลองพิตช์ รับคำแนะนำ และกลับไปพัฒนาโปรเจกต์ต่อ</span></div>
 <div className="expert-perspectives"><article><p>มุมมองจากนักธุรกิจ</p><h3>ใครจะใช้<br/>ทำไมเขาถึงเลือกงานเรา</h3><ul><li>คุยเรื่องปัญหา คนใช้ และคุณค่าของโปรเจกต์</li><li>ฝึกเล่า Business Idea และพิตช์ให้คนฟังเข้าใจ</li></ul></article><article><p>มุมมองจากอาจารย์มหาวิทยาลัย</p><h3>วิธีคิดชัดแค่ไหน<br/>ผลงานควรพัฒนาตรงไหน</h3><ul><li>นำเดโมและวิธีทำมาอธิบายเพื่อรับคำแนะนำ</li><li>นำข้อเสนอแนะกลับไปเลือกสิ่งที่ควรปรับต่อ</li></ul></article></div>
 <p className="expert-note">ผู้เชี่ยวชาญและวันนัดหมายของแต่ละเดือนให้ทีมแจ้งรายละเอียด</p>
 </section>

 <section className="wire-why" id="why" aria-labelledby="why-title"><div className="wire-wrap"><h2 id="why-title">ทำไมเรียน Project Build Skill<br />ถึงเหมาะกับเด็ก ม.5</h2><div ref={reasonRail} className="wire-reasons" onScroll={()=>{const el=reasonRail.current;if(!el)return;let chosen=0,dist=Infinity;Array.from(el.children).forEach((c,i)=>{const d=Math.abs((c as HTMLElement).offsetLeft-(el.children[0] as HTMLElement).offsetLeft-el.scrollLeft);if(d<dist){dist=d;chosen=i;}});setReason(chosen);}}>
 {[
 ["มีเวลาค้นหาทางที่ชอบ","ลองสร้างงานก่อนเลือกทาง","ได้รู้ว่าชอบคิดระบบ เขียนโค้ด ทำภาพ หรือแก้ปัญหาให้คนใช้ ผ่านสิ่งที่ลงมือทำ"],
 ["สะสมงานของตัวเอง","เริ่มเก็บหลักฐานตั้งแต่ตอนทำ","มีทั้งต้นแบบ บันทึกการพัฒนา บทบาท และผลทดสอบให้ใช้เรียบเรียงพอร์ต"],
 ["ได้ลองทำงานกับคนอื่น","ฝึกทีมก่อนเจองานที่ใหญ่ขึ้น","แบ่งหน้าที่ รับฟีดแบ็ก และรวมงานให้เป็นโปรเจกต์เดียวกัน"],
 ["พร้อมอธิบายสิ่งที่ยื่น","มีเรื่องให้เล่าจากประสบการณ์","เข้าใจว่าทำไมเลือกโจทย์นี้ ทำอะไรเอง เจอปัญหาอะไร และเรียนรู้อะไรจากงาน"]
 ].map(([label,title,text],i)=><article key={label}><span>{label}</span><div className={`wire-reason-graphic reason-graphic-${i}`} aria-hidden="true">{i===0?<><b>เกม</b><b>แอป</b><b>IoT</b></>:i===1?<><b>ต้นแบบ</b><b>งานรุ่นถัดไป</b><b>ผลงานหลัก</b></>:i===2?<><b>ส่วนของเรา</b><b>ส่วนของทีม</b><b>งานที่ใช้ร่วมกัน</b></>:<><b>โจทย์</b><b>วิธีทำ</b><b>ผลลัพธ์</b></>}</div><h3>{title}</h3><p>{text}</p></article>)}
 </div><div className="wire-reason-dots" role="group" aria-label="เลือกเหตุผลที่เหมาะกับเด็ก ม.5">{[0,1,2,3].map(i=><button type="button" key={i} aria-label={`ดูเหตุผลข้อ ${i+1}`} aria-pressed={reason===i} onClick={()=>pickReason(i)}><span /></button>)}</div>
 <section className="course-investment" id="pricing" aria-labelledby="investment-title">
 <div className="investment-story"><p>Project Build Skill</p><h2 id="investment-title">มีผลงานของตัวเอง<br />มีเรื่องให้เล่าอย่างมั่นใจ</h2><p>12 เดือนที่ได้ฝึกทำจนจบ ลองทำงานกับทีม<br />และพัฒนาโปรเจกต์ที่ใช้แสดงความสามารถของเรา</p><ul><li>โปรเจกต์หลัก เกม / แอป / IoT อย่างน้อย 1 ชิ้น</li><li>ทักษะจากงานเดี่ยว งานทีม และการทดสอบกับคนใช้</li><li>ฝึกพิตช์ เตรียมลงสนาม และจัดทำเล่มพอร์ต</li></ul></div>
 <div className="investment-action"><p>ราคาตลอดหลักสูตร 12 เดือน</p><strong>19,990 <small>บาท</small></strong><span>1 ธ.ค. 2569 – 1 ธ.ค. 2570</span><EnrollButton className="wire-blue-button">คุยเรื่องโปรเจกต์ที่อยากทำ</EnrollButton><p className="investment-help">เล่าพื้นฐานและเป้าหมายให้ทีมช่วยดู<br />ว่าเส้นทางนี้เหมาะกับเราหรือเปล่า</p><ModalButton kind="parents" className="wire-parent-summary">ดูรายละเอียดให้ผู้ปกครอง</ModalButton></div>
 </section>
 <details className="wire-practical" id="faq"><summary>วันเรียน ราคา และสิ่งที่ควรรู้ก่อนสมัคร</summary><div><p>19,990 บาทเป็นราคาหลักสูตรตลอด 12 เดือน ทีมจะยืนยันวัน–เวลา รูปแบบเรียน อุปกรณ์ ค่าแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p><p>เหมาะกับเด็ก ม.ปลาย ทั้งคนที่ยังไม่มีผลงาน มีงานแล้วแต่ไม่มั่นใจ และคนที่เรียนเองมา ใช้ AI ช่วยได้โดยต้องเข้าใจ ทดสอบ และอธิบายสิ่งที่สร้างได้</p><p>การลง NSC, TICTA หรือ TGS ขึ้นอยู่กับงาน คุณสมบัติ และกำหนดรับสมัคร น้อง ม.6 ควรแจ้งรอบยื่นพอร์ตและกำหนดส่งให้ทีมตรวจความเหมาะสมของระยะเวลาก่อนสมัคร ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย</p></div></details>
 </div></section>

 </main>;
}
