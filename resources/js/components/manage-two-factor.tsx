import { Form, router } from '@inertiajs/react';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { enable, confirm, disable } from '@/routes/two-factor';

export type Props = {
    canManageTwoFactor: boolean;
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
};

export default function ManageTwoFactor({
    canManageTwoFactor,
    requiresConfirmation,
    twoFactorEnabled,
}: Props) {
    const {
        qrCodeSvg,
        manualSetupKey,
        errors,
        hasSetupData,
        fetchSetupData,
        clearSetupData,
    } = useTwoFactorAuth();

    if (!canManageTwoFactor) {
        return null;
    }

    return (
        <section className="space-y-4 border-t border-border pt-6">
            <h2 className="font-semibold">Two-factor authentication</h2>
            {twoFactorEnabled ? (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Two-factor authentication is enabled.
                    </p>
                    <Form
                        action={disable().url}
                        method="delete"
                        onSuccess={() => router.reload()}
                    >
                        <Button variant="destructive">Disable</Button>
                    </Form>
                </div>
            ) : hasSetupData ? (
                <div className="space-y-4">
                    {requiresConfirmation && (
                        <Form
                            action={confirm().url}
                            method="post"
                            onSuccess={() => {
                                clearSetupData();
                                router.reload();
                            }}
                            className="space-y-3"
                        >
                            <label className="block space-y-2 text-sm">
                                <span>
                                    Enter the code from your authenticator
                                </span>
                                <Input
                                    name="code"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    required
                                />
                            </label>
                            <Button>Confirm setup</Button>
                        </Form>
                    )}
                    {qrCodeSvg && (
                        <div
                            className="w-fit rounded bg-white p-3"
                            dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                        />
                    )}
                    {manualSetupKey && (
                        <p className="text-sm">
                            Setup key: <code>{manualSetupKey}</code>
                        </p>
                    )}
                </div>
            ) : (
                <Button
                    type="button"
                    onClick={() =>
                        router.post(
                            enable().url,
                            {},
                            {
                                onSuccess: () => {
                                    if (requiresConfirmation) {
                                        void fetchSetupData();
                                    } else {
                                        router.reload();
                                    }
                                },
                            },
                        )
                    }
                >
                    Set up two-factor authentication
                </Button>
            )}
            {errors.map((error) => (
                <p
                    key={error}
                    role="alert"
                    className="text-sm text-destructive"
                >
                    {error}
                </p>
            ))}
        </section>
    );
}
