import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/profile';

export default function DeleteUser() {
    return (
        <section className="space-y-3 border-t border-border pt-6">
            <h2 className="font-semibold">Delete account</h2>
            <p className="text-sm text-muted-foreground">
                Permanently remove your account and its data.
            </p>
            <Form
                action={destroy().url}
                method="delete"
                onSubmit={(event) => {
                    if (!window.confirm('Delete your account permanently?')) {
                        event.preventDefault();
                    }
                }}
            >
                <Button variant="destructive">Delete account</Button>
            </Form>
        </section>
    );
}
