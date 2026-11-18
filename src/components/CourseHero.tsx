"use client";
import {useState} from "react";
import {assetPath} from "@/lib/assets";
import {EnrollButton} from "./CourseProvider";
import {DemonstrationVideo} from "./CourseExperience";
export function MediaPlaceholder({title}:{title:string}){
 return <div className="real-media-placeholder" role="img" aria-label={`รอภาพจริงจากทีม: ${title}`}><svg viewBox="0 0 56 42" aria-hidden="true"><rect x="2" y="2" width="52" height="38" rx="6"/><circle cx="18" cy="14" r="4"/><path d="m5 34 14-13 10 9 9-12 13 16"/></svg><strong>{title}</strong><span>รอภาพจริงจากทีม</span></div>;
}
const scenes=[
 {title:"ลงมือสร้าง",caption:"การเล่นจริง SLASH//SPEED · ดินสอ · ผลงานจากคอมมูนิตี้ Hamster Hub"},
 {title:"ขัดงานกับทีม",caption:"บรรยากาศจริงจากกิจกรรม Hamster Hub"},
 {title:"พางานออกสู่สนาม",caption:"โปสเตอร์นำเสนอโครงงานจริง Veggie Dash · NSC 2024"}
];
export function CourseHero(){
 const [scene,setScene]=useState(0);
 return <section className="course-product-hero" aria-labelledby="wire-title">
 <div className="course-product-heading"><p>Project Build Skill</p><h1 id="wire-title">เปลี่ยนความชอบ<br/>เป็นฝีมือให้โลกรู้</h1></div>
 <div className="course-product-view">
 <div className="course-scene-controls" role="group" aria-label="ดูประสบการณ์ในคอร์ส">{scenes.map((s,i)=><button key={s.title} type="button" aria-pressed={scene===i} onClick={()=>setScene(i)}>{s.title}</button>)}</div>
 <figure className={`course-product-scene scene-${scene}`}>{scene===0?<DemonstrationVideo src={assetPath("/assets/demo/slash-gameplay.mp4")} poster={assetPath("/assets/demo/slash-gameplay.webp")} label="เกม SLASH//SPEED ที่นักเรียนในคอมมูนิตี้ Hamster Hub สร้าง"/>:<img src={scene===1?"https://pepesx231.github.io/Hamterco/img/photo-class.webp":"https://img.itch.zone/aW1nLzE4NTI1OTg1LnBuZw==/original/td7IEw.png"} alt={scene===1?"ผู้เรียนและผู้สอนในกิจกรรมจริงของ Hamster Hub":"โปสเตอร์ NSC 2024 ของทีม Veggie Dash ตัวอย่างการนำเสนอโครงงาน"} width={scene===1?1000:1742} height={scene===1?550:2488}/>}<figcaption>{scenes[scene].caption}</figcaption></figure>
 </div>
 <div className="course-product-offer"><span>12 เดือน · <strong>19,990 บาท</strong></span><EnrollButton className="wire-blue-button">สนใจเรียน</EnrollButton><a href="#roadmap">ดูสิ่งที่จะได้ลงมือทำ</a></div>
 </section>;
}
