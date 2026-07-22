"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiCss,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpencv,
  SiOpenjdk,
  SiPostgresql,
  SiPytorch,
  SiPython,
  SiQdrant,
  SiReact,
  SiScikitlearn,
  SiSpringboot,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbDatabase, TbScan } from "react-icons/tb";
import styles from "./skills-section.module.css";

type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

type SkillGroup = {
  id: string;
  number: string;
  label: string;
  accent: string;
  featured?: boolean;
  skills: Skill[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai-vision",
    number: "01",
    label: "AI/ML & Computer Vision",
    accent: "#76c7c0",
    featured: true,
    skills: [
      { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#ff9e0f" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#f89939" },
      { name: "OpenCV", icon: SiOpencv, color: "#6d9cff" },
      { name: "NumPy", icon: SiNumpy, color: "#6486d9" },
      { name: "SAM 2", icon: TbScan, color: "#76c7c0" },
      { name: "Qdrant", icon: SiQdrant, color: "#dc4668" },
    ],
  },
  {
    id: "languages",
    number: "02",
    label: "Languages",
    accent: "#c3df6e",
    skills: [
      { name: "Python", icon: SiPython, color: "#4b8bbe" },
      { name: "TypeScript", icon: SiTypescript, color: "#5b9bd5" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "Java", icon: SiOpenjdk, color: "#e76f51" },
      { name: "C++", icon: SiCplusplus, color: "#659ad2" },
      { name: "SQL", icon: TbDatabase, color: "#c3df6e" },
    ],
  },
  {
    id: "backend",
    number: "03",
    label: "Backend & APIs",
    accent: "#e6b86a",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#2db7a3" },
      { name: "Flask", icon: SiFlask, color: "#f3eee1" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
      { name: "REST APIs", icon: TbApi, color: "#e6b86a" },
    ],
  },
  {
    id: "data",
    number: "04",
    label: "Data Systems",
    accent: "#8ed6cf",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#699eca" },
      { name: "MySQL", icon: SiMysql, color: "#5c91b5" },
    ],
  },
  {
    id: "frontend",
    number: "05",
    label: "Frontend & Design",
    accent: "#76c7c0",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#f3eee1" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: SiCss, color: "#8f72cc" },
      { name: "Figma", icon: SiFigma, color: "#f24e1e" },
    ],
  },
];

const TOTAL_SKILLS = SKILL_GROUPS.reduce(
  (total, group) => total + group.skills.length,
  0,
);

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => section.toggleAttribute("data-visible", entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={styles.section}
      aria-labelledby="skills-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <p>Technical toolkit</p>
            <h2 id="skills-title">Skills</h2>
          </div>
          <div className={styles.headerAside}>
            <p className={styles.headerDescription}>
              A focused toolkit spanning intelligent systems, software
              engineering, data platforms, and interface design.
            </p>
            <div className={styles.headerStats} aria-label="Skills summary">
              <span>
                <strong>{String(SKILL_GROUPS.length).padStart(2, "0")}</strong>
                disciplines
              </span>
              <span>
                <strong>{String(TOTAL_SKILLS).padStart(2, "0")}</strong>
                tools
              </span>
            </div>
          </div>
        </header>

        <div className={styles.skillsPanel}>
          <div className={styles.panelLead}>
            <p>Capabilities · {String(SKILL_GROUPS.length).padStart(2, "0")} disciplines</p>
          </div>

          <div className={styles.skillsGrid}>
            {SKILL_GROUPS.map((group) => (
              <article
                key={group.id}
                className={`${styles.skillCard} ${group.featured ? styles.featuredCard : ""}`}
                style={{ "--group-accent": group.accent } as CSSProperties}
              >
                <div className={styles.cardHeader}>
                  <span>{group.number}</span>
                  <div>
                    <p>{group.featured ? "Primary focus" : "Skill cluster"}</p>
                    <h3>{group.label}</h3>
                  </div>
                </div>

                <ul className={styles.skillList}>
                  {group.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <li key={skill.name}>
                        <Icon style={{ color: skill.color }} aria-hidden="true" />
                        <span>{skill.name}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className={styles.cardFooter}>
                  <strong>{String(group.skills.length).padStart(2, "0")}</strong>
                  <span>tools</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
