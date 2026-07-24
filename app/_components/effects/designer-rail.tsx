"use client";

import { useEffect, useState } from "react";
import styles from "./designer-rail.module.css";

const SECTIONS = [
  { id: "about", label: "Profile" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export function DesignerRail() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const sections = SECTIONS.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0, 0.1, 0.35, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.rail} aria-label="Page outline">
      <div className={styles.header}>
        <span />
        <p>Layers</p>
      </div>
      <ol>
        {SECTIONS.map((section, index) => {
          const active = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
              >
                <i>{String(index + 1).padStart(2, "0")}</i>
                <span>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
