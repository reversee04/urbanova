import { usePage } from '@inertiajs/react';
import type { PageProps } from '../components/admin/dashboard/dashboard-types';
import { DashboardPage } from '../components/admin/dashboard/dashboard-page';

export default function Dashboard() {
    const { auth, currentTeam, stats, recentProjects, pendingInvitations } = usePage<PageProps>().props;

    return (
        <DashboardPage
            auth={auth}
            currentTeam={currentTeam}
            stats={stats}
            recentProjects={recentProjects}
            pendingInvitations={pendingInvitations}
        />
    );
}
