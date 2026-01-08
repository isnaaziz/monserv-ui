import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex font-inter selection:bg-emerald-500/30 selection:text-emerald-500 transition-colors duration-200">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col ml-16 md:ml-20 transition-all duration-300">
                {/* Topbar */}
                <Topbar />

                {/* Main Content */}
                <main className="flex-1 px-4 py-6 lg:px-6 xl:px-8 overflow-y-auto w-full">
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
