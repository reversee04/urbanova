import type { PropsWithChildren } from 'react';

export default function AuthSimpleLayout({
    title,
    description,
    children,
}: PropsWithChildren<{ title?: string; description?: string }>) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <section className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
                {(title || description) && (
                    <header className="space-y-2 text-center">
                        {title && (
                            <h1 className="text-2xl font-semibold">{title}</h1>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </header>
                )}
                {children}
            </section>
        </main>
    );
}
