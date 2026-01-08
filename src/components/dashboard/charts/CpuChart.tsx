import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardTitle } from '../../ui/Card';
import { cpuData } from '../../../data/mock';

export function CpuChart() {
    return (
        <Card className="h-[350px] flex flex-col">
            <CardTitle>CPU Usage</CardTitle>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="30%"
                        outerRadius="100%"
                        barSize={15}
                        data={cpuData}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <RadialBar
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background={{ fill: '#27272a' }}
                            dataKey="value"
                            cornerRadius={10}
                        />
                        <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                            cursor={false}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
