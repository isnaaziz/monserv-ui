import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    color: 'emerald' | 'amber' | 'blue' | 'red';
    icon?: React.ElementType;
}

export function StatCard({ label, value, change, trend, color, icon: Icon = Activity }: StatCardProps) {
    const colorStyles = {
        emerald: 'text-emerald-500 bg-emerald-500/10',
        amber: 'text-amber-500 bg-amber-500/10',
        blue: 'text-blue-500 bg-blue-500/10',
        red: 'text-red-500 bg-red-500/10',
    };

    const trendColor = trend === 'up' ? 'text-emerald-500' : 'text-red-500';
    const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;

    return (
        <Card className="relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-zinc-500 text-sm font-medium mb-1">{label}</p>
                    <h4 className="text-3xl font-bold text-zinc-100">{value}</h4>
                </div>
                <div className={cn("p-2 rounded-lg", colorStyles[color])}>
                    <Icon className="size-5" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={cn("flex items-center text-sm font-medium", trendColor)}>
                    <TrendIcon className="size-4 mr-1" />
                    {change}
                </span>
                <span className="text-zinc-600 text-sm">vs last month</span>
            </div>
            {/* Background decoration */}
            <div className={cn("absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity", colorStyles[color].split(" ")[0])}>
                <Icon className="size-24" />
            </div>
        </Card>
    );
}
