import { Server, Plus, MoreHorizontal } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { FilterBar } from '../components/common/FilterBar';
import { TableContainer } from '../components/common/TableContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Dummy data
const serversData = [
    { id: 1, name: 'prod-web-01', ip: '192.168.1.10', status: 'online', cpu: '45%', memory: '62%', uptime: '45 days' },
    { id: 2, name: 'prod-web-02', ip: '192.168.1.11', status: 'online', cpu: '38%', memory: '55%', uptime: '45 days' },
    { id: 3, name: 'prod-db-01', ip: '192.168.1.20', status: 'online', cpu: '72%', memory: '85%', uptime: '30 days' },
    { id: 4, name: 'prod-cache-01', ip: '192.168.1.30', status: 'warning', cpu: '89%', memory: '78%', uptime: '15 days' },
    { id: 5, name: 'staging-web-01', ip: '192.168.2.10', status: 'offline', cpu: '0%', memory: '0%', uptime: '0 days' },
];

type ServerData = typeof serversData[0];

const columns = [
    { key: 'name', header: 'Server Name', className: 'font-medium text-zinc-200' },
    { key: 'ip', header: 'IP Address' },
    { 
        key: 'status', 
        header: 'Status',
        render: (item: ServerData) => (
            <Badge variant={item.status === 'online' ? 'success' : item.status === 'warning' ? 'warning' : 'error'}>
                {item.status}
            </Badge>
        )
    },
    { key: 'cpu', header: 'CPU' },
    { key: 'memory', header: 'Memory' },
    { key: 'uptime', header: 'Uptime' },
    {
        key: 'actions',
        header: '',
        render: () => (
            <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
            </Button>
        )
    }
];

export default function Servers() {
    return (
        <div className="space-y-6">
            <PageHeader 
                title="Servers" 
                description="Monitor and manage all server instances"
                icon={Server}
                actions={
                    <Button size="sm">
                        <Plus className="size-4 mr-2" />
                        Add Server
                    </Button>
                }
            />

            <FilterBar 
                searchPlaceholder="Search servers..."
                onRefresh={() => {}}
                onFilter={() => {}}
            />

            <SectionCard title="Server List" description={`${serversData.length} servers total`} noPadding>
                <TableContainer<ServerData>
                    columns={columns}
                    data={serversData}
                    keyExtractor={(item) => item.id}
                />
            </SectionCard>
        </div>
    );
}
