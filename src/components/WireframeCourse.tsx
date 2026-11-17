"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assetPath } from "@/lib/assets";
import { tracks, type TrackKey } from "@/lib/course-data";
import { EnrollButton, ModalButton, useCourse } from "./CourseProvider";
import { DemonstrationVideo } from "./CourseExperience";
const asset=(name:string)=>"https://pepesx231.github.io/Hamterco/img/"+name;
const poster="https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png";
const veggie="https://mmaxez.itch.io/veggie-dash";

const lessons=[
 {title:"ทำโปรเจกต์ให้เป็น\nและพาตัวเองทำให้จบ",text:"ฝึกจากงานเดี่ยวชิ้นเล็ก ตั้งแต่คิดโจทย์ วางขอบเขต สร้างต้นแบบ ไปจนถึงทดสอบและแก้ปัญหา",result:"เข้าใจกระบวนการ และมีงานที่ทำจบด้วยตัวเอง",kind:"game"},
 {title:"ฝึกฝีมือตามบทบาท\nแล้วรวมงานเป็นโปรเจกต์ทีม",text:"แบ่งหน้าที่ให้ชัด Programmer ฝึก OOP เพื่อจัดโค้ดให้เป็นระบบ ส่วน Art ฝึก Shader เพื่อทำแสง สี และวัสดุ",result:"ได้ทั้งทักษะเฉพาะทางและประสบการณ์ทำงานร่วมกัน",kind:"team"},
 {title:"ทำงานให้คนใช้จริง\nแล้วพาไปเจอสนามจริง",text:"ทดลองกับคนใช้ ปรับงาน คิด Business Idea และฝึกนำเสนอ เลือกเวที NSC, TICTA หรือ TGS ตามงานและคุณสมบัติ",result:"มีเดโมและสื่อนำเสนอที่ใช้เล่าคุณค่าของงานได้",kind:"presentation"},
 {title:"เก็บสิ่งที่เราลงมือ\nมาเล่าเป็นพอร์ตของตัวเอง",text:"เรียบเรียงโจทย์ บทบาท วิธีคิด และผลทดสอบจากโปรเจกต์ ให้มีหลักฐานประกอบการยื่นคณะที่เล็ง",result:"เล่มพอร์ตจากงานที่เข้าใจและอธิบายได้",kind:"portfolio"}
];
const phases=[
 {period:"เดือน 1",name:"ทำงานเดี่ยวให้จบ",short:"เริ่มจากงานที่ทำไหว",output:"โปรเจกต์เดี่ยวที่ทำจบด้วยตัวเอง",items:["เลือกโจทย์และกำหนดขอบเขต","สร้างต้นแบบที่ทำงานหลักได้","ทดสอบ แก้ปัญหา และส่งงานให้จบ"],support:"ทีมช่วยวางโจทย์ให้เหมาะกับพื้นฐาน เพื่อให้รู้ว่าจะลงมืออะไรต่อ"},
 {period:"เดือน 2–3",name:"ทำงานเป็นทีม",short:"ลงลึกตามบทบาท",output:"โปรเจกต์ทีม และชิ้นงานตามบทบาทของตัวเอง",items:["แบ่งหน้าที่ วางแผน และรวมงาน","Programmer: OOP ฝึกแยกความรับผิดชอบและจัดโค้ด","Art: Shader ฝึกแสง สี และวัสดุในงานภาพ","รับฟีดแบ็กแล้วปรับงานร่วมกัน"],support:"ฝึกจากปัญหาของงานจริง มีทีมช่วยขัดงานให้พัฒนาต่อได้"},
 {period:"เดือน 4–12",name:"ทำให้ใช้จริง แล้วออกสู่สนาม",short:"9 เดือนกับงานของเรา",output:"โปรเจกต์หลักอย่างน้อย 1 ชิ้น และเล่มพอร์ตตรงคณะที่เล็ง",items:["เลือกปัญหาและคนที่จะใช้","ทำรุ่นแรกให้สาธิตได้","ทดลองกับคนใช้แล้วเก็บฟีดแบ็ก","ปรับงานและทดสอบซ้ำ","คิด Business Idea ฝึกพิตช์และเตรียมลงสนาม","สรุปกระบวนการและหลักฐานลงเล่มพอร์ต"],support:"พัฒนาเป็นวงจรตลอดช่วงนี้ โดยมีโอกาสให้นักลงทุนและอาจารย์มหาวิทยาลัยดูผลงานตามการนัดหมายในแต่ละเดือน"}
];
const directions:Record<TrackKey,string[]>={
 game:["เกมสั้นที่มีกติกาหลักและเล่นจบได้","แบ่งโค้ด ภาพ ด่าน และการทดสอบ แล้วรวมเป็นเกมเดียว","เกมที่มีคนลองเล่น และปรับจากปัญหาที่ผู้เล่นพบ"],
 app:["แอปต้นแบบที่แก้ปัญหาได้หนึ่งเรื่อง","แบ่งระบบ หน้าจอ และการทดสอบ แล้วรวมให้ทำงานร่วมกัน","แอปที่ทดลองกับคนมีปัญหานั้นจริง และอธิบายคุณค่าได้"],
 iot:["ต้นแบบที่อ่านค่าและตอบสนองได้","แบ่งอุปกรณ์ โปรแกรม และการแสดงข้อมูล แล้วเชื่อมเข้าด้วยกัน","อุปกรณ์ที่ทดลองในสถานการณ์จริง พร้อมผลทดสอบและเดโม"]
};

export function WireframeCourse(){
 const {track,setTrack}=useCourse();
 const [slide,setSlide]=useState(0),[paused,setPaused]=useState(false),[onScreen,setOnScreen]=useState(false);
 const [phase,setPhase]=useState<number|null>(null);
 const highlight=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),previous=useRef<HTMLElement|null>(null);
 const reasonRail=useRef<HTMLDivElement>(null);const [reason,setReason]=useState(0);
 useEffect(()=>{
   const el=highlight.current;if(!el)return;const observer=new IntersectionObserver(([e])=>setOnScreen(e.isIntersecting),{threshold:.35});observer.observe(el);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
   if(paused||!onScreen)return;const motion=window.matchMedia("(prefers-reduced-motion: reduce)");if(motion.matches)return;
   const timer=setInterval(()=>{if(!document.hidden&&!motion.matches)setSlide(s=>(s+1)%lessons.length);},7500);return()=>clearInterval(timer);
 },[paused,onScreen]);
 const openPhase=(i:number,trigger:HTMLElement)=>{previous.current=trigger;setPhase(i);};
 useEffect(()=>{
   if(phase===null)return;const el=dialog.current;if(!el)return;const before=document.body.style.overflow;document.body.style.overflow="hidden";if(!el.open)el.showModal();
   return()=>{el.close();document.body.style.overflow=before;previous.current?.focus({preventScroll:true});};
 },[phase===null]);
 const pickReason=(i:number)=>{const rail=reasonRail.current,card=rail?.children[i] as HTMLElement|undefined;if(rail&&card)rail.scrollTo({left:card.offsetLeft-(rail.children[0] as HTMLElement).offsetLeft,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});};
 return <main id="main" className="wire-course">
 <section className="wire-hero" aria-labelledby="wire-title">
   <DemonstrationVideo className="wire-hero-film" src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเล่นจริงในเกม SLASH//SPEED ที่นักเรียนในคอมมูนิตี้ Hamster Hub สร้าง" />
   <div className="wire-hero-heading"><p>Project Build Skill</p><h1 id="wire-title">เล่นเกมพร้อมทำงาน</h1><span>เรียนสร้างเกม แอป หรือ IoT ด้วยโปรเจกต์ของตัวเอง</span></div>
   <div className="wire-hero-bottom"><div className="wire-offer-pill"><span>12 เดือน · <strong>19,990 บาท</strong></span><EnrollButton>สนใจเรียน</EnrollButton></div><p>คลิปผลงานจริง SLASH//SPEED · ดินสอ · คอมมูนิตี้ Hamster Hub</p></div>
 </section>

 <section className="wire-lessons wire-wrap" id="highlights" aria-labelledby="lessons-title"><h2 id="lessons-title">เรียนอะไรบ้าง</h2>
  <div ref={highlight} className="wire-lesson-card" role="region" aria-roledescription="carousel" aria-label="เนื้อหาที่จะได้เรียน" onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();setSlide((slide+1)%lessons.length);}if(e.key==="ArrowLeft"){e.preventDefault();setSlide((slide+lessons.length-1)%lessons.length);}}} tabIndex={0}>
   <div className="wire-lesson-copy" key={"copy"+slide}><h3>{lessons[slide].title.split("\n").map(line=><span key={line}>{line}</span>)}</h3><p>{lessons[slide].text}</p><strong>{lessons[slide].result}</strong></div>
   <div className={`wire-lesson-visual lesson-${lessons[slide].kind}`} key={"visual"+slide}>
    {slide===0?<figure><img src={assetPath("/assets/demo/slash-gameplay.webp")} alt="ภาพเกม SLASH//SPEED ผลงานที่นักเรียนในคอมมูนิตี้สร้างและสาธิตได้" width="1280" height="650" loading="lazy" /><figcaption>ตัวอย่างงานที่เล่นได้จริง: SLASH//SPEED</figcaption></figure>:slide===1?<figure><img src={asset("photo-class.webp")} alt="ผู้เรียนและผู้สอนร่วมพูดคุยกันในกิจกรรม Hamster Hub" width="1000" height="550" loading="lazy" /><figcaption>บรรยากาศจริงจากกิจกรรม Hamster Hub</figcaption></figure>:slide===2?<figure><img src={poster} alt="โปสเตอร์นำเสนอโครงงาน Veggie Dash ใน NSC 2024 ที่ทีมเผยแพร่สาธารณะ" width="1742" height="2488" loading="lazy" /><figcaption>สื่อนำเสนอจริง: โปสเตอร์ NSC ของทีม Veggie Dash</figcaption></figure>:<div className="wire-portfolio-map"><span>โจทย์ที่เลือก</span><span>ส่วนที่เราทำ</span><span>วิธีคิดและการแก้ปัญหา</span><span>ผลทดสอบและหลักฐาน</span><small>โครงเนื้อหาที่ฝึกเรียบเรียงลงพอร์ต</small></div>}
   </div>
  </div>
  <div className="wire-gallery-controls"><div role="group" aria-label="เลือกเนื้อหาเรียน">{lessons.map((l,i)=><button type="button" key={l.kind} aria-label={l.title.replace("\n"," ")} aria-pressed={slide===i} onClick={()=>setSlide(i)}><span /></button>)}</div><button type="button" className="wire-play" aria-label={paused?"เล่นสไลด์อัตโนมัติ":"หยุดสไลด์อัตโนมัติ"} onClick={()=>setPaused(!paused)}>{paused?<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6z" /></svg>:<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h3v12H6zm6 0h3v12h-3z" /></svg>}</button></div>
 </section>

 <section className="wire-route wire-wrap" id="roadmap" aria-labelledby="route-title"><div className="wire-centered-heading"><p>ออกแบบเส้นทางจากสิ่งที่อยากสร้าง</p><h2 id="route-title">เส้นทางการเรียนรู้ของตัวคุณเอง</h2></div>
 <div className="wire-route-panel"><div className="wire-route-tracks" role="group" aria-label="เลือกสายเพื่อดูเส้นทาง">{(Object.keys(tracks) as TrackKey[]).map(key=><button key={key} type="button" aria-pressed={track===key} onClick={()=>setTrack(key)}>{tracks[key].name}</button>)}</div>
  <div className="wire-route-map" aria-label={`ภาพอธิบายเส้นทางสาย${tracks[track].name}`}><div className="wire-track-symbol" aria-hidden="true">{track==="game"?<svg viewBox="0 0 160 100"><path d="M45 25h70c15 0 25 35 25 48s-14 14-22 4l-13-15H55L42 77C34 87 20 86 20 73s10-48 25-48Z" /><path d="M40 43v20m-10-10h20m57-5h1m13 12h1" /></svg>:track==="app"?<svg viewBox="0 0 160 100"><rect x="24" y="12" width="112" height="75" rx="8"/><path d="M24 30h112M37 21h1m10 0h1m10 0h1M41 46h34v25H41zm47 0h32m-32 13h25m-25 12h28" /></svg>:<svg viewBox="0 0 160 100"><rect x="52" y="25" width="56" height="50" rx="6"/><path d="M65 15v10m15-10v10m15-10v10M65 75v10m15-10v10m15-10v10M42 38h10M42 50h10M42 62h10m56-24h10m-10 12h10m-10 12h10M68 41h24v18H68Z" /></svg>}</div><p className="wire-track-direction" aria-live="polite">{track==="game"?"จากกติกาที่คิดเอง สู่เกมที่เปิดให้คนเล่น":track==="app"?"จากปัญหาของคนใช้ สู่แอปที่แก้ได้จริง":"จากสิ่งที่อยากวัด สู่ต้นแบบที่ทำงานและสาธิตได้"}</p>
  <div className="wire-route-stages">{phases.map((p,i)=><button type="button" key={p.period} onClick={e=>openPhase(i,e.currentTarget)} aria-haspopup="dialog"><span>{p.period}</span><strong>{p.name}</strong><small>{p.short}</small><i aria-hidden="true" /></button>)}</div><p className="wire-route-output" aria-live="polite">{directions[track][2]}</p>
  </div>
  <button type="button" className="wire-blue-button route-detail-button" onClick={e=>openPhase(0,e.currentTarget)} aria-haspopup="dialog">ดูรายละเอียดเส้นทาง</button>
 </div>
 <div className="wire-detail-pair"><article><div className="wire-role-art"><span className="wire-role-code">โค้ด<strong>OOP</strong><small>จัดระบบให้ทำงานร่วมกัน</small></span><span className="wire-role-artwork">งานภาพ<strong>Shader</strong><small>ควบคุมแสง สี และวัสดุ</small></span><span className="wire-role-result">รวมเป็นงานของทีม</span></div><div><h3>ลงลึกในบทบาทที่เลือก</h3><p>ฝึกส่วนที่รับผิดชอบผ่านโปรเจกต์กลุ่ม แล้วเรียนรู้ว่าชิ้นงานของตัวเองเชื่อมกับคนอื่นอย่างไร</p><button type="button" className="wire-text-button" onClick={e=>openPhase(1,e.currentTarget)}>ดูช่วงเดือน 2–3</button></div></article>
 <article><div className="wire-build-art"><span>สร้างต้นแบบ</span><span>ให้คนลองใช้</span><span>รับฟีดแบ็ก</span><span>ปรับและลองใหม่</span><i aria-hidden="true" /></div><div><h3>9 เดือน พัฒนาโปรเจกต์ให้ไปต่อ</h3><p>ใช้ช่วงเดือน 4–12 กับการทำงานหลัก ทดลองกับคนใช้ ปรับงาน พิตช์ และเตรียมเวทีที่เหมาะกับโปรเจกต์</p><button type="button" className="wire-text-button" onClick={e=>openPhase(2,e.currentTarget)}>ดูช่วงเดือน 4–12</button></div></article></div>
 </section>

 <section className="wire-mentors wire-wrap" id="mentors" aria-labelledby="mentor-title"><div className="wire-centered-heading"><p>พัฒนางานผ่านมุมมองของคนทำงานจริง</p><h2 id="mentor-title">มีโอกาสให้อาจารย์มหาลัย<br />ช่วยดูผลงานทุกเดือน</h2><span>ร่วมกับโอกาสพิตช์และรับมุมมองจากนักธุรกิจ ตามการนัดหมายของแต่ละเดือน</span></div>
 <div className="wire-review-scene"><figure><img src={poster} alt="โปสเตอร์จริงของ Veggie Dash ตัวอย่างสื่อที่ใช้เล่าโจทย์และการทำงานของโครงงาน" width="1742" height="2488" loading="lazy" /><figcaption>สื่อนำเสนอจริงจากทีม Veggie Dash</figcaption></figure><div className="wire-review-notes"><span>นำเดโมและวิธีคิดมาคุย</span><h3>โจทย์ชัดไหม<br />คนใช้ติดตรงไหน<br />งานควรไปต่ออย่างไร</h3><p>ฝึกอธิบายงาน รับข้อเสนอแนะ แล้วนำกลับไปเลือกสิ่งที่จะพัฒนาต่อ</p><a href={veggie} target="_blank" rel="noopener noreferrer">ดูตัวอย่างเกม เครดิตทีม และฟีดแบ็กจริง</a></div></div>
 </section>

 <section className="wire-why" id="why" aria-labelledby="why-title"><div className="wire-wrap"><h2 id="why-title">ทำไมเรียน Project Build Skill<br />ถึงเหมาะกับเด็ก ม.5</h2><div ref={reasonRail} className="wire-reasons" onScroll={()=>{const el=reasonRail.current;if(!el)return;let chosen=0,dist=Infinity;Array.from(el.children).forEach((c,i)=>{const d=Math.abs((c as HTMLElement).offsetLeft-(el.children[0] as HTMLElement).offsetLeft-el.scrollLeft);if(d<dist){dist=d;chosen=i;}});setReason(chosen);}}>
 {[
 ["มีเวลาค้นหาทางที่ชอบ","ลองสร้างงานก่อนเลือกทาง","ได้รู้ว่าชอบคิดระบบ เขียนโค้ด ทำภาพ หรือแก้ปัญหาให้คนใช้ ผ่านสิ่งที่ลงมือทำ"],
 ["สะสมงานของตัวเอง","เริ่มเก็บหลักฐานตั้งแต่ตอนทำ","มีทั้งต้นแบบ บันทึกการพัฒนา บทบาท และผลทดสอบให้ใช้เรียบเรียงพอร์ต"],
 ["ได้ลองทำงานกับคนอื่น","ฝึกทีมก่อนเจองานที่ใหญ่ขึ้น","แบ่งหน้าที่ รับฟีดแบ็ก และรวมงานให้เป็นโปรเจกต์เดียวกัน"],
 ["พร้อมอธิบายสิ่งที่ยื่น","มีเรื่องให้เล่าจากประสบการณ์","เข้าใจว่าทำไมเลือกโจทย์นี้ ทำอะไรเอง เจอปัญหาอะไร และเรียนรู้อะไรจากงาน"]
 ].map(([label,title,text],i)=><article key={label}><span>{label}</span><div className={`wire-reason-graphic reason-graphic-${i}`} aria-hidden="true">{i===0?<><b>เกม</b><b>แอป</b><b>IoT</b></>:i===1?<><b>ต้นแบบ</b><b>งานรุ่นถัดไป</b><b>ผลงานหลัก</b></>:i===2?<><b>ส่วนของเรา</b><b>ส่วนของทีม</b><b>งานที่ใช้ร่วมกัน</b></>:<><b>โจทย์</b><b>วิธีทำ</b><b>ผลลัพธ์</b></>}</div><h3>{title}</h3><p>{text}</p></article>)}
 </div><div className="wire-reason-dots" role="group" aria-label="เลือกเหตุผลที่เหมาะกับเด็ก ม.5">{[0,1,2,3].map(i=><button type="button" key={i} aria-label={`ดูเหตุผลข้อ ${i+1}`} aria-pressed={reason===i} onClick={()=>pickReason(i)}><span /></button>)}</div>
 <div className="wire-final-offer" id="pricing"><div><p>Project Build Skill · 12 เดือน</p><strong>19,990 <small>บาท</small></strong><span>1 ธ.ค. 2569 – 1 ธ.ค. 2570</span></div><div><EnrollButton className="wire-blue-button">คุยกับทีม / สนใจสมัคร</EnrollButton><ModalButton kind="parents" className="wire-parent-summary">ดูสรุปให้ผู้ปกครอง</ModalButton></div></div>
 <details className="wire-practical" id="faq"><summary>วันเรียน ราคา และสิ่งที่ควรรู้ก่อนสมัคร</summary><div><p>19,990 บาทเป็นราคาหลักสูตรตลอด 12 เดือน ทีมจะยืนยันวัน–เวลา รูปแบบเรียน อุปกรณ์ ค่าแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p><p>เหมาะกับเด็ก ม.ปลาย ทั้งคนที่ยังไม่มีผลงาน มีงานแล้วแต่ไม่มั่นใจ และคนที่เรียนเองมา ใช้ AI ช่วยได้โดยต้องเข้าใจ ทดสอบ และอธิบายสิ่งที่สร้างได้</p><p>การลง NSC, TICTA หรือ TGS ขึ้นอยู่กับงาน คุณสมบัติ และกำหนดรับสมัคร ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย</p></div></details>
 </div></section>
 <dialog ref={dialog} className="wire-phase-dialog" aria-labelledby="wire-phase-title" onCancel={e=>{e.preventDefault();setPhase(null);}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setPhase(null);}}>
 <button type="button" className="wire-dialog-close" aria-label="ปิดรายละเอียดเส้นทาง" onClick={()=>setPhase(null)}>ปิด</button>
 {phase!==null&&<><div className="wire-dialog-tabs" role="group" aria-label="เลือกช่วงการเรียน">{phases.map((p,i)=><button type="button" key={p.period} aria-pressed={phase===i} onClick={()=>setPhase(i)}>{p.period}</button>)}</div><p className="wire-dialog-period">{phases[phase].period} · สาย{tracks[track].name}</p><h2 id="wire-phase-title">{phases[phase].name}</h2><p className="wire-dialog-lead">{directions[track][phase]}</p><ul className="wire-phase-activities">{phases[phase].items.map((t,i)=><li key={t} style={{"--item-order":i} as CSSProperties}>{t}</li>)}</ul><div className="wire-dialog-result"><span>จบช่วงนี้ได้</span><strong>{phases[phase].output}</strong></div><p className="wire-dialog-support">{phases[phase].support}</p>{phase===2&&<p className="wire-dialog-note">เป็นวงจรพัฒนางานที่ทำซ้ำได้ตามโจทย์ ไม่ใช่ตารางสอนรายเดือนตายตัว การแข่งขันขึ้นอยู่กับคุณสมบัติและกำหนดรับสมัคร</p>}</>}
 </dialog>
 </main>;
}
