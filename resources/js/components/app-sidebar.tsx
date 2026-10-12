import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { usePage } from '@inertiajs/react';

export function AppSidebar() {
    const { currentTeam } = usePage().props;

    return (
        <aside className="hidden w-60 shrink-0 border-r border-border p-4 md:block">
            <nav aria-label="Application">
                <Link
                    href={currentTeam ? dashboard(currentTeam.slug) : '/'}
                    className="font-medium"
                >
                    Dashboard
                </Link>
            </nav>
        </aside>
    );
}
