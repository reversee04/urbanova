import React, { useState, type ReactNode } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
export const C = {
    navy:     '#0c2a38',
    navyDark: '#071d28',
    navyMid:  '#0f3347',
    teal:     '#51b2b8',
    tealDark: '#3ea0a6',
    red:      '#e53e3e',
    white:    '#ffffff',
    text:     'rgba(255,255,255,0.85)',
    muted:    'rgba(255,255,255,0.45)',
    faint:    'rgba(255,255,255,0.07)',
    border:   'rgba(255,255,255,0.07)',
    green:    '#48bb78',
};

// ─── Icons ────────────────────────────────────────────────────────────────────
export const Icons = {
    Grid:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    Slides:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    Folder:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M2 7a2 2 0 0 1 2-2h4l2 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>,
    Team:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    Users:   () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    User:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    Shield:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Globe:   () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    Logout:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    Menu:    () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    X:       () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    Arrow:   () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
    Ext:     () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    Bell:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    Key:     () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    Check:   () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    ChevRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
};

// ─── Nav items ────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string | 'DASHBOARD'; icon: () => JSX.Element; roles?: string[] }

const buildNav = (teamSlug: string, role: string): NavItem[] => {
    const items: NavItem[] = [
        { label: 'Dashboard',    href: 'DASHBOARD',           icon: Icons.Grid   },
        { label: 'Hero Slides',  href: '/admin/hero-slides',  icon: Icons.Slides, roles: ['super_admin','content_manager'] },
        { label: 'Projects',     href: '/admin/projects',     icon: Icons.Folder, roles: ['super_admin','content_manager'] },
        { label: 'Team Members', href: '/admin/team-members', icon: Icons.Team,   roles: ['super_admin','content_manager'] },
        { label: 'Users',        href: '/admin/users',        icon: Icons.Users,  roles: ['super_admin'] },
    ];
    return items.filter(i => !i.roles || i.roles.includes(role));
};

const PROFILE_NAV: NavItem[] = [
    { label: 'My Profile',  href: '/admin/profile',   icon: Icons.User   },
    { label: 'Password',    href: '/admin/security',  icon: Icons.Key    },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ teamSlug, role, onClose }: { teamSlug: string; role: string; onClose?: () => void }) {
    const current = typeof window !== 'undefined' ? window.location.pathname : '';
    const dashHref = `/${teamSlug}/dashboard`;
    const nav = buildNav(teamSlug, role);

    const NavLink = ({ href, label, icon: Icon }: NavItem) => {
        const resolvedHref = href === 'DASHBOARD' ? dashHref : href;
        const active = current === resolvedHref || (href !== 'DASHBOARD' && current.startsWith(resolvedHref));
        return (
            <a href={resolvedHref}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{ background: active ? 'rgba(81,178,184,0.13)' : 'transparent', color: active ? C.teal : C.muted, borderLeft: `2px solid ${active ? C.teal : 'transparent'}` }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.faint; e.currentTarget.style.color = C.white; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; } }}>
                <Icon />
                <span className="flex-1">{label}</span>
                {active && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.teal, display: 'inline-block', flexShrink: 0 }} />}
            </a>
        );
    };

    return (
        <aside className="flex flex-col h-full" style={{ background: C.navyDark }}>
            {/* Logo */}
            <div className="flex items-center justify-between px-5 h-[72px] flex-shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
                <a href="/"><img src="/images/urbanova.png" alt="Urbanova" className="h-10 w-auto object-contain" /></a>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden p-1 rounded-lg" style={{ color: C.muted, background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.white)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                        <Icons.X />
                    </button>
                )}
            </div>

            {/* Admin badge */}
            <div className="px-5 pt-5 pb-3">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-md" style={{ background: 'rgba(81,178,184,0.12)', color: C.teal }}>Admin Panel</span>
            </div>

            {/* Main nav */}
            <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
                {nav.map(item => <NavLink key={item.href} {...item} />)}

                {/* Divider */}
                <div style={{ height: '1px', background: C.border, margin: '10px 12px' }} />

                {/* Profile sub-nav */}
                <div className="px-3 py-1" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Account</div>
                {PROFILE_NAV.map(item => <NavLink key={item.href} {...item} />)}
            </nav>

            {/* Footer */}
            <div className="px-3 pb-4 flex-shrink-0 space-y-0.5" style={{ borderTop: `1px solid ${C.border}`, paddingTop: '12px' }}>
                <a href="/" target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{ color: C.muted }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.background = C.faint; }}
                    onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
                    <Icons.Globe /><span>View Public Site</span>
                </a>
                <button onClick={() => router.post('/logout')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{ color: C.muted, background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.red; e.currentTarget.style.background = 'rgba(229,62,62,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
                    <Icons.Logout /><span>Sign out</span>
                </button>
            </div>
        </aside>
    );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ title, onMenuClick }: { title: string; onMenuClick: () => void }) {
    const { auth } = usePage<{ auth: { user: { name: string; admin_role: string } }; [key: string]: unknown }>().props;
    const initials = auth.user.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
    const roleLabel: Record<string, string> = { super_admin: 'Super Admin', content_manager: 'Content Manager', viewer: 'Viewer' };

    return (
        <header style={{ height: '72px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: `1px solid ${C.border}`, background: 'rgba(7,29,40,0.6)', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button className="lg:hidden" onClick={onMenuClick} style={{ color: C.muted, padding: '6px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.white)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                    <Icons.Menu />
                </button>
                <div>
                    <div style={{ color: C.white, fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>{title}</div>
                    <div style={{ color: C.muted, fontSize: '11px', marginTop: '3px' }}>{roleLabel[auth.user.admin_role] ?? 'Admin'}</div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a href="/" target="_blank" className="hidden sm:flex items-center gap-2"
                    style={{ padding: '7px 14px', borderRadius: '8px', background: 'rgba(81,178,184,0.1)', border: '1px solid rgba(81,178,184,0.2)', color: C.teal, fontSize: '12px', fontWeight: 600, textDecoration: 'none', lineHeight: 1, whiteSpace: 'nowrap' }}>
                    <Icons.Ext />View Site
                </a>
                <a href="/admin/profile" style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, textDecoration: 'none' }}>
                    {initials}
                </a>
            </div>
        </header>
    );
}

// ─── Admin Layout (exported for all admin pages) ───────────────────────────────
interface AdminLayoutProps {
    title: string;
    children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
    const { auth, currentTeam } = usePage<{ auth: { user: { name: string; admin_role: string } }; currentTeam: { slug: string } | null; [key: string]: unknown }>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const teamSlug = currentTeam?.slug ?? '';
    const role = auth.user.admin_role ?? 'viewer';

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.navy, fontFamily: "'Inter', sans-serif", color: C.text }}>
            {/* Google Fonts */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" />

            {/* Desktop sidebar */}
            <div className="hidden lg:flex" style={{ width: '256px', flexShrink: 0, flexDirection: 'column' }}>
                <Sidebar teamSlug={teamSlug} role={role} />
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }} className="lg:hidden">
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setSidebarOpen(false)} />
                    <div style={{ position: 'relative', width: '256px', flexShrink: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                        <Sidebar teamSlug={teamSlug} role={role} onClose={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
                <main style={{ flex: 1, overflowY: 'auto', padding: '32px 28px', scrollbarWidth: 'thin', scrollbarColor: `${C.faint} transparent` }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
