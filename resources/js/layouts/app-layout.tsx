import type {ReactNode} from 'react';
import SiteFooter from '@/components/site-footer';
import SiteNav from '@/components/site-nav';


export default function AppLayout({children}: {children: ReactNode}) {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteNav />
            <main className="flex-grow">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
