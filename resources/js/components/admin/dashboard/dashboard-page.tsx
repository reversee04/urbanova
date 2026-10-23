import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { C, Icons } from './dashboard-theme';
import { Sidebar } from './dashboard-sidebar';
import { Action, ProjectRow, SectionLabel, SectionLabelInline, StatCard } from './dashboard-stats';
import type { PageProps } from './dashboard-types';

export function DashboardPage({ auth, currentTeam, stats, recentProjects, pendingInvitations }: PageProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const teamSlug = currentTeam?.slug ?? '';

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const initials = auth.user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <>
            <Head title="Dashboard — Urbanova Admin" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" />

            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.navy, fontFamily: "'Inter', sans-serif", color: C.text }}>
                <div style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column' }} className="hidden lg:flex">
                    <Sidebar teamSlug={teamSlug} />
                </div>

                {sidebarOpen && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} className="lg:hidden flex">
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setSidebarOpen(false)} />
                        <div style={{ position: 'relative', width: '256px', flexShrink: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                            <Sidebar teamSlug={teamSlug} onClose={() => setSidebarOpen(false)} />
                        </div>
                    </div>
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                    <header style={{ height: '72px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: `1px solid ${C.border}`, background: 'rgba(7,29,40,0.6)', backdropFilter: 'blur(12px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} style={{ color: C.muted, padding: '6px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }} onMouseEnter={e => (e.currentTarget.style.color = C.white)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
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
                            {pendingInvitations.length > 0 && (
                                <div style={{ position: 'relative', color: C.teal }}>
                                    <Icons.Bell />
                                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '14px', height: '14px', borderRadius: '50%', background: C.red, color: C.white, fontSize: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {pendingInvitations.length}
                                    </span>
                                </div>
                            )}

                            <a href="/" target="_blank" className="hidden sm:flex items-center gap-2" style={{ padding: '7px 14px', borderRadius: '8px', background: `rgba(81,178,184,0.1)`, border: `1px solid rgba(81,178,184,0.2)`, color: C.teal, fontSize: '12px', fontWeight: 600, textDecoration: 'none', lineHeight: 1, whiteSpace: 'nowrap' }} onMouseEnter={e => (e.currentTarget.style.background = `rgba(81,178,184,0.18)`) } onMouseLeave={e => (e.currentTarget.style.background = `rgba(81,178,184,0.1)`) }>
                                <Icons.Ext />
                                View Site
                            </a>

                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.navy, fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'default' }}>
                                {initials}
                            </div>
                        </div>
                    </header>

                    <main style={{ flex: 1, overflowY: 'auto', padding: '32px 28px', scrollbarWidth: 'thin', scrollbarColor: `${C.faint} transparent` }}>
                        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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

                            <SectionLabel>Site Overview</SectionLabel>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '36px' }}>
                                <StatCard label="Hero Slides" value={stats.heroSlides} sub={`${stats.activeSlides} currently active`} icon={Icons.Slides} primary />
                                <StatCard label="Projects" value={stats.projects} sub={`${stats.activeProjects} active`} icon={Icons.Folder} />
                                <StatCard label="Team Members" value={stats.teamMembers} sub="staff profiles published" icon={Icons.Team} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: '24px', alignItems: 'start' }} className="grid-cols-1 lg:grid-responsive">
                                <div>
                                    <SectionLabel>Quick Actions</SectionLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Action href="/admin/hero-slides" label="Hero Slides" desc="Manage carousel content" icon={Icons.Slides} />
                                        <Action href="/admin/projects" label="Projects" desc="Add or edit project cards" icon={Icons.Folder} />
                                        <Action href="/admin/team-members" label="Team Members" desc="Update staff profiles" icon={Icons.Team} />
                                        <Action href="/admin/profile" label="My Profile" desc="Account & security settings" icon={Icons.User} />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                        <SectionLabelInline>Recent Projects</SectionLabelInline>
                                        <a href="/admin/projects" style={{ color: C.teal, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = C.white)} onMouseLeave={e => (e.currentTarget.style.color = C.teal)}>
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
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: `1px solid ${C.border}` }}>
                                                    {['Project', 'Category', 'Status'].map(h => (
                                                        <div key={h} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>{h}</div>
                                                    ))}
                                                </div>

                                                {recentProjects.map((project, index) => (
                                                    <ProjectRow key={project.id} project={project} last={index === recentProjects.length - 1} />
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

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
