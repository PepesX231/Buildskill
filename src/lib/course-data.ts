import { assetPath } from "./assets";
export type TrackKey = "game" | "app" | "iot";
export type Track = { name: string; examples: string[]; quest: string[] };
export type ProofCategory = "awards" | "admissions";
export type ProofRecord = { name: string; eyebrow: string; graphic: string; sub: string; badge: string; color: string; person?: string; body: string; role: string; href: string; link: string; image?: string };
export const LINE_URL = "https://page.line.me/jkm4247u?openQrModal=true";
export const tracks: Record<TrackKey, Track> = {
 game:{name:'เกม',examples:['แนวคิดตัวอย่าง: เกมสั้น 1 ด่านที่เล่นจบได้จริง','ฝึกตามบทบาท: Programmer ฝึก OOP / Art ฝึก Shader','ต่อยอดเกม ทดสอบกับผู้เล่น และเตรียมนำเสนอ'],quest:['เลือกประสบการณ์ที่อยากให้คนเล่นรู้สึก เช่น ลุ้น ขำ หรือประหลาดใจ','เขียนกติกาหลักให้จบใน 1 ประโยค และสเก็ตช์ฉาก 1 ด่าน','ทำต้นแบบให้ลองเล่นได้ แล้วชวนเพื่อนลองโดยไม่บอกวิธีเล่น','จดจุดที่เพื่อนงง 3 จุด แล้วเลือกแก้ 1 จุดก่อนเพิ่มฟีเจอร์']},
 app:{name:'แอป / เว็บ',examples:['แนวคิดตัวอย่าง: แอปเล็ก ๆ ที่แก้ปัญหาได้ 1 เรื่อง','ฝึกแบ่งงาน: โค้ด / หน้าจอ / ประสบการณ์ผู้ใช้','ให้คนลองใช้ เก็บปัญหา และคิดคุณค่าทางธุรกิจ'],quest:['เลือกปัญหาเล็ก ๆ ในชีวิตประจำวันที่อยากแก้ 1 เรื่อง','คุยกับคนที่พบปัญหาจริง แล้วสเก็ตช์หน้าจอหลัก 3 หน้า','ทำต้นแบบที่ทำงานหลักได้ 1 อย่าง ให้คนลองใช้','จดสิ่งที่ใช้ยากและเลือกแก้สิ่งที่ขวางการใช้งานที่สุด']},
 iot:{name:'IoT',examples:['แนวคิดตัวอย่าง: อุปกรณ์ที่ตรวจวัดและตอบสนองได้','ฝึกแบ่งงาน: อุปกรณ์ / โปรแกรม / แสดงผลข้อมูล','ลองในสถานการณ์จริง และเตรียมสาธิตการทำงาน'],quest:['เลือกสิ่งที่อยากวัด เช่น แสง อุณหภูมิ หรือระดับน้ำ','วาดการทำงานจากเซนเซอร์: โปรแกรม: การแสดงผล','ทำต้นแบบอ่านค่าได้ด้วยอุปกรณ์ที่มี หรือโปรแกรมจำลอง','ลองเปลี่ยนเงื่อนไขและจดว่าค่าที่อ่านได้สมเหตุสมผลไหม']}
};

export const records: Record<ProofCategory, ProofRecord[]> = {
 awards:[
 {name:'Karma',eyebrow:'NSC 2026 / GAME',graphic:'KARMA',sub:'GAME PROJECT',badge:'TOP 2',color:'',person:'มาริโอ้',body:'บันทึกผล NSC 2026 ประเภทเกม: Top 2',role:'ผู้นำโปรเจกต์: มาริโอ้ ตามรายการผลงานที่ทีมรวบรวม',href:'https://www.facebook.com/100000550526763/videos/oa.1802609267598780/2972173776459512',link:'ดูคลิปผลงาน'},
 {image:assetPath("/assets/sc-revoice.webp"),name:'REVOICE',eyebrow:'NSC 2025 / APP',graphic:'REVOICE',sub:'APP PROJECT',badge:'TOP 1',color:'blue',person:'ไอดิน',body:'บันทึกผล NSC 2025 ประเภทแอป: Top 1',role:'ผู้นำโปรเจกต์: ไอดิน ตามรายการผลงานที่ทีมรวบรวม',href:'https://www.facebook.com/100000550526763/videos/oa.1528925231792269/1754855858728388',link:'ดูคลิปผลงาน'},
 {name:'Noas',eyebrow:'NSC 2025 / GAME',graphic:'NOAS',sub:'GAME PROJECT',badge:'TOP 2',color:'orange',person:'ไอซ์',body:'บันทึกผล NSC 2025 ประเภทเกม: Top 2',role:'ผู้นำโปรเจกต์: ไอซ์ ตามรายการผลงานที่ทีมรวบรวม',href:'https://www.facebook.com/100000550526763/videos/oa.1528925231792269/1485088192630896',link:'ดูคลิปผลงาน'},
 {name:'Veggie Grow',eyebrow:'TGF 2025 / FINALIST',graphic:'VEGGIE',sub:'GROW YOUR IDEA',badge:'FINALIST',color:'',person:'เป๊ป',body:'บันทึกผล TGF 2025: Finalist',role:'ผู้นำโปรเจกต์: เป๊ป ตามรายการผลงานที่ทีมรวบรวม',href:'https://youtu.be/Q49xwuCOzEI',link:'ดูคลิปผลงาน'},
 {name:'Whisker Odyssey',eyebrow:'NSC 2024 / GAME',graphic:'WHISKER',sub:'ODYSSEY',badge:'TOP 2',color:'purple',person:'บีม',body:'บันทึกผล NSC 2024 ประเภทเกม: Top 2',role:'ผู้นำโปรเจกต์: บีม ตามรายการผลงานที่ทีมรวบรวม',href:'https://www.facebook.com/reel/1537303340552554',link:'ดูคลิปผลงาน'}
 ],
 admissions:[
 {name:'แมค: CEDT จุฬาฯ',eyebrow:'HAMSTER HUB / 2024',graphic:'CEDT',sub:'CHULALONGKORN',badge:'PORTFOLIO',color:'purple',body:'โปรเจกต์ Veggie Dash · ตามบันทึกเส้นทางผู้เรียนปี 2024',role:'บทบาทที่เล่าไว้: Leader ทีมโปรเจกต์ NSC และพัฒนาเกมร่วมกับทีม',href:'https://mmaxez.itch.io/veggie-dash',link:'เปิดเกม Veggie Dash'},
 {name:'แพทริค: วิศวะคอม',eyebrow:'KMITL INTERNATIONAL / 2024',graphic:'BUILD',sub:'THEN TELL YOUR STORY',badge:'PORTFOLIO',color:'blue',body:'วิศวะคอม ลาดกระบัง Inter · ตามบันทึกเส้นทางผู้เรียนปี 2024',role:'บทบาทที่เล่าไว้: เขียนโค้ด ทำแมพและ UI ก่อนรับหน้าที่ Project Leader ของ mrCITY',href:'https://play.google.com/store/apps/details?id=com.HamsterHub.mrCity',link:'ดูแอป mrCITY'},
 {name:'ฮิว: IT บางมด',eyebrow:'KMUTT / 2025',graphic:'IT',sub:'KING MONGKUT’S THONBURI',badge:'PORTFOLIO',color:'',body:'IT มจธ. · ตามรายการมหาวิทยาลัยที่ทีมรวบรวมปี 2025',role:'เปิดดูเล่มพอร์ตต้นทาง เพื่อดูวิธีนำเสนอผลงานและเส้นทางการเรียนรู้',href:'https://drive.google.com/file/d/1jF68L--EmdazMN_lL9GuE2m9wH2Fj9Ms/view',link:'เปิดพอร์ตต้นทาง'},
 {name:'โฟกัส: วิศวะคอม มหิดล',eyebrow:'MAHIDOL / 2024',graphic:'CREATE',sub:'A PROJECT OF YOUR OWN',badge:'PORTFOLIO',color:'orange',body:'วิศวะคอม มหิดล · ตามบันทึกเส้นทางผู้เรียนปี 2024',role:'บทบาทที่เล่าไว้: Main code ของ Hamster Town และร่วมพัฒนา PHC Map',href:'https://tanawatkhaitom.itch.io/night-fear',link:'ดูเกม Night Fear'}
 ]
};
