import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Card } from '../cards/Card';
import { cpuData } from '../../data/charts';

export function RadialChart() {
    // Calculate total usage (System + User)
    const system = cpuData.find(d => d.name === 'System')?.value || 0;
    const user = cpuData.find(d => d.name === 'User')?.value || 0;
    const totalUsage = system + user;

    return (
        <Card title="CPU Usage" className="h-full min-h-[300px]">
            <div className="flex flex-col h-full relative">
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-[160px] h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            barSize={12}
                            data={[{ name: 'Usage', value: totalUsage, fill: totalUsage > 80 ? '#ef4444' : '#3b82f6' }]}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <RadialBar
                                background={{ fill: '#27272a' }}
                                dataKey="value"
                                cornerRadius={10}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-white">{totalUsage}%</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">Load</span>
                    </div>
                    </div>
                </div>

                {/* Footer Details */}
                <div className="flex items-center justify-center gap-8 pt-4 border-t border-zinc-800/50">
                    <div className="text-center">
                        <p className="text-xs text-zinc-500 mb-1">User</p>
                        <p className="text-lg font-bold text-emerald-500">{user}%</p>
                    </div>
                    <div className="w-px h-8 bg-zinc-800" />
                    <div className="text-center">
                        <p className="text-xs text-zinc-500 mb-1">System</p>
                        <p className="text-lg font-bold text-blue-500">{system}%</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
