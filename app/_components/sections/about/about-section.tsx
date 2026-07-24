"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { InterfaceGrid } from "@/app/_components/effects/interface-grid";
import { assetPath } from "@/app/_lib/asset-path";
import styles from "./about-section.module.css";

const PHOTO_FRAME = {
  label: "Portrait",
  position: "50% 42%",
  scale: "1",
} as const;

const INTERESTS = [
  "Machine Learning",
  "Computer Vision",
  "Scientific Computing",
  "Full-Stack Development",
  "Software Engineering",
  "Research",
] as const;

export function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <InterfaceGrid variant="about" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>About · profile 001</p>
          <div className={styles.headerLine} aria-hidden="true">
            <span />
          </div>
        </header>

        <div className={styles.introduction}>
          <div className={styles.copy}>
            <h2 id="about-title" className={styles.title}>
              Who Am <span>I?</span>
            </h2>

            <div className={styles.credentials} aria-label="Education summary">
              <span>
                <strong>4.00</strong>
                GPA
              </span>
              <span>
                <strong>CS</strong>
                Major
              </span>
              <span>
                <strong>DS</strong>
                Minor
              </span>
            </div>

            <div className={styles.biography}>
              <p>
                I&apos;m <strong>Sai Rithwik Kukunuri</strong>, a rising senior
                at Arizona State University, majoring in{" "}
                <strong>Computer Science</strong> with a minor in{" "}
                <strong>Data Science</strong>, Honors (4.00 GPA). My background
                spans machine learning, computer vision, scientific computing,
                and full-stack development.
              </p>

              <p>
                I&apos;ve built full-stack and cloud-native applications,
                supported Java/JavaFX projects as a Software Engineering TA,
                and contributed to data science and network security research.
                My work includes developing web platforms, improving software
                workflows, working with data, and helping teams build reliable
                applications. I&apos;m interested in creating practical software
                systems that are useful, scalable, and easy to understand.
              </p>

              <p>
                I&apos;m interested in <strong>Software Development</strong>,{" "}
                <strong>AI/ML Systems</strong>, <strong>Computer Vision</strong>,{" "}
                <strong>Scientific Computing</strong>,{" "}
                <strong>Data Science</strong>, <strong>Cloud Engineering</strong>,
                and <strong>Research</strong>. I focus on building scalable,
                practical tools that connect software, data, and real-world
                problem solving.
              </p>
            </div>
          </div>

          <div className={styles.photoColumn}>
            <div className={styles.photoStage} aria-label="Portrait">
              <figure
                className={styles.photoCard}
                data-slot="0"
                style={
                  {
                    "--photo-position": PHOTO_FRAME.position,
                    "--photo-scale": PHOTO_FRAME.scale,
                  } as CSSProperties
                }
              >
                <span className={styles.imageFrame}>
                  <Image
                    src={assetPath(
                      "Sai%20Rithwik%20Kukunuri%20Photo.png",
                    )}
                    alt="Portrait of Sai Rithwik Kukunuri"
                    width={1122}
                    height={1402}
                    sizes="(max-width: 48rem) 78vw, 34vw"
                  />
                </span>
                <figcaption className={styles.photoCaption}>
                  <span>{PHOTO_FRAME.label}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className={styles.interests}>
          <div className={styles.interestsHeading}>
            <p>Areas of interest</p>
          </div>

          <ol>
            {INTERESTS.map((interest, index) => (
              <li key={interest}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{interest}</strong>
                <i aria-hidden="true">↗</i>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
