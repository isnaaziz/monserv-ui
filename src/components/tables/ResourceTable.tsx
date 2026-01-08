import { Card } from '../cards/Card';
import { resourceTableData } from '../../data/table';
import { MoreHorizontal, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

function LoadTimeCircle({ value }: { value: string }) {
    const { theme } = useTheme();
    const numValue = parseFloat(value);
    // Color based on load time
    const color = numValue <= 3 ? '#22c55e' : numValue <= 5 ? '#eab308' : '#ef4444';
    const bgColor = theme === 'dark' ? '#27272a' : '#e4e4e7';
    
    // Calculate stroke dasharray for the circle (circumference = 2 * PI * radius)
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    // Assume max load time is 10 seconds for the progress
    const progress = Math.min(numValue / 10, 1);
    const strokeDasharray = `${progress * circumference} ${circumference}`;
    
    return (
        <div className="relative size-9 flex items-center justify-center">
            <svg className="size-9 -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke={bgColor}
                    strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-xs font-medium text-zinc-600 dark:text-zinc-300">{value}</span>
        </div>
    );
}

function StatusIcon({ status }: { status: string }) {
    if (status === 'Active') {
        return <CheckCircle2 className="size-5 text-emerald-500" />;
    } else if (status === 'Warning') {
        return <AlertCircle className="size-5 text-yellow-500" />;
    } else {
        return <AlertTriangle className="size-5 text-red-500" />;
    }
}

export function ResourceTable() {
    return (
        <Card title="Website Resource Utilization" className="h-full" action={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 dark:text-zinc-400">
                <MoreHorizontal className="size-4" />
            </Button>
        }>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-500 dark:text-zinc-400">
                    <thead className="text-zinc-500 dark:text-zinc-400 text-sm font-medium border-b border-zinc-200 dark:border-zinc-800">
                        <tr>
                            <th className="px-4 py-3">Website Name</th>
                            <th className="px-4 py-3">Region</th>
                            <th className="px-4 py-3">Load time <span className="text-zinc-400 dark:text-zinc-500">(secs)</span></th>
                            <th className="px-4 py-3">CPU %</th>
                            <th className="px-4 py-3">Memory</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                        {resourceTableData.map((item) => (
                            <tr key={item.id} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors group">
                                <td className="px-4 py-3 font-medium text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                    {item.website}
                                </td>
                                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{item.region}</td>
                                <td className="px-4 py-3">
                                    <LoadTimeCircle value={item.loadTime} />
                                </td>
                                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{item.cpu}</td>
                                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{item.memory}</td>
                                <td className="px-4 py-3">
                                    <StatusIcon status={item.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
