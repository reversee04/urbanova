import { Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types/navigation';

export function AppHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItem[];
}) {
    return (
        <header className="border-b border-border px-6 py-4">
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm">
                    {breadcrumbs.map((item, index) => (
                        <li key={`${item.title}-${index}`}>
                            {index > 0 && (
                                <span
                                    aria-hidden="true"
                                    className="mr-2 text-muted-foreground"
                                >
                                    /
                                </span>
                            )}
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </header>
    );
}
