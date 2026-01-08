import { Home, BarChart2, HardDrive, Share2, Settings, Users, Hexagon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar() {
    const navItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: BarChart2, label: 'Analytics', active: false },
        { icon: HardDrive, label: 'Resources', active: false },
        { icon: Share2, label: 'Network', active: false },
        { icon: Users, label: 'Users', active: false },
        { icon: Hexagon, label: 'Infrastructure', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-16 md:w-20 lg:w-24 bg-zinc-950/50 backdrop-blur-xl border-r border-zinc-900 shadow-xl z-50 flex flex-col items-center py-6 gap-8">
            {/* Logo */}
            <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center p-2.5">
                <div className="size-full rounded-lg bg-emerald-500 shadow-inner shadow-emerald-400/50" />
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col items-center gap-4 w-full">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className={cn(
                            "group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300",
                            item.active
                                ? "bg-zinc-900/50 text-emerald-500 shadow-lg shadow-black/50"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                        )}
                        title={item.label}
                    >
                        <item.icon className="size-5 md:size-6" />
                        {item.active && (
                            <div className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full -ml-3 md:-ml-5" />
                        )}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
