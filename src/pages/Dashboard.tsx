import { StatCard } from '../components/cards/StatCard';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ResourceTable } from '../components/tables/ResourceTable';
import { BarChartHorizontal } from '../components/charts/BarChartHorizontal';
import { DonutChart } from '../components/charts/DonutChart';
import { RadialChart } from '../components/charts/RadialChart';
import { LineChart } from '../components/charts/LineChart';
import { WorldMap } from '../components/charts/WorldMap';
import { Card } from '../components/cards/Card';
import { useDashboardStats } from '../context/SSEContext';
import { Zap, Server, AlertTriangle, Activity, Wifi, WifiOff } from 'lucide-react';
import type { StatCardProps } from '../types';

export function Dashboard() {
    const { stats, servers, alerts, isConnected, error, lastUpdate } = useDashboardStats();

    // Generate dynamic stats based on real-time data
    const dynamicStats: StatCardProps[] = [
        {
            label: 'Online Servers',
            value: stats ? `${stats.online_servers}/${stats.total_servers}` : '0/0',
            change: stats && stats.total_servers > 0
                ? `${((stats.online_servers / stats.total_servers) * 100).toFixed(1)}%`
                : '0%',
            trend: stats && stats.online_servers > 0 ? 'up' : 'down',
            color: 'emerald',
            icon: Server,
        },
        {
            label: 'Active Alerts',
            value: stats ? stats.alert_count.toString() : '0',
            change: alerts.length > 0 ? `${alerts.length} total` : 'No alerts',
            trend: stats && stats.alert_count > 0 ? 'down' : 'up',
            color: stats && stats.alert_count > 0 ? 'red' : 'emerald',
            icon: AlertTriangle,
        },
        {
            label: 'Avg Memory',
            value: stats ? `${stats.avg_memory.toFixed(1)}%` : '0%',
            change: stats && stats.avg_memory > 80 ? 'High usage' : 'Normal',
            trend: stats && stats.avg_memory > 80 ? 'down' : 'up',
            color: stats && stats.avg_memory > 80 ? 'amber' : 'blue',
            icon: Activity,
        },
    ];

    return (
        <div className="grid grid-cols-12 gap-5 pb-6">

            {/* Row 1: Welcome (6) + Stats (2+2+2) */}
            <div className="col-span-12 lg:col-span-6">
                <Card className="h-full relative overflow-hidden bg-gradient-to-br from-emerald-100 to-white dark:from-emerald-900/40 dark:to-zinc-900/40 border-emerald-200 dark:border-emerald-500/20 justify-center flex flex-col min-h-[140px]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 p-4 opacity-10">
                        <Zap className="size-48 text-emerald-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">Server Monitoring</h2>
                            {isConnected ? (
                                <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded-full">
                                    <Wifi className="size-3" />
                                    Live
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
                                    <WifiOff className="size-3" />
                                    Disconnected
                                </span>
                            )}
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {error
                                ? `Connection error: ${error.message}`
                                : isConnected
                                    ? `Monitoring ${stats?.total_servers ?? 0} servers • Last update: ${lastUpdate?.toLocaleTimeString() ?? 'N/A'}`
                                    : 'Connecting to server...'
                            }
                        </p>
                    </div>
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {dynamicStats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Row 2: Resource Table (8) + Right Column (4) with Memory + Hardware */}
            <div className="col-span-12 lg:col-span-8">
                <ResourceTable servers={servers} />
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
                <BarChartHorizontal servers={servers} />
                <DonutChart stats={stats} />
            </div>

            {/* Row 3: WorldMap (8) + Activity (4) */}
            <div className="col-span-12 lg:col-span-8">
                <WorldMap />
            </div>

            <div className="col-span-12 lg:col-span-4">
                <ActivityCard alerts={alerts} />
            </div>

            {/* Row 4: CPU (4) + Bandwidth (8) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <RadialChart servers={servers} />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-8">
                <LineChart />
            </div>
        </div>
    );
}
