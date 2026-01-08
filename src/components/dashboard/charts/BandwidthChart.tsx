import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardTitle } from '../../ui/Card';
import { bandwidthData } from '../../../data/mock';

export function BandwidthChart() {
    return (
        <Card className="h-[350px] flex flex-col">
            <CardTitle>Bandwidth Utilization</CardTitle>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bandwidthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis
                            dataKey="time"
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                            cursor={{ stroke: '#52525b', strokeDasharray: '5 5' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="download"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorDownload)"
                        />
                        <Area
                            type="monotone"
                            dataKey="upload"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorUpload)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
