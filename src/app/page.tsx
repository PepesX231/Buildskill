import { CourseProvider, EnrollButton } from "@/components/CourseProvider";
import { Header } from "@/components/Header";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { ProductHero } from "@/components/ProductHero";
import { Showcase } from "@/components/Showcase";
import { Audience, Comparison, Pricing, Faq, Closing, Footer } from "@/components/StaticSections";

export default function Home() {
  return <CourseProvider>
    <Header />
    <main id="main"><ProductHero /><JourneyTimeline /><Audience /><Showcase /><Comparison /><Pricing /><Faq /><Closing /></main>
    <Footer />
    <div className="mobile-cta"><div><b>19,990 บาท</b><span>12 เดือน · เริ่ม 1 ธ.ค. 69</span></div><EnrollButton className="btn primary small">สนใจสมัคร</EnrollButton></div>
  </CourseProvider>;
}
