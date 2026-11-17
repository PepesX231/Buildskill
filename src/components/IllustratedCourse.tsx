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
  </div></section>;
}

const phases = [
  {period:"เดือน 1",title:"ทำงานเดี่ยวให้จบ",summary:"ฝึกคิดโจทย์ สร้างต้นแบบ และทดสอบโปรเจกต์เล็ก ๆ",deliverable:"โปรเจกต์เดี่ยวที่ทำจบได้เอง",image:"journey-solo",outcomes:["เข้าใจกระบวนการตั้งแต่ไอเดียจนจบงาน","วางขอบเขต สร้างต้นแบบ และทดสอบ","ได้พื้นฐานที่นำไปสร้างโปรเจกต์ต่อได้"]},
  {period:"เดือน 2–3",title:"ทำงานเป็นทีม",summary:"แบ่งหน้าที่ ฝึกเขียนโปรแกรมหรือทำภาพให้ลึกขึ้นตามบทบาท",deliverable:"โปรเจกต์ทีม + ทักษะตามบทบาท",image:"journey-team",outcomes:["แบ่ง Role และวางแผนร่วมกัน","สายเขียนโปรแกรม: OOP ฝึกจัดโค้ดให้เป็นระบบ","สายภาพ: Shader ฝึกทำแสง สี และวัสดุ","รวมงานแต่ละคนเป็นโปรเจกต์ของทีม"]},
  {period:"เดือน 4–12",title:"ใช้จริง แข่ง ทำพอร์ต",summary:"พัฒนางานให้คนลองใช้ เตรียมแข่งขัน และฝึกนำเสนอ",deliverable:"โปรเจกต์หลัก 1 ชิ้น + เล่มพอร์ต",image:"journey-launch",outcomes:["Startup Phase: ทดลองกับผู้ใช้จริงแล้วปรับปรุงงาน","พางานลงสนาม NSC / TICTA / TGS ที่เหมาะสม","คิด Business Idea สำหรับขาย และพิตช์กับนักธุรกิจ","ทำเล่มพอร์ตให้ตรงกับคณะที่เล็ง","มีโอกาสให้นักลงทุนและอาจารย์มหาวิทยาลัยดูผลงานในแต่ละเดือน"]},
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
    <div className="section-intro"><h2 id="roadmap-title">เส้นทาง 12 เดือน<br /><span>แต่ละช่วง ทำอะไรบ้าง?</span></h2></div>
    <div className="drawn-journey">
      <svg className="drawn-curve curve-wide" viewBox="0 0 1200 430" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M190 185 C360 220 430 185 600 185 S835 220 1010 185" /></svg>
      <ol>{phases.map((p,i)=><li key={p.period} className={`drawn-stop drawn-stop-${i}`}><button type="button" onClick={e=>{trigger.current=e.currentTarget;setSelected(i);}} aria-haspopup="dialog" aria-label={`ดูรายละเอียด ${p.period} ${p.title}`}>
        <span className="journey-drawing"><img src={art(p.image)} width="520" height="520" alt="" loading="lazy" /></span>
        <span className="journey-copy"><span className="learning-period">{p.period}</span><strong>{p.title}</strong><span className="journey-task">{p.summary}</span><span className="journey-result"><b>จบช่วงนี้ได้</b><span>{p.deliverable}</span></span><span className="journey-open">ดูแผนช่วงนี้</span></span>
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
        <div className="phase-copy"><p className="learning-period">{phases[selected].period}</p><h3 id="phase-title">{phases[selected].title}</h3><p>{phases[selected].summary}</p><p className="phase-deliverable"><strong>จบช่วงนี้ได้</strong> {phases[selected].deliverable}</p>
          <ul>{phases[selected].outcomes.map(item=><li key={item}>{item}</li>)}</ul>
          <div className="phase-tracks" role="group" aria-label="เลือกสายเพื่อดูตัวอย่าง">{(Object.keys(tracks) as TrackKey[]).map(key=><button type="button" key={key} aria-pressed={track===key} onClick={()=>setTrack(key)}>{tracks[key].name}</button>)}</div>
          <p className="phase-example" aria-live="polite">{tracks[track].examples[selected]}</p>
          {selected===2&&<p className="phase-note">เลือกเวทีตามงาน คุณสมบัติ และกำหนดรับสมัคร โอกาสพบผู้ชมผลงานขึ้นอยู่กับการนัดหมายของแต่ละเดือน</p>}
          <button className="phase-next" type="button" onClick={()=>setSelected((selected+1)%phases.length)}>{selected===2?"กลับไปดูเดือนแรก":"ดูช่วงถัดไป"}</button>
        </div>
      </div>}
    </dialog>
  </div></section>;
}

const supportStories = [
  {image:"journey-solo",title:"วางแผนที่ทำจบ",text:"ช่วยเลือกโจทย์และขอบเขต ให้รู้ว่าจะลงมืออะไรต่อ",alt:"นักสร้างจิบิกับเจ้าหนูทดลองโปรเจกต์ชิ้นแรก"},
  {image:"journey-team",title:"มีคนช่วยขัดงาน",text:"ฝึกทักษะตาม Role ผ่านงานจริง แล้วปรับจากฟีดแบ็ก",alt:"เพื่อนกับเจ้าหนูช่วยกันคิดทางออกขณะทำโปรเจกต์"},
  {image:"journey-launch",title:"สร้างให้ใช้จริง แล้วไปแข่ง",text:"ทำโปรเจกต์ที่มีคุณค่า แล้วเลือกเวทีให้เหมาะกับงาน ไม่จำเป็นต้องชนะเพื่อได้ประสบการณ์",alt:"จิบิกับเจ้าหนูพร้อมนำเสนอโปรเจกต์และเล่มพอร์ต"},
];
export function IllustratedComparison() {
  return <section className="illustrated-comparison" aria-labelledby="comparison-title"><div className="wrap">
    <div className="section-intro support-intro"><h2 id="comparison-title">เรียนเองก็ไปได้<br /><span>มีทีมช่วยให้ไปต่อ</span></h2></div>
    <div className="support-stories">{supportStories.map(story=><article key={story.title}><img className="support-picture" src={art(story.image)} width="650" height="650" alt={story.alt} loading="lazy" /><h3>{story.title}</h3><p>{story.text}</p></article>)}</div>
  </div></section>;
}

export function IllustratedPackage() {
  return <section className="illustrated-package" id="pricing" aria-labelledby="package-title"><div className="wrap">
    <div className="package-layout"><div className="package-offer"><h2 id="package-title">ปีนี้ ทำของที่<br /><span>ภูมิใจว่าเราสร้างเอง</span></h2><p className="package-course">Project Build Skill · 12 เดือน</p><p className="package-outcome">เกม / แอป / IoT อย่างน้อย 1 โปรเจกต์ที่ใช้ได้จริง<br />พร้อมเล่มพอร์ตตรงคณะที่เล็ง และทักษะที่ทำเองได้</p><p className="big-course-price">19,990 <span>บาท</span></p><p className="package-dates">1 ธ.ค. 2569 – 1 ธ.ค. 2570 · ราคาตลอดหลักสูตร</p><EnrollButton className="btn dark">คุยกับทีม / สมัครเรียน</EnrollButton><p className="package-confirm">ยืนยันวัน–เวลาเรียน รูปแบบ และเงื่อนไขกับทีมก่อนสมัคร</p><div className="package-actions"><ModalButton kind="video" className="btn package-video">ดูคลิปตัวอย่างผลงาน</ModalButton><ModalButton kind="parents" className="btn package-parents">สรุปให้ผู้ปกครอง</ModalButton></div></div>
      <div className="package-picture"><img src={art("package-finish")} width="1168" height="1346" alt="จิบิสองคนภูมิใจกับโปรเจกต์และเล่มพอร์ต พร้อมเจ้าหนูที่ให้กำลังใจ" loading="lazy" /></div>
    </div>
    <div className="package-faq" id="faq"><div className="faq-illustrated-intro"><h3>ยังสงสัยอยู่ไหม?</h3><img src={assetPath("/assets/illustrations/faq-hamster.png")} width="512" height="512" alt="เจ้าหนูเอียงศีรษะอย่างเป็นมิตร ถือสมุดกับดินสอพร้อมช่วยตอบคำถาม" loading="lazy" /></div><div className="faq-answers">
      <details><summary>ไม่มีผลงาน เริ่มจากสายไหนดี?</summary><p>เริ่มได้ทั้งเกม แอป หรือ IoT เลือกจากสิ่งที่สนใจและคณะที่เล็ง แล้วคุยกับทีมเพื่อวางงานชิ้นเล็กที่ทำจบได้</p></details>
      <details><summary>ใช้ AI ช่วยทำได้ไหม?</summary><p>ใช้ได้ โดยต้องเข้าใจโค้ดและสิ่งที่สร้าง ทดสอบ แก้ปัญหา และอธิบายบทบาทของตัวเองได้ เป้าหมายคืองานที่ใช้งานหรือเล่นได้จริง มีคุณภาพ และมีไอเดียของน้อง</p></details>
      <details><summary>มีการันตีรางวัลหรือติดมหาวิทยาลัยไหม?</summary><p>ไม่มีการรับประกันผล เป้าหมายคือทักษะ โปรเจกต์ และพอร์ตของน้อง การแข่งขันและการรับเข้าขึ้นอยู่กับเกณฑ์ของแต่ละแห่ง</p></details>
      <details><summary>เรียนวันไหน มีค่าใช้จ่ายเพิ่มไหม?</summary><p>19,990 บาทเป็นราคาหลักสูตร 12 เดือน ให้ทีมยืนยันวัน–เวลา รูปแบบเรียน ค่าอุปกรณ์ ค่าสมัครแข่งขันหรือเดินทาง และเงื่อนไขชำระเงิน/คืนเงินก่อนสมัคร</p></details>
    </div></div>
  </div></section>;
}

export function CourseFooter() { return <footer className="course-footer wrap"><a href="#main" className="footer-wordmark">hamster<span>hub</span></a><a href="https://www.hamsterhub.co/" target="_blank" rel="noopener noreferrer">เว็บไซต์ Hamster Hub</a><ModalButton kind="sources">ข้อมูลอ้างอิง</ModalButton><small>© 2026 Hamster Hub</small></footer>; }
