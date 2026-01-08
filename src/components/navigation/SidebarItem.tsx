import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    path: string;
    active?: boolean;
}

export function SidebarItem({ icon: Icon, label, path, active }: SidebarItemProps) {
    return (
        <Link
            to={path}
            className={cn(
                "group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 w-full",
                active
                    ? "bg-zinc-200 dark:bg-zinc-900/50 text-emerald-500 shadow-lg shadow-black/10 dark:shadow-black/50"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/30"
            )}
            title={label}
        >
            <Icon className="size-5 md:size-6" />

            {/* Active Indicator */}
            {active && (
                <div className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full -ml-3 md:-ml-4" />
            )}

            {/* Tooltip for desktop */}
            <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                {label}
            </div>
        </Link>
    );
}
