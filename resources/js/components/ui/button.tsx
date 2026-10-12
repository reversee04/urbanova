import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    destructive: 'bg-destructive text-white hover:opacity-90',
    outline: 'border border-input bg-background hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
};

export function Button({
    asChild = false,
    className,
    size = 'default',
    variant = 'default',
    ...props
}: ButtonProps) {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            className={cn(
                'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        />
    );
}

export type { ButtonProps };
