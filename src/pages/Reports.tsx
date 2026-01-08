import { FileText, Download, Calendar, Plus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { FilterBar } from '../components/common/FilterBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Dummy data
const reportsData = [
    { 
        id: 1, 
        name: 'Monthly Performance Report', 
        type: 'Performance', 
        status: 'completed',
        generatedAt: 'Jan 1, 2026',
        size: '2.4 MB'
    },
    { 
        id: 2, 
        name: 'Weekly Security Audit', 
        type: 'Security', 
        status: 'completed',
        generatedAt: 'Jan 5, 2026',
        size: '1.8 MB'
    },
    { 
        id: 3, 
        name: 'Infrastructure Cost Analysis', 
        type: 'Financial', 
        status: 'completed',
        generatedAt: 'Jan 3, 2026',
        size: '3.2 MB'
    },
    { 
        id: 4, 
        name: 'Uptime Report Q4 2025', 
        type: 'Availability', 
        status: 'completed',
        generatedAt: 'Dec 31, 2025',
        size: '1.1 MB'
    },
    { 
        id: 5, 
        name: 'Capacity Planning Report', 
        type: 'Planning', 
        status: 'generating',
        generatedAt: 'In progress...',
        size: '-'
    },
];

const reportStats = [
    { label: 'Total Reports', value: '156', color: 'text-white' },
    { label: 'This Month', value: '12', color: 'text-emerald-500' },
    { label: 'Scheduled', value: '8', color: 'text-blue-500' },
    { label: 'Failed', value: '0', color: 'text-zinc-500' },
];

export default function Reports() {
    return (
        <div className="space-y-6">
            <PageHeader 
                title="Reports" 
                description="Generate and download system reports"
                icon={FileText}
                actions={
                    <Button size="sm">
                        <Plus className="size-4 mr-2" />
                        Generate Report
                    </Button>
                }
            />

            {/* Report Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {reportStats.map((stat, index) => (
                    <SectionCard key={index}>
                        <div className="text-center">
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                        </div>
                    </SectionCard>
                ))}
            </div>

            <FilterBar 
                searchPlaceholder="Search reports..."
                onRefresh={() => {}}
                onFilter={() => {}}
            />

            {/* Reports List */}
            <SectionCard title="Generated Reports" noPadding>
                <div className="divide-y divide-zinc-800/50">
                    {reportsData.map((report) => (
                        <div 
                            key={report.id} 
                            className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                                    <FileText className="size-5 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-200">{report.name}</p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                                        <span>{report.type}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="size-3" />
                                            {report.generatedAt}
                                        </span>
                                        {report.size !== '-' && (
                                            <>
                                                <span>•</span>
                                                <span>{report.size}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant={report.status === 'completed' ? 'success' : 'warning'}>
                                    {report.status}
                                </Badge>
                                {report.status === 'completed' && (
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <Download className="size-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
