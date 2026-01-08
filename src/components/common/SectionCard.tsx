import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface SectionCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
    action?: ReactNode;
    noPadding?: boolean;
}

export function SectionCard({ 
    children, 
    className, 
    title, 
    description, 
    action,
    noPadding = false 
}: SectionCardProps) {
    return (
        <div className={cn(
            "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl overflow-hidden",
            "hover:border-zinc-700/50 transition-colors shadow-lg shadow-black/20",
            className
        )}>
            {(title || action) && (
                <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
                    <div>
                        {title && <h3 className="text-zinc-100 font-semibold text-sm">{title}</h3>}
                        {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className={cn(!noPadding && "p-6")}>
                {children}
            </div>
        </div>
    );
}
