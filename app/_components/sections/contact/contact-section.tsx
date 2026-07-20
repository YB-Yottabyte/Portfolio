import { HiOutlineMail } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import styles from "./contact-section.module.css";

const EMAIL = "sairithwik0108@gmail.com";

const DIRECT_LINKS = [
  {
    label: "Email",
    description: "Best for project details and opportunities.",
    href: `mailto:${EMAIL}`,
    icon: HiOutlineMail,
  },
  {
    label: "LinkedIn",
    description: "For research, work, and a quick introduction.",
    href: "https://www.linkedin.com/in/rithwik0801",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    description: "See what I’m building and how I approach code.",
    href: "https://github.com/YB-Yottabyte",
    icon: SiGithub,
  },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <div className={styles.introduction}>
            <p className={styles.eyebrow}>Contact · let’s connect</p>
            <h2 id="contact-title" className={styles.title}>
              Let’s talk about what you’re building
            </h2>
          </div>
          <p className={styles.description}>
            Feel free to reach out to chat or talk about opportunities! :)
          </p>
        </header>

        <div className={styles.contactPanel}>
          <div className={styles.direct}>
            <h3>Reach me directly</h3>
            <div className={styles.socialLinks}>
              {DIRECT_LINKS.map((link) => {
                const Icon = link.icon;
                const external = link.href.startsWith("http");

                return (
                  <a
                    key={link.label}
                    className={styles.socialLink}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                  >
                    <span className={styles.socialIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span className={styles.socialCopy}>
                      <strong>{link.label}</strong>
                      <small>{link.description}</small>
                    </span>
                    <HiArrowUpRight
                      className={styles.linkArrow}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
