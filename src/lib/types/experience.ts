export interface Experience {
    id: string;
    techs?: ExperienceTech[];
}

export interface ExperienceTech {
    name: string;
    experienceSince: string;
    icon_url: string;
}
