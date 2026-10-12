import { cn } from '@/lib/utils';

export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <div className="space-y-1">
            <h2
                className={cn(
                    'font-semibold tracking-tight',
                    variant === 'small' ? 'text-base' : 'text-xl',
                )}
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
