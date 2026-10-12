import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function AppShell({
    children,
    variant,
    className,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & { variant: 'header' | 'sidebar' }
>) {
    return (
        <div
            data-layout={variant}
            className={cn(
                'flex min-h-screen w-full',
                variant === 'sidebar' ? 'flex-row' : 'flex-col',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
