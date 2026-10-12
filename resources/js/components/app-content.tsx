import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function AppContent({
    children,
    variant,
    className,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLElement> & { variant: 'header' | 'sidebar' }
>) {
    return (
        <main
            className={cn(
                'min-w-0 flex-1',
                variant === 'sidebar' && 'overflow-x-clip',
                className,
            )}
            {...props}
        >
            {children}
        </main>
    );
}
