import { cn } from '../../lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                'bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm',
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <h3 className={cn('text-zinc-100 font-semibold text-lg mb-4', className)}>
            {children}
        </h3>
    );
}
