"use client";
import { useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import { tracks, type TrackKey } from "@/lib/course-data";
import { EnrollButton, ModalButton, VideoButton, useCourse } from "./CourseProvider";

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
  const [selected,setSelected]=useState(0);
  const {track,setTrack}=useCourse();
  return <section className="illustrated-roadmap" id="roadmap" aria-labelledby="roadmap-title"><div className="wrap">
    <div className="section-intro"><h2 id="roadmap-title">เริ่มทีละชิ้น<br /><span>แล้วไปให้ไกลกว่าเดิม</span></h2><p>12 เดือน มีเป้าหมายให้ลงมือ<br />มีทีมช่วยพางานไปต่อ</p></div>
    <div className="drawn-journey">
      <svg className="drawn-curve curve-wide" viewBox="0 0 1200 430" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M190 180 C360 180 395 310 600 310 S835 180 1010 180" /></svg>
      <svg className="drawn-curve curve-tall" viewBox="0 0 100 650" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M50 120 C-10 200 110 240 50 330 S-10 480 50 550" /></svg>
      <ol>{phases.map((p,i)=><li key={p.period} className={`drawn-stop drawn-stop-${i} ${selected===i?"chosen":""}`}><button type="button" onClick={()=>setSelected(i)} aria-pressed={selected===i} aria-controls="learning-detail">
        <span className="journey-drawing"><img src={art(p.image)} width="520" height="520" alt="" loading="lazy" /></span>
        <span className="journey-copy"><span className="learning-period">{p.period}</span><strong>{p.title}</strong><span>{p.summary}</span></span>
      </button></li>)}</ol>
    </div>
    <div className="learning-detail" id="learning-detail">
      <div className="learning-track" role="group" aria-label="เลือกสายที่สนใจ"><span>อยากสร้างอะไร?</span>{(Object.keys(tracks) as TrackKey[]).map(key=><button type="button" key={key} aria-pressed={track===key} onClick={()=>setTrack(key)}>{tracks[key].name}</button>)}</div>
      <div className="learning-selected" aria-live="polite"><h3>{phases[selected].period} · {phases[selected].title}</h3><p>{tracks[track].examples[selected]}</p><ul>{phases[selected].outcomes.map(item=><li key={item}>{item}</li>)}</ul></div>
    </div>
    <p className="small-note">เลือกเวทีตามความเหมาะสมของงาน คุณสมบัติ และกำหนดการรับสมัคร</p>
  </div></section>;
}

const comparison = [
  ["วางแผน", "เลือกและจัดทางเอง", "มีเป้าหมายแต่ละช่วง และคนช่วยคิด"],
  ["พัฒนาทักษะ", "หาโจทย์และฝึกเอง", "ฝึกตาม Role ผ่านงานเดี่ยวและงานทีม"],
  ["ลงสนาม", "หาเวทีและเตรียมเอง", "ช่วยเตรียมงานไปแข่งและฝึกพิตช์"],
  ["ทำพอร์ต", "เรียบเรียงเรื่องราวเอง", "เชื่อมโปรเจกต์กับคณะที่เล็ง"],
];
export function IllustratedComparison() {
  return <section className="illustrated-comparison" aria-labelledby="comparison-title"><div className="comparison-top wrap"><div><h2 id="comparison-title">เรียนเองก็ไปได้<br /><span>มีทีมช่วยให้ไปต่อ</span></h2><p>เพิ่มคนช่วยคิด ในวันที่ติด<br />เพิ่มเป้าหมาย ให้สิ่งที่เรียนกลายเป็นงาน</p></div><img src={art("compare-mentor")} width="1536" height="1024" alt="เพื่อนช่วยกันวางขั้นตอนแก้ปัญหา โดยมีเจ้าหนูช่วยประกอบไอเดีย" loading="lazy" /></div>
    <div className="wrap comparison-scroll"><table className="simple-comparison"><caption className="sr-only">ทำโปรเจกต์เองเทียบกับ Project Build Skill</caption><thead><tr><th scope="col">ระหว่างทาง</th><th scope="col">ทำเอง</th><th scope="col">Project Build Skill</th></tr></thead><tbody>{comparison.map(([label,self,team])=><tr key={label}><th scope="row">{label}</th><td>{self}</td><td>{team}</td></tr>)}</tbody></table></div>
  </section>;
}

const included = ["งานเดี่ยว + งานทีม และทักษะตาม Role", "โปรเจกต์หลัก เกม / แอป / IoT อย่างน้อย 1 ชิ้น", "ทดลองกับผู้ใช้ เตรียมลงแข่ง และฝึกพิตช์", "Business Idea + เล่มพอร์ตตรงคณะที่เล็ง"];
export function IllustratedPackage() {
  return <section className="illustrated-package" id="pricing" aria-labelledby="package-title"><div className="wrap">
    <div className="package-layout"><div className="package-offer"><h2 id="package-title">ปีนี้ ทำของที่<br /><span>ภูมิใจว่าเราสร้างเอง</span></h2><p className="package-course">Project Build Skill · 12 เดือน</p><p className="big-course-price">19,990 <span>บาท</span></p><p className="package-dates">1 ธ.ค. 2569 – 1 ธ.ค. 2570 · ราคาตลอดหลักสูตร</p><EnrollButton className="btn dark">คุยกับทีม / สมัครเรียน</EnrollButton><p className="package-confirm">วัน–เวลาเรียน รูปแบบเรียน และเงื่อนไขชำระเงิน<br />ยืนยันกับทีมก่อนสมัคร</p></div>
      <div className="package-picture"><img src={art("package-finish")} width="1168" height="1344" alt="จิบิสองคนภูมิใจกับโปรเจกต์และเล่มพอร์ต พร้อมเจ้าหนูที่ให้กำลังใจ" loading="lazy" /></div>
    </div>
    <ul className="package-includes">{included.map(item=><li key={item}>{item}</li>)}</ul>
    <div className="package-extra"><ModalButton kind="quest" className="quiet-link">ลองดูโจทย์แรก</ModalButton><ModalButton kind="parents" className="quiet-link">สรุปให้ผู้ปกครอง</ModalButton><VideoButton className="quiet-link">ดูคลิปตัวอย่างผลงาน</VideoButton></div>
    <div className="package-faq" id="faq"><h3>ก่อนเริ่ม อยากรู้อะไร?</h3><div>
      <details><summary>ยังไม่มีผลงาน เรียนได้ไหม?</summary><p>ได้ คอร์สออกแบบสำหรับ ม.ปลาย ทั้งคนที่ยังไม่มีงาน มีงานแต่ไม่มั่นใจ และเรียนเองมาแล้ว เดือนแรกเริ่มจากงานชิ้นเล็กที่ทำจบได้</p></details>
      <details><summary>เลือกเกม แอป หรือ IoT ได้อย่างไร?</summary><p>เริ่มจากความสนใจและคณะที่เล็ง แล้วคุยกับทีมเพื่อเลือกขอบเขตโปรเจกต์และบทบาทที่เหมาะกับน้อง</p></details>
      <details><summary>ใช้ AI ช่วยทำได้ไหม?</summary><p>ใช้ได้ แต่ต้องเข้าใจสิ่งที่สร้าง ทดสอบได้ แก้ปัญหาเองได้ และอธิบายบทบาทของตัวเองในงานได้</p></details>
      <details><summary>การันตีรางวัลหรือติดมหาวิทยาลัยไหม?</summary><p>ไม่มีการรับประกันรางวัลหรือผลรับเข้า เป้าหมายคือพัฒนาทักษะ โปรเจกต์ และการเล่าเรื่องของน้อง การแข่งขันขึ้นอยู่กับเกณฑ์ของแต่ละเวที</p></details>
      <details><summary>ราคาเรียนรวมค่าใช้จ่ายอะไรบ้าง?</summary><p>19,990 บาทเป็นราคาหลักสูตร 12 เดือน ส่วนอุปกรณ์ IoT ค่าสมัครแข่งขัน ค่าเดินทาง การผ่อนชำระ และเงื่อนไขคืนเงิน ให้ทีมยืนยันก่อนสมัคร</p></details>
    </div></div>
  </div></section>;
}

export function CourseFooter() { return <footer className="course-footer wrap"><a href="#main" className="footer-wordmark">hamster<span>hub</span></a><a href="https://www.hamsterhub.co/" target="_blank" rel="noopener noreferrer">เว็บไซต์ Hamster Hub</a><ModalButton kind="sources">ข้อมูลอ้างอิง</ModalButton><small>© 2026 Hamster Hub</small></footer>; }
