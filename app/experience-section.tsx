"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUpRight,
  HiMapPin,
} from "react-icons/hi2";
import styles from "./experience-section.module.css";

type Experience = {
  id: string;
  organization: string;
  role: string;
  client: string | null;
  startDate: string | null;
  endDate: string | null;
  duration: string | null;
  location: string;
  summary: string;
  impact: string[];
  technologies: string[];
  visual: "teaching" | "research" | "community" | "design";
  logo: string;
  logoCode: string;
  link: string | null;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "graphic-design-assistant",
    organization: "Thunderbird School of Global Management",
    role: "Graphic Design Assistant",
    client: null,
    startDate: "Mar 2026",
    endDate: "Present",
    duration: "5 mos",
    location: "Phoenix, Arizona · Hybrid",
    summary:
      "Creates digital and print design materials for Thunderbird School of Global Management, including social graphics, event promotions, branded stickers, and marketing assets.",
    impact: [
      "Designed clean, brand-aligned visuals for student engagement, events, and communications.",
      "Produced social media graphics, print materials, event promotions, and ready-to-use marketing assets.",
      "Edited layouts and maintained visual consistency across design deliverables.",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Canva", "Brand Design"],
    visual: "design",
    logo: "/images/Thunderbird.png",
    logoCode: "TBIRD",
    link: null,
  },
  {
    id: "undergraduate-research-assistant",
    organization: "ASU Biodesign Institute",
    role: "Undergraduate Research Assistant",
    client: null,
    startDate: "Jan 2026",
    endDate: "Present",
    duration: "7 mos",
    location: "Tempe, Arizona · Hybrid",
    summary:
      "Researches IPv4 IPID behavior under bursty network traffic, focusing on security, predictability, and traffic modeling.",
    impact: [
      "Modeled IPID behavior under bursty network traffic using MMPP, improving on traditional Poisson assumptions.",
      "Identified weaknesses in IPID selection methods affecting security and predictability.",
      "Built Python simulations and analytical models to evaluate collision risk and attack behavior.",
    ],
    technologies: ["Python", "MMPP", "Network Security", "Traffic Modeling"],
    visual: "research",
    logo: "/images/biodesign.png",
    logoCode: "ASU",
    link: null,
  },
  {
    id: "gdsc-graphic-design-officer",
    organization: "Google Developer Student Club at Arizona State University",
    role: "Graphic Design Officer",
    client: null,
    startDate: "Aug 2025",
    endDate: "Present",
    duration: "1 yr",
    location: "Tempe, Arizona",
    summary:
      "Designs digital branding and promotional materials for GDSC technical workshops and events, supporting outreach and student engagement.",
    impact: [
      "Created promotional visuals for technical workshops, events, and community outreach.",
      "Maintained a consistent visual identity across GDSC student-facing materials.",
      "Supported student engagement through clear, timely design communication.",
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Event Branding", "Outreach"],
    visual: "design",
    logo: "/images/GDSC.png",
    logoCode: "GDSC",
    link: null,
  },
  {
    id: "soda-graphic-designer",
    organization: "The Software Developers Association at ASU",
    role: "Graphic Designer",
    client: null,
    startDate: "Jan 2025",
    endDate: "Present",
    duration: "1 yr 7 mos",
    location: "Tempe, Arizona",
    summary:
      "Leads visual branding for SoDA events and initiatives, translating marketing objectives into cohesive design assets.",
    impact: [
      "Led visual branding for student events, initiatives, and marketing campaigns.",
      "Translated campaign goals into cohesive, engaging design assets.",
      "Supported consistent presentation across SoDA communications and event experiences.",
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Visual Branding", "Marketing"],
    visual: "design",
    logo: "/images/SoDA.png",
    logoCode: "SODA",
    link: null,
  },
  {
    id: "epics-team-lead",
    organization: "EPICS at ASU",
    role: "Team Lead",
    client: null,
    startDate: "Sep 2025",
    endDate: "Jan 2026",
    duration: "5 mos",
    location: "Tempe, Arizona",
    summary:
      "Led a data-integration project for the Arizona Technology Council, focused on backend development, REST API design, and secure data workflows.",
    impact: [
      "Coordinated team tasks, planning, and technical decisions to keep development aligned with client requirements.",
      "Built and improved backend services using Flask, Spring Boot, and AWS for scalable data processing.",
      "Developed secure data pipelines and API endpoints while reducing manual handling and streamlining operations.",
    ],
    technologies: ["Flask", "Spring Boot", "AWS", "REST APIs"],
    visual: "community",
    logo: "/images/epics.jpg",
    logoCode: "EPICS",
    link: null,
  },
  {
    id: "excelerate-intern",
    organization: "Excelerate",
    role: "Project Management & Cybersecurity Intern",
    client: null,
    startDate: "Jun 2023",
    endDate: "Jul 2023",
    duration: "2 mos",
    location: "United States · Remote",
    summary:
      "Supported project planning and cybersecurity work by coordinating milestones, managing risks, and developing a virtual machine with advanced security tools.",
    impact: [
      "Developed timelines, objectives, and cross-functional task plans as a project lead.",
      "Worked with project heads to monitor progress, mitigate risks, and deliver milestones on time.",
      "Created a virtual machine with advanced security tools for organization-wide use.",
    ],
    technologies: ["Project Management", "Cybersecurity", "Risk Management", "Virtual Machines"],
    visual: "research",
    logo: "/images/excelerate.png",
    logoCode: "EXC",
    link: "https://www.linkedin.com/company/82636387/",
  },
];

const getDateRange = (experience: Experience) => {
  if (experience.startDate && experience.endDate) {
    const range = `${experience.startDate} — ${experience.endDate}`;
    return experience.duration ? `${range} · ${experience.duration}` : range;
  }

  if (experience.startDate) return experience.startDate;
  if (experience.endDate) return experience.endDate;
  return "Current portfolio chapter";
};

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeExperience = EXPERIENCES[activeIndex];
  const progress = (activeIndex / (EXPERIENCES.length - 1)) * 100;

  const selectExperience = (index: number, focus = false) => {
    const nextIndex = (index + EXPERIENCES.length) % EXPERIENCES.length;
    setActiveIndex(nextIndex);

    if (focus) {
      requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
    }
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectExperience(index + 1, true);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectExperience(index - 1, true);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectExperience(0, true);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectExperience(EXPERIENCES.length - 1, true);
    }
  };

  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <p className={styles.eyebrow}>
              <span /> Experience archive
            </p>
            <h2 id="experience-title" className={styles.title}>
              Work, shaped by
              <br />
              <em>curiosity</em>
            </h2>
          </div>

          <div className={styles.headerAside}>
            <p>
              A growing body of work across design, research, engineering, and
              technical communities.
            </p>
            <div className={styles.summaryStats} aria-label="Experience summary">
              <span>
                <strong>06</strong> roles
              </span>
              <span>
                <strong>06</strong> disciplines
              </span>
            </div>
          </div>
        </header>

        <div className={styles.archive}>
          <div className={styles.archiveTopbar}>
            <span>Selected experience</span>
            <div className={styles.progressCopy}>
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <i />
              <span>{String(EXPERIENCES.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className={styles.chapterViewport}>
            <div
              className={styles.chapterRail}
              role="tablist"
              aria-label="Work experience chapters"
            >
              <div className={styles.railLine} aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>

              {EXPERIENCES.map((experience, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={experience.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`experience-tab-${experience.id}`}
                    aria-selected={active}
                    aria-controls="experience-panel"
                    tabIndex={active ? 0 : -1}
                    className={styles.chapter}
                    onClick={() => selectExperience(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span className={styles.chapterDot} />
                    <span className={styles.chapterNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{experience.organization}</strong>
                    <small>{experience.role}</small>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            id="experience-panel"
            role="tabpanel"
            aria-labelledby={`experience-tab-${activeExperience.id}`}
            className={styles.dossier}
          >
            <div key={activeExperience.id} className={styles.dossierInner}>
              <div className={styles.dossierMain}>
                <div className={styles.roleMeta}>
                  <span>{getDateRange(activeExperience)}</span>
                  <span>
                    <HiMapPin aria-hidden="true" />
                    {activeExperience.location}
                  </span>
                </div>

                <div className={styles.roleHeading}>
                  <p>{activeExperience.organization}</p>
                  <h3>{activeExperience.role}</h3>
                </div>

                <p className={styles.summary}>{activeExperience.summary}</p>

                <div className={styles.contributionBlock}>
                  <p>Contribution log</p>
                  <ul>
                    {activeExperience.impact.map((impact, index) => (
                      <li key={impact}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.dossierFooter}>
                  <div className={styles.tags} aria-label="Role focus areas">
                    {activeExperience.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  {activeExperience.link && (
                    <a
                      href={activeExperience.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Visit organization
                      <HiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <aside
                className={styles.signalCard}
                data-visual={activeExperience.visual}
                data-branded="true"
                aria-hidden="true"
              >
                {activeExperience.logo ? (
                  <div className={styles.brandStage}>
                    <div className={styles.brandTopline}>
                      <span>Organization profile</span>
                      <i />
                    </div>

                    <div className={styles.brandLogo}>
                      <Image
                        src={activeExperience.logo}
                        alt=""
                        width={410}
                        height={331}
                      />
                    </div>

                    <div className={styles.brandFooter}>
                      <span>{activeExperience.location}</span>
                      <strong>{activeExperience.logoCode}</strong>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.signalTop}>
                      <span>Role signal</span>
                      <i />
                      <span>Live</span>
                    </div>

                    <div className={styles.orbit}>
                      <span className={styles.orbitOne} />
                      <span className={styles.orbitTwo} />
                      <span className={styles.orbitCore}>
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <i className={styles.satelliteOne} />
                      <i className={styles.satelliteTwo} />
                    </div>

                    <div className={styles.signalBottom}>
                      <span>{activeExperience.visual}</span>
                      <strong>In practice</strong>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </article>

          <div className={styles.archiveControls}>
            <p>Use arrow keys or controls to explore the archive.</p>
            <div>
              <button
                type="button"
                aria-label="Previous experience"
                onClick={() => selectExperience(activeIndex - 1)}
              >
                <HiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next experience"
                onClick={() => selectExperience(activeIndex + 1)}
              >
                <HiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
