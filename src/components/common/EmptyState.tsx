import { FolderOpen, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ 
    icon: Icon = FolderOpen, 
    title, 
    description,
    actionLabel,
    onAction 
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="flex items-center justify-center size-16 rounded-2xl bg-zinc-800/50 text-zinc-500 mb-4">
                <Icon className="size-8" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
            )}
            {actionLabel && onAction && (
                <Button onClick={onAction} size="sm">
                    <Plus className="size-4 mr-2" />
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
