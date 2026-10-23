import { useState } from 'react';
import { router } from '@inertiajs/react';
import { C, Icons, NAV } from './dashboard-theme';

interface SidebarProps {
    teamSlug: string;
    onClose?: () => void;
}

export function Sidebar({ teamSlug, onClose }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const current = typeof window !== 'undefined' ? window.location.pathname : '';
    const dashHref = `/${teamSlug}/dashboard`;

    return (
        <aside 
            className={`flex flex-col h-full select-none transition-all duration-300 relative ${collapsed ? 'w-20' : 'w-64'}`} 
            style={{ background: C.navyDark, borderRight: `1px solid ${C.border}` }}
        >
            {/* Header / Brand & Collapse Toggle */}
            <div className="flex items-center justify-between px-4 h-[72px] flex-shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
                <a href="/" className={`flex items-center gap-2.5 group overflow-hidden ${collapsed ? 'hidden' : 'flex'}`}>
                    <img src="/images/urbanova.png" alt="Urbanova" className="h-9 w-auto object-contain flex-shrink-0" />
                </a>

                {collapsed && (
                    <div className="mx-auto flex items-center justify-center">
                        <img src="/images/urbanova.png" alt="Urbanova" className="h-7 w-auto object-contain" />
                    </div>
                )}

                <div className="flex items-center gap-1">
                    {onClose && (
                        <button onClick={onClose} className="p-1 rounded-lg lg:hidden transition-colors" style={{ color: C.muted }} onMouseEnter={e => e.currentTarget.style.color = C.white} onMouseLeave={e => e.currentTarget.style.color = C.muted}>
                            <Icons.X />
                        </button>
                    )}
                    {/* Expand/Collapse Toggle Button */}
                    <button 
                        onClick={() => setCollapsed(!collapsed)} 
                        className="hidden lg:flex items-center justify-center p-1.5 rounded-lg transition-colors"
                        style={{ color: C.muted }}
                        onMouseEnter={e => e.currentTarget.style.color = C.white}
                        onMouseLeave={e => e.currentTarget.style.color = C.muted}
                        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        <svg className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* User Profile Summary Section (Inspired by reference design) */}
            <div className={`flex items-center gap-3 px-4 py-3.5 mx-3 mt-4 rounded-xl flex-shrink-0 transition-all ${collapsed ? 'justify-center px-0 mx-2' : ''}`} style={{ background: `rgba(255,255,255,0.03)`, border: `1px solid ${C.border}` }}>
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner" style={{ background: `rgba(81,178,184,0.2)`, color: C.teal }}>
                        TM
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ background: '#10B981', borderColor: C.navyDark }}></span>
                </div>
                {!collapsed && (
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold truncate" style={{ color: C.white }}>Timothy M.</span>
                        <span className="text-[11px] truncate" style={{ color: C.teal }}>Team Admin</span>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto overflow-x-hidden">
                {NAV.map(({ label, href, icon: Icon }) => {
                    const resolvedHref = href === 'DASHBOARD' ? dashHref : href;
                    const active = current === resolvedHref;

                    return (
                        <a
                            key={resolvedHref}
                            href={resolvedHref}
                            title={collapsed ? label : undefined}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative group ${collapsed ? 'justify-center px-0' : ''}`}
                            style={{
                                background: active ? `rgba(81,178,184,0.13)` : 'transparent',
                                color: active ? C.teal : C.muted,
                                borderLeft: !collapsed ? `2px solid ${active ? C.teal : 'transparent'}` : 'none',
                            }}
                            onMouseEnter={e => {
                                if (!active) {
                                    e.currentTarget.style.background = C.faint;
                                    e.currentTarget.style.color = C.white;
                                }
                            }}
                            onMouseLeave={e => {
                                if (!active) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = C.muted;
                                }
                            }}
                        >
                            <span className="flex-shrink-0"><Icon /></span>
                            {!collapsed && <span className="truncate">{label}</span>}
                            {active && !collapsed && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.teal }} />}
                            {active && collapsed && <span className="absolute right-1 w-1 h-4 rounded-full" style={{ background: C.teal }} />}
                        </a>
                    );
                })}
            </nav>

            {/* Footer Actions (View Site & Logout) */}
            <div className="px-3 pb-4 space-y-1 flex-shrink-0" style={{ borderTop: `1px solid ${C.border}`, paddingTop: '12px' }}>
                <a 
                    href="/" 
                    target="_blank" 
                    title={collapsed ? "View Public Site" : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${collapsed ? 'justify-center px-0' : ''}`} 
                    style={{ color: C.muted }} 
                    onMouseEnter={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.background = C.faint; }} 
                    onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}
                >
                    <span className="flex-shrink-0"><Icons.Globe /></span>
                    {!collapsed && <span className="truncate">View Public Site</span>}
                </a>
                <button 
                    onClick={() => router.post('/logout')} 
                    title={collapsed ? "Sign out" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${collapsed ? 'justify-center px-0' : ''}`} 
                    style={{ color: C.muted }} 
                    onMouseEnter={e => { e.currentTarget.style.color = C.red; e.currentTarget.style.background = 'rgba(229,62,62,0.08)'; }} 
                    onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}
                >
                    <span className="flex-shrink-0"><Icons.Logout /></span>
                    {!collapsed && <span className="truncate">Sign out</span>}
                </button>
            </div>
        </aside>
    );
}