import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import AdminLayout, { C } from '@/components/admin/admin-layout';

interface UserData { id: number; name: string; username: string; email: string; admin_role: string }
interface Props { user: UserData }

const roleLabel: Record<string, string> = {
    super_admin: 'Super Admin', content_manager: 'Content Manager', viewer: 'Viewer',
};

export default function AdminProfile({ user }: Props) {
    const [form, setForm] = useState({ name: user.name, username: user.username, email: user.email });
    const [success, setSuccess] = useState('');
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const save = (e: FormEvent) => {
        e.preventDefault();
        router.patch('/admin/profile', form, {
            onSuccess: () => { setSuccess('Profile updated successfully.'); setTimeout(() => setSuccess(''), 3000); },
        });
    };

    return (
        <>
            <Head title="My Profile — Urbanova Admin" />
            <AdminLayout title="My Profile">
                <div style={{ maxWidth: '560px' }}>
                    {/* Avatar card */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, marginBottom: '28px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 800, fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ color: C.white, fontWeight: 700, fontSize: '18px' }}>{user.name}</div>
                            <div style={{ color: C.muted, fontSize: '13px', marginTop: '2px' }}>@{user.username}</div>
                            <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: 'rgba(81,178,184,0.12)', color: C.teal }}>
                                {roleLabel[user.admin_role] ?? user.admin_role}
                            </span>
                        </div>
                    </div>

                    {/* Profile form */}
                    <Section title="Profile Information" desc="Update your name, username and email address.">
                        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Field label="Full Name"><Inp value={form.name} onChange={set('name')} required /></Field>
                            <Field label="Username"><Inp value={form.username} onChange={set('username')} required /></Field>
                            <Field label="Email Address"><Inp type="email" value={form.email} onChange={set('email')} required /></Field>

                            {success && <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(72,187,120,0.12)', color: '#48bb78', fontSize: '13px', fontWeight: 600 }}>{success}</div>}

                            <div>
                                <Btn type="submit">Save changes</Btn>
                            </div>
                        </form>
                    </Section>
                </div>
            </AdminLayout>
        </>
    );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
export function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
    return (
        <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, marginBottom: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ color: C.white, fontWeight: 700, fontSize: '15px' }}>{title}</div>
                <div style={{ color: C.muted, fontSize: '12px', marginTop: '4px' }}>{desc}</div>
            </div>
            {children}
        </div>
    );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: C.muted, marginBottom: '6px' }}>{label}</div>
            {children}
        </div>
    );
}

export const inpStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
    color: C.white, fontSize: '14px', outline: 'none', boxSizing: 'border-box',
};

export const Inp = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input style={inpStyle} {...props} />;

export function Btn({ children, type = 'button', danger, onClick }: { children: React.ReactNode; type?: 'button' | 'submit'; danger?: boolean; onClick?: () => void }) {
    return (
        <button type={type} onClick={onClick}
            style={{ padding: '10px 22px', borderRadius: '9px', background: danger ? 'linear-gradient(135deg,#e53e3e,#c53030)' : `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: danger ? C.white : C.navy, fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
            {children}
        </button>
    );
}
