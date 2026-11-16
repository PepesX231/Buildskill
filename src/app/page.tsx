import { CourseProvider, EnrollButton } from "@/components/CourseProvider";
import { Header } from "@/components/Header";
import { Roadmap } from "@/components/Roadmap";
import { Showcase } from "@/components/Showcase";
import { Hero, Audience, Comparison, Pricing, Faq, Closing, Footer } from "@/components/StaticSections";

export default function Home() {
  return <CourseProvider>
    <Header />
    <main id="main"><Hero /><Audience /><Roadmap /><Showcase /><Comparison /><Pricing /><Faq /><Closing /></main>
    <Footer />
    <div className="mobile-cta"><div><b>19,990 บาท</b><span>12 เดือน · เริ่ม 1 ธ.ค. 69</span></div><EnrollButton className="btn primary small">สนใจสมัคร</EnrollButton></div>
  </CourseProvider>;
}
