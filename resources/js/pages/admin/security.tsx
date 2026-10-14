import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import AdminLayout, { C } from '@/components/admin/admin-layout';
import { Section, Field, Inp, Btn } from './profile';

export default function AdminSecurity() {
    const [form, setForm] = useState({ current_password: '', password: '', password_confirmation: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const save = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        router.put('/admin/security', form, {
            onSuccess: () => {
                setSuccess('Password changed successfully.');
                setForm({ current_password: '', password: '', password_confirmation: '' });
                setTimeout(() => setSuccess(''), 3000);
            },
            onError: (errors) => {
                setError(errors.current_password ?? errors.password ?? 'Something went wrong.');
            },
        });
    };

    return (
        <>
            <Head title="Security — Urbanova Admin" />
            <AdminLayout title="Security">
                <div style={{ maxWidth: '560px' }}>
                    <Section title="Change Password" desc="Use a long, random password to keep your account secure.">
                        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Field label="Current Password">
                                <Inp type="password" value={form.current_password} onChange={set('current_password')} required placeholder="••••••••" />
                            </Field>
                            <Field label="New Password">
                                <Inp type="password" value={form.password} onChange={set('password')} required placeholder="••••••••" />
                            </Field>
                            <Field label="Confirm New Password">
                                <Inp type="password" value={form.password_confirmation} onChange={set('password_confirmation')} required placeholder="••••••••" />
                            </Field>

                            {success && (
                                <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(72,187,120,0.12)', color: '#48bb78', fontSize: '13px', fontWeight: 600 }}>
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(229,62,62,0.1)', color: '#fc8181', fontSize: '13px', fontWeight: 600 }}>
                                    {error}
                                </div>
                            )}

                            <div>
                                <Btn type="submit">Update password</Btn>
                            </div>
                        </form>
                    </Section>

                    {/* Info card */}
                    <div style={{ padding: '18px 20px', borderRadius: '14px', background: 'rgba(81,178,184,0.06)', border: `1px solid rgba(81,178,184,0.15)`, display: 'flex', gap: '14px' }}>
                        <div style={{ color: C.teal, flexShrink: 0, marginTop: '2px' }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                            <div style={{ color: C.white, fontWeight: 600, fontSize: '13px' }}>Security tips</div>
                            <ul style={{ color: C.muted, fontSize: '12px', marginTop: '6px', lineHeight: '1.8', listStyle: 'disc', paddingLeft: '16px' }}>
                                <li>Use at least 12 characters with mixed case, numbers and symbols</li>
                                <li>Never reuse passwords across different services</li>
                                <li>Change your password if you suspect any unauthorized access</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
