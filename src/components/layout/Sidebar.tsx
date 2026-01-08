import { LayoutDashboard, Server, Network, Bell, FileText, Settings, LogOut } from 'lucide-react';
import { SidebarItem } from '../navigation/SidebarItem';

export function Sidebar() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/', active: true },
        { icon: Server, label: 'Servers', path: '/servers', active: false },
        { icon: Network, label: 'Network', path: '/network', active: false },
        { icon: Bell, label: 'Alerts', path: '/alerts', active: false },
        { icon: FileText, label: 'Reports', path: '/reports', active: false },
        { icon: Settings, label: 'Settings', path: '/settings', active: false },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-16 md:w-20 bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900 shadow-2xl z-50 flex flex-col items-center py-6 gap-8">
            {/* Logo */}
            <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center p-2.5">
                <div className="size-full rounded-lg bg-emerald-500 shadow-inner shadow-emerald-400/50" />
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col items-center gap-3 w-full px-3">
                {navItems.map((item, index) => (
                    <SidebarItem key={index} {...item} />
                ))}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto flex flex-col gap-3 px-3 w-full">
                <SidebarItem icon={LogOut} label="Logout" path="/logout" />
            </div>
        </aside>
    );
}
