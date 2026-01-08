import { DashboardLayout } from './components/layout/DashboardLayout';
import { StatCard } from './components/dashboard/StatCard';
import { MemoryChart } from './components/dashboard/charts/MemoryChart';
import { HardwareHealthChart } from './components/dashboard/charts/HardwareHealthChart';
import { CpuChart } from './components/dashboard/charts/CpuChart';
import { BandwidthChart } from './components/dashboard/charts/BandwidthChart';
import { ResourceTable } from './components/dashboard/ResourceTable';
import { RecentActivity, DatacenterMap } from './components/dashboard/RecentActivity';

import { Card } from './components/ui/Card';

function DashboardContent() {
  // const { status, stats } = useWebSocket();

  // Stats matching the image: Active (Blue), Pending (Yellow), Completed (Green)
  const statCards = [
    {
      label: "Active",
      value: "226",
      change: "+12%",
      trend: "up" as const,
      color: "blue" as const // Blue
    },
    {
      label: "Pending",
      value: "127",
      change: "-5%",
      trend: "down" as const,
      color: "amber" as const // Yellow
    },
    {
      label: "Completed",
      value: "1008",
      change: "+8%",
      trend: "up" as const,
      color: "emerald" as const // Green
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* Top Section: Welcome + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Welcome Card - Spans 2 columns on large screens */}
          <Card className="lg:col-span-1 xl:col-span-2 relative overflow-hidden flex flex-col justify-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800">
            <div className="z-10">
              <h1 className="text-3xl font-bold text-zinc-100 mb-2">Welcome Back, Arun!</h1>
              <p className="text-zinc-400">System performance is optimal. You have <span className="text-emerald-400">3 pending alerts</span>.</p>
            </div>
            {/* Abstract Decoration */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </Card>

          {/* Stat Cards - Remaining columns */}
          <div className="lg:col-span-3 xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Middle Section: Table | Memory | Hardware */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Table - Spans 2 */}
          <div className="xl:col-span-2">
            <ResourceTable />
          </div>
          {/* Memory */}
          <div className="xl:col-span-1">
            <MemoryChart />
          </div>
          {/* Hardware Health */}
          <div className="xl:col-span-1">
            <HardwareHealthChart />
          </div>
        </div>

        {/* Bottom Section: CPU | Bandwidth | Map/Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1">
            <CpuChart />
          </div>
          <div className="xl:col-span-1">
            <BandwidthChart />
          </div>
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatacenterMap />
            <RecentActivity />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}


function App() {
  return (
    <DashboardContent />
  );
}

export default App;
