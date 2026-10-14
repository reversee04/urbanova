import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import AdminLayout, { C, Icons } from '@/components/admin/admin-layout';

interface UserItem {
    id: number; name: string; username: string;
    email: string; admin_role: string; created_at: string;
}
interface Props { users: UserItem[] }

const ROLES = [
    { value: 'super_admin',      label: 'Super Admin',      desc: 'Full access — users, content, settings' },
    { value: 'content_manager',  label: 'Content Manager',  desc: 'Can manage slides, projects, team members' },
    { value: 'viewer',           label: 'Viewer',           desc: 'Read-only dashboard access' },
];

const roleColor = (role: string) => {
    if (role === 'super_admin')     return { bg: 'rgba(229,62,62,0.12)',    text: '#fc8181' };
    if (role === 'content_manager') return { bg: 'rgba(81,178,184,0.12)',   text: C.teal    };
    return                                 { bg: 'rgba(255,255,255,0.07)',  text: C.muted   };
};

const roleLabel = (role: string) => ROLES.find(r => r.value === role)?.label ?? role;

const emptyForm = { name: '', username: '', email: '', password: '', password_confirmation: '', admin_role: 'viewer' };

export default function UsersIndex({ users }: Props) {
    const [open, setOpen]     = useState(false);
    const [editing, setEditing] = useState<UserItem | null>(null);
    const [form, setForm]     = useState({ ...emptyForm });
    const [pwModal, setPwModal] = useState<UserItem | null>(null);
    const [pwForm, setPwForm] = useState({ password: '', password_confirmation: '' });

    const openNew  = () => { setEditing(null); setForm({ ...emptyForm }); setOpen(true); };
    const openEdit = (u: UserItem) => { setEditing(u); setForm({ name: u.name, username: u.username, email: u.email, password: '', password_confirmation: '', admin_role: u.admin_role }); setOpen(true); };
    const close    = () => { setOpen(false); setEditing(null); };

    const save = (e: FormEvent) => {
        e.preventDefault();
        const data: Record<string, string> = { name: form.name, username: form.username, email: form.email, admin_role: form.admin_role };
        if (!editing) { data.password = form.password; data.password_confirmation = form.password_confirmation; }
        if (editing)  router.patch(`/admin/users/${editing.id}`, data, { onSuccess: close });
        else          router.post('/admin/users', data, { onSuccess: close });
    };

    const del = (u: UserItem) => {
        if (window.confirm(`Delete user "${u.name}"? This cannot be undone.`))
            router.delete(`/admin/users/${u.id}`);
    };

    const resetPw = (e: FormEvent) => {
        e.preventDefault();
        if (!pwModal) return;
        router.post(`/admin/users/${pwModal.id}/reset-password`, pwForm, { onSuccess: () => { setPwModal(null); setPwForm({ password: '', password_confirmation: '' }); } });
    };

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    return (
        <>
            <Head title="User Management — Urbanova Admin" />
            <AdminLayout title="User Management">

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                    <div>
                        <h1 style={{ color: C.white, fontSize: '24px', fontWeight: 700, lineHeight: 1 }}>Users</h1>
                        <p style={{ color: C.muted, fontSize: '13px', marginTop: '6px' }}>Manage accounts and access permissions.</p>
                    </div>
                    <button onClick={openNew} style={{ padding: '10px 18px', borderRadius: '10px', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                        + Add user
                    </button>
                </div>

                {/* Role legend */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {ROLES.map(r => {
                        const col = roleColor(r.value);
                        return (
                            <div key={r.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: col.bg, border: `1px solid ${col.text}22` }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: col.text }}>{r.label}</span>
                                <span style={{ fontSize: '11px', color: C.muted }}>{r.desc}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Table */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 160px 80px 150px', padding: '10px 20px', background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${C.border}` }}>
                        {['Name / Username', 'Role', 'Email', 'Joined', 'Actions'].map(h => (
                            <div key={h} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>{h}</div>
                        ))}
                    </div>

                    {users.length === 0 ? (
                        <div style={{ padding: '48px', textAlign: 'center', color: C.muted }}>No users found.</div>
                    ) : users.map((u, i) => {
                        const col = roleColor(u.admin_role);
                        return (
                            <UserRow key={u.id} user={u} last={i === users.length - 1}
                                onEdit={() => openEdit(u)} onDelete={() => del(u)} onResetPw={() => setPwModal(u)} roleCol={col} />
                        );
                    })}
                </div>

                {/* Add/Edit modal */}
                {open && (
                    <Modal onClose={close}>
                        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <ModalTitle>{editing ? 'Edit User' : 'Add User'}</ModalTitle>

                            <FormField label="Full Name">
                                <Inp value={form.name} onChange={set('name')} required placeholder="Full name" />
                            </FormField>
                            <FormField label="Username">
                                <Inp value={form.username} onChange={set('username')} required placeholder="username" />
                            </FormField>
                            <FormField label="Email">
                                <Inp type="email" value={form.email} onChange={set('email')} required placeholder="email@example.com" />
                            </FormField>

                            <FormField label="Role">
                                <select value={form.admin_role} onChange={set('admin_role')} style={inpStyle}>
                                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>)}
                                </select>
                            </FormField>

                            {!editing && <>
                                <FormField label="Password">
                                    <Inp type="password" value={form.password} onChange={set('password')} required placeholder="••••••••" />
                                </FormField>
                                <FormField label="Confirm Password">
                                    <Inp type="password" value={form.password_confirmation} onChange={set('password_confirmation')} required placeholder="••••••••" />
                                </FormField>
                            </>}

                            <ModalActions onClose={close} label={editing ? 'Save changes' : 'Create user'} />
                        </form>
                    </Modal>
                )}

                {/* Reset password modal */}
                {pwModal && (
                    <Modal onClose={() => setPwModal(null)}>
                        <form onSubmit={resetPw} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <ModalTitle>Reset Password — {pwModal.name}</ModalTitle>
                            <FormField label="New Password">
                                <Inp type="password" value={pwForm.password} onChange={e => setPwForm(p => ({ ...p, password: e.target.value }))} required placeholder="••••••••" />
                            </FormField>
                            <FormField label="Confirm Password">
                                <Inp type="password" value={pwForm.password_confirmation} onChange={e => setPwForm(p => ({ ...p, password_confirmation: e.target.value }))} required placeholder="••••••••" />
                            </FormField>
                            <ModalActions onClose={() => setPwModal(null)} label="Reset password" danger />
                        </form>
                    </Modal>
                )}
            </AdminLayout>
        </>
    );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
function UserRow({ user, last, onEdit, onDelete, onResetPw, roleCol }: { user: UserItem; last: boolean; onEdit: () => void; onDelete: () => void; onResetPw: () => void; roleCol: { bg: string; text: string } }) {
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: 'grid', gridTemplateColumns: '1fr 140px 160px 80px 150px', padding: '14px 20px', alignItems: 'center', borderBottom: last ? 'none' : `1px solid ${C.border}`, background: hov ? 'rgba(255,255,255,0.025)' : 'transparent', transition: 'background 0.15s' }}>
            <div>
                <div style={{ color: C.white, fontWeight: 600, fontSize: '13px' }}>{user.name}</div>
                <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px' }}>@{user.username}</div>
            </div>
            <div><span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: roleCol.bg, color: roleCol.text }}>{roleLabel(user.admin_role)}</span></div>
            <div style={{ color: C.muted, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            <div style={{ color: C.muted, fontSize: '12px' }}>{new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <Btn onClick={onEdit} color={C.teal}>Edit</Btn>
                <Btn onClick={onResetPw} color="#f6ad55">Pwd</Btn>
                <Btn onClick={onDelete} color={C.red}>Del</Btn>
            </div>
        </div>
    );
}

// ─── Micro components ─────────────────────────────────────────────────────────
const inpStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.white, fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

const Inp = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input style={inpStyle} {...props} />;

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: C.muted, marginBottom: '6px' }}>{label}</div>
            {children}
        </div>
    );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '520px', background: C.navyDark, borderRadius: '20px', border: `1px solid ${C.border}`, padding: '28px' }}>
                {children}
            </div>
        </div>
    );
}

function ModalTitle({ children }: { children: React.ReactNode }) {
    return <h2 style={{ color: C.white, fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{children}</h2>;
}

function ModalActions({ onClose, label, danger }: { onClose: () => void; label: string; danger?: boolean }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: '8px', border: `1px solid ${C.border}`, background: 'transparent', color: C.muted, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '9px 22px', borderRadius: '8px', background: danger ? `linear-gradient(135deg, #e53e3e, #c53030)` : `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: danger ? C.white : C.navy, fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>{label}</button>
        </div>
    );
}

function Btn({ onClick, color, children }: { onClick: () => void; color: string; children: React.ReactNode }) {
    return (
        <button onClick={onClick} style={{ padding: '4px 10px', borderRadius: '7px', background: `${color}18`, border: `1px solid ${color}33`, color, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
            {children}
        </button>
    );
}
