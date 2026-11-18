"use client";
import {tracks,type TrackKey} from "@/lib/course-data";
import {EnrollButton,ModalButton,useCourse} from "./CourseProvider";
const results:Record<TrackKey,string>={game:"เกมที่เปิดให้คนลองเล่นได้ พร้อมวิธีคิดและบทบาทของเราให้เล่า",app:"เว็บหรือแอปที่สาธิตการใช้งานได้ พร้อมโจทย์และผลทดสอบ",iot:"อุปกรณ์ต้นแบบที่สาธิตการทำงานได้ พร้อมหลักฐานการทดลอง"};
export function CourseOffer(){
 const {track,setTrack}=useCourse();
 return <section className="course-choice-offer" id="pricing" aria-labelledby="investment-title">
 <div className="course-choice-heading"><p>Project Build Skill</p><h2 id="investment-title">ถึงเวลาสร้างผลงาน<br/>ที่ภูมิใจว่าเราทำเอง</h2></div>
 <div className="course-choice-layout"><div className="course-choice-product"><h3>อยากเริ่มจากอะไร?</h3><div className="route-track-options" role="group" aria-label="เลือกสายก่อนคุยกับทีม">{(Object.keys(tracks) as TrackKey[]).map(k=><button key={k} type="button" aria-pressed={track===k} onClick={()=>setTrack(k)}>{k==="app"?"เว็บ / แอป":tracks[k].name}</button>)}</div><p className="course-choice-result" aria-live="polite">{results[track]}</p><ul><li><strong>โปรเจกต์หลักอย่างน้อย 1 ชิ้น</strong><span>พัฒนาจากสิ่งที่เราอยากสร้างให้สาธิตได้จริง</span></li><li><strong>ฝึกงานเดี่ยวและงานทีม</strong><span>ทำให้จบ รับผิดชอบส่วนของตัวเอง และทำงานร่วมกับคนอื่น</span></li><li><strong>พิตช์ ลงสนาม และทำพอร์ต</strong><span>เตรียมงานให้ตรงเวทีและเก็บหลักฐานจากสิ่งที่ลงมือ</span></li></ul><a className="offer-plan-link" href="#roadmap">กลับไปดูแผนเรียนสายที่เลือก</a></div>
 <div className="investment-action"><p>ราคาตลอดหลักสูตร 12 เดือน</p><strong>19,990 <small>บาท</small></strong><span>1 ธ.ค. 2569 – 1 ธ.ค. 2570</span><EnrollButton className="wire-blue-button">วางแผนโปรเจกต์กับทีม</EnrollButton><p className="investment-help">เริ่มคุยจากพื้นฐาน สิ่งที่อยากสร้าง และเป้าหมายของเรา<br/>ทีมจะช่วยดูความเหมาะสมและยืนยันรายละเอียดก่อนสมัคร</p><ModalButton kind="parents" className="wire-parent-summary">ดูรายละเอียดให้ผู้ปกครอง</ModalButton></div></div>
 </section>;
}
