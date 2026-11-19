import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { assetPath } from "@/lib/assets";
import "./base.css";
import "./illustrated.css";
import "./navigation.css";
import "./background-art.css";
import "./product.css";
import "./experience.css";
import "./wire-layout.css";
import "./hamster-theme.css";

export const metadata: Metadata = {
  title: "Project Build Skill | Hamster Hub",
  description: "คอร์ส 12 เดือนสำหรับ ม.ปลาย พาทำเกม แอป หรือ IoT ให้จบ ทดลองกับผู้ใช้ เตรียมลงแข่ง และทำเล่มพอร์ต ราคา 19,990 บาท",
  alternates: { canonical: "https://pepesx231.github.io/Buildskill/" },
  openGraph: {
    title: "Project Build Skill | สร้างของที่เป็นเรา",
    description: "1 ธ.ค. 2569 – 1 ธ.ค. 2570 · 12 เดือน · Hamster Hub",
    locale: "th_TH",
    type: "website",
    images: [{ url: "https://pepesx231.github.io/Buildskill/assets/demo/slash-gameplay.webp", width: 1280, height: 650, alt: "เกม SLASH//SPEED ที่นักเรียนในคอมมูนิตี้ Hamster Hub สร้าง" }],
  },
};

const courseArt = Object.fromEntries(
  ["stage", "spotlight", "paper", "blue", "pink", "apricot", "note"].map((name) => [
    `--art-${name}`,
    `url("${assetPath(`/assets/background/prints/${name}.jpg`)}")`,
  ]),
) as CSSProperties;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="th"><body style={courseArt}>{children}</body></html>;
}
