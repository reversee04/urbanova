import { AppHeader } from '@/components/app-header';
import type { BreadcrumbItem } from '@/types/navigation';

export function AppSidebarHeader({
    breadcrumbs,
}: {
    breadcrumbs?: BreadcrumbItem[];
}) {
    return <AppHeader breadcrumbs={breadcrumbs} />;
}
