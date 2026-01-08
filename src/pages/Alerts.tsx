import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { FilterBar } from '../components/common/FilterBar';
import { Badge } from '../components/ui/Badge';

// Dummy data
const alertsData = [
    { 
        id: 1, 
        title: 'High CPU Usage', 
        message: 'Server prod-cache-01 CPU usage exceeded 85%', 
        severity: 'warning', 
        time: '5 mins ago',
        source: 'prod-cache-01'
    },
    { 
        id: 2, 
        title: 'Server Offline', 
        message: 'Server staging-web-01 is not responding', 
        severity: 'critical', 
        time: '15 mins ago',
        source: 'staging-web-01'
    },
    { 
        id: 3, 
        title: 'Backup Completed', 
        message: 'Daily backup completed successfully', 
        severity: 'info', 
        time: '1 hour ago',
        source: 'backup-system'
    },
    { 
        id: 4, 
        title: 'SSL Certificate Expiring', 
        message: 'SSL certificate for api.example.com expires in 7 days', 
        severity: 'warning', 
        time: '2 hours ago',
        source: 'ssl-monitor'
    },
    { 
        id: 5, 
        title: 'Deployment Successful', 
        message: 'New version v2.4.1 deployed to production', 
        severity: 'success', 
        time: '3 hours ago',
        source: 'ci-cd'
    },
];

const alertStats = [
    { label: 'Critical', count: 1, color: 'text-red-500' },
    { label: 'Warning', count: 2, color: 'text-amber-500' },
    { label: 'Info', count: 1, color: 'text-blue-500' },
    { label: 'Resolved', count: 24, color: 'text-emerald-500' },
];

function getSeverityIcon(severity: string) {
    switch (severity) {
        case 'critical': return <XCircle className="size-5 text-red-500" />;
        case 'warning': return <AlertTriangle className="size-5 text-amber-500" />;
        case 'success': return <CheckCircle className="size-5 text-emerald-500" />;
        default: return <Info className="size-5 text-blue-500" />;
    }
}

function getSeverityBadge(severity: string) {
    switch (severity) {
        case 'critical': return 'error';
        case 'warning': return 'warning';
        case 'success': return 'success';
        default: return 'default';
    }
}

export default function Alerts() {
    return (
        <div className="space-y-6">
            <PageHeader 
                title="Alerts" 
                description="System alerts and notifications"
                icon={Bell}
            />

            {/* Alert Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {alertStats.map((stat, index) => (
                    <SectionCard key={index}>
                        <div className="text-center">
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
                            <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                        </div>
                    </SectionCard>
                ))}
            </div>

            <FilterBar 
                searchPlaceholder="Search alerts..."
                onRefresh={() => {}}
                onFilter={() => {}}
            />

            {/* Alerts List */}
            <SectionCard title="Recent Alerts" description="Last 24 hours">
                <div className="space-y-3">
                    {alertsData.map((alert) => (
                        <div 
                            key={alert.id} 
                            className="flex items-start gap-4 p-4 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors"
                        >
                            <div className="mt-0.5">
                                {getSeverityIcon(alert.severity)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-medium text-zinc-200">{alert.title}</h4>
                                    <Badge variant={getSeverityBadge(alert.severity) as 'success' | 'warning' | 'error' | 'default'}>
                                        {alert.severity}
                                    </Badge>
                                </div>
                                <p className="text-sm text-zinc-400 mb-2">{alert.message}</p>
                                <div className="flex items-center gap-4 text-xs text-zinc-500">
                                    <span>Source: {alert.source}</span>
                                    <span>•</span>
                                    <span>{alert.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
