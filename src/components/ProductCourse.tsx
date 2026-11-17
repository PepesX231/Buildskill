"use client";
import { useEffect, useRef, useState } from "react";
import { verifiedWork, type WorkExample } from "@/lib/verified-work";
import { tracks, type TrackKey } from "@/lib/course-data";
import { EnrollButton, useCourse } from "./CourseProvider";

const findWork=(title:string)=>verifiedWork.projects.find(w=>w.title===title)!;

export function RealPreview({work,play=true,controls=false,eager=false}:{work:WorkExample;play?:boolean;controls?:boolean;eager?:boolean}) {
  const host=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null);
  const [visible,setVisible]=useState(false),[failed,setFailed]=useState(false),[blocked,setBlocked]=useState(false);
  useEffect(()=>{
    const node=host.current;if(!node)return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.12});
    observer.observe(node);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    const el=video.current;if(!el)return;
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>{
      if(visible&&play&&!document.hidden&&!motion.matches){el.muted=true;el.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true));}
      else el.pause();
    };
    sync();motion.addEventListener("change",sync);document.addEventListener("visibilitychange",sync);
    return()=>{el.pause();motion.removeEventListener("change",sync);document.removeEventListener("visibilitychange",sync);};
  },[visible,play,work.video]);
  return <div ref={host} className="real-preview">
    <img src={work.image} alt={work.alt} width="1280" height="720" loading={eager?"eager":"lazy"} fetchPriority={eager?"high":undefined} />
    {work.video&&!failed&&visible&&<video ref={video} src={work.video} poster={work.image} muted loop playsInline controls={controls} preload="metadata" aria-label={`คลิปผลงาน ${work.title}`} onError={()=>setFailed(true)} />}
    {blocked&&play&&work.video&&!failed&&<button className="preview-play" onClick={()=>video.current?.play().then(()=>setBlocked(false)).catch(()=>setFailed(true))}>เล่นคลิป {work.title}</button>}
  </div>;
}

export function ProductHero(){
  const game=findWork("Nampun"),app=findWork("REVOICE"),team=findWork("Veggie Dash");
  return <section className="product-hero" aria-labelledby="product-title">
    <div className="product-opening wrap">
      <h1 id="product-title"><span>Project Build Skill</span>สร้างของที่ใช้ได้จริง<br /><em>แล้วเล่าได้ว่า เราทำเอง</em></h1>
      <p className="product-lead">คอร์ส 12 เดือนสำหรับ ม.ปลาย พาทำเกม แอป หรือ IoT<br className="desktop-break" /> ตั้งแต่ลงมือชิ้นแรก ถึงโปรเจกต์หลักและเล่มพอร์ตของตัวเอง</p>
      <a className="product-explore" href="#highlights">ดูสิ่งที่จะได้จากคอร์ส</a>
    </div>
    <div className="product-gallery wrap">
      <figure className="hero-game"><RealPreview work={game} controls eager /><figcaption><div><strong>{game.title}</strong><span>{game.by}</span></div><a href={game.href} target="_blank" rel="noopener noreferrer">เปิดคลิปเต็ม</a></figcaption></figure>
      <div className="hero-side"><figure><RealPreview work={app} play={false} eager /><figcaption><strong>แอป REVOICE</strong><a href={app.secondary!.href} target="_blank" rel="noopener noreferrer">ดูเอกสารจริง</a></figcaption></figure><figure><RealPreview work={team} play={false} eager /><figcaption><strong>{team.title}</strong><a href={team.href} target="_blank" rel="noopener noreferrer">ลองดูโปรเจกต์</a></figcaption></figure></div>
    </div>
    <div className="hero-purchase wrap"><p className="real-source">ภาพและคลิปผลงานจริงจากคอมมูนิตี้ Hamster Hub</p><div className="hero-purchase-price"><strong>19,990 <small>บาท</small></strong><span>ตลอด 12 เดือน · 1 ธ.ค. 2569 – 1 ธ.ค. 2570</span></div><div className="hero-purchase-actions"><EnrollButton className="btn primary">คุยเรื่องโปรเจกต์ที่อยากทำ</EnrollButton><a href="#roadmap" className="quiet-link">ดูว่าจะได้เรียนอะไร</a></div></div>
  </section>;
}

const highlights=[
  {title:"โปรเจกต์หลัก 1 ชิ้น\nที่เปิดให้คนลองได้จริง",text:"เลือกเกม แอป หรือ IoT ให้ตรงกับสิ่งที่สนใจ ฝึกทำให้จบ ทดสอบ และปรับจนพร้อมนำเสนอ",work:"Nampun",evidence:"ตัวอย่างเกมจาก GameJam X: Nampun ของวิน",link:"ดูคลิปต้นฉบับ"},
  {title:"ทักษะที่ใช้ทำงาน\nและทำงานร่วมกับคนอื่น",text:"เริ่มจากงานเดี่ยว ก่อนแบ่งหน้าที่ในโปรเจกต์ทีม ลงลึกตามบทบาท ทั้งการจัดโค้ดแบบ OOP และงานภาพด้วย Shader",work:"Veggie Dash",evidence:"ตัวอย่างโปรเจกต์ทีม: Veggie Dash โดยแมคและทีม",link:"เปิดหน้าโปรเจกต์"},
  {title:"เล่มพอร์ตที่มีทั้งผลงาน\nและกระบวนการให้เล่า",text:"รวบรวมโจทย์ วิธีคิด บทบาทของตัวเอง และผลการทดสอบ ให้มีหลักฐานประกอบการยื่นคณะที่เล็ง",work:"REVOICE",evidence:"ตัวอย่างเอกสารผลงานจริง: REVOICE ของไอดิน",link:"ดูเอกสารผลงาน"},
  {title:"พางานไปเจอคนใช้\nและเวทีที่เหมาะกับงาน",text:"ฝึกคิด Business Idea พิตช์ และเตรียมลงสนาม NSC, TICTA หรือ TGS ตามคุณสมบัติและกำหนดรับสมัคร",work:"StressStrike",evidence:"ตัวอย่างจากคอมมูนิตี้: StressStrike เข้ารอบสุดท้าย TICTA",link:"ดูผลงานต้นฉบับ"}
];

export function CourseHighlights(){
  const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[visible,setVisible]=useState(false),[reduced,setReduced]=useState(false);
  const rail=useRef<HTMLDivElement>(null),current=useRef(0);
  const select=(i:number)=>{
    const next=(i+highlights.length)%highlights.length;const el=rail.current,card=el?.children[next] as HTMLElement|undefined;
    if(el&&card)el.scrollTo({left:card.offsetLeft-((el.children[0] as HTMLElement)?.offsetLeft||0),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  useEffect(()=>{
    const el=rail.current;if(!el)return;
    const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:.2});observer.observe(el);
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(motion.matches);update();motion.addEventListener("change",update);
    return()=>{observer.disconnect();motion.removeEventListener("change",update);};
  },[]);
  useEffect(()=>{
    if(paused||!visible||reduced)return;
    const timer=setInterval(()=>{if(!document.hidden)select(current.current+1);},8000);return()=>clearInterval(timer);
  },[paused,visible,reduced]);
  return <section id="highlights" className="course-highlights" aria-labelledby="highlights-title">
    <div className="wrap highlights-heading"><h2 id="highlights-title">เรียนแล้ว<br /><span>ได้อะไรกลับไป</span></h2><p>เห็นปลายทางก่อน<br />แล้วค่อยเลือกทางที่อยากสร้าง</p></div>
    <div className="highlight-rail" ref={rail} role="region" aria-label="ไฮไลท์สิ่งที่จะได้จากคอร์ส" aria-roledescription="carousel" tabIndex={0} onScroll={()=>{
      const el=rail.current;if(!el)return;let closest=0,dist=Infinity;Array.from(el.children).forEach((c,i)=>{const d=Math.abs((c as HTMLElement).offsetLeft-((el.children[0] as HTMLElement)?.offsetLeft||0)-el.scrollLeft);if(d<dist){dist=d;closest=i;}});current.current=closest;setActive(closest);
    }} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==="ArrowRight"){e.preventDefault();select(active+1);}if(e.key==="ArrowLeft"){e.preventDefault();select(active-1);}}}>
      {highlights.map((item,i)=>{const work=findWork(item.work);return <article className={`highlight-card highlight-tone-${i}`} key={item.work} aria-label={item.title.replace("\n"," ")}>
        <div className="highlight-copy"><h3>{item.title.split("\n").map((line,k)=><span key={k}>{line}</span>)}</h3><p>{item.text}</p><a href={item.work==="REVOICE"?work.secondary!.href:work.href} target="_blank" rel="noopener noreferrer">{item.link}</a></div>
        <figure><RealPreview work={work} play={active===i} controls={active===i} /><figcaption>{item.evidence}</figcaption></figure>
      </article>;})}
    </div>
    <div className="highlight-controls wrap"><button type="button" aria-label="ไฮไลท์ก่อนหน้า" onClick={()=>select(active-1)}>‹</button><div className="highlight-dots" role="group" aria-label="เลือกไฮไลท์">{highlights.map((h,i)=><button key={h.work} type="button" aria-label={h.title.replace("\n"," ")} aria-pressed={active===i} onClick={()=>select(i)}><span /></button>)}</div><button type="button" aria-label="ไฮไลท์ถัดไป" onClick={()=>select(active+1)}>›</button><button type="button" className="highlight-autoplay" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?"เล่นอัตโนมัติ":"หยุดไฮไลท์"}</button></div>
  </section>;
}

const phaseData=[
 {period:"เดือน 1",title:"คิดเป็น ลงมือเป็น\nและทำงานชิ้นแรกให้จบ",learn:["แตกไอเดียเป็นโจทย์ที่ทำได้จริง และกำหนดขอบเขต","สร้างต้นแบบ ทดสอบ และแก้ปัญหา","เข้าใจกระบวนการทำโปรเจกต์ตั้งแต่ต้นจนจบ"],output:"โปรเจกต์เดี่ยวขนาดเล็กที่ทำเสร็จด้วยตัวเอง",value:"รู้วิธีเริ่มและปิดงาน ก่อนขยายไปทำโปรเจกต์ที่ใหญ่ขึ้น",support:"ทีมช่วยเลือกโจทย์และวางขอบเขต ให้รู้ว่าควรลงมืออะไรต่อ",work:"Woven Citadel"},
 {period:"เดือน 2–3",title:"ทำงานเป็นทีม\nลงลึกในสิ่งที่ตัวเองรับผิดชอบ",learn:["แบ่งหน้าที่ วางแผน และรวมงานของทีม","Programmer: OOP เพื่อฝึกจัดโค้ดให้เป็นระบบ","Art: Shader เพื่อฝึกทำแสง สี และวัสดุ"],output:"โปรเจกต์กลุ่ม พร้อมชิ้นงานตามบทบาทของตัวเอง",value:"มีทั้งทักษะเฉพาะทางและประสบการณ์ทำงานร่วมกับคนอื่น",support:"ทีมช่วยขัดงานผ่านฟีดแบ็ก เพื่อให้ฝึกจากปัญหาที่เจอในงานจริง",work:"Veggie Dash"},
 {period:"เดือน 4–12",title:"ทำให้คนใช้จริง\nแล้วพางานออกสู่โลกจริง",learn:["Startup Phase: ทดลองกับผู้ใช้แล้วปรับปรุงงาน","คิด Business Idea และฝึกพิตช์กับนักธุรกิจ","เตรียม NSC / TICTA / TGS และจัดทำเล่มพอร์ต"],output:"โปรเจกต์หลักอย่างน้อย 1 ชิ้น + เล่มพอร์ตตรงคณะที่เล็ง",value:"มีงานที่สาธิตได้ พร้อมอธิบายคุณค่า วิธีคิด และบทบาทของตัวเอง",support:"มีโอกาสให้นักลงทุนและอาจารย์มหาวิทยาลัยดูผลงานในแต่ละเดือน ตามการนัดหมาย",work:"REVOICE"}
];
const examples:Record<TrackKey,string[]>={
 game:["เกมสั้นที่มีกติกาหลักและเล่นจบได้","เกมทีมที่แบ่งโค้ด ภาพ และการทดสอบ","เกมที่ผ่านการลองเล่นและปรับจากฟีดแบ็ก พร้อมสาธิตและทำพอร์ต"],
 app:["ต้นแบบแอปที่แก้ปัญหาหลักได้หนึ่งเรื่อง","แอปทีมที่แบ่งระบบ หน้าจอ และประสบการณ์ผู้ใช้","แอปที่มีคนลองใช้จริง พร้อมอธิบายปัญหาและคุณค่าทางธุรกิจ"],
 iot:["ต้นแบบที่อ่านค่าและตอบสนองได้","โปรเจกต์ทีมที่แบ่งอุปกรณ์ โปรแกรม และการแสดงข้อมูล","อุปกรณ์ที่ทดลองในสถานการณ์จริง พร้อมสาธิตการทำงานและสรุปผล"]
};

export function LearningPath(){
  const {track,setTrack}=useCourse();
  return <section className="learning-path" id="roadmap" aria-labelledby="learning-title"><div className="wrap">
    <div className="learning-intro"><h2 id="learning-title">12 เดือน<br /><span>เรียนอะไร ทำอะไรได้บ้าง</span></h2><p>เริ่มด้วยงานเล็กที่ทำจบ ต่อด้วยงานทีม<br className="desktop-break" /> แล้วใช้เวลาช่วงใหญ่พัฒนาโปรเจกต์ของตัวเอง</p></div>
    <div className="learning-tracks" role="group" aria-label="เลือกสายเพื่อดูแนวทางชิ้นงาน">{(Object.keys(tracks) as TrackKey[]).map(key=><button key={key} type="button" aria-pressed={track===key} onClick={()=>setTrack(key)}>{tracks[key].name}</button>)}</div>
    <p className="track-explanation">เลือกสายเพื่อดูตัวอย่างแนวทางชิ้นงาน โจทย์จริงจะวางร่วมกับทีมตามพื้นฐานและความสนใจ</p>
    <div className="learning-phases">{phaseData.map((p,i)=>{const work=findWork(p.work);return <article className="learning-phase" key={p.period}>
      <div className="learning-visual"><figure><RealPreview work={work} play={false} /><figcaption>ตัวอย่างงานจริง: {work.title}<a href={work.href} target="_blank" rel="noopener noreferrer">เปิดต้นฉบับ</a></figcaption></figure><p className="learning-support">{p.support}</p></div>
      <div className="learning-copy"><p className="phase-period">{p.period}</p><h3>{p.title.split("\n").map((line,k)=><span key={k}>{line}</span>)}</h3><h4>จะได้ฝึก</h4><ul>{p.learn.map(t=><li key={t}>{t}</li>)}</ul><div className="phase-output"><h4>จบช่วงนี้ มีอะไรในมือ</h4><p>{p.output}</p><p className="phase-example-line" aria-live="polite">แนวทางสาย{tracks[track].name}: {examples[track][i]}</p></div><p className="phase-value"><strong>เอาไปต่อยังไง</strong> {p.value}</p></div>
    </article>;})}</div>
    <p className="learning-footnote">ภาพเป็นตัวอย่างผลงานจากคอมมูนิตี้ การเลือกเวทีขึ้นอยู่กับคุณสมบัติและกำหนดการ ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย</p>
  </div></section>;
}
