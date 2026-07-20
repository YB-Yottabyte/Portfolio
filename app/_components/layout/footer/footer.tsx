"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={styles.footer}
      data-visible={isVisible ? "true" : "false"}
    >
      <div className={styles.dither} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.primary}>
          <div className={`${styles.brand} ${styles.reveal}`}>
            <a className={styles.wordmark} href="#main-content">
              <span className={styles.monogram}>SR</span>
              <span>Sai Rithwik</span>
            </a>
            <p className={styles.tagline}>
              Building systems that understand the visual world
            </p>
            <p className={styles.descriptor}>
              Computer vision · AI · Full stack
            </p>
          </div>

          <div className={`${styles.column} ${styles.reveal}`}>
            <p className={styles.heading}>Navigate</p>
            <a className={styles.link} href="#main-content">
              Back to top
            </a>
          </div>

          <div className={`${styles.column} ${styles.reveal}`}>
            <p className={styles.heading}>Explore</p>
            <div className={styles.links}>
              <a className={styles.link} href="#about">
                About
              </a>
              <a className={styles.link} href="#education">
                Education
              </a>
              <a className={styles.link} href="#skills">
                Skills
              </a>
              <a className={styles.link} href="#experience">
                Experience
              </a>
              <a className={styles.link} href="#projects">
                Projects
              </a>
              <a className={styles.link} href="#contact">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.meta} ${styles.reveal}`}>
          <p>© 2026 Sai Rithwik Kukunuri</p>
          <p>Designed and built with care</p>
          <p className={styles.status}>
            <span aria-hidden="true" /> Systems · research · interfaces
          </p>
        </div>
      </div>
    </footer>
  );
}
