export interface Stats {
    heroSlides: number;
    projects: number;
    teamMembers: number;
    activeSlides: number;
    activeProjects: number;
}

export interface RecentProject {
    id: number;
    title: string;
    client: string;
    category: string;
    is_active: boolean;
}

export interface PendingInvitation {
    code: string;
    inviterName: string;
    team: {
        name: string;
        slug: string;
    };
}

export interface PageProps {
    auth: {
        user: {
            name: string;
            username: string;
            email: string;
        };
    };
    currentTeam: {
        slug: string;
        name: string;
    } | null;
    stats: Stats;
    recentProjects: RecentProject[];
    pendingInvitations: PendingInvitation[];
    [key: string]: unknown;
}
