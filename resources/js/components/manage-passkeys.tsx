import { usePasskeyRegister } from '@laravel/passkeys/react';
import { Form, router } from '@inertiajs/react';
import { useState } from 'react';
import type { Passkey } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { destroy, registrationOptions, store } from '@/routes/passkey';

export type Props = {
    canManagePasskeys: boolean;
    passkeys: Passkey[];
};

export default function ManagePasskeys({ canManagePasskeys, passkeys }: Props) {
    const [name, setName] = useState('');
    const { register, isLoading, isSupported, error } = usePasskeyRegister({
        routes: {
            options: registrationOptions.url(),
            submit: store.url(),
        },
        onSuccess: () => {
            setName('');
            router.reload();
        },
    });

    if (!canManagePasskeys) {
        return null;
    }

    return (
        <section className="space-y-4">
            <h2 className="font-semibold">Passkeys</h2>
            {passkeys.length > 0 ? (
                <ul className="space-y-2">
                    {passkeys.map((passkey) => (
                        <li
                            key={passkey.id}
                            className="flex items-center justify-between gap-4 rounded-md border border-border p-3"
                        >
                            <span>
                                {passkey.name}
                                <span className="ml-2 text-xs text-muted-foreground">
                                    Added {passkey.created_at_diff}
                                </span>
                            </span>
                            <Form
                                action={destroy(passkey.id).url}
                                method="delete"
                                onSuccess={() => router.reload()}
                            >
                                <Button variant="destructive" size="sm">
                                    Remove
                                </Button>
                            </Form>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground">
                    No passkeys have been added.
                </p>
            )}
            {isSupported && (
                <div className="flex flex-wrap gap-2">
                    <Input
                        aria-label="Passkey name"
                        placeholder="Passkey name"
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                    />
                    <Button
                        type="button"
                        disabled={!name.trim() || isLoading}
                        onClick={() => void register(name.trim())}
                    >
                        Add passkey
                    </Button>
                </div>
            )}
            {error && <InputError message={error} />}
        </section>
    );
}
