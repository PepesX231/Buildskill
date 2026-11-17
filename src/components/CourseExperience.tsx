"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assetPath } from "@/lib/assets";
import { EnrollButton, ModalButton, useCourse } from "./CourseProvider";
import { tracks, type TrackKey } from "@/lib/course-data";
const publicAsset=(file:string)=>"https://pepesx231.github.io/Hamterco/img/"+file;
const veggie="https://mmaxez.itch.io/veggie-dash";
const poster="https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png";
const gameImage="https://img.itch.zone/aW1hZ2UvMjgyMjIzNy8xNzk4NjU0NS5wbmc=/original/RV6h7b.png";

export function DemonstrationVideo({className="",src,poster:cover,label,controls=false}:{className?:string;src:string;poster:string;label:string;controls?:boolean}){
 const host=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null);
 const [failed,setFailed]=useState(false),[paused,setPaused]=useState(false),[playing,setPlaying]=useState(false);
 useEffect(()=>{
   const node=host.current,v=video.current;if(!node||!v)return;
   const motion=window.matchMedia("(prefers-reduced-motion: reduce)");let visible=false;
   const sync=()=>{if(visible&&!document.hidden&&!motion.matches&&!paused)v.play().catch(()=>setPlaying(false));else v.pause();};
   const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();},{threshold:.15});
   observer.observe(node);document.addEventListener("visibilitychange",sync);motion.addEventListener("change",sync);
   return()=>{observer.disconnect();v.pause();document.removeEventListener("visibilitychange",sync);motion.removeEventListener("change",sync);};
 },[paused,failed,src]);
 return <div ref={host} className={`demonstration-video ${className}`}>
   <img src={cover} alt={label} width="1280" height="650" />
   {!failed&&<video ref={video} src={src} poster={cover} muted loop playsInline preload="metadata" controls={controls} aria-label={label} onError={()=>setFailed(true)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} />}
   {!failed&&<button className="demo-toggle" type="button" onClick={()=>{const v=video.current;if(!v)return;if(playing){setPaused(true);v.pause();}else{setPaused(false);v.play().catch(()=>setPlaying(false));}}}>{playing?"หยุดคลิป":"เล่นคลิป"}</button>}
 </div>;
}

export function ExperienceHero(){
 return <section className="experience-hero" aria-labelledby="experience-title">
  <div className="experience-hero-title wrap"><p>Project Build Skill</p><h1 id="experience-title">ชอบคอมแล้ว<br /><span>มาสร้างผลงานของเรา</span></h1></div>
  <div className="hero-demonstration"><DemonstrationVideo src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเคลื่อนที่และต่อสู้ในเกม SLASH//SPEED ผลงานนักเรียนในคอมมูนิตี้ Hamster Hub" /><div className="hero-demonstration-caption"><strong>เกมนี้ นักเรียนสร้าง</strong><span>SLASH//SPEED · ดินสอ · คอมมูนิตี้ Hamster Hub</span><a href="https://www.hamsterhub.co/go/hall-of-fame/slash-speed" target="_blank" rel="noopener noreferrer">ดูงานต้นฉบับ</a></div></div>
  <div className="experience-intro wrap"><p>คอร์สสร้างเกม แอป หรือ IoT สำหรับ ม.ปลาย<br />พาลงมือ ตั้งแต่ไอเดียจนใช้งานได้จริง พร้อมทำพอร์ตจากงานของตัวเอง</p><a className="experience-text-link" href="#highlights">ดูว่าเราจะได้ลงมือทำอะไร</a></div>
 </section>;
}

const benefits=[
 {href:"#build",title:"สร้างโปรเจกต์ให้จบ",detail:"คิดเอง ทำเอง และสาธิตได้"},
 {href:"#team",title:"ฝึกตามบทบาทจริง",detail:"โค้ด งานภาพ และการทำงานร่วมกัน"},
 {href:"#development",title:"พัฒนาให้คนใช้จริง",detail:"ทดสอบ ปรับงาน ลงสนาม และพิตช์"},
 {href:"#portfolio",title:"ทำพอร์ตจากงานของเรา",detail:"มีหลักฐานและกระบวนการให้เล่า"}
];
export function CourseOverview(){
 return <section className="experience-overview wrap" id="highlights" aria-labelledby="overview-title"><h2 id="overview-title">12 เดือนที่น้อง<br /><span>จะได้ลงมือทำจริง</span></h2><nav className="outcome-navigation" aria-label="สิ่งที่จะได้ลงมือในคอร์ส">{benefits.map(b=><a href={b.href} key={b.href}><strong>{b.title}</strong><span>{b.detail}</span></a>)}</nav></section>;
}

const directions:Record<TrackKey,{solo:string;team:string;main:string}>={
 game:{solo:"เกมสั้นที่มีกติกาหลักและเล่นจบได้",team:"แบ่งโค้ด งานภาพ ด่าน และการทดสอบ แล้วรวมเป็นเกมเดียว",main:"พัฒนาเกมให้คนอื่นลองเล่น เก็บปัญหา แล้วปรับประสบการณ์ของผู้เล่น"},
 app:{solo:"แอปต้นแบบที่แก้ปัญหาหลักได้หนึ่งเรื่อง",team:"แบ่งระบบ หน้าจอ และการทดสอบ แล้วรวมให้ใช้งานด้วยกัน",main:"ให้คนที่มีปัญหานั้นลองใช้แอป แล้วปรับตามสิ่งที่เกิดขึ้นจริง"},
 iot:{solo:"อุปกรณ์ต้นแบบที่อ่านค่าและตอบสนองได้",team:"แบ่งอุปกรณ์ โปรแกรม และการแสดงข้อมูล แล้วเชื่อมการทำงาน",main:"ทดสอบต้นแบบในสถานการณ์จริง เก็บผล และปรับให้ตอบโจทย์การใช้"}
};

export function LearningExperience(){
 const {track,setTrack}=useCourse();const [role,setRole]=useState<"programmer"|"art">("programmer");
 return <section className="learning-experience" id="roadmap" aria-labelledby="learning-experience-title">
  <div className="wrap"><div className="experience-section-heading"><h2 id="learning-experience-title">เริ่มจากทำให้จบ<br /><span>แล้วค่อยทำให้ไปได้ไกล</span></h2><p>งานเล็ก งานทีม และโปรเจกต์หลัก<br />แต่ละช่วงต่อยอดสิ่งที่ฝึกมาก่อนหน้า</p></div>
  <div className="experience-tracks" role="group" aria-label="เลือกสายเพื่อดูตัวอย่างแนวทางงาน">{(Object.keys(tracks) as TrackKey[]).map(k=><button type="button" key={k} aria-pressed={track===k} onClick={()=>setTrack(k)}>{tracks[k].name}</button>)}</div><p className="example-note">ตัวอย่างแนวทางงาน ทีมจะช่วยวางโจทย์ให้เหมาะกับพื้นฐานและสิ่งที่อยากสร้าง</p>

  <article id="build" className="solo-experience"><div className="experience-copy"><p className="experience-period">เดือน 1 · งานเดี่ยว</p><h3>เข้าใจทั้งกระบวนการ<br />ด้วยการทำให้จบสักครั้ง</h3><p>ฝึกเลือกโจทย์ กำหนดขอบเขต สร้างต้นแบบ และแก้ปัญหาจนส่งงานได้ ทีมช่วยให้งานชิ้นแรกมีขนาดที่ลงมือจบได้จริง</p><div className="experience-deliverable"><span>จบช่วงนี้ได้</span><strong>โปรเจกต์เดี่ยวที่ทำจบด้วยตัวเอง</strong><p aria-live="polite">{directions[track].solo}</p></div></div>
   <div className="project-process" aria-label="กระบวนการที่ฝึกในเดือนแรก"><div className="process-line" aria-hidden="true" />{["ไอเดียที่อยากทำ","ขอบเขตที่ทำไหว","ต้นแบบที่ลองได้","ทดสอบแล้วแก้","งานที่ทำจบ"].map((text,i)=><div className="process-point" key={text} style={{"--process-order":i} as CSSProperties}><span aria-hidden="true" /><strong>{text}</strong></div>)}<p>ฝึกกระบวนการนี้กับงานของน้องเอง</p></div>
  </article>

  <article id="team" className="team-experience"><div className="team-photo"><img src={publicAsset("photo-class.webp")} alt="ผู้เรียนกับผู้สอนพูดคุยร่วมกันในกิจกรรมของ Hamster Hub" width="1000" height="550" loading="lazy" /><p>บรรยากาศจริงจากกิจกรรม Hamster Hub</p></div><div className="experience-copy"><p className="experience-period">เดือน 2–3 · งานกลุ่ม</p><h3>รู้หน้าที่ของตัวเอง<br />และทำงานร่วมกับคนอื่น</h3><p>แบ่งบทบาทให้ชัด ฝึกลงลึกในส่วนที่รับผิดชอบ แล้วนำงานของแต่ละคนมารวมกัน พร้อมรับฟีดแบ็กเพื่อปรับงาน</p><div className="role-choice" role="group" aria-label="ตัวอย่างทักษะตามบทบาท"><button type="button" aria-pressed={role==="programmer"} onClick={()=>setRole("programmer")}>Programmer</button><button type="button" aria-pressed={role==="art"} onClick={()=>setRole("art")}>Art</button></div><div className="role-explanation" aria-live="polite">{role==="programmer"?<><strong>OOP · จัดโค้ดให้เป็นระบบ</strong><div className="code-structure"><span>ตัวละคร</span><span>การเคลื่อนที่</span><span>การโต้ตอบ</span></div><p>ฝึกแยกความรับผิดชอบของระบบ ให้โค้ดอ่านและนำมาทำงานร่วมกันได้</p></>:<><strong>Shader · ทำแสง สี และวัสดุ</strong><div className="material-study" aria-label="ภาพประกอบหลักการปรับลักษณะพื้นผิว"><span /><span /><span /></div><p>ฝึกควบคุมลักษณะภาพให้เหมาะกับสิ่งที่อยากสื่อในงาน</p></>}</div><div className="experience-deliverable"><span>จบช่วงนี้ได้</span><strong>โปรเจกต์ทีม และชิ้นงานตามบทบาทของตัวเอง</strong><p aria-live="polite">{directions[track].team}</p></div></div></article>
  </div>
  <DevelopmentCycle track={track} />
 </section>;
}

const cycle=[
 {title:"เลือกปัญหาที่อยากแก้",action:"หาว่างานนี้ทำให้ใคร ใช้ทำอะไร และควรเริ่มจากส่วนไหน",evidence:"โจทย์และขอบเขตของโปรเจกต์"},
 {title:"ทำรุ่นแรกให้ลองได้",action:"สร้างการทำงานหลักให้คนลอง โดยยังไม่ต้องใส่ทุกฟีเจอร์",evidence:"ต้นแบบที่สาธิตการทำงานหลักได้"},
 {title:"เอาไปให้คนใช้",action:"สังเกตว่าเขาติดตรงไหน เก็บปัญหาและสิ่งที่ควรปรับ",evidence:"ผลการทดสอบและฟีดแบ็ก"},
 {title:"ปรับ แล้วลองอีกครั้ง",action:"เลือกแก้สิ่งสำคัญ ทดสอบซ้ำ และบันทึกเหตุผลที่เปลี่ยนงาน",evidence:"งานรุ่นถัดไปและบันทึกการพัฒนา"},
 {title:"พางานออกสู่สนาม",action:"ฝึกคิด Business Idea สาธิต พิตช์กับนักธุรกิจ และเตรียมเวทีที่เหมาะกับงาน",evidence:"เดโม สื่อพิตช์ และผลงานสำหรับสมัครแข่งขัน"},
 {title:"เล่าผลงานให้เป็น",action:"สรุปปัญหา บทบาท วิธีทำ และผลที่เกิดขึ้น ให้คนดูเข้าใจฝีมือของเรา",evidence:"โปรเจกต์หลัก และเล่มพอร์ตตรงคณะที่เล็ง"}
];
function DevelopmentCycle({track}:{track:TrackKey}){
 const [active,setActive]=useState(0);
 return <article id="development" className="development-experience"><div className="wrap"><div className="development-heading"><p className="experience-period">เดือน 4–12 · Startup Phase</p><h3><span>9 เดือน</span><br />พัฒนางานของเรา<br />ให้ไปเจอคนใช้จริง</h3><p>ช่วงใหญ่ของคอร์สใช้กับการทำ ทดสอบ และปรับโปรเจกต์ วงจรนี้วนกลับมาได้ตามปัญหาที่เจอ ไม่ใช่ทำแต่ละขั้นเพียงครั้งเดียว</p></div><div className="development-stage"><div className="cycle-choices" role="group" aria-label="สำรวจงานในช่วงเดือน 4 ถึง 12">{cycle.map((c,i)=><button key={c.title} type="button" aria-pressed={i===active} onClick={()=>setActive(i)}>{c.title}</button>)}</div><div className="cycle-detail" key={active} aria-live="polite"><div className={`cycle-visual cycle-visual-${active}`}>{active===0?<div className="scope-visual"><span>ใครจะใช้?</span><strong>งานนี้แก้ปัญหาอะไร</strong><p>เลือกการทำงานหลักที่ต้องทำให้ได้ก่อน</p><small>แนวทางวางโจทย์โปรเจกต์</small></div>:active===1?<figure><img src={gameImage} alt="ตัวอย่างเดโมเกม Veggie Dash ที่ทีมเผยแพร่ให้คนดาวน์โหลดเล่น" width="1280" height="720" loading="lazy" /><figcaption>ตัวอย่างเดโมจริง: Veggie Dash</figcaption></figure>:active===2?<div className="feedback-visual"><span>ตัวอย่างฟีดแบ็กจริงจากหน้า Veggie Dash</span><strong>สิ่งของบังกล้อง<br />คนเล่นมองทางยาก</strong><p>ปัญหาที่คนเล่นพบ ช่วยบอกว่างานควรพัฒนาตรงไหน</p></div>:active===3?<div className="revision-visual" aria-label="วงจรปรับงานจากฟีดแบ็ก"><span>ฟีดแบ็ก</span><span>เลือกสิ่งที่แก้</span><span>ทดสอบใหม่</span><small>วนกลับมาทดลองได้หลายรอบตามงาน</small></div>:active===4?<a className="cycle-poster" href={poster} target="_blank" rel="noopener noreferrer"><img src={poster} alt="โปสเตอร์นำเสนอโครงงาน Veggie Dash ใน NSC 2024" width="1742" height="2488" loading="lazy" /><span>สื่อนำเสนอจริง<br />เปิดโปสเตอร์ NSC ของทีม</span></a>:<div className="portfolio-visual"><span>โจทย์และวิธีคิด</span><span>ส่วนที่เราลงมือ</span><span>หลักฐานและผลทดสอบ</span><small>โครงเรื่องสำหรับเรียบเรียงลงพอร์ต</small></div>}</div><h4>{cycle[active].title}</h4><p>{cycle[active].action}</p><div className="cycle-evidence"><span>สิ่งที่เก็บไว้ต่อยอด</span><strong>{cycle[active].evidence}</strong></div></div></div><p className="development-direction" aria-live="polite">แนวทางสาย{tracks[track].name}: {directions[track].main}</p><div className="development-bottom"><p>มีโอกาสให้นักลงทุนและอาจารย์มหาวิทยาลัยดูผลงานในแต่ละเดือน ตามการนัดหมาย</p><p>เลือก NSC, TICTA หรือ TGS ตามงาน คุณสมบัติ และกำหนดรับสมัคร</p></div></div></article>;
}

const caseTabs=[
 {id:"game",label:"ตัวเกม",heading:"มีเดโมที่คนอื่นเปิดเล่นได้",description:"Veggie Dash เป็นเกม 3D Platformer ที่มีระบบการเล่น ด่าน และบอส หน้าโปรเจกต์เผยแพร่เดโมให้ดาวน์โหลดและรับฟีดแบ็กได้"},
 {id:"roles",label:"การแบ่งงาน",heading:"หนึ่งเกม มีหลายบทบาทที่ทำงานร่วมกัน",description:"เครดิตที่ทีมเผยแพร่แบ่งทั้ง Lead Programmer, งานโมเดลและแอนิเมชัน, งานภาพตัวละคร และ VFX/แสง แสดงให้เห็นว่าชิ้นงานแต่ละส่วนประกอบเป็นเกมเดียวกันอย่างไร"},
 {id:"feedback",label:"ฟีดแบ็กจริง",heading:"งานที่เล่นได้ ยังมีสิ่งให้พัฒนาต่อ",description:"ผู้เล่นบนหน้าโปรเจกต์ให้ข้อเสนอแนะเรื่องมุมกล้องที่ถูกสิ่งของบัง และประสิทธิภาพการเล่น นี่คือตัวอย่างปัญหาที่การทดสอบกับคนอื่นช่วยให้เห็น"},
 {id:"presentation",label:"สื่อนำเสนอ",heading:"อธิบายโครงงานให้คนที่ไม่เคยเล่นเข้าใจ",description:"โปสเตอร์ NSC ที่ทีมเผยแพร่ช่วยเล่าที่มา วัตถุประสงค์ และการทำงานของเกม เป็นสื่อนำเสนอโครงงานจริง"}
];
export function SelectedEvidence(){
 const [selected,setSelected]=useState(0);
 return <section id="showcase" className="selected-evidence" aria-labelledby="selected-title"><div className="wrap"><div className="experience-section-heading"><h2 id="selected-title">ให้ผลงานพูดแทน</h2><p>ดูตัวเกม เครดิตทีม ฟีดแบ็ก และสื่อนำเสนอ<br />จากโปรเจกต์เดียวกันในคอมมูนิตี้ Hamster Hub</p></div><div className="case-heading"><h3>Veggie Dash</h3><p>เกม 3D Platformer · แมคและทีม</p></div><div className="case-tabs" role="group" aria-label="สำรวจหลักฐานจากโปรเจกต์เดียวกัน">{caseTabs.map((c,i)=><button key={c.id} type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}>{c.label}</button>)}</div><div className={`case-body case-${caseTabs[selected].id}`}>
 <div className="case-artifact">{selected===0?<img src={gameImage} alt="หน้าจอการเล่นเกม Veggie Dash จากหน้าโปรเจกต์ต้นฉบับ" width="1280" height="720" loading="lazy" />:selected===1?<div className="real-role-map"><strong>Veggie Dash</strong><div><span>Lead Programmer<small>ระบบและโค้ดหลัก</small></span><span>3D / Animation<small>โมเดล ด่าน และการเคลื่อนไหว</small></span><span>Artist<small>ภาพและตัวละคร</small></span><span>VFX / Lighting<small>เอฟเฟกต์และแสง</small></span></div><p>สรุปบทบาทจากเครดิตจริงบนหน้าโปรเจกต์</p></div>:selected===2?<div className="real-feedback"><span>ฟีดแบ็กจากหน้าเกม</span><p>มุมกล้องถูกสิ่งของบัง<br /><strong>คนเล่นมองทางได้ยาก</strong></p><p>อยากให้มีตัวเลือกกราฟิก<br /><strong>เพื่อปรับให้เหมาะกับเครื่อง</strong></p><small>สรุปใจความจากความคิดเห็นสาธารณะ ไม่ใช่คำรับรองผลคอร์ส</small></div>:<a href={poster} target="_blank" rel="noopener noreferrer" className="poster-preview"><img src={poster} alt="โปสเตอร์นำเสนอโครงงาน Veggie Dash ใน NSC 2024 ที่ทีมเผยแพร่สาธารณะ" width="1742" height="2488" loading="lazy" /><span>เปิดโปสเตอร์จริงเพื่อขยาย</span></a>}</div>
 <div className="case-copy" aria-live="polite"><h4>{caseTabs[selected].heading}</h4><p>{caseTabs[selected].description}</p><a className="experience-text-link" href={veggie} target="_blank" rel="noopener noreferrer">ตรวจดูหน้าโปรเจกต์ต้นฉบับ</a></div></div>
 <article className="app-case"><div className="app-screen"><img src={assetPath("/assets/sc-revoice.webp")} alt="หน้าจอแอป REVOICE แสดงแบบฝึกพูดในรูปแบบเกม" width="960" height="600" loading="lazy" /></div><div><p className="experience-period">อีกตัวอย่าง · แอปที่เริ่มจากปัญหาของคนใช้</p><h3>ทำแบบฝึกพูด<br />ให้สนุกเหมือนเล่นเกม</h3><p>REVOICE ของไอดิน เป็นแอปฝึกการสื่อสารสำหรับผู้ที่มีความบกพร่องทางการพูด พัฒนาด้วย Unity เป็นตัวอย่างว่าความรู้ที่ฝึกสามารถนำไปสร้างงานที่มีคนใช้ประโยชน์ได้อย่างไร</p><a className="experience-text-link" href={publicAsset("story-nsc.mp4")} target="_blank" rel="noopener noreferrer">ฟังผู้พัฒนาเล่าผลงาน · 27 วินาที</a></div></article>
 </div></section>;
}

export function PortfolioExperience(){
 return <section className="portfolio-experience" id="portfolio" aria-labelledby="portfolio-title"><div className="wrap"><div className="experience-section-heading"><h2 id="portfolio-title">พอร์ตที่เล่าได้<br /><span>ว่าเราทำอะไรมา</span></h2><p>คอร์สพาจัดทำเล่มพอร์ตให้ตรงคณะที่เล็ง<br />โดยใช้หลักฐานจากโปรเจกต์ของน้องเอง</p></div><div className="portfolio-evidence-flow" aria-label="สิ่งที่นำจากโปรเจกต์ไปเล่าในพอร์ต"><article><span>โจทย์</span><strong>ทำไมถึงสร้างงานนี้</strong><p>ปัญหาที่เลือก และคนที่อยากให้ใช้</p></article><article><span>บทบาท</span><strong>เราลงมือส่วนไหน</strong><p>ชิ้นงานและการตัดสินใจของตัวเอง</p></article><article><span>การพัฒนา</span><strong>ลองอะไร แล้วแก้อะไร</strong><p>ต้นแบบ ฟีดแบ็ก และเหตุผลที่ปรับงาน</p></article><article><span>ผลลัพธ์</span><strong>งานทำอะไรได้จริง</strong><p>เดโม ผลทดสอบ และสิ่งที่เรียนรู้</p></article></div><p className="portfolio-diagram-note">โครงเนื้อหาที่จะฝึกเรียบเรียงในเล่มพอร์ต</p></div></section>;
}

export function CourseDecision(){
 return <section className="course-decision" id="pricing" aria-labelledby="decision-title"><div className="wrap"><div className="decision-copy"><p>Project Build Skill</p><h2 id="decision-title">เริ่มสร้างงานของเรา<br /><span>ไปกับทีม Hamster Hub</span></h2><div className="decision-outcomes"><span>โปรเจกต์หลัก เกม / แอป / IoT อย่างน้อย 1 ชิ้น</span><span>ทักษะจากการทำงานเดี่ยวและงานทีม</span><span>ประสบการณ์พัฒนางาน ใช้จริง และเตรียมลงสนาม</span><span>เล่มพอร์ตจากผลงานของตัวเอง</span></div></div><div className="decision-offer"><strong>19,990 <small>บาท</small></strong><p>ตลอดหลักสูตร 12 เดือน</p><p>1 ธ.ค. 2569 – 1 ธ.ค. 2570</p><EnrollButton className="btn primary">คุยเรื่องโปรเจกต์ที่อยากสร้าง</EnrollButton><ModalButton kind="parents" className="decision-parent">ดูสรุปให้ผู้ปกครอง</ModalButton><small>ยืนยันวัน–เวลา รูปแบบเรียน และเงื่อนไขกับทีมก่อนสมัคร</small></div></div><CourseQuestions /></section>;
}

function CourseQuestions(){
 return <div className="course-questions wrap" id="faq"><h3>เรื่องที่ควรรู้ก่อนเริ่ม</h3><div><details><summary>ไม่มีผลงาน เริ่มได้ไหม?</summary><p>คอร์สออกแบบสำหรับเด็ก ม.ปลาย ทั้งคนที่ยังไม่มีผลงาน มีงานแล้วแต่ไม่มั่นใจ และคนที่เรียนเองมา คุยกับทีมเพื่อวางโจทย์แรกตามพื้นฐานและคณะที่สนใจ</p></details><details><summary>ใช้ AI ช่วยสร้างงานได้ไหม?</summary><p>ใช้ได้ โดยต้องเข้าใจสิ่งที่สร้าง ทดสอบ แก้ปัญหา และอธิบายส่วนที่ตัวเองทำได้ เป้าหมายคืองานที่มีไอเดียและใช้งานได้จริง</p></details><details><summary>จะได้ไปแข่งอะไรบ้าง?</summary><p>ทีมช่วยเตรียมงานสำหรับ NSC, TICTA หรือ TGS ตามความเหมาะสม คุณสมบัติ และกำหนดรับสมัคร ทำงานที่มีคุณค่าก่อนแล้วเลือกเวทีให้เหมาะกับงาน ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย</p></details><details><summary>วันเรียน อุปกรณ์ และค่าใช้จ่ายเพิ่มเติมเป็นอย่างไร?</summary><p>ให้ทีมยืนยันวัน–เวลา รูปแบบเรียน อุปกรณ์ ค่าสมัครแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร ราคา 19,990 บาทเป็นราคาหลักสูตรตลอด 12 เดือน</p></details></div></div>;
}
