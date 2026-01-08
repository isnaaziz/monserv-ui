import { Network, RefreshCw } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Dummy data
const networkStats = [
    { label: 'Total Bandwidth', value: '2.4 Gbps', status: 'normal' },
    { label: 'Active Connections', value: '12,845', status: 'normal' },
    { label: 'Packet Loss', value: '0.02%', status: 'normal' },
    { label: 'Latency', value: '12ms', status: 'normal' },
];

const networkDevices = [
    { id: 1, name: 'Core Router 1', type: 'Router', status: 'online', traffic: '1.2 Gbps' },
    { id: 2, name: 'Core Router 2', type: 'Router', status: 'online', traffic: '980 Mbps' },
    { id: 3, name: 'Switch-Floor-1', type: 'Switch', status: 'online', traffic: '450 Mbps' },
    { id: 4, name: 'Switch-Floor-2', type: 'Switch', status: 'warning', traffic: '820 Mbps' },
    { id: 5, name: 'Firewall-Main', type: 'Firewall', status: 'online', traffic: '2.1 Gbps' },
];

export default function NetworkPage() {
    return (
        <div className="space-y-6">
            <PageHeader 
                title="Network" 
                description="Monitor network topology and traffic"
                icon={Network}
                actions={
                    <Button variant="outline" size="sm">
                        <RefreshCw className="size-4 mr-2" />
                        Refresh
                    </Button>
                }
            />

            {/* Network Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {networkStats.map((stat, index) => (
                    <SectionCard key={index}>
                        <div className="text-center">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                    </SectionCard>
                ))}
            </div>

            {/* Network Devices */}
            <SectionCard title="Network Devices" description="Active network infrastructure">
                <div className="space-y-3">
                    {networkDevices.map((device) => (
                        <div 
                            key={device.id} 
                            className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                                    <Network className="size-5 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-200">{device.name}</p>
                                    <p className="text-xs text-zinc-500">{device.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-sm text-zinc-300">{device.traffic}</p>
                                    <p className="text-xs text-zinc-500">Traffic</p>
                                </div>
                                <Badge variant={device.status === 'online' ? 'success' : 'warning'}>
                                    {device.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
