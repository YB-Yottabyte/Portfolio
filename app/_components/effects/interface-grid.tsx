import styles from "./interface-grid.module.css";

type InterfaceGridProps = {
  variant:
    | "about"
    | "education"
    | "skills"
    | "experience"
    | "projects"
    | "contact";
};

const FRAME_LABELS: Record<InterfaceGridProps["variant"], string> = {
  about: "01 / Profile",
  education: "02 / Education",
  skills: "03 / Capabilities",
  experience: "04 / Experience",
  projects: "05 / Selected work",
  contact: "06 / Contact",
};

export function InterfaceGrid({ variant }: InterfaceGridProps) {
  return (
    <div className={styles.layer} data-variant={variant} aria-hidden="true">
      <div className={styles.columns} />
      <div className={styles.frameLabel}>
        <span />
        <p>{FRAME_LABELS[variant]}</p>
        <i>12 col</i>
      </div>
      <div className={styles.axis}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.palette}>
        <span />
        <span />
        <span />
      </div>
      <span className={`${styles.corner} ${styles.cornerTop}`} />
      <span className={`${styles.corner} ${styles.cornerBottom}`} />
    </div>
  );
}
