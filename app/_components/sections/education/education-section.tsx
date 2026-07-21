import Image from "next/image";
import type { CSSProperties } from "react";
import { assetPath } from "@/app/_lib/asset-path";
import styles from "./education-section.module.css";

const FOCUS_AREAS = [
  "Software Engineering",
  "Machine Learning",
  "Computer Vision",
  "Data Systems",
  "Full-Stack Development",
];

export function EducationSection() {
  return (
    <section
      id="education"
      className={styles.section}
      aria-labelledby="education-title"
      style={
        {
          "--education-background": `url("${assetPath("asu-tempe-gallery.jpg")}")`,
        } as CSSProperties
      }
    >
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <h2 id="education-title">Education</h2>
          <p>Academic record</p>
        </header>

        <div className={styles.educationStack}>
          <article className={styles.record}>
            <div className={styles.recordMain}>
              <div className={styles.recordTopline}>
                <span>Arizona State University</span>
              </div>

              <div className={styles.degreeBlock}>
                <p>Undergraduate · Honors</p>
                <h3>Bachelor of Science in Computer Science</h3>
                <span>Minor in Data Science</span>
              </div>

              <div className={styles.metrics} aria-label="Academic highlights">
                <div>
                  <strong>4.00</strong>
                  <span>GPA</span>
                </div>
                <div>
                  <strong>CS</strong>
                  <span>Major</span>
                </div>
                <div>
                  <strong>DS</strong>
                  <span>Minor</span>
                </div>
              </div>

              <div className={styles.focus}>
                <p>Academic focus</p>
                <ul>
                  {FOCUS_AREAS.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className={styles.identity} aria-label="ASU affiliation">
              <div className={styles.logoFrame}>
                <Image
                  src={assetPath("images/asu.png")}
                  alt="Arizona State University"
                  width={410}
                  height={331}
                />
              </div>
              <div className={styles.identityFooter}>
                <span>Current academic chapter</span>
                <strong>ASU</strong>
                <span>Tempe, AZ</span>
              </div>
            </aside>
          </article>

          <article className={styles.acpCard}>
            <div className={styles.acpLogo}>
              <Image
                src={assetPath("images/acp.png")}
                alt="Arizona College Preparatory Erie Campus"
                width={615}
                height={650}
              />
            </div>
            <div className={styles.acpContent}>
              <p>Earlier academic chapter</p>
              <h3>Arizona College Preparatory Erie Campus</h3>
              <div className={styles.acpFooter}>
                <span>College preparatory education</span>
                <strong>ACP</strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
