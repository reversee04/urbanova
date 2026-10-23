import { useState } from 'react';
import type { ReactNode } from 'react';
import { C, Icons } from './dashboard-theme';
import type { RecentProject } from './dashboard-types';

export function StatCard({ label, value, sub, icon: Icon, primary }: { label: string; value: number; sub: string; icon: () => ReactNode; primary?: boolean }) {
    const [hov, setHov] = useState(false);

    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="rounded-2xl p-6 flex flex-col gap-5 cursor-default transition-all duration-200" style={{
            background: primary ? `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDark} 100%)` : hov ? C.navyMid : C.faint,
            border: primary ? 'none' : `1px solid ${C.border}`,
            transform: hov ? 'translateY(-2px)' : 'none',
            boxShadow: hov ? '0 12px 40px rgba(0,0,0,0.35)' : 'none',
        }}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: primary ? 'rgba(12,42,56,0.75)' : C.teal }}>{label}</span>
                <span style={{ color: primary ? 'rgba(12,42,56,0.55)' : C.muted }}><Icon /></span>
            </div>
            <div>
                <div className="text-5xl font-extrabold tracking-tight leading-none" style={{ color: primary ? C.navy : C.white }}>{value}</div>
                <div className="text-xs mt-2 font-medium" style={{ color: primary ? 'rgba(12,42,56,0.6)' : C.muted }}>{sub}</div>
            </div>
        </div>
    );
}

export function Action({ href, label, desc, icon: Icon }: { href: string; label: string; desc: string; icon: () => ReactNode }) {
    const [hov, setHov] = useState(false);

    return (
        <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-150" style={{ background: hov ? C.navyMid : C.faint, border: `1px solid ${hov ? 'rgba(81,178,184,0.2)' : C.border}` }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150" style={{ background: hov ? `rgba(81,178,184,0.2)` : `rgba(81,178,184,0.1)`, color: C.teal }}>
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

export function SectionLabel({ children }: { children: ReactNode }) {
    return <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: '14px' }}>{children}</div>;
}

export function SectionLabelInline({ children }: { children: ReactNode }) {
    return <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted }}>{children}</div>;
}

export function ProjectRow({ project, last }: { project: RecentProject; last: boolean }) {
    const [hov, setHov] = useState(false);

    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: '12px',
            alignItems: 'center',
            padding: '13px 20px',
            borderBottom: last ? 'none' : `1px solid ${C.border}`,
            background: hov ? 'rgba(255,255,255,0.025)' : 'transparent',
            transition: 'background 0.15s',
        }}>
            <div style={{ minWidth: 0 }}>
                <div style={{ color: C.white, fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.title}</div>
                <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.client}</div>
            </div>
            <div>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: `rgba(81,178,184,0.1)`, color: C.teal, whiteSpace: 'nowrap' }}>{project.category}</span>
            </div>
            <div>
                {project.is_active ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: 'rgba(72,187,120,0.1)', color: C.green }}>
                        <Icons.Check /> Active
                    </span>
                ) : (
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: C.faint, color: C.muted }}>Draft</span>
                )}
            </div>
        </div>
    );
}
