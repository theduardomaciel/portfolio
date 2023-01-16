import { m, AnimatePresence, MotionProps } from "framer-motion"

import styles from '@styles/projects.module.css';
import Translate, { TranslateText } from '@components/Translate';

// Components
import Button from '@components/Button';

// Icons
import { ReactComponent as DownArrow } from 'src/assets/icons/down_arrow.svg';

// Status Icons
import { ReactComponent as FinishedIcon } from 'src/assets/icons/ok.svg';
import { ReactComponent as PendingIcon } from 'src/assets/icons/pending.svg';
import { ReactComponent as UnfinishedIcon } from 'src/assets/icons/warning.svg';

const statusIcons = {
    "finished": <FinishedIcon />,
    "sketch": <PendingIcon />,
    "work in progress": <PendingIcon />,
    "unfinished": <UnfinishedIcon />
}

// Types
import type Project from 'src/types/project';
import type { Dispatch, SetStateAction } from "react";

interface Props {
    projects: Project[];
    projectIndex: number;
    setMoreInfoExpanded: Dispatch<SetStateAction<boolean>>;
    isMoreInfoExpanded: boolean;
}

const column1Props = {
    initial: { opacity: 0, x: "-100vw" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100vw" },
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 1, ease: "easeOut" }
} as MotionProps;

const column2Props = {
    initial: { opacity: 0, x: "100vw" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100vw" },
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 1, ease: "easeOut" }
} as MotionProps;

export default function ProjectsCarousel({ projects, projectIndex, setMoreInfoExpanded, isMoreInfoExpanded }: Props) {
    const projectStatus = projects[projectIndex].status as string;
    const projectStatusIcon = (statusIcons as any)[projectStatus];

    const projectsShowcase = projects.map((project, index) => <m.div key={index.toString()} className={styles.carrousel}>
        <m.div key={"column1"} className={styles.info} {...column1Props}>
            <div
                style={{
                    background: `linear-gradient(90deg, rgba(${project.accent_color}, 0.65) 0%, rgba(${project.accent_color}, 0.25) 57.29%, rgba(${project.accent_color}, 0) 100%)`,
                }}
                className={styles.headerDecoration}
            />
            <div className={styles.infoHeader}>
                <m.div className={styles.statusHolder} /* {...popTransitionProps} */ >
                    {projectStatusIcon}
                    <div />
                    <p><Translate>{projectStatus}</Translate></p>
                </m.div>
                <h3><Translate>{project.name}</Translate></h3>
                <h4><Translate>{project.description}</Translate></h4>
            </div>
            <m.div key={`$info_${index}`} className={styles.info} /* {...popTransitionProps} */>
                {
                    project.link &&
                    <a target={"_blank"} rel="noreferrer" href={project.link}>
                        <Button
                            scheme="disable_invert"
                            style={{
                                backgroundColor: `rgb(${project.accent_color})`,
                                color: "#FFFFFF",
                                paddingBlock: `1.5rem`, paddingInline: "2.75rem",
                                textTransform: "capitalize"
                            }}
                        >
                            {project.link ? TranslateText("VISIT PROJECT") : TranslateText("WORK IN PROGRESS")}
                        </Button>
                    </a>
                }
                {
                    project.technologies.length >= 1 &&
                    <div className={styles.moreInfo} onClick={() => setMoreInfoExpanded(!isMoreInfoExpanded)}>
                        <p style={{ textTransform: "capitalize" }}><Translate>{isMoreInfoExpanded ? "LESS INFO" : "MORE INFO"}</Translate></p>
                        <DownArrow
                            fill='var(--primary-01)'
                            viewBox='0 0 24 24'
                            width={`2.4rem`}
                            height={`2.4rem`}
                            style={{ transform: isMoreInfoExpanded ? `rotate(180deg)` : `rotate(0deg)`, transition: "0.35s" }}
                        />
                    </div>
                }
            </m.div>
        </m.div>
        <m.div key={"column2"} className={styles.imageHolder} {...column2Props}>
            <picture>
                {/* <source
                    style={{ filter: `drop-shadow(0px 0px 10px rgba(${project.accent_color}, 0.5))` }}
                    className={styles.image}
                    width={720}
                    height={576}
                    sizes="((max-width: 768px)) 360px,
              (min-width: 769px) 720px"
                    srcSet={`src/assets/projects/${project.image_url}.avif`}
                    type="image/avif"
                /> */}
                <img
                    style={{ filter: `drop-shadow(0px 0px 10px rgba(${project.accent_color}, 0.5))` }}
                    className={styles.image}
                    width={720}
                    height={576}
                    sizes="((max-width: 768px)) 360px,
              (min-width: 769px) 720px"
                    src={project.image_url}
                    alt="Imagem representando o projeto"
                />
            </picture>
        </m.div>
    </m.div>)

    return (
        <AnimatePresence initial={false} mode="popLayout" key={"teste"}>
            {projectsShowcase[projectIndex]}
        </AnimatePresence>
    )
}