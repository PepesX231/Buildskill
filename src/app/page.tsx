import { CourseProvider, EnrollButton } from "@/components/CourseProvider";
import { Header } from "@/components/Header";
import { CourseFooter } from "@/components/IllustratedCourse";
import { ExperienceHero, CourseOverview, LearningExperience, SelectedEvidence, PortfolioExperience, CourseDecision } from "@/components/CourseExperience";
export default function Home(){
 return <CourseProvider><Header /><main id="main" className="course-experience"><ExperienceHero /><CourseOverview /><LearningExperience /><SelectedEvidence /><PortfolioExperience /><CourseDecision /></main><CourseFooter /><div className="mobile-cta"><div><b>19,990 บาท</b><span>12 เดือน · เริ่ม 1 ธ.ค. 69</span></div><EnrollButton className="btn primary small">คุยกับทีม</EnrollButton></div></CourseProvider>;
}
