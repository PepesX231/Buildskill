"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { verifiedWork, type WorkCategory, type WorkExample } from "@/lib/verified-work";

function WorkMedia({work,playing,controls}:{work:WorkExample;playing:boolean;controls:boolean}) {
  const video=useRef<HTMLVideoElement>(null);
  const [failed,setFailed]=useState(false);
  const [blocked,setBlocked]=useState(false);
  useEffect(()=>{
    const el=video.current;if(!el)return;
    if(playing){el.muted=true;el.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true));}
    else el.pause();
  },[playing,work.video]);
  if(failed)return <a className="studio-media-fallback" href={work.href} target="_blank" rel="noopener noreferrer"><img src={work.image} alt={work.alt} /><span>เปิดคลิปต้นฉบับ</span></a>;
  if(work.video)return <><video ref={video} src={work.video} poster={work.image} autoPlay={playing} muted loop playsInline controls={controls} preload="metadata" aria-label={`คลิปผลงาน ${work.title}`} onError={()=>setFailed(true)} />{blocked&&playing&&<button className="studio-play" type="button" onClick={()=>video.current?.play().then(()=>setBlocked(false)).catch(()=>setFailed(true))}>เล่นคลิป</button>}</>;
  if(playing&&work.youtube)return <iframe src={`https://www.youtube-nocookie.com/embed/${work.youtube}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${work.youtube}&rel=0&controls=1`} title={`คลิปผลงาน ${work.title}`} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />;
  if(playing&&work.facebook)return <iframe src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(work.facebook)}&autoplay=true&muted=true&show_text=false&width=500`} title={`คลิปผลงาน ${work.title}`} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />;
  return <img src={work.image} alt={work.alt} width="960" height="600" loading="lazy" />;
}

export function RealWorkShowcase() {
  const [category,setCategory]=useState<WorkCategory>("projects");
  const [index,setIndex]=useState(0);
  const [touch,setTouch]=useState<number|null>(null);
  const [visible,setVisible]=useState(false);
  const [paused,setPaused]=useState(false);
  const [hovering,setHovering]=useState(false);
  const [focused,setFocused]=useState(false);
  const [pageVisible,setPageVisible]=useState(true);
  const stage=useRef<HTMLDivElement>(null);
  const works=verifiedWork[category];
  const work=works[index];
  const move=(step:number)=>setIndex(i=>(i+step+works.length)%works.length);
  useEffect(()=>{
    const el=stage.current;if(!el)return;
    const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{rootMargin:"100px",threshold:.05});
    observer.observe(el);
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(motion.matches)setPaused(true);
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    const update=()=>setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange",update);
    return ()=>document.removeEventListener("visibilitychange",update);
  },[]);
  useEffect(()=>{
    if(paused||!visible||!pageVisible||hovering||focused||touch!==null)return;
    const timer=window.setInterval(()=>setIndex(i=>(i+1)%works.length),5000);
    return ()=>window.clearInterval(timer);
  },[paused,visible,pageVisible,hovering,focused,touch,category,works.length]);
  return <section className={`real-work studio-work ${paused?"is-paused":""}`} id="showcase" aria-labelledby="work-title"><div className="wrap">
    <div className="section-intro studio-intro"><h2 id="work-title">งานที่มีให้ดู<br /><span>เรื่องที่มีให้เล่า</span></h2><p>{verifiedWork.projects.length} ผลงานจริงจากคอมมูนิตี้<br />ดูคลิป แล้วเปิดงานต้นฉบับได้เลย</p></div>
    <div className="studio-toolbar"><div className="work-tabs" role="group" aria-label="เลือกหมวดผลงาน">{([["projects","ผลงานจริง"],["admissions","เส้นทางรุ่นพี่"]] as const).map(([key,label])=><button type="button" key={key} aria-pressed={category===key} onClick={()=>{setCategory(key);setIndex(0);}}>{label}</button>)}</div><button type="button" className="studio-pause" aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?"เล่นและหมุนอัตโนมัติ":"หยุดหมุน / คลิป"}</button></div>
    <div className="studio-room" ref={stage} role="region" aria-roledescription="carousel" aria-label="ผลงานหมุนอัตโนมัติทุก 5 วินาที" onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setFocused(false);}} tabIndex={0} onKeyDown={e=>{if(e.target instanceof HTMLVideoElement)return;if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}} onTouchCancel={()=>setTouch(null)} onTouchStart={e=>setTouch(e.touches[0].clientX)} onTouchEnd={e=>{if(touch!==null){const delta=e.changedTouches[0].clientX-touch;if(Math.abs(delta)>60)move(delta<0?1:-1);}setTouch(null);}}>
      <div className="studio-wall" aria-hidden="true" />
      <div className="studio-posters">{works.map((item,i)=>{
        let offset=(i-index+works.length)%works.length;
        if(offset>works.length/2)offset-=works.length;
        const distance=Math.abs(offset),near=distance<=1;
        return <article key={item.title} className={`studio-card ${i===index?"is-active":""}`} aria-hidden={distance>1?true:undefined} style={{"--slot":offset,"--delay":(i%3)*-.8+"s",opacity:distance>2?0:1,zIndex:5-Math.min(distance,4),pointerEvents:distance>2?"none":"auto"} as CSSProperties}>
          <div className="studio-poster">
            <button type="button" className="studio-select" tabIndex={distance>1?-1:0} onClick={()=>setIndex(i)} aria-pressed={index===i}><span>{item.title}</span><small>{item.by}</small></button>
            <div className="studio-media">{near&&visible?<WorkMedia work={item} playing={!paused} controls={index===i} />:<img src={item.image} alt={item.alt} loading="lazy" width="960" height="600" />}</div>
            <a className="studio-card-link" tabIndex={distance>1?-1:0} href={item.href} target="_blank" rel="noopener noreferrer">{item.action}</a>
          </div>
        </article>;
      })}</div>
    </div>
    <div className="studio-controls"><button type="button" onClick={()=>move(-1)} aria-label="ผลงานก่อนหน้า"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg></button><span aria-live="polite">{index+1} / {works.length}</span><button type="button" onClick={()=>move(1)} aria-label="ผลงานถัดไป"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 5 7 7-7 7" /></svg></button></div>
    <div className="studio-caption" key={category+index} aria-live="polite"><h3>{work.title}</h3><p>{work.description}</p>{work.result&&<p className="work-result">{work.result}</p>}<div className="work-links"><a href={work.href} target="_blank" rel="noopener noreferrer">{work.action}</a>{work.secondary&&<a href={work.secondary.href} target="_blank" rel="noopener noreferrer">{work.secondary.label}</a>}</div></div>
  </div></section>;
}
