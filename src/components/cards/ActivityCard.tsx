import { recentActivity } from '../../data/activities';
import { Card } from './Card';
import { CheckCircle2, AlertCircle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ActivityItem } from '../../types';

export function ActivityCard() {
    const icons = {
        success: CheckCircle2,
        info: Clock,
        error: AlertCircle,
        warning: AlertTriangle,
    };

    const colors = {
        success: 'text-emerald-500',
        info: 'text-blue-500',
        error: 'text-red-500',
        warning: 'text-amber-500',
    };

    return (
        <Card title="Recent Activity" className="h-full" action={
            <button className="text-xs text-emerald-500 hover:text-emerald-400 font-medium">View All</button>
        }>
            <div className="space-y-6">
                {recentActivity.map((activity: ActivityItem, index: number) => {
                    const Icon = icons[activity.type] || Clock;
                    const colorClass = colors[activity.type] || 'text-zinc-500';

                    return (
                        <div key={activity.id} className="flex gap-4 relative group">
                            {/* Timeline line */}
                            {index !== recentActivity.length - 1 && (
                                <div className="absolute left-2.5 top-8 bottom-[-24px] w-px bg-zinc-300 dark:bg-zinc-800 border-l border-zinc-300 dark:border-zinc-800 border-dashed group-hover:border-zinc-400 dark:group-hover:border-zinc-700 transition-colors" />
                            )}

                            <div className={cn("mt-0.5 relative z-10 bg-white dark:bg-zinc-950 rounded-full", colorClass)}>
                                <Icon className="size-5" />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{activity.action}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-emerald-500 font-medium">{activity.user}</span>
                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-700">•</span>
                                    <span className="text-xs text-zinc-500">{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
