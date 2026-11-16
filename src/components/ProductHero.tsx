"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import { EnrollButton, VideoButton } from "./CourseProvider";

const projects = [
  { name: "SLASH//SPEED", kind: "เกม", image: "https://pepesx231.github.io/Hamterco/img/work-slash-speed.webp", alt: "ภาพเกม SLASH//SPEED ผลงานในคอมมูนิตี้ Hamster Hub" },
  { name: "REVOICE", kind: "แอป", image: "https://pepesx231.github.io/Hamterco/img/w-revoice.webp", alt: "หน้าจอแอป REVOICE ผลงานในคอมมูนิตี้ Hamster Hub" },
];
export function ProductHero() {
  const [selected, setSelected] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      el.style.setProperty("--scroll-depth", reduced.matches ? "0px" : `${Math.max(-40, Math.min(80, -top * 0.13))}px`);
    };
    const scroll = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) scroll(); });
    observer.observe(el);
    window.addEventListener("scroll", scroll, { passive: true });
    reduced.addEventListener("change", update);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", scroll); reduced.removeEventListener("change", update); cancelAnimationFrame(frame); };
  }, []);
  return <section className="product-hero" ref={root} aria-labelledby="course-title"><div className="product-hero-inner wrap">
    <div className="product-copy">
      <h1 id="course-title">Project<br /><span>Build Skill</span></h1>
      <p className="product-promise">12 เดือน สร้างโปรเจกต์<br />ที่เป็นของตัวเอง</p>
      <p className="product-description">คอร์สสำหรับ ม.ปลาย พาทำเกม แอป หรือ IoT<br className="desktop-break" /> ตั้งแต่ไอเดียจนใช้จริง พร้อมลงแข่งและทำพอร์ต</p>
      <p className="product-offer">19,990 บาท ตลอดหลักสูตร<br /><span>1 ธ.ค. 2569 – 1 ธ.ค. 2570</span></p>
      <div className="product-actions"><EnrollButton className="btn primary">สมัครเรียน / คุยกับทีม</EnrollButton><a href="#roadmap" className="product-route-link">ดูเส้นทางการเรียน</a></div>
    </div>
    <div className="product-stage" ref={scene} onPointerMove={event => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      scene.current?.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
      scene.current?.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
    }} onPointerLeave={() => { scene.current?.style.setProperty("--tilt-x", "0deg"); scene.current?.style.setProperty("--tilt-y", "0deg"); }}>
      <div className="product-stack">
        <div className="project-screen screen-back" aria-hidden="true"><img src={projects[1-selected].image} alt="" width="1100" height="618" /></div>
        <figure className="project-screen screen-front" key={selected}>
          <img src={projects[selected].image} alt={projects[selected].alt} width="1100" height="618" fetchPriority="high" />
          <figcaption><span>{projects[selected].kind}</span><strong>{projects[selected].name}</strong><VideoButton className="project-video">ดูคลิปผลงาน</VideoButton></figcaption>
        </figure>
        <img className="product-mascot" src={assetPath("/assets/n-gamer.webp")} width="520" height="520" alt="มาสคอตแฮมสเตอร์ถือจอยเกม" fetchPriority="high" />
      </div>
      <div className="project-switcher" role="group" aria-label="เลือกดูตัวอย่างผลงาน">{projects.map((project, i) => <button type="button" key={project.name} aria-pressed={selected===i} onClick={() => setSelected(i)}>{project.name}</button>)}</div>
      <p className="product-proof-note">ตัวอย่างผลงานในคอมมูนิตี้ Hamster Hub<br />ผลงานของน้องในคอร์สจะพัฒนาจากไอเดียของตัวเอง</p>
    </div>
  </div></section>;
}
