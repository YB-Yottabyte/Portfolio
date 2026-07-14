"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { HiArrowRight, HiArrowUpRight, HiChevronDown } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { assetPath } from "./asset-path";
import styles from "./projects-section.module.css";

type Category = "Research" | "AI / ML" | "Full Stack" | "Data" | "Systems";

type Project = {
  id: string;
  number: string;
  title: string;
  date: string;
  category: Category;
  description: string;
  achievements: string[];
  technologies: string[];
  metric: string;
  metricLabel: string;
  color: string;
  featured: boolean;
  image?: string;
  link?: string;
};

const GITHUB_PROFILE = "https://github.com/YB-Yottabyte";

const PROJECTS: Project[] = [
  {
    id: "stepwise",
    number: "01",
    title: "stepwise",
    date: "Interactive learning tool",
    category: "Full Stack",
    description:
      "An interactive DSA visualizer for learning algorithms and preparing for technical interviews.",
    achievements: [
      "Engineered step-by-step animations for sorting, searching, recursion, trees, graphs, and dynamic programming.",
      "Synced Python and C++ code views with highlighted execution steps to show runtime behavior.",
      "Added a variable state panel, plain-English explanations, and playback controls for self-paced learning.",
    ],
    technologies: ["Astro", "TypeScript", "React", "Tailwind CSS", "D3.js", "Python", "C++"],
    metric: "DSA",
    metricLabel: "Interactive visualizer",
    color: "#c3df6e",
    featured: true,
    image: assetPath("projects/stepwise-preview.png"),
    link: "https://github.com/YB-Yottabyte/stepwise",
  },
  {
    id: "tally",
    number: "02",
    title: "Tally",
    date: "Secure finance manager",
    category: "Systems",
    description:
      "A secure Java personal-finance manager for tracking expenses, managing budgets, and analyzing spending trends through a Swing desktop app and Spring Boot REST API.",
    achievements: [
      "Designed budget tracking, expense summaries, search, sorting, CSV import/export, and category-based analysis.",
      "Built alerts, rolling averages, forecasts, and anomaly detection to surface spending patterns.",
      "Added BCrypt desktop authentication, Keycloak OAuth2/OIDC for the API, Swagger/OpenAPI documentation, and JUnit 5 testing.",
    ],
    technologies: ["Java", "Swing", "Spring Boot", "Spring Security", "Hibernate", "Keycloak", "OAuth2", "JUnit 5"],
    metric: "Secure",
    metricLabel: "Finance manager",
    color: "#e6b86a",
    featured: true,
    image: assetPath("projects/tally-preview.png"),
    link: "https://github.com/YB-Yottabyte/Tally",
  },
  {
    id: "bourse",
    number: "03",
    title: "Bourse",
    date: "AI stock research platform",
    category: "AI / ML",
    description:
      "A full-stack AI stock-research platform for exploring U.S. stocks with live market data, company insights, news, charts, semantic search, and an AI finance assistant.",
    achievements: [
      "Implemented semantic stock search for natural-language queries and live market dashboards with prices, trending symbols, charts, and activity.",
      "Created company pages with financial statistics, business details, news, and historical charts.",
      "Integrated a Groq-powered assistant for stock and market questions in a responsive research interface.",
    ],
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "Groq", "Finnhub API", "Tailwind CSS"],
    metric: "Live",
    metricLabel: "Market research",
    color: "#76c7c0",
    featured: true,
    image: assetPath("projects/market-dashboard.png"),
    link: "https://github.com/YB-Yottabyte/Bourse",
  },
  {
    id: "bmd-45-traffic-state-detection",
    number: "04",
    title: "BMD-45 Traffic State Detection",
    date: "Computer vision project",
    category: "AI / ML",
    description:
      "A traffic-camera computer-vision project that detects vehicles and assigns unclear, low, medium, or high traffic-density states.",
    achievements: [
      "Fine-tuned a YOLO26n model on a streamed 150-image subset of the BMD-45 Bengaluru mobility dataset.",
      "Built Python inference that counts vehicles, assigns density states, and exports results to CSV.",
      "Created a Streamlit upload demo with original and annotated images, detection counts, and density labels.",
    ],
    technologies: ["Python", "YOLO26n", "OpenCV", "Streamlit", "Hugging Face", "Google Colab"],
    metric: "150",
    metricLabel: "Training images",
    color: "#76c7c0",
    featured: true,
    image: assetPath("projects/BMD-45.png"),
    link: "https://github.com/ZB-ZettaByte/bmd45-traffic-state-detection",
  },
  {
    id: "github-ai-code-review-agent",
    number: "05",
    title: "GitHub AI Code Review Agent",
    date: "Developer tool",
    category: "Systems",
    description:
      "A code-review tool that helps developers analyze GitHub issues and pull requests, inspect related files, and create step-by-step fix plans with test cases.",
    achievements: [
      "Reads issue context and relevant code to suggest actionable implementation plans.",
      "Reviews pull requests for bugs, missing tests, unclear logic, security risks, and code-quality concerns.",
      "Surfaces risks before merge through GitHub-aware review workflows and CI/CD integration.",
    ],
    technologies: ["Python", "FastAPI", "LangChain", "GitHub API", "Docker", "CI/CD"],
    metric: "AI",
    metricLabel: "Code review",
    color: "#c3df6e",
    featured: false,
  },
];

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
const ARCHIVE_PROJECTS = PROJECTS.filter((project) => !project.featured);
type Filter = "All" | Category;
const CATEGORIES: Filter[] = ["All", "AI / ML", "Full Stack", "Systems"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [flippedFeaturedId, setFlippedFeaturedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(
    ARCHIVE_PROJECTS[0].id,
  );
  const visibleProjects = ARCHIVE_PROJECTS.filter(
    (project) => activeFilter === "All" || project.category === activeFilter,
  );

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    const firstProject = ARCHIVE_PROJECTS.find(
      (project) => filter === "All" || project.category === filter,
    );
    setExpandedId(firstProject?.id ?? null);
  };

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              Project index · {String(PROJECTS.length).padStart(2, "0")} selected works
            </p>
            <h2 id="projects-title" className={styles.title}>
              Built to solve
              <br />
              <em>real problems</em>
            </h2>
          </div>

          <div className={styles.headerAside}>
            <p>
              Research, intelligent systems, full-stack products, and data
              studies—organized around measurable outcomes and practical use.
            </p>
            <div className={styles.projectCount}>
              <span>{String(FEATURED_PROJECTS.length).padStart(2, "0")} featured</span>
              <i />
              <span>{String(ARCHIVE_PROJECTS.length).padStart(2, "0")} in archive</span>
            </div>
          </div>
        </header>

        <div className={styles.featuredHeading}>
          <p>Featured projects</p>
          <span>Selected for depth, scale, and impact</span>
        </div>

        <div className={styles.featuredGrid}>
          {FEATURED_PROJECTS.map((project, index) => {
            const flipped = flippedFeaturedId === project.id;

            return (
              <article
                key={project.id}
                className={styles.featuredCard}
                data-flipped={flipped ? "true" : "false"}
                style={{ "--project-color": project.color } as CSSProperties}
              >
                <div className={styles.featuredInner}>
                  <div className={`${styles.featuredFace} ${styles.featuredFront}`}>
                    {project.image && (
                      <div className={styles.featuredMedia} aria-hidden="true">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(max-width: 48rem) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className={styles.featuredTopline}>
                      <span>{project.number}</span>
                      <span>{project.category}</span>
                      <span>{project.date}</span>
                    </div>

                    <div className={styles.featuredBody}>
                      <div>
                        <p>{project.metricLabel}</p>
                        <strong className={styles.metric}>{project.metric}</strong>
                      </div>
                      <span className={styles.featuredGlyph} aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </div>

                    <div className={styles.featuredCopy}>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>

                    <div className={styles.featuredFooter}>
                      <button
                        type="button"
                        className={styles.flipButton}
                        aria-pressed={flipped}
                        onClick={() => setFlippedFeaturedId(project.id)}
                      >
                        Project details
                        <HiArrowRight aria-hidden="true" />
                      </button>
                      <a
                        className={styles.githubButton}
                        href={project.link ?? GITHUB_PROFILE}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={"Explore GitHub for " + project.title}
                      >
                        <SiGithub aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className={`${styles.featuredFace} ${styles.featuredBack}`}>
                    <div className={styles.backTopline}>
                      <span>{project.number} · Project details</span>
                      <button
                        type="button"
                        className={styles.flipButton}
                        aria-label={"Show overview for " + project.title}
                        onClick={() => setFlippedFeaturedId(null)}
                      >
                        Overview
                        <HiArrowRight aria-hidden="true" />
                      </button>
                    </div>

                    <div className={styles.backCopy}>
                      <h3>{project.title}</h3>
                      <ul>
                        {project.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.backFooter}>
                      <p>Tech stack</p>
                      <div className={styles.tags}>
                        {project.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                      <a
                        href={project.link ?? GITHUB_PROFILE}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Explore GitHub
                        <HiArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                <span className={styles.cardIndex} aria-hidden="true">
                  0{index + 1}
                </span>
              </article>
            );
          })}
        </div>

        <div className={styles.archive}>
          <div className={styles.archiveHeader}>
            <div>
              <p>More projects</p>
              <span>Open a row for details</span>
            </div>

            <div className={styles.filters} aria-label="Filter projects">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeFilter === category}
                  onClick={() => selectFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.archiveList}>
            {visibleProjects.map((project) => {
              const expanded = project.id === expandedId;

              return (
                <article
                  key={project.id}
                  className={styles.archiveProject}
                  data-expanded={expanded ? "true" : "false"}
                  style={{ "--project-color": project.color } as CSSProperties}
                >
                  <button
                    type="button"
                    className={styles.archiveTrigger}
                    aria-expanded={expanded}
                    aria-controls={"project-detail-" + project.id}
                    onClick={() => setExpandedId(expanded ? null : project.id)}
                  >
                    <span className={styles.archiveNumber}>{project.number}</span>
                    <span className={styles.archiveTitle}>
                      <small>{project.category}</small>
                      <strong>{project.title}</strong>
                    </span>
                    <span className={styles.archiveDate}>{project.date}</span>
                    <span className={styles.archiveMetric}>
                      <strong>{project.metric}</strong>
                      <small>{project.metricLabel}</small>
                    </span>
                    <HiChevronDown aria-hidden="true" />
                  </button>

                  <div
                    id={"project-detail-" + project.id}
                    className={styles.archiveDetail}
                  >
                    <div className={styles.archiveDetailInner}>
                      <p>{project.description}</p>

                      <ul>
                        {project.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>

                      <div className={styles.archiveTech}>
                        {project.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>

                      <a
                        href={project.link ?? GITHUB_PROFILE}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Explore GitHub
                        <HiArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
