import { ImageRevealHero } from "./image-reveal-hero";
import { AboutSection } from "./about-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";
import { ContactSection } from "./contact-section";
import Footer from "./footer";
import { SectionMotion } from "./section-motion";

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
