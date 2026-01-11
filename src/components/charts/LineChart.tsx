import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '../cards/Card';
import { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSSE, type ServerStatus } from '../../context/SSEContext';

const timeFilters = ['30m', '4H', '1D', '1W', '1M'];

// Helper to format bytes to human readable
function formatBytesRate(bytesPerSecond: number | undefined | null): string {
    if (!bytesPerSecond || bytesPerSecond <= 0 || isNaN(bytesPerSecond)) return '0 B/s';
    const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
    const i = Math.floor(Math.log(bytesPerSecond) / Math.log(1024));
    if (i < 0 || i >= units.length) return '0 B/s';
    return `${(bytesPerSecond / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

// Generate colors for each server
const serverColors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#22c55e', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
];

interface BandwidthDataPoint {
    time: string;
    [key: string]: number | string; // hostname -> bytes rate
}

export function LineChart() {
    const [activeFilter, setActiveFilter] = useState('4H');
    const { theme } = useTheme();
    const { data } = useSSE();
    
    // Store historical bandwidth data
    const [bandwidthHistory, setBandwidthHistory] = useState<BandwidthDataPoint[]>([]);

    const gridColor = theme === 'dark' ? '#27272a' : '#e4e4e7';
    const axisColor = theme === 'dark' ? '#3f3f46' : '#d4d4d8';
    const tickColor = theme === 'dark' ? '#a1a1aa' : '#71717a';
    const tooltipBg = theme === 'dark' ? '#18181b' : '#ffffff';
    const tooltipBorder = theme === 'dark' ? '#27272a' : '#e4e4e7';

    // Update bandwidth history when SSE data changes
    useEffect(() => {
        if (!data?.servers?.servers || data.servers.servers.length === 0) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });

        const newPoint: BandwidthDataPoint = { time: timeStr };
        
        data.servers.servers.forEach((server: ServerStatus) => {
            if (server.metrics?.network) {
                const hostname = server.metrics.hostname || 'Unknown';
                // Convert to KB/s for better chart readability, handle undefined
                const sentRate = server.metrics.network.bytes_sent_rate ?? 0;
                const recvRate = server.metrics.network.bytes_recv_rate ?? 0;
                const totalRate = (sentRate + recvRate) / 1024;
                newPoint[hostname] = Math.max(0, Math.round(totalRate * 100) / 100);
            }
        });

        setBandwidthHistory(prev => {
            // Keep last 20 data points
            const updated = [...prev, newPoint];
            if (updated.length > 20) {
                return updated.slice(-20);
            }
            return updated;
        });
    }, [data]);

    // Get list of servers for legend
    const serverList = useMemo(() => {
        if (!data?.servers?.servers) return [];
        return data.servers.servers
            .filter((s: ServerStatus) => s.metrics?.network)
            .map((s: ServerStatus, index: number) => ({
                hostname: s.metrics?.hostname || 'Unknown',
                color: serverColors[index % serverColors.length],
                isOnline: s.status === 'online'
            }));
    }, [data]);

    // Calculate max value for Y axis
    const maxValue = useMemo(() => {
        if (bandwidthHistory.length === 0) return 100;
        let max = 0;
        bandwidthHistory.forEach(point => {
            Object.keys(point).forEach(key => {
                if (key !== 'time' && typeof point[key] === 'number') {
                    max = Math.max(max, point[key] as number);
                }
            });
        });
        return Math.ceil(max * 1.2) || 100; // Add 20% padding
    }, [bandwidthHistory]);

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
                            <RechartsLineChart 
                                data={bandwidthHistory.length > 0 ? bandwidthHistory : [{ time: 'No Data', value: 0 }]} 
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
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
                                    domain={[0, maxValue]}
                                    tickFormatter={(value) => `${value}`}
                                    label={{ 
                                        value: 'KB/s', 
                                        angle: -90, 
                                        position: 'insideLeft',
                                        fill: tickColor,
                                        fontSize: 11
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{ 
                                        backgroundColor: tooltipBg, 
                                        border: `1px solid ${tooltipBorder}`, 
                                        borderRadius: '8px', 
                                        color: tickColor 
                                    }}
                                    cursor={{ stroke: '#52525b', strokeDasharray: '5 5' }}
                                    formatter={(value) => {
                                        const numValue = typeof value === 'number' ? value : 0;
                                        return [`${numValue.toFixed(2)} KB/s`, ''];
                                    }}
                                />
                                {serverList.map((server) => (
                                    <Line
                                        key={server.hostname}
                                        type="monotone"
                                        dataKey={server.hostname}
                                        stroke={server.color}
                                        strokeWidth={2}
                                        dot={{ fill: server.color, strokeWidth: 0, r: 3 }}
                                        connectNulls
                                    />
                                ))}
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Server Node Legend */}
                    <div className="w-44">
                        <div className="px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded mb-2">
                            <span className="text-sm text-zinc-600 dark:text-zinc-300">Servers</span>
                        </div>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                            {serverList.length === 0 ? (
                                <div className="text-sm text-zinc-500 dark:text-zinc-400 px-2 py-1">
                                    Waiting for data...
                                </div>
                            ) : (
                                serverList.map((server) => (
                                    <div key={server.hostname} className="flex items-center gap-2 px-2 py-1">
                                        <div 
                                            className="size-3 rounded-full"
                                            style={{ backgroundColor: server.color }}
                                        />
                                        <span className={`text-xs truncate ${
                                            server.isOnline 
                                                ? 'text-zinc-700 dark:text-zinc-300' 
                                                : 'text-zinc-400 dark:text-zinc-600'
                                        }`}>
                                            {server.hostname}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* Current rates summary */}
                        {data?.servers?.servers && (
                            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Current Rates</div>
                                {data.servers.servers.map((server: ServerStatus, idx: number) => {
                                    if (!server.metrics?.network) return null;
                                    const sent = server.metrics.network.bytes_sent_rate ?? 0;
                                    const recv = server.metrics.network.bytes_recv_rate ?? 0;
                                    const hostname = server.metrics.hostname || `server-${idx}`;
                                    return (
                                        <div key={hostname} className="text-xs mb-1">
                                            <div className="flex items-center gap-1">
                                                <span className="text-green-500">↑</span>
                                                <span className="text-zinc-600 dark:text-zinc-400">
                                                    {formatBytesRate(sent)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-blue-500">↓</span>
                                                <span className="text-zinc-600 dark:text-zinc-400">
                                                    {formatBytesRate(recv)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
