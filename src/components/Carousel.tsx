import { m, AnimatePresence, MotionProps } from "framer-motion";

import styles from "@styles/projects.module.css";

// Icons
import { ReactComponent as FigmaIcon } from "src/assets/icons/figma.svg";
import { ReactComponent as DownArrow } from "src/assets/icons/down_arrow.svg";

// Status Icons
import { ReactComponent as FinishedIcon } from "src/assets/icons/ok.svg";
import { ReactComponent as PendingIcon } from "src/assets/icons/pending.svg";
import { ReactComponent as UnfinishedIcon } from "src/assets/icons/warning.svg";

// Types
import type Project from "src/lib/types/project";
import type { Dispatch, SetStateAction } from "react";

// i18n
import type { ui } from "src/i18n/ui";
import { useTranslations } from "src/i18n/utils";

interface Props {
	projects: Project[];
	lang?: string;
	projectIndex: number;
	setMoreInfoExpanded: Dispatch<SetStateAction<boolean>>;
	isMoreInfoExpanded: boolean;
}

const column1Props = {
	initial: { opacity: 0, x: "-100vw" },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: "-100vw" },
	transition: {
		type: "spring",
		stiffness: 100,
		damping: 20,
		duration: 1,
		ease: "easeOut",
	},
} as MotionProps;

const column2Props = {
	initial: { opacity: 0, x: "100vw" },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: "100vw" },
	transition: {
		type: "spring",
		stiffness: 100,
		damping: 20,
		duration: 1,
		ease: "easeOut",
	},
} as MotionProps;

export default function ProjectsCarousel({
	projects,
	lang,
	projectIndex,
	setMoreInfoExpanded,
	isMoreInfoExpanded,
}: Props) {
	const status_info = {
		finished: <FinishedIcon />,
		sketch: <PendingIcon />,
		work_in_progress: <PendingIcon />,
		paused: <UnfinishedIcon />,
	};

	const projectStatusString = Object.keys(status_info).filter(
		(status) => status === projects[projectIndex].status
	)[0];
	const projectStatusIcon =
		status_info[projects[projectIndex].status as keyof typeof status_info];

	const t = useTranslations(lang as keyof typeof ui);

	const projectsShowcase = projects.map((project, index) => (
		<m.div key={index.toString()} className={styles.carrousel}>
			<m.div key={"column1"} className={styles.info} {...column1Props}>
				<div
					style={{
						background: `linear-gradient(90deg, rgba(${project.accent_color}, 0.65) 0%, rgba(${project.accent_color}, 0.25) 57.29%, rgba(${project.accent_color}, 0) 100%)`,
					}}
					className={styles.headerDecoration}
				/>
				<div className={styles.infoHeader}>
					<m.div
						className={
							styles.statusHolder
						} /* {...popTransitionProps} */
					>
						{projectStatusIcon}
						<div />
						<p>
							{t(
								`projects.carousel.status.${
									projectStatusString as keyof typeof t
								}`
							)}
						</p>
					</m.div>
					<h3>{project.name}</h3>
					<h4>
						{lang === "pt-BR"
							? project["description_pt-BR"] ??
							  project.description
							: project.description}
					</h4>
					{!project["description_pt-BR"] && lang === "pt-BR" && (
						<p
							style={{
								fontSize: "1.5rem",
								marginTop: "1rem",
							}}
						>
							[Descrição em português indisponível no momento por
							limites de armazenamento com o provedor de
							hospedagem.]
						</p>
					)}
				</div>
				<m.div
					key={`$info_${index}`}
					className={styles.info} /* {...popTransitionProps} */
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "2.5rem",
							alignItems: "center",
							justifyContent: "flex-start",
							width: "100%",
						}}
					>
						{project.project_url && (
							<a
								target={"_blank"}
								rel="noreferrer"
								href={project.project_url}
							>
								<button
									className="button inverted modern outline disabled"
									style={{
										backgroundColor: `rgb(${project.accent_color})`,
										color: "#FFFFFF",
										paddingBlock: `1.5rem`,
										paddingInline: "2.75rem",
										textTransform: "uppercase",
									}}
								>
									{t("projects.carousel.button")}
								</button>
							</a>
						)}
						{project.figma_url && (
							<a
								target={"_blank"}
								rel="noreferrer"
								href={project.figma_url}
							>
								<FigmaIcon />
							</a>
						)}
					</div>
					{project.technologies.length >= 1 && (
						<div
							className={styles.moreInfo}
							onClick={() =>
								setMoreInfoExpanded(!isMoreInfoExpanded)
							}
						>
							<p style={{ textTransform: "uppercase" }}>
								{isMoreInfoExpanded
									? t("projects.carousel.collapse")
									: t("projects.carousel.expand")}
							</p>
							<DownArrow
								fill="var(--primary-01)"
								viewBox="0 0 24 24"
								width={`2.4rem`}
								height={`2.4rem`}
								style={{
									transform: isMoreInfoExpanded
										? `rotate(180deg)`
										: `rotate(0deg)`,
									transition: "0.35s",
								}}
							/>
						</div>
					)}
				</m.div>
			</m.div>
			<m.div
				key={"column2"}
				className={styles.imageHolder}
				{...column2Props}
			>
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
						style={{
							filter: `drop-shadow(0px 0px 10px rgba(${project.accent_color}, 0.5))`,
						}}
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
		</m.div>
	));

	return (
		<AnimatePresence initial={false} mode="popLayout" key={"teste"}>
			{projectsShowcase[projectIndex]}
		</AnimatePresence>
	);
}
