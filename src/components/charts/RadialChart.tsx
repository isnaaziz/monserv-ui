import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Card } from '../cards/Card';
import { cpuData } from '../../data/charts';
import { useTheme } from '../../context/ThemeContext';

export function RadialChart() {
    const { theme } = useTheme();
    const bgColor = theme === 'dark' ? '#27272a' : '#e4e4e7';

    // Transform data for multi-ring radial chart (reverse order so first item is outermost)
    const chartData = [...cpuData].reverse().map((item) => ({
        ...item,
    }));

    return (
        <Card title="CPU Usage" className="h-full min-h-[300px]">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex items-center">
                    {/* Legend on the left */}
                    <div className="flex flex-col gap-2 pr-2">
                        {cpuData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-sm">
                                <span style={{ color: item.fill }} className="font-medium whitespace-nowrap">
                                    {item.name}
                                </span>
                                <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{item.value}%</span>
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
                                barSize={12}
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
