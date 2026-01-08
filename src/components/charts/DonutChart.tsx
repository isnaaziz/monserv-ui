import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '../cards/Card';
import { hardwareHealthData } from '../../data/charts';

export function DonutChart() {
    const totalNodes = hardwareHealthData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <Card title="Overall Hardware Health" className="h-full min-h-[280px]">
            <div className="flex items-center h-full gap-4">
                {/* Donut Chart */}
                <div className="relative w-[160px] h-[160px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={hardwareHealthData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={1}
                                dataKey="value"
                                stroke="none"
                            >
                                {hardwareHealthData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend on the right */}
                <div className="flex-1">
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Nodes Count : <span className="text-zinc-800 dark:text-white font-semibold">{totalNodes}</span></p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {hardwareHealthData.map((item, index) => (
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
