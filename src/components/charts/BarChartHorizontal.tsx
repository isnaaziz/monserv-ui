import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Card } from '../cards/Card';
import { memoryUsageData } from '../../data/charts';
import { useTheme } from '../../context/ThemeContext';
import type { ServerStatus } from '../../context/SSEContext';

interface BarChartHorizontalProps {
    servers?: ServerStatus[];
}

export function BarChartHorizontal({ servers }: BarChartHorizontalProps) {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#71717a' : '#a1a1aa';
    const axisColor = theme === 'dark' ? '#3f3f46' : '#d4d4d8';
    const labelColor = theme === 'dark' ? '#a1a1aa' : '#71717a';

    // Generate chart data from real servers data
    const chartData = servers && servers.length > 0
        ? servers.slice(0, 5).map((server, index) => {
            const memoryGB = server.metrics
                ? (server.metrics.memory.used_bytes / (1024 * 1024 * 1024)).toFixed(1)
                : 0;
            const memoryPercent = server.metrics?.memory.used_percent ?? 0;

            // Color based on memory usage percentage
            let fill = '#22c55e'; // green
            if (memoryPercent > 80) fill = '#ef4444'; // red
            else if (memoryPercent > 60) fill = '#eab308'; // yellow

            return {
                name: server.metrics?.hostname ?? `Server ${index + 1}`,
                value: parseFloat(memoryGB as string),
                fill,
            };
        })
        : memoryUsageData;

    // Calculate max value for X axis
    const maxValue = Math.max(...chartData.map(d => d.value), 16);
    const roundedMax = Math.ceil(maxValue / 8) * 8;

    return (
        <Card title="Memory Usage" className="h-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                    <XAxis 
                        type="number" 
                        domain={[0, roundedMax]}
                        tick={{ fill: tickColor, fontSize: 12 }}
                        axisLine={{ stroke: axisColor }}
                        tickLine={false}
                    />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fill: tickColor, fontSize: 12 }}
                        width={90}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Bar 
                        dataKey="value" 
                        radius={[0, 4, 4, 0] as [number, number, number, number]} 
                        barSize={24}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <LabelList 
                            dataKey="value" 
                            position="right" 
                            formatter={(value) => `${value} GB`}
                            style={{ fill: labelColor, fontSize: 12 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
