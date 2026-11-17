"use client";
import {useEffect,useRef,useState} from "react";
import {assetPath} from "@/lib/assets";
import {tracks,type TrackKey} from "@/lib/course-data";
import {learningPaths,type TopicMedia} from "@/lib/learning-paths";
import {useCourse} from "./CourseProvider";
import {DemonstrationVideo} from "./CourseExperience";
const media:Record<Exclude<TopicMedia,"game">,{src:string;alt:string;caption:string}>={
 app:{src:"https://pepesx231.github.io/Hamterco/img/sc-revoice.webp",alt:"ภาพนำเสนอแอป REVOICE ของไอดิน พร้อมหน้าจอแบบฝึกพูด",caption:"ภาพนำเสนอแอปจริง REVOICE · ไอดิน · คอมมูนิตี้ Hamster Hub"},
 team:{src:"https://pepesx231.github.io/Hamterco/img/photo-class.webp",alt:"ผู้เรียนและผู้สอนร่วมพูดคุยในกิจกรรมจริงของ Hamster Hub",caption:"บรรยากาศการทำงานร่วมกันในกิจกรรม Hamster Hub"},
 poster:{src:"https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png",alt:"โปสเตอร์นำเสนอโครงงานเกม Veggie Dash ใน NSC 2024",caption:"ตัวอย่างสื่อนำเสนอจริง · โปสเตอร์ NSC 2024 ของทีม Veggie Dash"}
};
export function LearningExplorer(){
 const {track,setTrack}=useCourse();
 const [selection,setSelection]=useState<[number,number]>([0,1]);
 const panel=useRef<HTMLDivElement>(null),revealSelection=useRef(false);
 useEffect(()=>{if(!revealSelection.current)return;revealSelection.current=false;const id=requestAnimationFrame(()=>{panel.current?.focus({preventScroll:true});if(window.matchMedia("(max-width:700px)").matches)panel.current?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches?"instant":"smooth",block:"start"});});return()=>cancelAnimationFrame(id);},[selection,track]);
 const groups=learningPaths[track],topic=groups[selection[0]].topics[selection[1]];
 const chooseTrack=(k:TrackKey)=>{setTrack(k);setSelection([0,k==="iot"?0:1]);};
 return <section className="learning-explorer wire-wrap" id="roadmap" aria-labelledby="route-title">
 <div className="route-intro"><h2 id="route-title">จาก “ชอบคอม”<br/>สู่คนที่สร้างมันได้</h2><p>เลือกสิ่งที่อยากสร้าง แล้วดูว่าแต่ละช่วง<br/>จะได้ฝึกอะไร ลงมือทำอะไร และได้อะไรกลับไป</p></div>
 <div className="route-selector"><span>อยากสร้างอะไร?</span><div className="route-track-options" role="group" aria-label="เลือกสายเพื่อดูเส้นทาง">{(Object.keys(tracks) as TrackKey[]).map(k=><button key={k} type="button" aria-pressed={track===k} onClick={()=>chooseTrack(k)}>{k==="app"?"เว็บ / แอป":tracks[k].name}</button>)}</div></div>
 <p className="explorer-hint">เลือกหัวข้อเพื่อดูรายละเอียดและภาพตัวอย่าง</p>
 <div className="explorer-shell">
 <nav id="learning-topics" className="explorer-topics" aria-label={`หัวข้อเรียนสาย${tracks[track].name}`}>{groups.map((g,gi)=><div className="explorer-phase" key={g.period}><h3>{g.period}</h3><p>{g.title}</p>{g.topics.map((t,ti)=><button type="button" key={t.title} aria-pressed={selection[0]===gi&&selection[1]===ti} aria-controls="learning-topic-panel" onClick={()=>{revealSelection.current=true;setSelection([gi,ti]);}}><span className="topic-indicator" aria-hidden="true">{selection[0]===gi&&selection[1]===ti?"−":"+"}</span><span>{t.title}</span></button>)}</div>)}</nav>
 <div ref={panel} className="explorer-detail" id="learning-topic-panel" tabIndex={-1} role="region" aria-label="รายละเอียดหัวข้อที่เลือก" aria-live="polite" aria-atomic="true">
 <a className="explorer-back" href="#learning-topics">เลือกหัวข้ออื่น</a><div className="explorer-detail-inner" key={track+selection.join("-")}>
 {topic.media&&<figure className={`explorer-media explorer-media-${topic.media}`}>{topic.media==="game"?<><DemonstrationVideo src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="การเล่นจริง SLASH//SPEED ตัวอย่างเกมที่นักเรียนในคอมมูนิตี้สร้าง"/><figcaption>ตัวอย่างเกมที่เล่นได้จริง SLASH//SPEED · ดินสอ · คอมมูนิตี้ Hamster Hub</figcaption></>:<><img src={media[topic.media].src} alt={media[topic.media].alt} width="1000" height={topic.media==="poster"?1428:600}/><figcaption>{media[topic.media].caption}</figcaption></>}</figure>}
 <div className={`explorer-topic-copy ${topic.media?"":"without-topic-media"}`}><p className="explorer-period">{groups[selection[0]].period} · สาย{tracks[track].name}</p><h3>{topic.title}</h3><ul>{topic.learn.map(t=><li key={t}>{t}</li>)}</ul><div className="explorer-output"><span>สิ่งที่ได้จากหัวข้อนี้</span><strong>{topic.output}</strong></div>{selection[0]===2&&<p className="explorer-support">ช่วงเดือน 4–12 เป็นวงจรพัฒนางานที่ทำซ้ำได้ ไม่ใช่ตารางแบ่งงานรายเดือนตายตัว</p>}</div>
 </div></div>
 </div>
 <div className="route-support"><div><h3>เริ่มจากตรงที่เราอยู่</h3><p>ยังไม่มีผลงาน ทีมช่วยวางโจทย์แรกให้เริ่มได้<br/>มีงานแล้วหรือเรียนเองมา นำพื้นฐานและสิ่งที่อยากพัฒนามาคุยกัน</p></div><div><h3>ได้ฝึกจากงานของตัวเอง</h3><p>เริ่มจากโปรเจกต์เดี่ยว ต่อด้วยงานทีม แล้วพัฒนาโปรเจกต์หลักและเล่มพอร์ตตรงคณะที่เล็ง โดยมีทีมช่วยให้ฟีดแบ็กระหว่างทาง</p></div></div>
 </section>;
}
