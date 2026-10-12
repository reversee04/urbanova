import { usePasskeyVerify } from '@laravel/passkeys/react';
import { router } from '@inertiajs/react';
import { login, loginOptions } from '@/routes/passkey';
import { Button } from '@/components/ui/button';

type Route = { url: string };

export default function PasskeyVerify({
    routes,
    label = 'Continue with a passkey',
    loadingLabel = 'Verifying...',
    separator,
}: {
    routes?: { options: string | Route; submit: string | Route };
    label?: string;
    loadingLabel?: string;
    separator?: string;
}) {
    const { verify, isLoading, isSupported, error } = usePasskeyVerify({
        routes: {
            options:
                typeof routes?.options === 'string'
                    ? routes.options
                    : (routes?.options.url ?? loginOptions.url()),
            submit:
                typeof routes?.submit === 'string'
                    ? routes.submit
                    : (routes?.submit.url ?? login.url()),
        },
        onSuccess: (response) => {
            if (response.redirect) {
                router.visit(response.redirect);
            } else {
                router.reload();
            }
        },
    });

    if (!isSupported) {
        return null;
    }

    return (
        <div className="space-y-3">
            <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isLoading}
                onClick={() => void verify()}
            >
                {isLoading ? loadingLabel : label}
            </Button>
            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}
            {separator && (
                <div className="text-center text-xs text-muted-foreground">
                    {separator}
                </div>
            )}
        </div>
    );
}
