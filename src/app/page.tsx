import { CourseProvider, EnrollButton } from "@/components/CourseProvider";
import { Header } from "@/components/Header";
import { IllustratedHero, IllustratedRoadmap, IllustratedComparison, IllustratedPackage, CourseFooter } from "@/components/IllustratedCourse";
import { RealWorkShowcase } from "@/components/RealWorkShowcase";

export default function Home() {
  return <CourseProvider>
    <Header />
    <main id="main"><IllustratedHero /><IllustratedRoadmap /><IllustratedComparison /><RealWorkShowcase /><IllustratedPackage /></main>
    <CourseFooter />
    <div className="mobile-cta"><div><b>19,990 บาท</b><span>12 เดือน · เริ่ม 1 ธ.ค. 69</span></div><EnrollButton className="btn primary small">สนใจสมัคร</EnrollButton></div>
  </CourseProvider>;
}
