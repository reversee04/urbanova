import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import AdminLayout, { C, Icons } from './admin-layout';

type CmsItem = Record<string, string | number | boolean | string[] | null> & { id: number };
type Props = { items: CmsItem[]; resource: string };

const FIELDS: Record<string, string[]> = {
    'hero-slides':  ['title', 'description', 'cta_text', 'cta_url', 'bg_image', 'sort_order', 'is_active'],
    'projects':     ['title', 'client', 'location', 'year', 'category', 'scope_summary', 'achievements', 'image', 'featured', 'sort_order', 'is_active'],
    'team-members': ['name', 'role', 'description', 'image', 'sort_order', 'is_active'],
};

const LABELS: Record<string, string> = {
    'hero-slides': 'Hero Slides', 'projects': 'Projects', 'team-members': 'Team Members',
};

function emptyValue(field: string): string | boolean {
    return ['is_active', 'featured'].includes(field) ? true : '';
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.muted, marginBottom: '6px', textTransform: 'capitalize' }}>
                {label.replaceAll('_', ' ')}
            </label>
            {children}
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
    color: C.white, fontSize: '14px', outline: 'none', boxSizing: 'border-box',
};

export default function CmsResourcePage({ items, resource }: Props) {
    const [editing, setEditing] = useState<CmsItem | null>(null);
    const [form, setForm]       = useState<Record<string, string | boolean>>({});
    const [open, setOpen]       = useState(false);

    const label = LABELS[resource] ?? resource;
    const fields = FIELDS[resource] ?? [];

    const startNew = () => {
        setEditing(null);
        setForm(Object.fromEntries(fields.map(f => [f, emptyValue(f)])));
        setOpen(true);
    };
    const startEdit = (item: CmsItem) => {
        setEditing(item);
        setForm(Object.fromEntries(fields.map(f => {
            const v = item[f] ?? emptyValue(f);
            if (f === 'achievements' && Array.isArray(v)) return [f, v.join('\n')];
            return [f, typeof v === 'boolean' ? v : String(v)];
        })));
        setOpen(true);
    };
    const close = () => { setOpen(false); setEditing(null); setForm({}); };

    const save = (e: FormEvent) => {
        e.preventDefault();
        const data = { ...form, ...(resource === 'projects' ? { achievements: String(form.achievements ?? '').split('\n').map(v => v.trim()).filter(Boolean) } : {}) };
        const url = editing ? `/admin/${resource}/${editing.id}` : `/admin/${resource}`;
        if (editing) router.put(url, data, { onSuccess: close });
        else         router.post(url, data, { onSuccess: close });
    };

    const del = (item: CmsItem) => {
        if (window.confirm(`Delete "${String(item.title ?? item.name ?? '')}"?`)) {
            router.delete(`/admin/${resource}/${item.id}`);
        }
    };

    return (
        <>
            <Head title={`${label} — Urbanova Admin`} />
            <AdminLayout title={label}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                    <div>
                        <h1 style={{ color: C.white, fontSize: '24px', fontWeight: 700, lineHeight: 1 }}>{label}</h1>
                        <p style={{ color: C.muted, fontSize: '13px', marginTop: '6px' }}>Manage published content for the Urbanova website.</p>
                    </div>
                    <button onClick={startNew}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                        + Add new
                    </button>
                </div>

                {/* Table */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
                    {/* Head */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 90px 110px', padding: '10px 20px', background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${C.border}` }}>
                        {['Content', 'Order', 'Status', 'Actions'].map(h => (
                            <div key={h} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>{h}</div>
                        ))}
                    </div>

                    {items.length === 0 ? (
                        <div style={{ padding: '48px', textAlign: 'center', color: C.muted }}>
                            <p style={{ fontSize: '14px' }}>No items yet. Click "Add new" to get started.</p>
                        </div>
                    ) : items.map((item, i) => (
                        <Row key={item.id} item={item} last={i === items.length - 1}
                            onEdit={() => startEdit(item)} onDelete={() => del(item)} />
                    ))}
                </div>

                {/* Modal */}
                {open && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', padding: '20px' }}>
                        <form onSubmit={save} style={{ width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', background: C.navyDark, borderRadius: '20px', border: `1px solid ${C.border}`, padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', scrollbarWidth: 'thin' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <h2 style={{ color: C.white, fontSize: '18px', fontWeight: 700 }}>{editing ? 'Edit' : 'Add'} {label}</h2>
                                <button type="button" onClick={close} style={{ color: C.muted, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}>
                                    <Icons.X />
                                </button>
                            </div>

                            {fields.map(field => (
                                <Field key={field} label={field}>
                                    {['is_active', 'featured'].includes(field) ? (
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={Boolean(form[field])} onChange={e => setForm({ ...form, [field]: e.target.checked })}
                                                style={{ width: '16px', height: '16px', accentColor: C.teal }} />
                                            <span style={{ color: C.text, fontSize: '13px' }}>{Boolean(form[field]) ? 'Active / Visible' : 'Hidden / Inactive'}</span>
                                        </label>
                                    ) : field === 'description' || field === 'scope_summary' || field === 'achievements' ? (
                                        <textarea required={field !== 'achievements'} rows={field === 'achievements' ? 4 : 3}
                                            style={{ ...inputStyle, resize: 'vertical' }}
                                            value={String(form[field] ?? '')} onChange={e => setForm({ ...form, [field]: e.target.value })}
                                            placeholder={field === 'achievements' ? 'One achievement per line' : ''} />
                                    ) : (
                                        <input required type={field === 'sort_order' ? 'number' : 'text'} min={field === 'sort_order' ? 0 : undefined}
                                            style={inputStyle}
                                            value={String(form[field] ?? '')} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                                    )}
                                </Field>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                                <button type="button" onClick={close}
                                    style={{ padding: '9px 18px', borderRadius: '8px', border: `1px solid ${C.border}`, background: 'transparent', color: C.muted, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                                    Cancel
                                </button>
                                <button type="submit"
                                    style={{ padding: '9px 22px', borderRadius: '8px', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}

// ─── Table row ────────────────────────────────────────────────────────────────
function Row({ item, last, onEdit, onDelete }: { item: CmsItem; last: boolean; onEdit: () => void; onDelete: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: 'grid', gridTemplateColumns: '1fr 80px 90px 110px', padding: '14px 20px', alignItems: 'center', borderBottom: last ? 'none' : `1px solid ${C.border}`, background: hov ? 'rgba(255,255,255,0.025)' : 'transparent', transition: 'background 0.15s' }}>
            <div style={{ color: C.white, fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '12px' }}>
                {String(item.title ?? item.name ?? '')}
            </div>
            <div style={{ color: C.muted, fontSize: '13px' }}>{String(item.sort_order ?? 0)}</div>
            <div>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: item.is_active ? 'rgba(72,187,120,0.12)' : C.faint, color: item.is_active ? '#48bb78' : C.muted }}>
                    {item.is_active ? 'Active' : 'Hidden'}
                </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={onEdit} style={{ padding: '5px 12px', borderRadius: '7px', background: 'rgba(81,178,184,0.1)', border: `1px solid rgba(81,178,184,0.2)`, color: C.teal, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                <button onClick={onDelete} style={{ padding: '5px 12px', borderRadius: '7px', background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)', color: C.red, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Del</button>
            </div>
        </div>
    );
}
