"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import { tracks, type TrackKey } from "@/lib/course-data";
import { EnrollButton, ModalButton, useCourse } from "./CourseProvider";

const art = (name: string) => assetPath(`/assets/illustrations/${name}.webp`);

export function IllustratedHero() {
  const drawing = useRef<HTMLDivElement>(null);
  return <section className="illustrated-hero" aria-labelledby="course-title"><div className="hero-layout wrap">
    <div className="hero-intro"><h1 id="course-title">Project<br /><span>Build Skill</span></h1>
      <p className="hero-message">ชอบคอมแล้ว<br />สร้างของที่เป็นเรา</p>
      <p className="hero-explain">คอร์ส 12 เดือน สำหรับ ม.ปลาย<br />พาทำเกม แอป หรือ IoT ให้จบ พร้อมลงสนามและทำพอร์ต</p>
      <div className="hero-offer"><p className="hero-price"><strong>19,990</strong><span>บาท</span></p><p className="hero-price-term">ตลอดหลักสูตร 12 เดือน</p><p className="hero-price-dates">1 ธ.ค. 2569 – 1 ธ.ค. 2570</p></div>
      <div className="hero-enroll"><EnrollButton className="btn primary">เริ่มโปรเจกต์กับเรา</EnrollButton><a className="quiet-link" href="#showcase">ดูผลงานรุ่นพี่</a></div>
    </div>
    <div className="hero-drawing" ref={drawing} onPointerMove={e => {
      if (e.pointerType!=="mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r=e.currentTarget.getBoundingClientRect();
      drawing.current?.style.setProperty("--art-x",`${((e.clientX-r.left)/r.width-.5)*12}px`);
      drawing.current?.style.setProperty("--art-y",`${((e.clientY-r.top)/r.height-.5)*10}px`);
    }} onPointerLeave={()=>{drawing.current?.style.setProperty("--art-x","0px");drawing.current?.style.setProperty("--art-y","0px");}}>
      <img src={art("hero-build")} width="1672" height="941" alt="สองนักสร้างจิบิกับแฮมสเตอร์ ช่วยกันทำเกม แอป และทดลองอุปกรณ์ IoT" fetchPriority="high" />
    </div>
    <p className="hero-for-who">ยังไม่มีงาน · มีงานแต่ไม่มั่นใจ · เรียนเองแล้วอยากไปต่อ</p>
  </div></section>;
}

const phases = [
  {period:"เดือน 1", title:"ทำชิ้นแรกให้จบ", summary:"ไอเดียเล็ก ๆ ที่ลงมือทำได้ด้วยตัวเอง", image:"journey-solo", outcomes:["วางโจทย์และขอบเขต", "สร้างต้นแบบแล้วทดสอบ", "จบงานที่เล่าได้ว่าทำอะไร"]},
  {period:"เดือน 2–3", title:"สร้างเป็นทีม", summary:"เลือกบทบาท แล้วฝึกให้ลึกกับงานจริง", image:"journey-team", outcomes:["แบ่ง Role และวางแผนร่วมกัน", "Programmer ฝึก OOP / Art ฝึก Shader", "รวมงานเป็นโปรเจกต์ของทีม"]},
  {period:"เดือน 4–12", title:"พางานออกสู่โลกจริง", summary:"มีคนใช้ มีเรื่องให้พิตช์ มีผลงานใส่พอร์ต", image:"journey-launch", outcomes:["Startup Phase: ทดลองกับผู้ใช้จริง", "เตรียมลงแข่ง NSC / TICTA / TGS", "คิด Business Idea พิตช์ และทำเล่มพอร์ต"]},
];
export function IllustratedRoadmap() {
  const [selected,setSelected]=useState<number|null>(null);
  const [closing,setClosing]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const trigger=useRef<HTMLElement|null>(null);
  const {track,setTrack}=useCourse();
  const opened=selected!==null;
  useEffect(()=>{
    if(!opened)return;
    const el=dialog.current;if(!el)return;
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const bounds=trigger.current?.getBoundingClientRect();
    const startX=bounds?Math.max(-130,Math.min(130,bounds.left+bounds.width/2-window.innerWidth/2)):0;
    const startY=bounds?Math.max(-90,Math.min(90,bounds.top+bounds.height/2-window.innerHeight/2)):30;
    el.style.setProperty("--phase-start-x",startX+"px");
    el.style.setProperty("--phase-start-y",startY+"px");
    el.showModal();
    return ()=>{
      if(timer.current)clearTimeout(timer.current);
      el.close();
      document.body.style.overflow=overflow;
      trigger.current?.focus({preventScroll:true});
    };
  },[opened]);
  const close=()=>{
    if(closing)return;
    setClosing(true);
    const delay=window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:180;
    timer.current=setTimeout(()=>{dialog.current?.close();setSelected(null);setClosing(false);},delay);
  };
  return <section className="illustrated-roadmap" id="roadmap" aria-labelledby="roadmap-title"><div className="wrap">
    <div className="section-intro"><h2 id="roadmap-title">เริ่มทีละชิ้น<br /><span>แล้วไปให้ไกลกว่าเดิม</span></h2><p>12 เดือน มีเป้าหมายให้ลงมือ<br />กดภาพเพื่อดูแต่ละช่วง</p></div>
    <div className="drawn-journey">
      <svg className="drawn-curve curve-wide" viewBox="0 0 1200 430" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M190 180 C360 180 395 310 600 310 S835 180 1010 180" /></svg>
      <svg className="drawn-curve curve-tall" viewBox="0 0 100 650" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M50 120 C-10 200 110 240 50 330 S-10 480 50 550" /></svg>
      <ol>{phases.map((p,i)=><li key={p.period} className={`drawn-stop drawn-stop-${i}`}><button type="button" onClick={e=>{trigger.current=e.currentTarget;setSelected(i);}} aria-haspopup="dialog" aria-label={`ดูรายละเอียด ${p.period} ${p.title}`}>
        <span className="journey-drawing"><img src={art(p.image)} width="520" height="520" alt="" loading="lazy" /></span>
        <span className="journey-copy"><span className="learning-period">{p.period}</span><strong>{p.title}</strong><span>{p.summary}</span></span>
      </button></li>)}</ol>
    </div>
    <dialog ref={dialog} className={`phase-dialog ${closing?"is-closing":""}`} aria-labelledby="phase-title" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{
      if(e.target!==e.currentTarget)return;
      const r=e.currentTarget.getBoundingClientRect();
      if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();
    }}>
      <button type="button" className="phase-close" onClick={close} aria-label="ปิดรายละเอียด">ปิด</button>
      {selected!==null&&<div className="phase-content" key={selected}>
        <div className="phase-art"><img src={art(phases[selected].image)} width="650" height="650" alt="" /></div>
        <div className="phase-copy"><p className="learning-period">{phases[selected].period}</p><h3 id="phase-title">{phases[selected].title}</h3><p>{phases[selected].summary}</p>
          <ul>{phases[selected].outcomes.map(item=><li key={item}>{item}</li>)}</ul>
          <div className="phase-tracks" role="group" aria-label="เลือกสายเพื่อดูตัวอย่าง">{(Object.keys(tracks) as TrackKey[]).map(key=><button type="button" key={key} aria-pressed={track===key} onClick={()=>setTrack(key)}>{tracks[key].name}</button>)}</div>
          <p className="phase-example" aria-live="polite">{tracks[track].examples[selected]}</p>
          {selected===2&&<p className="phase-note">เลือกเวทีตามความเหมาะสมของงาน คุณสมบัติ และกำหนดการรับสมัคร</p>}
          <button className="phase-next" type="button" onClick={()=>setSelected((selected+1)%phases.length)}>{selected===2?"กลับไปดูเดือนแรก":"ดูช่วงถัดไป"}</button>
        </div>
      </div>}
    </dialog>
  </div></section>;
}

const supportStories = [
  {image:"journey-solo",title:"วางแผนที่ทำจบ",text:"ช่วยเลือกโจทย์และขอบเขต ให้รู้ว่าจะลงมืออะไรต่อ",alt:"นักสร้างจิบิกับเจ้าหนูทดลองโปรเจกต์ชิ้นแรก"},
  {image:"journey-team",title:"มีคนช่วยขัดงาน",text:"ฝึกทักษะตาม Role ผ่านงานจริง แล้วปรับจากฟีดแบ็ก",alt:"เพื่อนกับเจ้าหนูช่วยกันคิดทางออกขณะทำโปรเจกต์"},
  {image:"journey-launch",title:"พร้อมพางานออกไป",text:"เตรียมลงแข่ง ฝึกพิตช์ และเล่าบทบาทของเราลงพอร์ต",alt:"จิบิกับเจ้าหนูพร้อมนำเสนอโปรเจกต์และเล่มพอร์ต"},
];
export function IllustratedComparison() {
  return <section className="illustrated-comparison" aria-labelledby="comparison-title"><div className="wrap">
    <div className="section-intro support-intro"><h2 id="comparison-title">เรียนเองก็ไปได้<br /><span>มีทีมช่วยให้ไปต่อ</span></h2><p>น้องเป็นคนลงมือสร้าง<br />ทีมช่วยให้เส้นทางชัดขึ้น</p></div>
    <div className="support-stories">{supportStories.map(story=><article key={story.title}><img className="support-picture" src={art(story.image)} width="650" height="650" alt={story.alt} loading="lazy" /><h3>{story.title}</h3><p>{story.text}</p></article>)}</div>
  </div></section>;
}

export function IllustratedPackage() {
  return <section className="illustrated-package" id="pricing" aria-labelledby="package-title"><div className="wrap">
    <div className="package-layout"><div className="package-offer"><h2 id="package-title">ปีนี้ ทำของที่<br /><span>ภูมิใจว่าเราสร้างเอง</span></h2><p className="package-course">Project Build Skill · 12 เดือน</p><p className="package-outcome">โปรเจกต์หลักอย่างน้อย 1 ชิ้น<br />พร้อมเล่มพอร์ตที่เล่างานของเรา</p><p className="big-course-price">19,990 <span>บาท</span></p><p className="package-dates">1 ธ.ค. 2569 – 1 ธ.ค. 2570 · ราคาตลอดหลักสูตร</p><EnrollButton className="btn dark">คุยกับทีม / สมัครเรียน</EnrollButton><p className="package-confirm">ยืนยันวัน–เวลาเรียน รูปแบบ และเงื่อนไขกับทีมก่อนสมัคร</p><ModalButton kind="parents" className="quiet-link package-parent-link">สรุปให้ผู้ปกครอง</ModalButton></div>
      <div className="package-picture"><img src={art("package-finish")} width="1168" height="1346" alt="จิบิสองคนภูมิใจกับโปรเจกต์และเล่มพอร์ต พร้อมเจ้าหนูที่ให้กำลังใจ" loading="lazy" /></div>
    </div>
    <div className="package-faq" id="faq"><div className="faq-illustrated-intro"><h3>ยังสงสัยอยู่ไหม?</h3><img src={assetPath("/assets/illustrations/faq-hamster.png")} width="512" height="512" alt="เจ้าหนูเอียงศีรษะอย่างเป็นมิตร ถือสมุดกับดินสอพร้อมช่วยตอบคำถาม" loading="lazy" /></div><div className="faq-answers">
      <details><summary>ไม่มีผลงาน เริ่มจากสายไหนดี?</summary><p>เริ่มได้ทั้งเกม แอป หรือ IoT เลือกจากสิ่งที่สนใจและคณะที่เล็ง แล้วคุยกับทีมเพื่อวางงานชิ้นเล็กที่ทำจบได้</p></details>
      <details><summary>ใช้ AI ช่วยทำได้ไหม?</summary><p>ใช้ได้ แต่ต้องเข้าใจสิ่งที่สร้าง ทดสอบและแก้ปัญหาได้ พร้อมอธิบายบทบาทของตัวเองในงาน</p></details>
      <details><summary>มีการันตีรางวัลหรือติดมหาวิทยาลัยไหม?</summary><p>ไม่มีการรับประกันผล เป้าหมายคือทักษะ โปรเจกต์ และพอร์ตของน้อง การแข่งขันและการรับเข้าขึ้นอยู่กับเกณฑ์ของแต่ละแห่ง</p></details>
      <details><summary>เรียนวันไหน มีค่าใช้จ่ายเพิ่มไหม?</summary><p>19,990 บาทเป็นราคาหลักสูตร 12 เดือน ให้ทีมยืนยันวัน–เวลา รูปแบบเรียน ค่าอุปกรณ์ ค่าสมัครแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p></details>
    </div></div>
  </div></section>;
}

export function CourseFooter() { return <footer className="course-footer wrap"><a href="#main" className="footer-wordmark">hamster<span>hub</span></a><a href="https://www.hamsterhub.co/" target="_blank" rel="noopener noreferrer">เว็บไซต์ Hamster Hub</a><ModalButton kind="sources">ข้อมูลอ้างอิง</ModalButton><small>© 2026 Hamster Hub</small></footer>; }
