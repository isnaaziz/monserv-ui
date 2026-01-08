import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className="flex items-center justify-center size-12 rounded-xl bg-emerald-500/10 text-emerald-500">
                        <Icon className="size-6" />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    {description && (
                        <p className="text-sm text-zinc-400 mt-1">{description}</p>
                    )}
                </div>
            </div>
            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
