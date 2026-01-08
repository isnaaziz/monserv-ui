import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
        success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        error: 'bg-red-500/10 text-red-500 border-red-500/20',
        info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };

    return (
        <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium border flex items-center justify-center gap-1 w-fit",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
