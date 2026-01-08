import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../cards/Card';
import { memoryUsageData } from '../../data/charts';

export function BarChartHorizontal() {
    return (
        <Card title="Memory Usage" className="h-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={memoryUsageData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fill: '#a1a1aa', fontSize: 12 }}
                        width={80}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                        cursor={{ fill: '#27272a', opacity: 0.4 }}
                    />
                    <Bar dataKey="uv" radius={[0, 4, 4, 0] as [number, number, number, number]} barSize={20} background={{ fill: '#27272a' }}>
                        {memoryUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
