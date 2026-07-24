import { HiOutlineDocumentText, HiOutlineMail } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { InterfaceGrid } from "@/app/_components/effects/interface-grid";
import { assetPath } from "@/app/_lib/asset-path";
import styles from "./contact-section.module.css";

const EMAIL = "sairithwik0108@gmail.com";
const RESUME_PATH = assetPath(
  "Sai%20Rithwik%20Kukunuri%20Resume.pdf",
);

const DIRECT_LINKS = [
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: HiOutlineMail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rithwik0801",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/YB-Yottabyte",
    icon: SiGithub,
  },
  {
    label: "Resume",
    href: RESUME_PATH,
    icon: HiOutlineDocumentText,
  },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <InterfaceGrid variant="contact" />
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <div className={styles.introduction}>
            <p className={styles.eyebrow}>Contact · let’s connect</p>
            <h2 id="contact-title" className={styles.title}>
              Let’s talk about
              <br />
              <em>what you’re building</em>
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
                const external =
                  link.href.startsWith("http") || link.href.endsWith(".pdf");

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
