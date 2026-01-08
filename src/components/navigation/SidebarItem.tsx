import { cn } from '../../lib/utils';
import type { SidebarItem as SidebarItemType } from '../../types';

interface SidebarItemProps extends SidebarItemType {
    collapsed?: boolean;
}

export function SidebarItem({ icon: Icon, label, active }: SidebarItemProps) {
    return (
        <button
            className={cn(
                "group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 w-full",
                active
                    ? "bg-zinc-900/50 text-emerald-500 shadow-lg shadow-black/50"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
            )}
            title={label}
        >
            <Icon className="size-5 md:size-6" />

            {/* Active Indicator */}
            {active && (
                <div className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full -ml-3 md:-ml-4 lg:hidden" />
            )}

            {/* Tooltip for desktop */}
            <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-zinc-200 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                {label}
            </div>
        </button>
    );
}
