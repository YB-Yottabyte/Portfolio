import { SectionMotion } from "@/app/_components/effects/section-motion";
import { ImageRevealHero } from "@/app/_components/hero/image-reveal-hero";
import Footer from "@/app/_components/layout/footer/footer";
import { AboutSection } from "@/app/_components/sections/about/about-section";
import { ContactSection } from "@/app/_components/sections/contact/contact-section";
import { EducationSection } from "@/app/_components/sections/education/education-section";
import { ExperienceSection } from "@/app/_components/sections/experience/experience-section";
import { ProjectsSection } from "@/app/_components/sections/projects/projects-section";
import { SkillsSection } from "@/app/_components/sections/skills/skills-section";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <ImageRevealHero />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <SectionMotion />
    </>
  );
}
