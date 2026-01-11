import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
    Server, 
    HardDrive, 
    MemoryStick, 
    Clock, 
    Activity,
    Cpu,
    Folder,
    User,
    Terminal
} from 'lucide-react';
import type { ServerStatus } from '../../context/SSEContext';

interface ServerMetricsDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    server: ServerStatus | null;
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    
    return parts.length > 0 ? parts.join(' ') : '< 1m';
}

function UsageBar({ value, color }: { value: number; color: string }) {
    return (
        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${Math.min(value, 100)}%` }}
            />
        </div>
    );
}

function getUsageColor(percent: number): string {
    if (percent > 90) return 'bg-red-500';
    if (percent > 75) return 'bg-amber-500';
    if (percent > 50) return 'bg-yellow-500';
    return 'bg-emerald-500';
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
    return (
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Icon className="size-5 text-emerald-500" />
            <h3 className="text-base font-semibold text-zinc-200">{title}</h3>
        </div>
    );
}

export function ServerMetricsDetailModal({ isOpen, onClose, server }: ServerMetricsDetailModalProps) {
    if (!server) return null;

    const metrics = server.metrics;
    const isOnline = server.status === 'online';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Server Details" size="xl">
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {/* Header Info */}
                <div className="flex items-start justify-between bg-zinc-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className={`size-12 rounded-lg flex items-center justify-center ${isOnline ? 'bg-emerald-500/20' : 'bg-zinc-700'}`}>
                            <Server className={`size-6 ${isOnline ? 'text-emerald-500' : 'text-zinc-500'}`} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-zinc-100">
                                {metrics?.hostname ?? 'Unknown Server'}
                            </h2>
                            <code className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded">
                                {server.url}
                            </code>
                        </div>
                    </div>
                    <Badge variant={isOnline ? 'success' : server.status === 'warning' ? 'warning' : 'error'}>
                        {server.status.toUpperCase()}
                    </Badge>
                </div>

                {!metrics ? (
                    <div className="text-center py-8 text-zinc-500">
                        <Server className="size-12 mx-auto mb-3 opacity-50" />
                        <p>No metrics available for this server</p>
                        <p className="text-sm mt-1">The server may be offline or not responding</p>
                    </div>
                ) : (
                    <>
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                <Clock className="size-5 text-blue-500 mx-auto mb-1" />
                                <p className="text-xs text-zinc-500">Uptime</p>
                                <p className="text-sm font-semibold text-zinc-200">{formatUptime(metrics.uptime_seconds)}</p>
                            </div>
                            <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                <MemoryStick className="size-5 text-purple-500 mx-auto mb-1" />
                                <p className="text-xs text-zinc-500">Memory</p>
                                <p className="text-sm font-semibold text-zinc-200">{metrics.memory.used_percent.toFixed(1)}%</p>
                            </div>
                            <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                <HardDrive className="size-5 text-amber-500 mx-auto mb-1" />
                                <p className="text-xs text-zinc-500">Disks</p>
                                <p className="text-sm font-semibold text-zinc-200">{metrics.disks.length} mounted</p>
                            </div>
                            <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                                <Activity className="size-5 text-emerald-500 mx-auto mb-1" />
                                <p className="text-xs text-zinc-500">Processes</p>
                                <p className="text-sm font-semibold text-zinc-200">{metrics.top_processes_by_memory.length} top</p>
                            </div>
                        </div>

                        {/* Memory Details */}
                        <div>
                            <SectionTitle icon={MemoryStick} title="Memory Usage" />
                            <div className="bg-zinc-800/30 rounded-lg p-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Used: {formatBytes(metrics.memory.used_bytes)}</span>
                                    <span className="text-zinc-400">Total: {formatBytes(metrics.memory.total_bytes)}</span>
                                </div>
                                <UsageBar 
                                    value={metrics.memory.used_percent} 
                                    color={getUsageColor(metrics.memory.used_percent)} 
                                />
                                <div className="flex justify-between text-sm mt-2">
                                    <span className="text-zinc-500">Free: {formatBytes(metrics.memory.free_bytes)}</span>
                                    <span className={`font-medium ${metrics.memory.used_percent > 80 ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {metrics.memory.used_percent.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Disk Details */}
                        <div>
                            <SectionTitle icon={HardDrive} title="Disk Mounts" />
                            <div className="space-y-3">
                                {metrics.disks.map((disk, index) => (
                                    <div key={index} className="bg-zinc-800/30 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Folder className="size-4 text-zinc-500" />
                                                <span className="font-medium text-zinc-200">{disk.mountpoint}</span>
                                            </div>
                                            <Badge 
                                                variant={disk.used_percent > 90 ? 'error' : disk.used_percent > 75 ? 'warning' : 'success'}
                                                className="text-xs"
                                            >
                                                {disk.used_percent.toFixed(1)}%
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-xs text-zinc-500 mb-2">
                                            <div>
                                                <span className="block text-zinc-600">Device</span>
                                                <span className="text-zinc-300 font-mono">{disk.device}</span>
                                            </div>
                                            <div>
                                                <span className="block text-zinc-600">Filesystem</span>
                                                <span className="text-zinc-300">{disk.fstype}</span>
                                            </div>
                                            <div>
                                                <span className="block text-zinc-600">Total</span>
                                                <span className="text-zinc-300">{formatBytes(disk.total_bytes)}</span>
                                            </div>
                                        </div>
                                        <UsageBar 
                                            value={disk.used_percent} 
                                            color={getUsageColor(disk.used_percent)} 
                                        />
                                        <div className="flex justify-between text-xs mt-2 text-zinc-500">
                                            <span>Used: {formatBytes(disk.used_bytes)}</span>
                                            <span>Free: {formatBytes(disk.free_bytes)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Processes */}
                        <div>
                            <SectionTitle icon={Cpu} title="Top Processes by Memory" />
                            <div className="bg-zinc-800/30 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-zinc-800/50 text-zinc-400 text-xs">
                                            <th className="px-3 py-2 text-left">PID</th>
                                            <th className="px-3 py-2 text-left">Name</th>
                                            <th className="px-3 py-2 text-left">User</th>
                                            <th className="px-3 py-2 text-right">Memory</th>
                                            <th className="px-3 py-2 text-right">%RAM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800/50">
                                        {metrics.top_processes_by_memory.map((proc, index) => (
                                            <tr key={index} className="hover:bg-zinc-800/20">
                                                <td className="px-3 py-2 font-mono text-zinc-400">{proc.pid}</td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <Terminal className="size-3 text-zinc-500" />
                                                        <span className="text-zinc-200 truncate max-w-[120px]" title={proc.name}>
                                                            {proc.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-1">
                                                        <User className="size-3 text-zinc-600" />
                                                        <span className="text-zinc-400">{proc.username}</span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-right text-zinc-300 font-mono">
                                                    {formatBytes(proc.rss_bytes)}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <span className={`font-medium ${proc.percent_ram > 10 ? 'text-amber-500' : 'text-zinc-300'}`}>
                                                        {proc.percent_ram.toFixed(2)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Last Update */}
                        <div className="text-center text-xs text-zinc-600 pt-2 border-t border-zinc-800">
                            Last updated: {new Date(server.last_update).toLocaleString()} • 
                            Metrics generated: {new Date(metrics.generated_at_utc).toLocaleString()}
                        </div>
                    </>
                )}
            </div>

            <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}
