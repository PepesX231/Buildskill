import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./product-journey.css";
import "./navigation.css";

export const metadata: Metadata = {
  title: "Project Build Skill | Hamster Hub",
  description: "12 เดือน สำหรับน้อง ม.ปลายที่อยากสร้างเกม แอป หรือ IoT ให้เป็นโปรเจกต์จริง พร้อมทักษะ ทีม และพอร์ตโฟลิโอ ราคา 19,990 บาท",
  openGraph: {
    title: "Project Build Skill — ชอบคอมแล้ว สร้างของจริงสักชิ้นกัน",
    description: "1 ธ.ค. 2569 – 1 ธ.ค. 2570 • 12 เดือน • Hamster Hub",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="th"><body>{children}</body></html>;
}
