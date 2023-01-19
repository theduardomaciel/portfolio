export interface Technology {
    name: string;
    experience: number;
    icon_url: string;
    unit: 'year' | 'month';
}

export default interface TechSection {
    name: string;
    techs: Technology[]
}