import { StatCard } from '../components/cards/StatCard';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ResourceTable } from '../components/tables/ResourceTable';
import { BarChartHorizontal } from '../components/charts/BarChartHorizontal';
import { DonutChart } from '../components/charts/DonutChart';
import { RadialChart } from '../components/charts/RadialChart';
import { LineChart } from '../components/charts/LineChart';
import { Card } from '../components/cards/Card';
import { statsData } from '../data/stats';
import { Zap } from 'lucide-react';

export function Dashboard() {
    return (
        <div className="grid grid-cols-12 gap-5 pb-6">

            {/* Row 1: Welcome (6) + Stats (2+2+2) */}
            <div className="col-span-12 lg:col-span-6">
                <Card className="h-full relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-zinc-900/40 border-emerald-500/20 justify-center flex flex-col min-h-[140px]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 p-4 opacity-10">
                        <Zap className="size-48 text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, Arnadea!</h2>
                        <p className="text-zinc-400">System check passed. Operations normal.</p>
                    </div>
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Row 2: Resource Table (8) + Right Column (4) with Memory + Hardware */}
            <div className="col-span-12 lg:col-span-8">
                <ResourceTable />
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
                <BarChartHorizontal />
                <DonutChart />
            </div>

            {/* Row 3: CPU (3) + Bandwidth (5) + Activity (4) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <RadialChart />
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-5">
                <LineChart />
            </div>

            <div className="col-span-12 lg:col-span-4">
                <ActivityCard />
            </div>
        </div>
    );
}
