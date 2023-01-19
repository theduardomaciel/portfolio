import { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

import styles from '@styles/projects.module.css';

// Components
import ProjectsCarousel from '@components/Carousel';

// Icons
import { ReactComponent as ChevronLeft } from 'src/assets/icons/chevron.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link.svg';
import { ReactComponent as GithubLogo } from 'src/assets/icons/github.svg';

// Utils
import type Project from 'src/types/project';

type ColumnProps = {
    name: string;
    link?: string;
    techs: Array<string>;
    outro?: string;
}

export default function Projects({ projects }: { projects: Array<Project> }) {
    const [projectIndex, setProjectIndex] = useState(0);
    const [isMoreInfoExpanded, setMoreInfoExpanded] = useState(true);

    return (
        <section className={`${styles.projects} section wrapper`} id='projects'>
            <header className={"subtitle"}>
                <p>Projects</p>
                <div />
            </header>

            <LazyMotion features={domAnimation}>
                <ProjectsCarousel
                    projects={projects as Project[]}
                    projectIndex={projectIndex}
                    setMoreInfoExpanded={setMoreInfoExpanded}
                    isMoreInfoExpanded={isMoreInfoExpanded}
                />
            </LazyMotion>

            <div className={styles.sectionDots}>
                <ChevronLeft
                    style={{ cursor: projectIndex === 0 ? "initial" : "pointer", transition: "0.5s" }}
                    fill={projectIndex === 0 ? "#808080" : 'var(--primary-01)'}
                    onClick={() => {
                        if (projectIndex > 0) {
                            setProjectIndex(projectIndex - 1)
                        }
                    }}
                />
                <ul>
                    {
                        projects.map(function (project, index) {
                            const isCurrentProject = index === projectIndex;
                            return (
                                <li onClick={() => setProjectIndex(index)} key={index}>
                                    <div style={{ backgroundColor: isCurrentProject ? `rgb(${project.accent_color})` : "var(--primary-01)" }} className={`${isCurrentProject && "bulletUp"}`} />
                                </li>
                            )
                        })}

                </ul>
                <ChevronLeft
                    style={{ cursor: projectIndex === projects.length - 1 ? "initial" : "pointer", transition: "0.5s", transform: "rotate(180deg)" }}
                    fill={projectIndex === projects.length - 1 ? "#808080" : 'var(--primary-01)'}
                    onClick={() => {
                        if (projectIndex < projects.length - 1) {
                            setProjectIndex(projectIndex + 1)
                        }
                    }}
                />
            </div>
            {
                isMoreInfoExpanded && projects[projectIndex].technologies.length >= 1 &&
                <div className={styles.projectTechnologies}>
                    {
                        projects[projectIndex].technologies.length > 1 &&
                        <h5>Technologies used to build the application services:</h5>
                    }
                    <div className={styles.projectTechs}>
                        <ul className={styles.projectTechs}>
                            {
                                projects[projectIndex].technologies.map((column: ColumnProps, index) =>
                                    <li key={index}>
                                        <div className={styles.column}>
                                            <a target={"_blank"} rel="noreferrer" href={column.link} className={styles.title}>
                                                <h6 className={column.hasOwnProperty("link") ? styles.link : ""}>{column.name}</h6>
                                                {
                                                    column.hasOwnProperty("link") &&
                                                    <LinkIcon />
                                                }
                                            </a>
                                            <ul key={`${index}_tech`}>
                                                {
                                                    column.techs.map((tech, index) => <li key={index}>{tech}</li>)
                                                }
                                            </ul>
                                            {
                                                column.hasOwnProperty('outro') &&
                                                <p>{column.outro}</p>
                                            }
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

            }
            <a target={"_blank"} rel="noreferrer" href="https://github.com/theduardomaciel">
                <button className='button inverted modern' style={{ fontSize: `1.4rem`, paddingInline: `3rem`, paddingBlock: "1.25rem", marginBottom: "1rem" }}>
                    <GithubLogo width={`1.8rem`} height={`1.8rem`} />
                    Check other repositories
                </button>
            </a>
        </section>
    );
}