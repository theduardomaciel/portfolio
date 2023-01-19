interface TechnologySection {
    name: string;
    link: string;
    techs: string[];
}

export default interface Project {
    name: string;
    description: string;
    project_url: string;
    image_url: string;
    figma_url: string;
    accent_color: string;
    status: 'finished' | 'sketch' | 'work in progress';
    technologies: TechnologySection[];
}