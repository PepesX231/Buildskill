"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LINE_URL, tracks, type TrackKey } from "@/lib/course-data";

type ModalKind = "video" | "enroll" | "quest" | "parents" | "sources";
type CourseContextValue = {
  track: TrackKey;
  setTrack: (track: TrackKey) => void;
  open: (kind: ModalKind) => void;
  notify: (message: string) => void;
};
const CourseContext = createContext<CourseContextValue | null>(null);

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) throw new Error("Course interactions require CourseProvider");
  return context;
}

export function CourseProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<TrackKey>("game");
  const [modal, setModal] = useState<ModalKind | null>(null);
  const [toast, setToast] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = useCallback((kind: ModalKind) => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setModal(kind);
  }, []);
  const notify = useCallback((message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3500);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const el = dialog.current;
    if (!el) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!el.open) el.showModal();
    return () => {
      if (el.open) el.close();
      document.body.style.overflow = oldOverflow;
      previousFocus.current?.focus();
    };
  }, [modal]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    const clearPrint = () => document.body.classList.remove("parent-print");
    window.addEventListener("afterprint", clearPrint);
    return () => window.removeEventListener("afterprint", clearPrint);
  }, []);

  return <CourseContext.Provider value={{ track, setTrack, open, notify }}>
    {children}
    <dialog ref={dialog} id="modal" aria-labelledby="modal-title" onClose={() => setModal(null)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const r = event.currentTarget.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) setModal(null);
    }}>
      <button type="button" className="modal-close" aria-label="ปิดหน้าต่าง" onClick={() => setModal(null)}>✕</button>
      <div id="modal-content">
        {modal === "video" && <VideoContent />}
        {modal === "enroll" && <EnrollmentContent key={track} initialTrack={track} />}
        {modal === "quest" && <QuestContent track={track} />}
        {modal === "parents" && <><ParentSummary /><button className="btn primary" onClick={() => {
          document.body.classList.add("parent-print");
          window.print();
        }}>พิมพ์ / บันทึกเป็น PDF</button></>}
        {modal === "sources" && <SourcesContent />}
      </div>
    </dialog>
    <section id="print-summary" hidden><ParentSummary print /></section>
    <div id="toast" className={toast ? "show" : ""} role="status" aria-live="polite">{toast}</div>
  </CourseContext.Provider>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };
export function EnrollButton({ children, ...props }: ButtonProps) {
  const { open } = useCourse();
  return <button type="button" {...props} onClick={() => open("enroll")}>{children}</button>;
}
export function VideoButton({ children, ...props }: ButtonProps) {
  const { open } = useCourse();
  return <button type="button" {...props} onClick={() => open("video")}>{children}</button>;
}
export function ModalButton({ children, kind, ...props }: ButtonProps & { kind: ModalKind }) {
  const { open } = useCourse();
  return <button type="button" {...props} onClick={() => open(kind)}>{children}</button>;
}

function VideoContent() {
  return <><h2 id="modal-title">ดูว่าไอเดียไปได้ไกลแค่ไหน</h2>
    <iframe className="video-frame" src="https://www.youtube-nocookie.com/embed/LhUO186ZWG8?rel=0" title="คลิปตัวอย่างผลงาน Project Build Skill" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
    <p className="modal-footnote">หากเล่นในหน้านี้ไม่ได้ <a className="text-link" href="https://youtu.be/LhUO186ZWG8" target="_blank" rel="noopener noreferrer">เปิดบน YouTube</a></p></>;
}

function EnrollmentContent({ initialTrack }: { initialTrack: TrackKey }) {
  const [interest, setInterest] = useState(initialTrack);
  const [experience, setExperience] = useState("ยังไม่มีผลงาน อยากเริ่มชิ้นแรก");
  const messageRef = useRef<HTMLDivElement>(null);
  const { notify } = useCourse();
  const message = `สวัสดีครับ/ค่ะ สนใจ Project Build Skill ระยะเวลา 12 เดือน ราคา 19,990 บาท\nสายที่สนใจ: ${tracks[interest].name}\nพื้นฐานตอนนี้: ${experience}\n\nอยากสอบถามวัน–เวลาและรูปแบบการเรียน เวลาทำงานต่อสัปดาห์ อุปกรณ์ที่ต้องใช้ ผู้สอน/ผู้ดูแล ค่าใช้จ่ายเพิ่มเติม เงื่อนไขชำระเงินหรือคืนเงิน และขั้นตอนสมัครครับ/ค่ะ`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      notify("คัดลอกแล้ว พร้อมนำไปคุยกับทีม");
    } catch {
      const node = messageRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      notify("เลือกข้อความไว้แล้ว กดคัดลอกบนอุปกรณ์ของคุณ");
    }
  };
  return <><h2 id="modal-title">เริ่มจากสิ่งที่น้องอยากสร้าง</h2>
    <p className="modal-lead">เลือกจุดเริ่มต้น แล้วคัดลอกข้อความไปคุยกับทีม Hamster Hub เพื่อยืนยันตารางเรียน รายละเอียด และขั้นตอนสมัคร</p>
    <label htmlFor="interest">สายที่อยากทำ<select id="interest" value={interest} onChange={e => setInterest(e.target.value as TrackKey)}>
      {Object.entries(tracks).map(([key, value]) => <option key={key} value={key}>{value.name}</option>)}
    </select></label>
    <label htmlFor="experience">ตอนนี้น้องอยู่ตรงไหน?<select id="experience" value={experience} onChange={e => setExperience(e.target.value)}>
      <option>ยังไม่มีผลงาน อยากเริ่มชิ้นแรก</option><option>มีผลงานแล้ว แต่อยากพัฒนาให้ดีขึ้น</option><option>เรียนเองมา อยากมีทีมและเส้นทางชัดเจน</option>
    </select></label>
    <div className="prepared-message" ref={messageRef}>{message}</div>
    <button className="btn primary" onClick={copy}>คัดลอกข้อความไว้คุยกับทีม</button>
    <a className="btn light" href={LINE_URL} target="_blank" rel="noopener noreferrer">คุยกับทีม Hamster Hub ทาง LINE</a>
    <p className="modal-footnote">หน้านี้ช่วยเตรียมข้อความเท่านั้น ยังไม่ได้ส่งข้อมูล สมัครเรียน หรือชำระเงิน</p>
  </>;
}

function QuestContent({ track }: { track: TrackKey }) {
  return <><h2 id="modal-title">จากไอเดียหนึ่งเรื่อง<br />สู่ต้นแบบแรกของน้อง</h2>
    <p className="modal-lead">ตัวอย่างแนวทางทดลองทำสำหรับสาย {tracks[track].name} ลองทำก่อนตัดสินใจ หรือใช้เป็นเรื่องเริ่มต้นคุยกับทีม</p>
    <ol className="quest-steps">{tracks[track].quest.map(step => <li key={step}>{step}</li>)}</ol>
    <h3>สิ่งที่ควรเล่าให้ได้เมื่อทำเสร็จ</h3><p>กำลังแก้ปัญหาอะไร ทำส่วนไหนเอง ลองอะไรแล้วไม่ได้ผล และจะปรับอะไรเป็นอย่างต่อไป</p>
    <p className="modal-footnote">Quest นี้เป็นตัวอย่างประกอบเว็บไซต์ ไม่ใช่เอกสารหลักสูตรหรือเกณฑ์ประเมินที่ทีมประกาศ</p></>;
}

function ParentSummary({ print = false }: { print?: boolean }) {
  return <><h2 id={print ? undefined : "modal-title"}>Project Build Skill</h2>
    <p>หลักสูตรสร้างโปรเจกต์สำหรับนักเรียนมัธยมปลาย ระยะเวลา 12 เดือน<br />1 ธันวาคม 2569 – 1 ธันวาคม 2570 • ราคา 19,990 บาท</p>
    <h3>เป้าหมายที่ผู้เรียนจะได้ลงมือทำ</h3><ul><li>พัฒนาโปรเจกต์หลัก เกม / แอป / IoT อย่างน้อย 1 ชิ้น</li><li>ฝึกทำงานเดี่ยวและทำงานกลุ่มตามบทบาท</li><li>ต่อยอดงานให้มีผู้ใช้จริง คิด Business Idea และฝึกนำเสนอ</li><li>เตรียมลงสนามแข่งขันที่เหมาะสม และจัดทำเล่มพอร์ตโฟลิโอ</li></ul>
    <h3>เส้นทาง 3 ช่วง</h3><p>เดือน 1: ทำโปรเจกต์เดี่ยวให้จบ<br />เดือน 2–3: ทำโปรเจกต์กลุ่ม แบ่ง Role และพัฒนาทักษะ<br />เดือน 4–12: Startup Phase ทดลองใช้งานจริง เตรียมแข่งขันและพิตช์</p>
    <h3>เรื่องที่ควรยืนยันกับทีมก่อนสมัคร</h3><p>วัน–เวลาและรูปแบบการเรียน สถานที่ ผู้สอนและผู้ดูแล จำนวนผู้เรียน วิธีติดตามงาน เวลาที่ต้องใช้ต่อสัปดาห์ อุปกรณ์ ค่าใช้จ่ายนอกหลักสูตร และเงื่อนไขชำระเงินหรือคืนเงิน</p>
    <p>ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย การแข่งขันและการยื่นพอร์ตขึ้นอยู่กับคุณสมบัติ กติกา และกำหนดการของแต่ละแห่ง</p></>;
}

function SourcesContent() {
  const links = [
    ["https://docs.google.com/spreadsheets/d/1eB-6lrVTdXQ8LRwiYjp0x6J8E1jpndy6d-hYZWgSvL0/edit", "ตารางผลงานและเส้นทางรุ่นพี่ที่ทีมให้มา"],
    ["https://www.hamsterhub.co/", "เว็บไซต์ Hamster Hub"],
    ["https://stangshinez.itch.io/dont-talk-i-need-coffee", "ต้นฉบับ: Don’t Talk, I Need Coffee"],
    ["https://pepess1.itch.io/comand-select", "ต้นฉบับ: COMMAND SELECT"],
    ["https://mmaxez.itch.io/veggie-dash", "ต้นฉบับ: Veggie Dash"],
    ["https://tanawatkhaitom.itch.io/night-fear", "ต้นฉบับ: Night Fear"],
  ];
  return <><h2 id="modal-title">ข้อมูลและภาพที่ใช้</h2><p className="modal-lead">รายละเอียดคอร์สมาจากทีม Hamster Hub ผลงานและเส้นทางรุ่นพี่อ้างอิงจากตารางและหน้าโปรเจกต์ต้นฉบับ</p>
    <div className="source-links">{links.map(([url,label])=><a key={url} href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}</div>
    <p className="modal-footnote">ภาพจิบิเป็นภาพประกอบที่สร้างใหม่สำหรับอธิบายคอร์ส ส่วนภาพในหมวดผลงานจริงมาจากงานต้นฉบับ ผลงานเหล่านี้ไม่ใช่ผลลัพธ์ของคอร์สรุ่นที่กำลังเปิด</p></>;
}
