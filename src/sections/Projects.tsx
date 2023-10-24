import { useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

import styles from "@/styles/projects.module.css";

// Components
import ProjectsCarousel from "@/components/Carousel";

// Icons
import ChevronLeft from "src/assets/icons/chevron.svg?react";
import LinkIcon from "src/assets/icons/link.svg?react";
import GithubLogo from "src/assets/icons/github.svg?react";

import type { Project, ProjectTechnology } from "src/lib/types/project";

// Internationalization
import { useTranslations } from "@/i18n/utils";
import type { translations } from "@/i18n/utils";

interface Props {
    projects: Project[];
    lang?: string;
}

export default function Projects({ projects, lang }: Props) {
    const [projectIndex, setProjectIndex] = useState(0);
    const [isMoreInfoExpanded, setMoreInfoExpanded] = useState(true);

    const t = useTranslations(lang as keyof typeof translations).projects;

    const projectTechs = projects[projectIndex].technologies;

    return (
        <section className={`${styles.projects} section wrapper`} id="projects">
            <header className={"subtitle"}>
                <p>{t.title}</p>
                <div />
            </header>

            <LazyMotion features={domAnimation}>
                <ProjectsCarousel
                    lang={lang}
                    projects={projects}
                    projectIndex={projectIndex}
                    setMoreInfoExpanded={setMoreInfoExpanded}
                    isMoreInfoExpanded={isMoreInfoExpanded}
                />
            </LazyMotion>

            <div className={styles.sectionDots}>
                <ChevronLeft
                    style={{
                        cursor: projectIndex === 0 ? "initial" : "pointer",
                        transition: "0.5s",
                    }}
                    fill={projectIndex === 0 ? "#808080" : "var(--primary-01)"}
                    onClick={() => {
                        if (projectIndex > 0) {
                            setProjectIndex(projectIndex - 1);
                        }
                    }}
                />
                <ul>
                    {projects &&
                        projects.map(function (project, index) {
                            const isCurrentProject = index === projectIndex;
                            return (
                                <li
                                    onClick={() => setProjectIndex(index)}
                                    key={index}
                                >
                                    <div
                                        style={{
                                            backgroundColor: isCurrentProject
                                                ? `rgb(${project.accent_color})`
                                                : "var(--primary-01)",
                                        }}
                                        className={`${
                                            isCurrentProject && "bulletUp"
                                        }`}
                                    />
                                </li>
                            );
                        })}
                </ul>
                <ChevronLeft
                    style={{
                        cursor:
                            projectIndex === projects.length - 1
                                ? "initial"
                                : "pointer",
                        transition: "0.5s",
                        transform: "rotate(180deg)",
                    }}
                    fill={
                        projectIndex === projects.length - 1
                            ? "#808080"
                            : "var(--primary-01)"
                    }
                    onClick={() => {
                        if (projectIndex < projects.length - 1) {
                            setProjectIndex(projectIndex + 1);
                        }
                    }}
                />
            </div>
            {projectTechs && projectTechs.length >= 1 && (
                <div
                    className={styles.projectTechnologies}
                    style={{
                        maxHeight: isMoreInfoExpanded ? "100rem" : "0",
                    }}
                >
                    {projectTechs.length > 1 && <h5>{t.info.title}</h5>}
                    <div className={styles.projectTechs}>
                        <ul className={styles.projectTechs}>
                            {projects &&
                                projectTechs.map(
                                    (column: ProjectTechnology, index) => {
                                        const techsColumn =
                                            column.techs as string[];

                                        return (
                                            <li key={index}>
                                                <div className={styles.column}>
                                                    <a
                                                        target={"_blank"}
                                                        rel="noreferrer"
                                                        href={
                                                            column.link || "#"
                                                        }
                                                        className={styles.title}
                                                    >
                                                        <h6
                                                            className={
                                                                column.hasOwnProperty(
                                                                    "link"
                                                                )
                                                                    ? styles.link
                                                                    : ""
                                                            }
                                                        >
                                                            {column.name}
                                                        </h6>
                                                        {column.hasOwnProperty(
                                                            "link"
                                                        ) && <LinkIcon />}
                                                    </a>
                                                    <ul key={`${index}_tech`}>
                                                        {techsColumn &&
                                                            techsColumn.map(
                                                                (
                                                                    tech,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {tech}
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                    {column.hasOwnProperty(
                                                        "outro"
                                                    ) && <p>{column.outro}</p>}
                                                </div>
                                            </li>
                                        );
                                    }
                                )}
                        </ul>
                    </div>
                </div>
            )}
            <a
                target={"_blank"}
                rel="noreferrer"
                href="https://github.com/theduardomaciel"
            >
                <button
                    className="button inverted modern"
                    style={{
                        fontSize: `1.4rem`,
                        paddingInline: `3rem`,
                        paddingBlock: "1.25rem",
                        marginBottom: "1rem",
                    }}
                >
                    <GithubLogo
                        width={`1.8rem`}
                        height={`1.8rem`}
                        aria-label="Github icon"
                    />
                    {t.info.github}
                </button>
            </a>
        </section>
    );
}
