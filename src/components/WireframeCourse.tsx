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
 {title:"สร้างเกมที่คิดเอง\nให้คนอื่นเล่นได้จริง",text:"เลือกเกม แอป หรือ IoT แล้วฝึกพางานตั้งแต่ไอเดียจนถึงเดโมที่เปิดให้คนอื่นลอง",result:"โปรเจกต์หลักอย่างน้อย 1 ชิ้น ที่ใช้เล่าความสามารถของเราได้",kind:"game"},
 {title:"มีทีมให้ลองทำงานด้วย\nมีคนช่วยตอนงานไปต่อไม่ถูก",text:"ฝึกแบ่งหน้าที่ ลงลึกในส่วนที่เลือก และนำงานของทุกคนมารวมกัน พร้อมรับฟีดแบ็กเพื่อปรับงาน",result:"ได้โปรเจกต์ทีม และรู้ว่าตัวเองรับผิดชอบส่วนไหนได้",kind:"team"},
 {title:"พาผลงานออกจากห้องเรียน\nไปเจอคนใช้และสนามจริง",text:"ทดลองกับคนใช้ ฝึกพิตช์ และเตรียมลงเวทีที่เหมาะกับงาน พร้อมเก็บวิธีคิดและหลักฐานลงเล่มพอร์ต",result:"เดโม สื่อนำเสนอ และเล่มพอร์ตจากงานของตัวเอง",kind:"presentation"}
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

 <section className="wire-route wire-wrap" id="roadmap" aria-labelledby="route-title">
 <div className="route-intro"><h2 id="route-title">จาก “ชอบคอม”<br />สู่ “นี่คือผลงานของเรา”</h2><p>12 เดือน ค่อย ๆ เพิ่มความสามารถผ่านงานที่ยากขึ้น<br />เริ่มจากทำจบด้วยตัวเอง ทำร่วมกับทีม แล้วพัฒนาโปรเจกต์หลัก</p></div>
 <div className="route-selector"><span>อยากลองสร้างอะไร?</span><div className="route-track-options" role="group" aria-label="เลือกสายเพื่อดูเส้นทาง">{(Object.keys(tracks) as TrackKey[]).map(k=><button key={k} type="button" aria-pressed={track===k} onClick={()=>setTrack(k)}>{tracks[k].name}</button>)}</div></div>
 <p className="route-example-note">เลือกดูตัวอย่างแนวทางงาน ทีมจะช่วยวางโจทย์ให้เหมาะกับพื้นฐานของน้อง</p>
 <div className="learning-journey" aria-live="polite">{phases.map((p,i)=><article key={p.period} className={`journey-phase journey-phase-${i}`}>
 <p className="journey-period">{p.period}{i===2?" · 9 เดือนพัฒนาโปรเจกต์หลัก":""}</p>
 <h3>{i===0?"ทำชิ้นแรกให้จบ":i===1?"หาบทบาทที่ถนัด แล้วทำงานเป็นทีม":"ทำให้งานของเรา ไปถึงคนใช้จริง"}</h3>
 <div className="journey-work"><span>งานที่ได้ลงมือทำ</span><strong>{directions[track][i]}</strong></div>
 <ul>{(i===0?["คิดโจทย์และเลือกขอบเขตที่ทำไหว","สร้าง ทดสอบ แก้ปัญหา และส่งงาน"]:i===1?["แบ่งหน้าที่และรวมงานให้ใช้ด้วยกันได้",track==="game"?"โค้ด: OOP จัดระบบ · ภาพ: Shader ทำแสง สี วัสดุ":track==="app"?"ฝึกระบบ หน้าจอ และการทดสอบร่วมกัน":"เชื่อมอุปกรณ์ โปรแกรม และการแสดงข้อมูล"]:["เลือกปัญหาและทดลองกับคนที่เจอปัญหานั้น","สร้างเดโม รับฟีดแบ็ก ปรับและทดสอบซ้ำ","คิด Business Idea และฝึกพิตช์","เตรียมเวทีที่เหมาะกับงาน และเรียบเรียงเล่มพอร์ต"]).map(t=><li key={t}>{t}</li>)}</ul>
 <div className="journey-takeaway"><span>จบช่วงนี้มีอะไรในมือ</span><p>{p.output}</p></div>
 <button type="button" className="journey-more" onClick={e=>openPhase(i,e.currentTarget)} aria-haspopup="dialog">ดูสิ่งที่เรียนและการดูแล</button>
 </article>)}</div>
 <div className="route-support"><div><h3>เริ่มจากตรงที่เราอยู่</h3><p>ยังไม่มีผลงาน ทีมช่วยวางโจทย์แรกให้เริ่มได้<br />มีงานแล้วหรือเรียนเองมา นำพื้นฐานและสิ่งที่อยากพัฒนามาคุยกัน</p></div><div><h3>ไม่ได้ต้องเดินต่อคนเดียว</h3><p>รับฟีดแบ็กระหว่างพัฒนางาน พร้อมโอกาสให้นักธุรกิจและอาจารย์มหาวิทยาลัยดูผลงานตามการนัดหมาย</p></div></div>
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
 <section className="course-investment" id="pricing" aria-labelledby="investment-title">
 <div className="investment-story"><p>Project Build Skill</p><h2 id="investment-title">มีผลงานของตัวเอง<br />มีเรื่องให้เล่าอย่างมั่นใจ</h2><p>12 เดือนที่ได้ฝึกทำจนจบ ลองทำงานกับทีม<br />และพัฒนาโปรเจกต์ที่ใช้แสดงความสามารถของเรา</p><ul><li>โปรเจกต์หลัก เกม / แอป / IoT อย่างน้อย 1 ชิ้น</li><li>ทักษะจากงานเดี่ยว งานทีม และการทดสอบกับคนใช้</li><li>ฝึกพิตช์ เตรียมลงสนาม และจัดทำเล่มพอร์ต</li></ul></div>
 <div className="investment-action"><p>ราคาตลอดหลักสูตร 12 เดือน</p><strong>19,990 <small>บาท</small></strong><span>1 ธ.ค. 2569 – 1 ธ.ค. 2570</span><EnrollButton className="wire-blue-button">คุยเรื่องโปรเจกต์ที่อยากทำ</EnrollButton><p className="investment-help">เล่าพื้นฐานและเป้าหมายให้ทีมช่วยดู<br />ว่าเส้นทางนี้เหมาะกับเราหรือเปล่า</p><ModalButton kind="parents" className="wire-parent-summary">ดูรายละเอียดให้ผู้ปกครอง</ModalButton></div>
 </section>
 <details className="wire-practical" id="faq"><summary>วันเรียน ราคา และสิ่งที่ควรรู้ก่อนสมัคร</summary><div><p>19,990 บาทเป็นราคาหลักสูตรตลอด 12 เดือน ทีมจะยืนยันวัน–เวลา รูปแบบเรียน อุปกรณ์ ค่าแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p><p>เหมาะกับเด็ก ม.ปลาย ทั้งคนที่ยังไม่มีผลงาน มีงานแล้วแต่ไม่มั่นใจ และคนที่เรียนเองมา ใช้ AI ช่วยได้โดยต้องเข้าใจ ทดสอบ และอธิบายสิ่งที่สร้างได้</p><p>การลง NSC, TICTA หรือ TGS ขึ้นอยู่กับงาน คุณสมบัติ และกำหนดรับสมัคร น้อง ม.6 ควรแจ้งรอบยื่นพอร์ตและกำหนดส่งให้ทีมตรวจความเหมาะสมของระยะเวลาก่อนสมัคร ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย</p></div></details>
 </div></section>
 <dialog ref={dialog} className="wire-phase-dialog" aria-labelledby="wire-phase-title" onCancel={e=>{e.preventDefault();setPhase(null);}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setPhase(null);}}>
 <button type="button" className="wire-dialog-close" aria-label="ปิดรายละเอียดเส้นทาง" onClick={()=>setPhase(null)}>ปิด</button>
 {phase!==null&&<><div className="wire-dialog-tabs" role="group" aria-label="เลือกช่วงการเรียน">{phases.map((p,i)=><button type="button" key={p.period} aria-pressed={phase===i} onClick={()=>setPhase(i)}>{p.period}</button>)}</div><p className="wire-dialog-period">{phases[phase].period} · สาย{tracks[track].name}</p><h2 id="wire-phase-title">{phases[phase].name}</h2><p className="wire-dialog-lead">{directions[track][phase]}</p><ul className="wire-phase-activities">{phases[phase].items.map((t,i)=><li key={t} style={{"--item-order":i} as CSSProperties}>{t}</li>)}</ul><div className="wire-dialog-result"><span>จบช่วงนี้ได้</span><strong>{phases[phase].output}</strong></div><p className="wire-dialog-support">{phases[phase].support}</p>{phase===2&&<p className="wire-dialog-note">เป็นวงจรพัฒนางานที่ทำซ้ำได้ตามโจทย์ ไม่ใช่ตารางสอนรายเดือนตายตัว การแข่งขันขึ้นอยู่กับคุณสมบัติและกำหนดรับสมัคร</p>}</>}
 </dialog>
 </main>;
}
