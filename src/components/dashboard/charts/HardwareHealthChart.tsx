import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardTitle } from '../../ui/Card';
import { hardwareHealthData } from '../../../data/mock';

export function HardwareHealthChart() {
    return (
        <Card className="h-[350px] flex flex-col">
            <CardTitle>Hardware Health</CardTitle>
            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={hardwareHealthData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {hardwareHealthData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                            itemStyle={{ color: '#f4f4f5' }}
                        />
                        <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                    <div className="text-center">
                        <span className="text-3xl font-bold text-zinc-100">93%</span>
                        <p className="text-xs text-zinc-500">Health</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
