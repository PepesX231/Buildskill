"use client";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assets";
import { EnrollButton } from "./CourseProvider";

const links = [["#main", "หน้าหลัก"], ["#roadmap", "เส้นทางการเรียน"], ["#showcase", "ผลงาน"], ["#pricing", "รายละเอียดคอร์ส"], ["#faq", "คำถามที่พบบ่อย"]];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <><a className="skip" href="#main">ข้ามไปเนื้อหา</a>
    <header className="site-header"><div className="site-nav">
      <a className="site-wordmark" href="#main" aria-label="Hamster Hub หน้าหลัก" onClick={() => setMenuOpen(false)}><img src={assetPath("/assets/logo.webp")} width="36" height="36" alt="" /><span>Hamster Hub</span></a>
      <nav aria-label="เมนูหลัก" id="navigation" className={`site-menu${menuOpen?" is-open":""}`}>
        {links.map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <EnrollButton className="site-contact">คุยกับทีม</EnrollButton>
      <button type="button" className="site-menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen?"ปิดเมนู":"เปิดเมนู"} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </div></header>
  </>;
}
