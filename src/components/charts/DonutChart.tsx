import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '../cards/Card';
import { hardwareHealthData } from '../../data/charts';

export function DonutChart() {
    const total = hardwareHealthData.reduce((acc, curr) => acc + curr.value, 0);
    const healthy = hardwareHealthData.find(d => d.name === 'Healthy')?.value || 0;
    const percentage = Math.round((healthy / total) * 100);
    const totalNodes = 168;

    return (
        <Card title="Hardware Health" className="h-full min-h-[280px]">
            <div className="flex flex-col h-full">
                {/* Donut Chart with Center Percentage */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-[140px] h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={hardwareHealthData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={52}
                                    outerRadius={72}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {hardwareHealthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Centered Percentage */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">{percentage}%</span>
                            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Health</span>
                        </div>
                    </div>
                </div>

                {/* Legend - Vertical List */}
                <div className="space-y-2 pt-4 border-t border-zinc-800/50">
                    {hardwareHealthData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full" style={{ backgroundColor: item.fill }} />
                                <span className="text-xs text-zinc-400">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium text-zinc-200">{item.value}%</span>
                        </div>
                    ))}
                </div>

                {/* Footer - Total Nodes */}
                <div className="pt-4 mt-4 border-t border-zinc-800/50 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Nodes Status</span>
                    <span className="text-sm font-bold text-white">{totalNodes} <span className="text-xs font-normal text-zinc-500">Total</span></span>
                </div>
            </div>
        </Card>
    );
}
