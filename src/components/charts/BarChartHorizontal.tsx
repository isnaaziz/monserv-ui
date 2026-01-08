import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Card } from '../cards/Card';
import { memoryUsageData } from '../../data/charts';
import { useTheme } from '../../context/ThemeContext';

export function BarChartHorizontal() {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#71717a' : '#a1a1aa';
    const axisColor = theme === 'dark' ? '#3f3f46' : '#d4d4d8';
    const labelColor = theme === 'dark' ? '#a1a1aa' : '#71717a';

    return (
        <Card title="Memory Usage" className="h-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={memoryUsageData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                    <XAxis 
                        type="number" 
                        domain={[0, 128]}
                        ticks={[0, 24, 48, 96, 128]}
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
                        {memoryUsageData.map((entry, index) => (
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
