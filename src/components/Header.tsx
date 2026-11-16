"use client";
import { assetPath } from "@/lib/assets";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <><a className="skip" href="#main">ข้ามไปเนื้อหา</a>
    <div className="announcement">รุ่นเริ่ม 1 ธ.ค. 2569 <span className="announcement-divider">/</span>12 เดือน ที่จะมีผลงานเป็นของตัวเอง <a href="#pricing">ดูรายละเอียด</a></div>
    <header className="header"><div className="nav wrap">
      <a className="brand" href="#" aria-label="Hamster Hub หน้าหลัก"><span className="brand-symbol" aria-hidden="true"><img src={assetPath("/assets/logo.webp")} alt="" width="160" height="160" /></span><span>hamster<span className="brand-light">hub</span></span></a>
      <nav aria-label="เมนูหลัก" id="navigation" className={menuOpen ? "open" : ""}>
        {[["#roadmap", "เส้นทางการเรียน"], ["#showcase", "ผลงานจริง"], ["#faq", "คำถามที่พบบ่อย"]].map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="btn small light enroll" href="#pricing">มาเริ่มโปรเจกต์กัน</a>
      <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
    </div></header></>;
}
