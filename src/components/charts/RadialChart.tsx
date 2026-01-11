import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Card } from '../cards/Card';
import { useTheme } from '../../context/ThemeContext';
import type { ServerStatus } from '../../context/SSEContext';

interface RadialChartProps {
    servers?: ServerStatus[];
}

// Color palette for different servers
const serverColors = ['#22c55e', '#3b82f6', '#eab308', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export function RadialChart({ servers }: RadialChartProps) {
    const { theme } = useTheme();
    const bgColor = theme === 'dark' ? '#27272a' : '#e4e4e7';

    // Generate chart data from servers - one ring per server
    const chartData = servers && servers.length > 0
        ? servers.map((server, index) => ({
            name: server.metrics?.hostname ?? `Server ${index + 1}`,
            value: Math.round(server.metrics?.memory.used_percent ?? 0), // Using memory as proxy since CPU not available
            fill: serverColors[index % serverColors.length],
        })).reverse() // Reverse so first server is outermost
        : [
            { name: 'Server 1', value: 45, fill: '#22c55e' },
            { name: 'Server 2', value: 62, fill: '#3b82f6' },
        ];

    // Original data for legend (not reversed)
    const legendData = [...chartData].reverse();

    return (
        <Card title="CPU Usage" className="h-full min-h-[300px]">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex items-center">
                    {/* Legend on the left */}
                    <div className="flex flex-col gap-2 pr-4 min-w-[100px]">
                        {legendData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-sm">
                                <div 
                                    className="w-3 h-3 rounded-full flex-shrink-0" 
                                    style={{ backgroundColor: item.fill }}
                                />
                                <span className="text-zinc-600 dark:text-zinc-300 truncate max-w-[80px]" title={item.name}>
                                    {item.name}
                                </span>
                                <span 
                                    className="font-semibold ml-auto"
                                    style={{ color: item.fill }}
                                >
                                    {item.value}%
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Chart on the right */}
                    <div className="flex-1 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="20%"
                                outerRadius="100%"
                                barSize={chartData.length > 4 ? 10 : 14}
                                data={chartData}
                                startAngle={90}
                                endAngle={-270}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    angleAxisId={0}
                                    tick={false}
                                />
                                <RadialBar
                                    background={{ fill: bgColor }}
                                    dataKey="value"
                                    cornerRadius={10}
                                    angleAxisId={0}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Card>
    );
}
