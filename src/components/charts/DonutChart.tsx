import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '../cards/Card';
import { hardwareHealthData } from '../../data/charts';
import type { DashboardStats } from '../../context/SSEContext';

interface DonutChartProps {
    stats?: DashboardStats | null;
}

export function DonutChart({ stats }: DonutChartProps) {
    const chartData = stats
        ? [
            { name: 'Healthy', value: stats.online_servers - stats.alert_count, fill: '#22c55e' },
            { name: 'Danger', value: stats.offline_servers, fill: '#ef4444' },
            { name: 'Warning', value: stats.alert_count, fill: '#eab308' },
        ].filter(item => item.value > 0)
        : hardwareHealthData;

    // Use total_servers from stats, not sum of chart items
    const totalNodes = stats?.total_servers ?? chartData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <Card title="Server Status Overview" className="h-full min-h-[280px]">
            <div className="flex items-center h-full gap-4">
                {/* Donut Chart */}
                <div className="relative w-[160px] h-[160px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={1}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend on the right */}
                <div className="flex-1">
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Total Servers : <span className="text-zinc-800 dark:text-white font-semibold">{totalNodes}</span></p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {chartData.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 w-10">{item.value}</span>
                                <div className="size-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: item.fill }} />
                                <span className="text-sm font-medium" style={{ color: item.fill }}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
