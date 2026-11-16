"use client";
import { useState, type CSSProperties } from "react";
import { verifiedWork, type WorkCategory } from "@/lib/verified-work";

export function RealWorkShowcase() {
  const [category,setCategory]=useState<WorkCategory>("projects");
  const [index,setIndex]=useState(0);
  const [touch,setTouch]=useState<number|null>(null);
  const works=verifiedWork[category];
  const work=works[index];
  const move=(step:number)=>setIndex(i=>(i+step+works.length)%works.length);
  return <section className="real-work gallery-work" id="showcase" aria-labelledby="work-title"><div className="wrap">
    <div className="section-intro gallery-intro"><h2 id="work-title">งานที่มีให้ดู<br /><span>เรื่องที่มีให้เล่า</span></h2><p>ผลงานจริงจากคอมมูนิตี้<br />เปิดเล่น ดูคลิป และอ่านพอร์ตต้นฉบับได้</p></div>
    <div className="work-tabs gallery-tabs" role="group" aria-label="เลือกหมวดผลงาน">{([["projects","ผลงานจริง"],["admissions","เส้นทางรุ่นพี่"]] as const).map(([key,label])=><button type="button" key={key} aria-pressed={category===key} onClick={()=>{setCategory(key);setIndex(0);}}>{label}</button>)}</div>
    <div className="gallery-deck" role="region" aria-roledescription="carousel" aria-label="เลือกภาพผลงาน หรือใช้ปุ่มซ้ายขวา" tabIndex={0} onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}} onTouchStart={e=>setTouch(e.touches[0].clientX)} onTouchEnd={e=>{if(touch!==null){const delta=e.changedTouches[0].clientX-touch;if(Math.abs(delta)>60)move(delta<0?1:-1);}setTouch(null);}}>
      {works.map((item,i)=>{
        let offset=(i-index+works.length)%works.length;
        if(offset>works.length/2)offset-=works.length;
        const distance=Math.abs(offset);
        return <button type="button" key={item.title} className={`gallery-card ${i===index?"is-active":""}`} style={{"--card-offset":offset,"--card-scale":1-distance*.16,zIndex:5-distance} as CSSProperties} onClick={()=>setIndex(i)} aria-pressed={i===index} aria-label={`เลือกดู ${item.title}`}>
          <img src={item.image} alt={item.alt} width="720" height="900" loading="lazy" />
          <span>{item.title}</span>
        </button>;
      })}
    </div>
    <div className="gallery-controls"><button type="button" onClick={()=>move(-1)} aria-label="ผลงานก่อนหน้า"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg></button><button type="button" onClick={()=>move(1)} aria-label="ผลงานถัดไป"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 5 7 7-7 7" /></svg></button></div>
    <div className="gallery-caption" aria-live="polite" aria-atomic="true" key={category+index}><p className="work-author">{work.by}</p><h3>{work.title}</h3><p>{work.description}</p>{work.result&&<p className="work-result">{work.result}</p>}<div className="work-links"><a href={work.href} target="_blank" rel="noopener noreferrer">{work.action}</a>{work.secondary&&<a href={work.secondary.href} target="_blank" rel="noopener noreferrer">{work.secondary.label}</a>}</div></div>
  </div></section>;
}
