import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';

export default function TextLink({
    className,
    ...props
}: ComponentProps<typeof Link>) {
    return (
        <Link
            className={`text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-current ${className ?? ''}`}
            {...props}
        />
    );
}
