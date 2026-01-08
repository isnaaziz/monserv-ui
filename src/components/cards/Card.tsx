import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    action?: ReactNode;
}

export function Card({ children, className, title, action }: CardProps) {
    return (
        <div className={cn(
            "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/50 rounded-xl overflow-hidden flex flex-col hover:border-zinc-300 dark:hover:border-zinc-700/50 transition-colors shadow-lg shadow-black/5 dark:shadow-black/20",
            className
        )}>
            {(title || action) && (
                <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between min-h-[64px]">
                    {title && <h3 className="text-zinc-800 dark:text-zinc-100 font-semibold text-sm">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6 flex-1">{children}</div>
        </div>
    );
}
