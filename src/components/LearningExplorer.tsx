"use client";
import {useEffect,useRef,useState} from "react";
import {assetPath} from "@/lib/assets";
import {tracks,type TrackKey} from "@/lib/course-data";
import {learningPaths,type TopicMedia} from "@/lib/learning-paths";
import {useCourse} from "./CourseProvider";
import {DemonstrationVideo} from "./CourseExperience";
import {MediaPlaceholder} from "./CourseHero";
const media:Record<Exclude<TopicMedia,"game">,{src:string;alt:string;caption:string}>={
 app:{src:"https://pepesx231.github.io/Hamterco/img/sc-revoice.webp",alt:"ภาพนำเสนอแอป REVOICE ของไอดิน พร้อมหน้าจอแบบฝึกพูด",caption:"ภาพนำเสนอแอป REVOICE · ไอดิน · ตัวอย่างผลงานคอมมูนิตี้"},
 team:{src:"https://pepesx231.github.io/Hamterco/img/photo-class.webp",alt:"ผู้เรียนและผู้สอนในกิจกรรมจริงของ Hamster Hub",caption:"บรรยากาศจริงจากกิจกรรม Hamster Hub"},
 poster:{src:"https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png",alt:"โปสเตอร์นำเสนอโครงงาน Veggie Dash ใน NSC 2024",caption:"โปสเตอร์นำเสนอจริงของทีม Veggie Dash · NSC 2024"}
};
export function LearningExplorer(){
 const {track,setTrack}=useCourse();
 const [choices,setChoices]=useState<Record<TrackKey,[number,number]>>({game:[0,3],app:[0,3],iot:[0,0]});
 const [phaseIndex,topicIndex]=choices[track],groups=learningPaths[track],phase=groups[phaseIndex],topic=phase.topics[topicIndex];
 const panel=useRef<HTMLDivElement>(null),list=useRef<HTMLElement>(null),reveal=useRef(false);
 const chooseTopic=(index:number)=>{reveal.current=true;setChoices(v=>({...v,[track]:[phaseIndex,index]}));};
 useEffect(()=>{if(!reveal.current)return;reveal.current=false;const frame=requestAnimationFrame(()=>{if(window.matchMedia("(max-width:700px)").matches){panel.current?.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches?"instant":"smooth"});panel.current?.focus({preventScroll:true});}});return()=>cancelAnimationFrame(frame);},[track,phaseIndex,topicIndex]);
 return <section className="learning-explorer wire-wrap" id="roadmap" aria-labelledby="route-title">
 <div className="route-intro"><h2 id="route-title">จาก “ชอบคอม”<br/>สู่คนที่สร้างมันได้</h2><p>เลือกสาย เลือกช่วง แล้วสำรวจหัวข้อที่ได้ฝึก<br/>ผ่านการทำโปรเจกต์ของตัวเอง</p></div>
 <div className="route-selector"><span>อยากสร้างอะไร?</span><div className="route-track-options" role="group" aria-label="เลือกสายเพื่อดูเส้นทาง">{(Object.keys(tracks) as TrackKey[]).map(k=><button key={k} type="button" aria-pressed={track===k} onClick={()=>setTrack(k)}>{k==="app"?"เว็บ / แอป":tracks[k].name}</button>)}</div></div>
 <p className="explorer-hint">ตัวอย่างงานและทักษะที่ฝึกในแต่ละช่วง · ทีมช่วยวางโจทย์ตามพื้นฐานและสิ่งที่อยากสร้าง</p>
 <div className="explorer-shell">
 <div className="explorer-phase-controls" role="group" aria-label="เลือกช่วงเดือน">{groups.map((g,i)=><button key={g.period} type="button" aria-pressed={phaseIndex===i} onClick={()=>setChoices(v=>({...v,[track]:[i,0]}))}>{g.period}<small>{i===0?"งานเดี่ยว":i===1?"งานทีม":"โปรเจกต์หลัก"}</small></button>)}</div>
 <div className="explorer-workspace">
 <nav ref={list} id="learning-topics" className="explorer-topics" aria-label={`หัวข้อเรียนสาย${tracks[track].name} ${phase.period}`} onKeyDown={e=>{if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const buttons=list.current?.querySelectorAll<HTMLButtonElement>("button");if(!buttons?.length)return;const active=Array.from(buttons).indexOf(document.activeElement as HTMLButtonElement);buttons[(active+(e.key==="ArrowDown"?1:buttons.length-1))%buttons.length]?.focus();}}>
 <h3 className="explorer-phase-title">{phase.title}</h3><p className="explorer-topic-count">{phase.topics.length} หัวข้อให้สำรวจ</p>
 {phase.topics.map((t,i)=><button type="button" key={t.title} aria-pressed={topicIndex===i} aria-controls="learning-topic-panel" onClick={()=>chooseTopic(i)}><span className="topic-indicator" aria-hidden="true">{topicIndex===i?"−":"+"}</span><span>{t.title}</span></button>)}
 </nav>
 <div ref={panel} className="explorer-detail" id="learning-topic-panel" tabIndex={-1} role="region" aria-label="รายละเอียดหัวข้อที่เลือก" aria-live="polite" aria-atomic="true"><a className="explorer-back" href="#learning-topics">เลือกหัวข้ออื่น</a>
 <div className="explorer-detail-inner" key={track+phaseIndex+":"+topicIndex}>
 <figure className={`explorer-media explorer-media-${topic.media||"pending"}`}>{topic.media==="game"?<><DemonstrationVideo src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเล่นจริง SLASH//SPEED ผลงานจากคอมมูนิตี้ Hamster Hub"/><figcaption>ตัวอย่างเกมที่เล่นได้จริง SLASH//SPEED · ดินสอ</figcaption></>:topic.media?<><img src={media[topic.media].src} alt={media[topic.media].alt} width="1000" height={topic.media==="poster"?1428:600}/><figcaption>{media[topic.media].caption}</figcaption></>:<MediaPlaceholder title={topic.imageNeeded||"ภาพผลงานจริงประกอบหัวข้อนี้"}/>}</figure>
 <div className="explorer-topic-copy"><p className="explorer-period">{phase.period} · สาย{tracks[track].name}</p><h3>{topic.title}</h3><ul>{topic.learn.map(t=><li key={t}>{t}</li>)}</ul><div className="explorer-output"><span>สิ่งที่ได้จากหัวข้อนี้</span><strong>{topic.output}</strong></div>{phaseIndex===2&&<p className="explorer-support">เดือน 4–12 ใช้พัฒนา ทดสอบ และปรับงานเป็นวงจรตามโจทย์ การลงสนามขึ้นอยู่กับคุณสมบัติและกำหนดรับสมัคร</p>}</div>
 </div></div></div>
 </div>
 </section>;
}
