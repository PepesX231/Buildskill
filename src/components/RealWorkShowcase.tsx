"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { verifiedWork, workOutcomes, type WorkCategory, type WorkExample } from "@/lib/verified-work";

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
  const [visible,setVisible]=useState(false);
  const [reducedMotion,setReducedMotion]=useState(false);
  const [pageVisible,setPageVisible]=useState(true);
  const [previewRadius,setPreviewRadius]=useState(2);
  const stage=useRef<HTMLDivElement>(null);
  const touch=useRef<number|null>(null);
  const position=useRef(0);
  const destination=useRef<number|null>(null);
  const center=useRef(0);
  const paintNow=useRef<(()=>void)|null>(null);
  const works=verifiedWork[category];
  const work=works[index];
  const move=(step:number)=>{
    const next=(destination.current??Math.round(position.current))+step;
    if(reducedMotion){position.current=next;destination.current=null;paintNow.current?.();}
    else destination.current=next;
  };
  const select=(i:number)=>{
    const current=((position.current%works.length)+works.length)%works.length;
    let delta=((i-current)%works.length+works.length)%works.length;
    if(delta>works.length/2)delta-=works.length;
    if(reducedMotion){position.current+=delta;destination.current=null;paintNow.current?.();}
    else destination.current=position.current+delta;
  };
  useEffect(()=>{
    const el=stage.current;if(!el)return;
    const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{threshold:.02});
    observer.observe(el);
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion=()=>setReducedMotion(motion.matches);
    const updatePage=()=>setPageVisible(!document.hidden);
    updateMotion();updatePage();
    motion.addEventListener("change",updateMotion);
    document.addEventListener("visibilitychange",updatePage);
    return ()=>{observer.disconnect();motion.removeEventListener("change",updateMotion);document.removeEventListener("visibilitychange",updatePage);};
  },[]);
  useEffect(()=>{
    const el=stage.current;if(!el)return;
    const cards=Array.from(el.querySelectorAll<HTMLElement>(".studio-card"));
    let spacing=355,frame=0,last=0;
    const wrap=(n:number)=>((n%works.length)+works.length)%works.length;
    const paint=()=>{
      const nearest=wrap(Math.round(position.current));
      if(nearest!==center.current){center.current=nearest;setIndex(nearest);}
      const reach=el.clientWidth/(2*spacing)+.7;
      cards.forEach((card,i)=>{
        let slot=wrap(i-position.current);
        if(slot>works.length/2)slot-=works.length;
        const distance=Math.abs(slot);
        const opacity=Math.max(0,Math.min(1,(reach-distance)*2));
        card.style.transform=`translate3d(calc(-50% + ${(slot*spacing).toFixed(2)}px),0,0) rotateY(${(-Math.max(-2,Math.min(2,slot))*8).toFixed(2)}deg)`;
        card.style.opacity=String(opacity);
        card.style.zIndex=String(20-Math.min(19,Math.round(distance*3)));
        card.style.pointerEvents=opacity>.25?"auto":"none";
      });
    };
    const measure=()=>{
      spacing=window.matchMedia("(max-width:600px)").matches?el.clientWidth*.84:(cards[0]?.offsetWidth||330)+25;
      setPreviewRadius(Math.max(1,Math.min(3,Math.ceil(el.clientWidth/(2*spacing)))));
      paint();
    };
    paintNow.current=paint;measure();
    const observer=new ResizeObserver(measure);observer.observe(el);
    const tick=(now:number)=>{
      const dt=last?Math.min((now-last)/1000,.05):0;last=now;
      if(destination.current!==null){
        const gap=destination.current-position.current;
        position.current+=gap*(1-Math.exp(-dt*9));
        if(Math.abs(gap)<.002){position.current=destination.current;destination.current=null;}
      }else position.current+=dt*38/spacing;
      paint();frame=requestAnimationFrame(tick);
    };
    if(visible&&pageVisible&&!reducedMotion)frame=requestAnimationFrame(tick);
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();paintNow.current=null;};
  },[category,works.length,visible,pageVisible,reducedMotion]);
  return <section className={`real-work studio-work flow-reel ${reducedMotion?"is-paused":""}`} id="showcase" aria-labelledby="work-title"><div className="wrap">
    <div className="section-intro studio-intro"><h2 id="work-title">ให้ผลงาน<span>พูดแทน</span></h2></div>
    <div className="studio-toolbar"><div className="work-tabs" role="group" aria-label="เลือกหมวดผลงาน">{([["projects","ผลงานจริง"],["admissions","เส้นทางรุ่นพี่"]] as const).map(([key,label])=><button type="button" key={key} aria-pressed={category===key} onClick={()=>{position.current=0;destination.current=null;center.current=0;setCategory(key);setIndex(0);paintNow.current?.();}}>{label}</button>)}</div></div>
    <div className="studio-room" ref={stage} role="region" aria-roledescription="carousel" aria-label="ผลงานเลื่อนไหลต่อเนื่อง เลือกดูด้วยปุ่มซ้ายขวาได้" tabIndex={0} onKeyDown={e=>{if(e.target instanceof HTMLVideoElement)return;if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}} onTouchCancel={()=>{touch.current=null;}} onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const delta=e.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>60)move(delta<0?1:-1);}touch.current=null;}}>
      <div className="studio-wall" aria-hidden="true" />
      <div className="studio-posters">{works.map((item,i)=>{
        let slot=(i-index+works.length)%works.length;
        if(slot>works.length/2)slot-=works.length;
        const distance=Math.abs(slot),near=distance<=previewRadius;
        return <article key={item.title} className={`studio-card ${i===index?"is-active":""}`} aria-hidden={distance>previewRadius?true:undefined} style={{"--slot":slot} as CSSProperties}>
          <div className="studio-poster">
            <button type="button" className="studio-select" tabIndex={distance>previewRadius?-1:0} onClick={()=>select(i)} aria-pressed={index===i}><span>{item.title}</span><small>{item.by}</small></button>
            <div className="studio-media">{near&&visible?<WorkMedia work={item} playing={!reducedMotion&&pageVisible} controls={index===i} />:<img src={item.image} alt={item.alt} loading="lazy" width="960" height="600" />}</div>
            <ul className="studio-outcomes" aria-label="ผลลัพธ์ของผลงาน">{(workOutcomes[item.title]||[]).map(outcome=><li key={outcome}>{outcome}</li>)}</ul>
            <a className="studio-card-link" tabIndex={distance>previewRadius?-1:0} href={item.href} target="_blank" rel="noopener noreferrer">{item.action}</a>
          </div>
        </article>;
      })}</div>
    </div>
    <div className="studio-controls"><button type="button" onClick={()=>move(-1)} aria-label="ผลงานก่อนหน้า"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg></button><span>{index+1} / {works.length}</span><button type="button" onClick={()=>move(1)} aria-label="ผลงานถัดไป"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 5 7 7-7 7" /></svg></button></div>
    <div className="studio-caption" key={category+index}><h3>{work.title}</h3><p>{work.description}</p><ul className="studio-outcomes">{(workOutcomes[work.title]||[]).map(outcome=><li key={outcome}>{outcome}</li>)}</ul><div className="work-links"><a href={work.href} target="_blank" rel="noopener noreferrer">{work.action}</a>{work.secondary&&<a href={work.secondary.href} target="_blank" rel="noopener noreferrer">{work.secondary.label}</a>}</div></div>
  </div></section>;
}
