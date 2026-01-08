import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
            <Sidebar />
            <div className="flex-1 flex flex-col pl-16 md:pl-20 lg:pl-24 transition-all duration-300">
                <Topbar />
                <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-[1900px] mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
