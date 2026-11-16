import { assetPath } from "@/lib/assets";
import { EnrollButton, VideoButton, ModalButton } from "./CourseProvider";

export function Hero() { return (
<section className="hero wrap">
<div className="hero-copy"><div className="eyebrow"><span className="tiny-square"></span> PROJECT BUILD SKILL <span className="version">COHORT 01 / 2026–27</span></div>
<h1>ชอบคอมแล้ว<br />สร้าง<span className="highlight">ของจริง</span><br />สักชิ้นกัน<span className="mint">.</span></h1>
<p className="hero-description">12 เดือน จาก “อยากทำเป็น”<br />สู่โปรเจกต์ที่ใช้จริง ไปแข่งได้ และเล่าในพอร์ตได้เต็มปาก</p>
<div className="hero-actions"><a className="btn primary" href="#roadmap">ดูเส้นทางของฉัน <span>↗</span></a><VideoButton className="watch-link"><span className="play-icon">▶</span> ดูผลงานที่สร้างได้</VideoButton></div>
<div className="hero-meta"><span><b>สำหรับ ม.ปลาย</b><small>เกม / แอป / IoT</small></span><span><b>1 ธ.ค. 69 – 1 ธ.ค. 70</b><small>ระยะเวลา 12 เดือน</small></span><span><b>19,990 บาท</b><small>ตลอดหลักสูตร</small></span></div>
</div>
<div className="hero-art brand-scene">
<div className="club-stamp">HAMSTER HUB <span>✳</span> BUILDER'S CLUB</div>
<div className="project-notebook">
<div className="notebook-bar"><span className="notebook-dots">● ● ●</span><span>OUR NEXT BIG LITTLE THING.</span><span>↗</span></div>
<div className="notebook-content"><span className="notebook-kicker">PROJECT_BUILD_01</span><h2>ไอเดียที่อยู่ในหัว<br /><span>ได้เวลาลองทำจริง</span></h2><div className="notebook-tabs"><span>01 คิด</span><i>→</i><span>02 สร้าง</span><i>→</i><span>03 ใช้จริง</span></div>
<div className="notebook-checklist"><p><span>✓</span> เริ่มจากเรื่องที่น้องชอบ</p><p><span>✓</span> ค่อย ๆ สร้างให้เป็นชิ้นงาน</p><p><span className="empty-box"></span> พาไปเจอผู้เล่นและผู้ใช้จริง</p></div>
<div className="notebook-code"><span>// ไม่ต้องมีคำตอบครบตั้งแต่วันแรก</span><code>idea <b>+</b> practice <b>+</b> community</code></div>
</div><div className="notebook-foot"><span>SMALL STEPS. REAL PROGRESS.</span><span>12 MONTHS ↗</span></div></div>
<img className="hero-hamster" src={assetPath("/assets/crew27-peek.webp")} alt="มาสคอตแฮมสเตอร์สีขาวส้มของ Hamster Hub โผล่มาให้กำลังใจ" fetchPriority="high" />
<div className="build-sticker"><span>✳</span><div>ทำเอง เล่าได้ ภูมิใจด้วย<small>ค่อย ๆ เก่งขึ้นไปด้วยกัน</small></div></div>
<div className="scene-scribble" aria-hidden="true">✷</div><div className="art-footnote">ตัวอย่างเส้นทางสร้างโปรเจกต์ของน้อง</div>
</div>
</section>
); }

export function PromiseStrip() { return (
<div className="promise-strip"><div className="wrap"><span>BUILD IT.</span><p>ทำจบจริง <i>✳</i> ได้ลงสนามจริง <i>✳</i> มีพอร์ตที่เล่าได้จริง</p><span>MAKE IT YOURS.</span></div></div>
); }

export function Audience() { return (
<section className="intro section wrap"><div className="intro-heading"><img className="intro-hamster" src={assetPath("/assets/crew27-l-e.webp")} alt="" loading="lazy" /><p className="eyebrow muted">01 / FIND YOUR START</p><h2>รู้ว่าชอบคอม<br />แต่ยังไม่รู้ว่า<span className="underline">จะไปต่อยังไง?</span></h2></div><div className="starting-points"><article><span>01</span><h3>ยังไม่มีผลงานเลย</h3><p>เรียนมาหลายอย่าง แต่พอจะทำโปรเจกต์ของตัวเอง ก็ไม่รู้จะเริ่มตรงไหน</p></article><article><span>02</span><h3>มีงานแล้ว แต่ยังไม่มั่นใจ</h3><p>ทำได้ระดับหนึ่ง แต่ยังไม่รู้ว่าดีพอไหม และควรพัฒนาส่วนไหนต่อ</p></article><article><span>03</span><h3>Self-learning มาเอง</h3><p>ติดปัญหาแล้ววนอยู่คนเดียว อยากมีทีม มีคนคุย และมีเป้าหมายให้ไปถึง</p></article></div></section>
); }

export function Comparison() { return (
<section className="comparison section"><div className="wrap comparison-layout"><div><p className="eyebrow muted">04 / A LITTLE DIRECTION. A BIG DIFFERENCE.</p><h2>เรียนเองได้<br />แล้วมีทีมช่วย<span className="mint">อะไร?</span></h2><p>การเรียนเองยังสำคัญ ที่นี่เพิ่มกระบวนการ<br />ให้คุณใช้สิ่งที่เรียนมาสร้างงานจนจบ</p><div className="quote-mark">“</div><blockquote>เป้าหมายคือวันที่คุณ<br />ทำโปรเจกต์ต่อเองได้</blockquote></div><div className="comparison-table"><table><caption className="sr-only">เปรียบเทียบการทำโปรเจกต์เองกับ Project Build Skill</caption><thead><tr><th>ระหว่างทาง</th><th>ทำเอง</th><th>Project Build Skill <span>↗</span></th></tr></thead><tbody><tr><th>วางแผน</th><td>หาทางและกำหนดเอง</td><td>มีเส้นทาง 3 ช่วงให้เดินตาม</td></tr><tr><th>ทีม</th><td>หาและแบ่งงานเอง</td><td>ฝึกทำโปรเจกต์กลุ่มตาม Role</td></tr><tr><th>ทักษะ</th><td>เลือกเรียนและฝึกเอง</td><td>ใช้โจทย์โปรเจกต์พัฒนาทักษะ</td></tr><tr><th>ลงสนาม</th><td>ค้นเวทีและเตรียมเอง</td><td>เตรียมพาโปรเจกต์ไปแข่งขัน</td></tr><tr><th>ผลงาน</th><td>หาคนลองใช้และขอความเห็น</td><td>พัฒนางานให้เจอการใช้งานจริง</td></tr><tr><th>พอร์ต</th><td>เรียบเรียงเรื่องราวเอง</td><td>เชื่อมโปรเจกต์กับคณะที่เล็ง</td></tr></tbody></table></div></div></section>
); }

export function Pricing() { return (
<section className="pricing section wrap" id="pricing"><div className="section-heading"><div><p className="eyebrow muted">05 / INVEST IN WHAT YOU CAN BUILD</p><h2>ปีนี้ สร้างอะไร<br /><span className="underline">ให้ตัวเองสักอย่าง</span></h2></div><p>หนึ่งเส้นทางสำหรับเด็กมัธยมปลาย<br />ที่อยากเปลี่ยนความชอบคอมให้เป็นความสามารถจริง</p></div><div className="pricing-grid"><div className="package"><div className="package-label"><span>PROJECT BUILD SKILL</span><span>12 MONTHS ↗</span></div><div className="price"><b>19,990</b><span>บาท / หลักสูตร</span></div><p>1 ธันวาคม 2569 – 1 ธันวาคม 2570</p><div className="package-tags"><span>เกม</span><span>แอป / เว็บ</span><span>IoT</span></div><EnrollButton className="btn primary">สนใจสมัครเรียน <span>↗</span></EnrollButton><EnrollButton className="package-consult">ยังไม่แน่ใจ? เตรียมคำถามไว้คุยกับทีม →</EnrollButton><small>วัน–เวลาเรียน รูปแบบการเรียน และเงื่อนไขชำระเงิน<br />ติดต่อทีมเพื่อยืนยันรายละเอียดก่อนสมัคร</small></div><div className="included"><h3>สิ่งที่คุณจะได้ลงมือทำ</h3><ol><li><span>01</span> โปรเจกต์เดี่ยวที่พาเห็นกระบวนการจนจบ</li><li><span>02</span> โปรเจกต์กลุ่มที่ได้ทำงานเป็นทีมจริง</li><li><span>03</span> ทักษะเฉพาะตาม Role ที่คุณเลือก</li><li><span>04</span> โปรเจกต์หลัก เกม / แอป / IoT อย่างน้อย 1 ชิ้น</li><li><span>05</span> การเตรียมผลงานไปเวทีแข่งขันที่เหมาะสม</li><li><span>06</span> Business Idea สำหรับขายหรือพิตช์</li><li><span>07</span> การฝึกพัฒนาและนำเสนองานให้คนใช้จริง</li><li><span>08</span> เล่มพอร์ตโฟลิโอที่เล่าโปรเจกต์ของตัวเอง</li></ol><div className="included-bottom"><ModalButton className="text-link" kind="quest">ลองดู Quest แรก <span>↗</span></ModalButton><ModalButton className="text-link" kind="parents">สรุปให้ผู้ปกครอง <span>↗</span></ModalButton></div></div></div></section>
); }

export function Faq() { return (
<section className="faq section wrap" id="faq"><div><p className="eyebrow muted">A FEW THINGS YOU MIGHT WONDER</p><h2>ก่อนเริ่ม<br /><span className="mint">ถามให้ชัดได้เลย</span></h2><p>ตัดสินใจจากสิ่งที่ตรงกับคุณ<br />และแผนที่คุณพร้อมลงมือทำ</p></div><div className="faq-list"><details><summary>ไม่มีผลงานเลย เรียนได้ไหม?<span>+</span></summary><p>หลักสูตรออกแบบมาสำหรับเด็ก ม.ปลายที่ยังไม่มีผลงาน มีงานแต่ไม่มั่นใจ หรือเรียนรู้เองมาแล้ว เดือนแรกเริ่มจากโปรเจกต์เดี่ยวเพื่อเข้าใจกระบวนการ ควรคุยกับทีมเรื่องพื้นฐานปัจจุบันและอุปกรณ์ก่อนสมัคร</p></details><details><summary>จะได้ทำเกม แอป หรือ IoT?<span>+</span></summary><p>เลือกแนวโปรเจกต์จากความสนใจและคณะที่เล็ง โดยคุยกับทีมเพื่อกำหนดขอบเขตที่ทำจบได้ ตัวอย่างใน Roadmap เป็นแนวคิดประกอบ ไม่ใช่โจทย์บังคับสำหรับทุกคน</p></details><details><summary>ใช้ AI ช่วยทำงานได้ไหม?<span>+</span></summary><p>ใช้ได้ เป้าหมายคือคุณเข้าใจ แก้ไข ทดสอบ และอธิบายสิ่งที่สร้างได้ด้วยตัวเอง คุณภาพของชิ้นงานและความเข้าใจกระบวนการเป็นสิ่งที่สำคัญ</p></details><details><summary>การันตีรางวัล หรือการติดมหาวิทยาลัยไหม?<span>+</span></summary><p>ไม่มีการรับประกันรางวัลหรือผลเข้ามหาวิทยาลัย การเข้าร่วมแข่งขันขึ้นอยู่กับคุณสมบัติ กติกา และกำหนดการของแต่ละเวที ส่วนการยื่นพอร์ตต้องตรวจเกณฑ์ของแต่ละคณะในปีที่สมัคร</p></details><details><summary>เรียนวันไหน ออนไลน์หรือออนไซต์?<span>+</span></summary><p>ช่วงหลักสูตรคือ 1 ธ.ค. 2569 – 1 ธ.ค. 2570 ส่วนวัน–เวลาเรียน รูปแบบการเรียน สถานที่ และเวลาที่ควรใช้ทำงานต่อสัปดาห์ ต้องยืนยันกับทีมก่อนสมัคร</p></details><details><summary>ราคา 19,990 บาท รวมอะไรบ้าง?<span>+</span></summary><p>เป็นราคาหลักสูตร 12 เดือนตามข้อมูลที่ทีมให้ ส่วนอุปกรณ์ IoT ซอฟต์แวร์ ค่าเดินทาง ค่าสมัครแข่งขัน และเงื่อนไขชำระเงินหรือคืนเงิน ยังไม่มีข้อมูลยืนยัน กรุณาสอบถามทีมก่อนชำระ</p></details></div></section>
); }

export function Closing() { return (
<section className="closing"><img className="closing-mascot" src={assetPath("/assets/crew27-l-e.webp")} alt="" loading="lazy" /><div className="wrap"><p className="eyebrow">YOUR IDEA DESERVES A FIRST BUILD.</p><h2>จาก “สักวันจะทำ”<br />เป็น <span>“นี่ไง เราทำเอง”</span></h2><EnrollButton className="btn dark">เริ่มวางแผนโปรเจกต์ของฉัน <span>↗</span></EnrollButton><div className="closing-bottom"><span>PROJECT BUILD SKILL</span><span>BUILD SOMETHING. BECOME SOMEONE.</span><span>2026 — 2027</span></div></div></section>
); }

export function Footer() { return (
<footer className="footer wrap"><a className="brand" href="#"><span className="brand-symbol"><img src={assetPath("/assets/logo.webp")} alt="" /></span><span>hamster<span className="brand-light">hub</span></span></a><p>พื้นที่ให้คนชอบคอม ได้เป็นคนสร้าง</p><a href="https://www.hamsterhub.co" target="_blank" rel="noopener noreferrer">เว็บไซต์ Hamster Hub ↗</a><ModalButton kind="sources">แหล่งข้อมูล</ModalButton><span>© 2026 Hamster Hub</span></footer>
); }

