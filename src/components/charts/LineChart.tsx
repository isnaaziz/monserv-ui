import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '../cards/Card';
import { bandwidthData, serverNodes } from '../../data/charts';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const timeFilters = ['30m', '4H', '1D', '1W', '1M'];

export function LineChart() {
    const [activeFilter, setActiveFilter] = useState('4H');
    const [showDropdown, setShowDropdown] = useState(false);
    const { theme } = useTheme();

    const gridColor = theme === 'dark' ? '#27272a' : '#e4e4e7';
    const axisColor = theme === 'dark' ? '#3f3f46' : '#d4d4d8';
    const tickColor = theme === 'dark' ? '#a1a1aa' : '#71717a';
    const tooltipBg = theme === 'dark' ? '#18181b' : '#ffffff';
    const tooltipBorder = theme === 'dark' ? '#27272a' : '#e4e4e7';

    return (
        <Card title="Bandwidth Utilization" className="h-full min-h-[300px]">
            <div className="flex flex-col h-full gap-4">
                {/* Time Filters */}
                <div className="flex gap-1">
                    {timeFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 text-xs rounded border transition-colors ${
                                activeFilter === filter
                                    ? 'bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white'
                                    : 'bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
                            }`}
                        >
                            {filter} <ChevronDown className="inline size-3" />
                        </button>
                    ))}
                </div>

                <div className="flex flex-1 gap-4">
                    {/* Chart */}
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={bandwidthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fill: tickColor, fontSize: 12 }}
                                    axisLine={{ stroke: axisColor }}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fill: tickColor, fontSize: 12 }}
                                    axisLine={{ stroke: axisColor }}
                                    tickLine={false}
                                    dx={-10}
                                    domain={[0, 3500]}
                                    ticks={[500, 1000, 1500, 2000, 2500, 3000, 3500]}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tickColor }}
                                    cursor={{ stroke: '#52525b', strokeDasharray: '5 5' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="UK-PROD-38"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="CH-PROD-06"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ fill: '#ef4444', strokeWidth: 0, r: 4 }}
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Server Node Legend */}
                    <div className="w-40">
                        <div 
                            className="flex items-center justify-between px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded cursor-pointer mb-2"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <span className="text-sm text-zinc-600 dark:text-zinc-300">Server Node</span>
                            <ChevronDown className="size-4 text-zinc-500 dark:text-zinc-400" />
                        </div>
                        <div className="space-y-1">
                            {serverNodes.map((node) => (
                                <div key={node.name} className="flex items-center gap-2 px-2 py-1">
                                    <div 
                                        className={`size-4 rounded border-2 flex items-center justify-center ${
                                            node.active ? 'border-current' : 'border-zinc-400 dark:border-zinc-600'
                                        }`}
                                        style={{ borderColor: node.active ? node.color : undefined }}
                                    >
                                        {node.active && <Check className="size-3" style={{ color: node.color }} />}
                                    </div>
                                    <span className={`text-sm ${node.active ? 'text-zinc-700 dark:text-zinc-200' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                        {node.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
