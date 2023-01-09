interface TechnologySection {
    name: string;
    link: string;
    techs: string[];
}

export default interface Project {
    name: string;
    description: string;
    link: string;
    accent_color: string;
    image_url: string;
    status: 'finished' | 'sketch' | 'work in progress';
    technologies: TechnologySection[];
}