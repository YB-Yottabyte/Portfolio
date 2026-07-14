"use client";

import { useEffect } from "react";

const SECTION_IDS = [
  "about",
  "education",
  "experience",
  "projects",
  "contact",
];

export function SectionMotion() {
  useEffect(() => {
    const sections = SECTION_IDS.flatMap((id) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const viewportHeight = window.innerHeight;
      const revealStart = viewportHeight * 0.96;
      const revealEnd = viewportHeight * 0.58;

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        const linearProgress = Math.min(
          1,
          Math.max(0, (revealStart - top) / (revealStart - revealEnd)),
        );
        const progress =
          linearProgress * linearProgress * (3 - 2 * linearProgress);
        const offset = (1 - progress) * 92;
        const scale = 0.985 + progress * 0.015;

        section.style.opacity = String(0.08 + progress * 0.92);
        section.style.filter = `blur(${(1 - progress) * 7}px)`;
        section.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
        section.style.transformOrigin = "50% 0%";
        section.style.willChange = "opacity, filter, transform";
      });
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      sections.forEach((section) => {
        section.style.removeProperty("opacity");
        section.style.removeProperty("filter");
        section.style.removeProperty("transform");
        section.style.removeProperty("transform-origin");
        section.style.removeProperty("will-change");
      });
    };
  }, []);

  return null;
}
