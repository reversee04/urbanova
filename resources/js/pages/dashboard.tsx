import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

// ─── Brand tokens (matches public site exactly) ───────────────────────────────
const C = {
    navy:     '#0c2a38',   // hero background
    navyDark: '#071d28',   // sidebar bg
    navyMid:  '#0f3347',   // hover / elevated surfaces
    teal:     '#51b2b8',   // primary accent (arc, CTA)
    tealDark: '#3ea0a6',   // hover teal
    red:      '#e53e3e',   // red accent (nav hover)
    white:    '#ffffff',
    text:     'rgba(255,255,255,0.85)',
    muted:    'rgba(255,255,255,0.45)',
    faint:    'rgba(255,255,255,0.08)',
    border:   'rgba(255,255,255,0.07)',
    green:    '#48bb78',
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
    heroSlides: number; projects: number; teamMembers: number;
    activeSlides: number; activeProjects: number;
}
interface RecentProject {
    id: number; title: string; client: string; category: string; is_active: boolean;
}
interface PendingInvitation {
    code: string; inviterName: string;
    team: { name: string; slug: string };
}
interface PageProps {
    auth: { user: { name: string; username: string; email: string } };
    currentTeam: { slug: string; name: string } | null;
    stats: Stats;
    recentProjects: RecentProject[];
    pendingInvitations: PendingInvitation[];
    [key: string]: unknown;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
    Grid:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    Slides:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    Folder:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M2 7a2 2 0 0 1 2-2h4l2 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>,
    Team:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    User:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    Globe:   () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    Logout:  () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    Menu:    () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    X:       () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    Arrow:   () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
    Check:   () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    Ext:     () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    Bell:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
};

// ─── Sidebar nav config ───────────────────────────────────────────────────────
const NAV = [
    { label: 'Dashboard',    href: 'DASHBOARD', icon: Icons.Grid   },
    { label: 'Hero Slides',  href: '/admin/hero-slides',  icon: Icons.Slides  },
    { label: 'Projects',     href: '/admin/projects',     icon: Icons.Folder  },
    { label: 'Team Members', href: '/admin/team-members', icon: Icons.Team    },
    { label: 'My Profile',   href: '/settings/profile',   icon: Icons.User    },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ teamSlug, onClose }: { teamSlug: string; onClose?: () => void }) {
    const current = typeof window !== 'undefined' ? window.location.pathname : '';
    const dashHref = `/${teamSlug}/dashboard`;

    return (
        <aside className="flex flex-col h-full select-none" style={{ background: C.navyDark }}>

            {/* Logo row */}
            <div className="flex items-center justify-between px-5 h-[72px] flex-shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
                <a href="/" className="flex items-center gap-2.5 group">
                    <img src="/images/urbanova.png" alt="Urbanova" className="h-10 w-auto object-contain" />
                </a>
                {onClose && (
                    <button onClick={onClose} className="p-1 rounded-lg lg:hidden transition-colors" style={{ color: C.muted }} onMouseEnter={e => e.currentTarget.style.color=C.white} onMouseLeave={e => e.currentTarget.style.color=C.muted}>
                        <Icons.X />
                    </button>
                )}
            </div>

            {/* Admin label */}
            <div className="px-5 pt-5 pb-2">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-md" style={{ background: `rgba(81,178,184,0.12)`, color: C.teal }}>
                    Admin Panel
                </span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                {NAV.map(({ label, href, icon: Icon }) => {
                    const resolvedHref = href === 'DASHBOARD' ? dashHref : href;
                    const active = current === resolvedHref;
                    return (
                        <a key={resolvedHref} href={resolvedHref}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                            style={{
                                background:   active ? `rgba(81,178,184,0.13)` : 'transparent',
                                color:        active ? C.teal : C.muted,
                                borderLeft:   `2px solid ${active ? C.teal : 'transparent'}`,
                            }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.faint; e.currentTarget.style.color = C.white; } }}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; } }}>
                            <Icon />
                            <span>{label}</span>
                            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: C.teal }} />}
                        </a>
                    );
                })}
            </nav>

            {/* Footer actions */}
            <div className="px-3 pb-4 space-y-0.5 flex-shrink-0" style={{ borderTop: `1px solid ${C.border}`, paddingTop: '12px' }}>
                <a href="/" target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{ color: C.muted }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.background = C.faint; }}
                    onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
                    <Icons.Globe />
                    View Public Site
                </a>
                <button onClick={() => router.post('/logout')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{ color: C.muted }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.red; e.currentTarget.style.background = 'rgba(229,62,62,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
                    <Icons.Logout />
                    Sign out
                </button>
            </div>
        </aside>
    );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, primary }: {
    label: string; value: number; sub: string; icon: React.FC; primary?: boolean;
}) {
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="rounded-2xl p-6 flex flex-col gap-5 cursor-default transition-all duration-200"
            style={{
                background:   primary ? `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDark} 100%)` : hov ? C.navyMid : C.faint,
                border:       primary ? 'none' : `1px solid ${C.border}`,
                transform:    hov ? 'translateY(-2px)' : 'none',
                boxShadow:    hov ? '0 12px 40px rgba(0,0,0,0.35)' : 'none',
            }}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: primary ? 'rgba(12,42,56,0.75)' : C.teal }}>
                    {label}
                </span>
                <span style={{ color: primary ? 'rgba(12,42,56,0.55)' : C.muted }}>
                    <Icon />
                </span>
            </div>
            <div>
                <div className="text-5xl font-extrabold tracking-tight leading-none" style={{ color: primary ? C.navy : C.white }}>
                    {value}
                </div>
                <div className="text-xs mt-2 font-medium" style={{ color: primary ? 'rgba(12,42,56,0.6)' : C.muted }}>
                    {sub}
                </div>
            </div>
        </div>
    );
}

// ─── Quick action ─────────────────────────────────────────────────────────────
function Action({ href, label, desc, icon: Icon }: { href: string; label: string; desc: string; icon: React.FC }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-150"
            style={{ background: hov ? C.navyMid : C.faint, border: `1px solid ${hov ? `rgba(81,178,184,0.2)` : C.border}` }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150"
                style={{ background: hov ? `rgba(81,178,184,0.2)` : `rgba(81,178,184,0.1)`, color: C.teal }}>
                <Icon />
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold transition-colors duration-150" style={{ color: hov ? C.teal : C.text }}>{label}</div>
                <div className="text-xs mt-0.5" style={{ color: C.muted }}>{desc}</div>
            </div>
            <div className="flex-shrink-0 transition-all duration-150" style={{ color: C.teal, opacity: hov ? 1 : 0, transform: hov ? 'translateX(0)' : 'translateX(-4px)' }}>
                <Icons.Arrow />
            </div>
        </a>
    );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
    const { auth, currentTeam, stats, recentProjects, pendingInvitations } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const teamSlug = currentTeam?.slug ?? '';

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const initials = auth.user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <>
            <Head title="Dashboard — Urbanova Admin" />

            {/* Google font */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" />

            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.navy, fontFamily: "'Inter', sans-serif", color: C.text }}>

                {/* ── Desktop sidebar ── */}
                <div style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column' }} className="hidden lg:flex">
                    <Sidebar teamSlug={teamSlug} />
                </div>

                {/* ── Mobile sidebar overlay ── */}
                {sidebarOpen && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} className="lg:hidden flex">
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setSidebarOpen(false)} />
                        <div style={{ position: 'relative', width: '256px', flexShrink: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                            <Sidebar teamSlug={teamSlug} onClose={() => setSidebarOpen(false)} />
                        </div>
                    </div>
                )}

                {/* ── Main ── */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

                    {/* Top bar */}
                    <header style={{ height: '72px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: `1px solid ${C.border}`, background: 'rgba(7,29,40,0.6)', backdropFilter: 'blur(12px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {/* Mobile menu */}
                            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} style={{ color: C.muted, padding: '6px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}
                                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                                <Icons.Menu />
                            </button>

                            <div>
                                <div style={{ color: C.white, fontWeight: 700, fontSize: '17px', lineHeight: 1 }}>
                                    {greeting}, {auth.user.name.split(' ')[0]}
                                </div>
                                <div style={{ color: C.muted, fontSize: '12px', marginTop: '3px' }}>
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* Notification bell */}
                            {pendingInvitations.length > 0 && (
                                <div style={{ position: 'relative', color: C.teal }}>
                                    <Icons.Bell />
                                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '14px', height: '14px', borderRadius: '50%', background: C.red, color: C.white, fontSize: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {pendingInvitations.length}
                                    </span>
                                </div>
                            )}

                            {/* View site */}
                            <a href="/" target="_blank" className="hidden sm:flex items-center gap-2"
                                style={{ padding: '7px 14px', borderRadius: '8px', background: `rgba(81,178,184,0.1)`, border: `1px solid rgba(81,178,184,0.2)`, color: C.teal, fontSize: '12px', fontWeight: 600, textDecoration: 'none', lineHeight: 1, whiteSpace: 'nowrap' }}
                                onMouseEnter={e => (e.currentTarget.style.background = `rgba(81,178,184,0.18)`)}
                                onMouseLeave={e => (e.currentTarget.style.background = `rgba(81,178,184,0.1)`)}>
                                <Icons.Ext />
                                View Site
                            </a>

                            {/* Avatar */}
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'default' }}>
                                {initials}
                            </div>
                        </div>
                    </header>

                    {/* Scrollable body */}
                    <main style={{ flex: 1, overflowY: 'auto', padding: '32px 28px', scrollbarWidth: 'thin', scrollbarColor: `${C.faint} transparent` }}>
                        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                            {/* Invitation banner */}
                            {pendingInvitations.length > 0 && (
                                <div style={{ background: `rgba(81,178,184,0.08)`, border: `1px solid rgba(81,178,184,0.22)`, borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `rgba(81,178,184,0.15)`, color: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icons.Team />
                                    </div>
                                    <div>
                                        <div style={{ color: C.white, fontWeight: 600, fontSize: '14px' }}>
                                            {pendingInvitations.length} pending team invitation{pendingInvitations.length > 1 ? 's' : ''}
                                        </div>
                                        <div style={{ color: C.muted, fontSize: '12px', marginTop: '2px' }}>
                                            From: {pendingInvitations.map(i => i.team.name).join(', ')}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Section: Stats ── */}
                            <SectionLabel>Site Overview</SectionLabel>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '36px' }}>
                                <StatCard label="Hero Slides"  value={stats.heroSlides}  sub={`${stats.activeSlides} currently active`}  icon={Icons.Slides} primary />
                                <StatCard label="Projects"     value={stats.projects}     sub={`${stats.activeProjects} active`}           icon={Icons.Folder} />
                                <StatCard label="Team Members" value={stats.teamMembers}  sub="staff profiles published"                   icon={Icons.Team}   />
                            </div>

                            {/* ── Two-column grid ── */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: '24px', alignItems: 'start' }} className="grid-cols-1 lg:grid-responsive">

                                {/* Quick actions */}
                                <div>
                                    <SectionLabel>Quick Actions</SectionLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Action href="/admin/hero-slides"  label="Hero Slides"   desc="Manage carousel content"     icon={Icons.Slides} />
                                        <Action href="/admin/projects"     label="Projects"      desc="Add or edit project cards"   icon={Icons.Folder} />
                                        <Action href="/admin/team-members" label="Team Members"  desc="Update staff profiles"       icon={Icons.Team}   />
                                        <Action href="/admin/profile"      label="My Profile"    desc="Account & security settings" icon={Icons.User}   />
                                    </div>
                                </div>

                                {/* Recent projects table */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                        <SectionLabelInline>Recent Projects</SectionLabelInline>
                                        <a href="/admin/projects" style={{ color: C.teal, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}
                                            onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                                            onMouseLeave={e => (e.currentTarget.style.color = C.teal)}>
                                            View all →
                                        </a>
                                    </div>

                                    <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
                                        {recentProjects.length === 0 ? (
                                            <div style={{ padding: '48px', textAlign: 'center', color: C.muted }}>
                                                <div style={{ marginBottom: '8px', opacity: 0.4 }}><Icons.Folder /></div>
                                                <p style={{ fontSize: '14px' }}>No projects yet</p>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Table head */}
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: `1px solid ${C.border}` }}>
                                                    {['Project', 'Category', 'Status'].map(h => (
                                                        <div key={h} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>{h}</div>
                                                    ))}
                                                </div>

                                                {/* Rows */}
                                                {recentProjects.map((p, i) => (
                                                    <ProjectRow key={p.id} project={p} last={i === recentProjects.length - 1} />
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ color: C.muted, fontSize: '12px' }}>
                                    Urbanova Admin · {new Date().getFullYear()}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.teal, display: 'inline-block' }} />
                                    <span style={{ color: C.muted, fontSize: '12px' }}>System online</span>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: '14px' }}>
            {children}
        </div>
    );
}

function SectionLabelInline({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted }}>
            {children}
        </div>
    );
}

function ProjectRow({ project, last }: { project: RecentProject; last: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', alignItems: 'center',
                padding: '13px 20px', borderBottom: last ? 'none' : `1px solid ${C.border}`,
                background: hov ? 'rgba(255,255,255,0.025)' : 'transparent', transition: 'background 0.15s',
            }}>
            <div style={{ minWidth: 0 }}>
                <div style={{ color: C.white, fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.title}</div>
                <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.client}</div>
            </div>
            <div>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: `rgba(81,178,184,0.1)`, color: C.teal, whiteSpace: 'nowrap' }}>
                    {project.category}
                </span>
            </div>
            <div>
                {project.is_active ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: 'rgba(72,187,120,0.1)', color: C.green }}>
                        <Icons.Check /> Active
                    </span>
                ) : (
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: C.faint, color: C.muted }}>
                        Draft
                    </span>
                )}
            </div>
        </div>
    );
}
