"use client";
import { useEffect, useRef, useState } from "react";
import { verifiedWork, type WorkCategory } from "@/lib/verified-work";

export function RealWorkShowcase() {
  const [category,setCategory]=useState<WorkCategory>("projects");
  const rail=useRef<HTMLDivElement>(null);
  const [canMove,setCanMove]=useState({previous:false,next:true});
  useEffect(()=>{
    const el=rail.current;if(!el)return;
    const update=()=>setCanMove({previous:el.scrollLeft>3,next:el.scrollLeft+el.clientWidth<el.scrollWidth-3});
    const frame=requestAnimationFrame(update);
    const observer=new ResizeObserver(update);observer.observe(el);
    el.addEventListener("scroll",update,{passive:true});
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener("scroll",update);};
  },[category]);
  const move=(direction:number)=>{
    const el=rail.current;if(!el)return;
    el.scrollBy({left:direction*((el.firstElementChild?.getBoundingClientRect().width||340)+28),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  return <section className="real-work" id="showcase" aria-labelledby="work-title"><div className="wrap">
    <div className="section-intro"><h2 id="work-title">งานที่มีให้ดู<br /><span>เรื่องที่มีให้เล่า</span></h2><p>ภาพจากผลงานจริงของคอมมูนิตี้<br />กดดูเกม คลิป และพอร์ตต้นฉบับได้</p></div>
    <div className="work-toolbar"><div className="work-tabs" role="group" aria-label="เลือกหมวดผลงาน">{([["projects","ผลงานจริง"],["admissions","เส้นทางรุ่นพี่"]] as const).map(([key,label])=><button type="button" key={key} aria-pressed={category===key} onClick={()=>{setCategory(key);if(rail.current)rail.current.scrollLeft=0;}}>{label}</button>)}</div><div className="work-controls"><button type="button" disabled={!canMove.previous} onClick={()=>move(-1)} aria-label="ผลงานก่อนหน้า">ก่อนหน้า</button><button type="button" disabled={!canMove.next} onClick={()=>move(1)} aria-label="ผลงานถัดไป">ถัดไป</button></div></div>
    <div className="work-rail" ref={rail} role="region" tabIndex={0} aria-label="รายการผลงาน เลื่อนซ้ายขวาเพื่อดูเพิ่มเติม">{verifiedWork[category].map(work=><article className="real-work-card" key={work.title}>
      <a className="work-image-link" href={work.href} target="_blank" rel="noopener noreferrer" aria-label={`เปิดผลงาน ${work.title}`}><img src={work.image} alt={work.alt} loading="lazy" width="960" height="600" /></a>
      <div className="work-copy"><h3>{work.title}</h3><p className="work-author">{work.by}</p><p>{work.description}</p>{work.result&&<p className="work-result">{work.result}</p>}<div className="work-links"><a href={work.href} target="_blank" rel="noopener noreferrer">{work.action}</a>{work.secondary&&<a href={work.secondary.href} target="_blank" rel="noopener noreferrer">{work.secondary.label}</a>}</div></div>
    </article>)}</div>
    <p className="work-disclosure">ผลงานและเส้นทางของสมาชิกในคอมมูนิตี้ อ้างอิงจากตารางของทีมและลิงก์ต้นฉบับ ไม่ใช่ผลลัพธ์ของคอร์สรุ่นที่กำลังเปิด และไม่รับประกันรางวัลหรือผลรับเข้า</p>
  </div></section>;
}
