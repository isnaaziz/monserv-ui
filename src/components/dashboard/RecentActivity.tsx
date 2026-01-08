import { Card, CardTitle } from '../ui/Card';
import { cn } from '../../lib/utils';
import { recentActivity } from '../../data/mock';
import { CheckCircle2, AlertCircle, Clock, AlertTriangle } from 'lucide-react';

export function DatacenterMap() {
    return (
        <Card className="h-[400px] flex flex-col relative overflow-hidden p-0 group">
            <div className="absolute top-6 left-6 z-10">
                <CardTitle>Datacenter Status</CardTitle>
            </div>
            {/* Placeholder Map Pattern */}
            <div className="w-full h-full bg-zinc-900 absolute inset-0 opacity-50">
                <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(#3f3f46 2px, transparent 2px)',
                    backgroundSize: '24px 24px'
                }}></div>
            </div>

            {/* Interactive Points */}
            <div className="absolute top-1/3 left-1/4 group/point cursor-pointer">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700">
                    US-East (Active)
                </div>
            </div>

            <div className="absolute bottom-1/3 right-1/3 group/point cursor-pointer">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700">
                    EU-Central (High Load)
                </div>
            </div>
        </Card>
    );
}

export function RecentActivity() {
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
        <Card className="h-full">
            <CardTitle>Recent Activity</CardTitle>
            <div className="space-y-6">
                {recentActivity.map((activity, index) => {
                    const Icon = icons[activity.type as keyof typeof icons] || Clock;
                    const colorClass = colors[activity.type as keyof typeof colors] || 'text-zinc-500';

                    return (
                        <div key={activity.id} className="flex gap-4 relative">
                            {index !== recentActivity.length - 1 && (
                                <div className="absolute left-2.5 top-8 bottom-[-24px] w-px bg-zinc-800 border-l border-zinc-800 border-dashed" />
                            )}
                            <div className={cn("mt-0.5", colorClass)}>
                                <Icon className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-200">{activity.action}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-zinc-500">{activity.user}</span>
                                    <span className="text-[10px] text-zinc-600">•</span>
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
