"use client";
import { useState } from "react";
import { verifiedWork, type WorkCategory } from "@/lib/verified-work";

export function RealWorkShowcase() {
  const [category,setCategory]=useState<WorkCategory>("projects");
  const [index,setIndex]=useState(0);
  const [direction,setDirection]=useState(1);
  const [touch,setTouch]=useState<number|null>(null);
  const works=verifiedWork[category];
  const work=works[index];
  const choose=(next:number)=>{setDirection(next>=index?1:-1);setIndex((next+works.length)%works.length);};
  const move=(step:number)=>{setDirection(step);setIndex(i=>(i+step+works.length)%works.length);};
  return <section className="real-work" id="showcase" aria-labelledby="work-title"><div className="wrap">
    <div className="section-intro"><h2 id="work-title">งานที่มีให้ดู<br /><span>เรื่องที่มีให้เล่า</span></h2><p>ผลงานจริงจากคอมมูนิตี้<br />เปิดเล่น ดูคลิป และอ่านพอร์ตต้นฉบับได้</p></div>
    <div className="work-toolbar"><div className="work-tabs" role="group" aria-label="เลือกหมวดผลงาน">{([["projects","ผลงานจริง"],["admissions","เส้นทางรุ่นพี่"]] as const).map(([key,label])=><button type="button" key={key} aria-pressed={category===key} onClick={()=>{setCategory(key);setIndex(0);setDirection(1);}}>{label}</button>)}</div><div className="work-controls"><button type="button" onClick={()=>move(-1)} aria-label="ผลงานก่อนหน้า">ก่อนหน้า</button><button type="button" onClick={()=>move(1)} aria-label="ผลงานถัดไป">ถัดไป</button></div></div>
    <div className="work-stage" role="region" aria-roledescription="carousel" aria-label="ผลงานจริง ใช้ปุ่มซ้ายขวาเพื่อเปลี่ยน" tabIndex={0} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}} onTouchStart={e=>setTouch(e.touches[0].clientX)} onTouchEnd={e=>{if(touch!==null){const delta=e.changedTouches[0].clientX-touch;if(Math.abs(delta)>60)move(delta<0?1:-1);}setTouch(null);}}>
      <article className={`work-feature ${direction<0?"from-left":"from-right"}`} key={category+index}>
        <a className="work-feature-image" href={work.href} target="_blank" rel="noopener noreferrer" aria-label={`เปิดผลงาน ${work.title}`}><img src={work.image} alt={work.alt} width="960" height="600" loading="lazy" /></a>
        <div className="work-copy" aria-live="polite"><p className="work-author">{work.by}</p><h3>{work.title}</h3><p>{work.description}</p>{work.result&&<p className="work-result">{work.result}</p>}<div className="work-links"><a href={work.href} target="_blank" rel="noopener noreferrer">{work.action}</a>{work.secondary&&<a href={work.secondary.href} target="_blank" rel="noopener noreferrer">{work.secondary.label}</a>}</div></div>
      </article>
    </div>
    <div className="work-filmstrip" role="group" aria-label="เลือกผลงาน">{works.map((item,i)=><button type="button" key={item.title} aria-pressed={index===i} onClick={()=>choose(i)} aria-label={`ดู ${item.title}`}><img src={item.image} alt="" loading="lazy" width="240" height="150" /><span>{item.title}</span></button>)}</div>
    <p className="work-disclosure">ผลงานของสมาชิกในคอมมูนิตี้ อ้างอิงลิงก์ต้นฉบับ ไม่ใช่ผลลัพธ์ของคอร์สรุ่นที่กำลังเปิด และไม่รับประกันรางวัลหรือผลรับเข้า</p>
  </div></section>;
}
