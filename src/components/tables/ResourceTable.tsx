import { useState, useEffect } from 'react';
import { Card } from '../cards/Card';
import { resourceTableData } from '../../data/table';
import { MoreHorizontal, CheckCircle2, AlertTriangle, AlertCircle, Server, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { ServerMetricsDetailModal } from '../dashboard/ServerMetricsDetailModal';
import type { ServerStatus } from '../../context/SSEContext';

// Helper function to get the main disk (root "/" or disk with highest usage)
function getMainDisk(disks: Array<{ device: string; mountpoint: string; used_percent: number }>) {
    if (!disks || disks.length === 0) return null;
    
    // First, try to find root disk "/"
    const rootDisk = disks.find(d => d.mountpoint === '/');
    if (rootDisk) return rootDisk;
    
    const realDisks = disks.filter(d => 
        !d.mountpoint.startsWith('/run') && 
        !d.mountpoint.startsWith('/dev/shm') &&
        !d.mountpoint.includes('/snap/')
    );
    
    if (realDisks.length > 0) {
        return realDisks.reduce((max, disk) => 
            disk.used_percent > max.used_percent ? disk : max
        );
    }
    
    // Fallback to disk with highest usage
    return disks.reduce((max, disk) => 
        disk.used_percent > max.used_percent ? disk : max
    );
}

function LoadTimeCircle({ value }: { value: string }) {
    const { theme } = useTheme();
    const numValue = parseFloat(value);
    // Color based on load time
    const color = numValue <= 3 ? '#22c55e' : numValue <= 5 ? '#eab308' : '#ef4444';
    const bgColor = theme === 'dark' ? '#27272a' : '#e4e4e7';
    
    // Calculate stroke dasharray for the circle (circumference = 2 * PI * radius)
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    // Assume max load time is 10 seconds for the progress
    const progress = Math.min(numValue / 10, 1);
    const strokeDasharray = `${progress * circumference} ${circumference}`;
    
    return (
        <div className="relative size-11 flex items-center justify-center">
            <svg className="size-11 -rotate-90" viewBox="0 0 40 40">
                {/* Background circle */}
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="none"
                    stroke={bgColor}
                    strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-sm font-medium text-zinc-600 dark:text-zinc-300">{value}</span>
        </div>
    );
}

function StatusIcon({ status }: { status: string }) {
    if (status === 'Active' || status === 'online') {
        return <CheckCircle2 className="size-6 text-emerald-500" />;
    } else if (status === 'Warning' || status === 'warning') {
        return <AlertCircle className="size-6 text-yellow-500" />;
    } else if (status === 'offline') {
        return <Server className="size-6 text-zinc-400" />;
    } else {
        return <AlertTriangle className="size-6 text-red-500" />;
    }
}

interface ResourceTableProps {
    servers?: ServerStatus[];
}

export function ResourceTable({ servers }: ResourceTableProps) {
    // Use real data if available, otherwise fallback to static data
    const hasRealData = servers && servers.length > 0;
    
    // Modal state
    const [selectedServer, setSelectedServer] = useState<ServerStatus | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Only close if clicking outside dropdown area
            const target = e.target as HTMLElement;
            if (!target.closest('[data-dropdown-container]')) {
                setOpenDropdownIndex(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleViewDetails = (server: ServerStatus) => {
        setSelectedServer(server);
        setIsDetailModalOpen(true);
        setOpenDropdownIndex(null);
    };

    return (
        <>
        <Card title="Server Resource Utilization" className="h-full" action={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 dark:text-zinc-400">
                <MoreHorizontal className="size-5" />
            </Button>
        }>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-zinc-500 dark:text-zinc-400">
                    <thead className="text-zinc-500 dark:text-zinc-400 text-base font-medium border-b border-zinc-200 dark:border-zinc-800">
                        <tr>
                            <th className="px-5 py-4">Hostname</th>
                            <th className="px-5 py-4">URL</th>
                            <th className="px-5 py-4">Memory Usage</th>
                            <th className="px-5 py-4">Disk Usage</th>
                            <th className="px-5 py-4">Last Update</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50 text-base">
                        {hasRealData ? (
                            servers.map((server, index) => (
                                <tr key={index} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors group">
                                    <td className="px-5 py-4 font-medium text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                        {server.metrics?.hostname ?? 'N/A'}
                                    </td>
                                    <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300 text-sm max-w-[200px] truncate" title={server.url}>
                                        {server.url}
                                    </td>
                                    <td className="px-5 py-4">
                                        {server.metrics ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${server.metrics.memory.used_percent > 80
                                                                ? 'bg-red-500'
                                                                : server.metrics.memory.used_percent > 60
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-emerald-500'
                                                            }`}
                                                        style={{ width: `${server.metrics.memory.used_percent}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm">{server.metrics.memory.used_percent.toFixed(1)}%</span>
                                            </div>
                                        ) : (
                                            <span className="text-zinc-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        {server.metrics && server.metrics.disks.length > 0 ? (() => {
                                            const mainDisk = getMainDisk(server.metrics.disks);
                                            if (!mainDisk) return <span className="text-zinc-400">N/A</span>;
                                            return (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${mainDisk.used_percent > 80
                                                                    ? 'bg-red-500'
                                                                    : mainDisk.used_percent > 60
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-emerald-500'
                                                                }`}
                                                            style={{ width: `${Math.min(mainDisk.used_percent, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm">{mainDisk.used_percent.toFixed(1)}%</span>
                                                </div>
                                            );
                                        })() : (
                                            <span className="text-zinc-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300 text-sm">
                                        {new Date(server.last_update).toLocaleTimeString()}
                                    </td>
                                    <td className="px-5 py-4">
                                        <StatusIcon status={server.status} />
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="relative flex justify-center" data-dropdown-container>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="size-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    if (openDropdownIndex === index) {
                                                        setOpenDropdownIndex(null);
                                                    } else {
                                                        setOpenDropdownIndex(index);
                                                    }
                                                }}
                                            >
                                                <MoreHorizontal className="size-4" />
                                            </Button>
                                            
                                            {openDropdownIndex === index && (
                                                <div 
                                                    className="absolute right-0 bottom-full mb-1 w-40 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 py-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewDetails(server);
                                                        }}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                                                    >
                                                        <Eye className="size-4" />
                                                        View Details
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Fallback to static data
                            resourceTableData.map((item) => (
                                <tr key={item.id} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors group">
                                    <td className="px-5 py-4 font-medium text-blue-500 dark:text-blue-400">
                                        {item.website}
                                    </td>
                                    <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300">{item.region}</td>
                                    <td className="px-5 py-4">
                                        <LoadTimeCircle value={item.loadTime} />
                                    </td>
                                    <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300">{item.cpu}</td>
                                    <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300">{item.memory}</td>
                                    <td className="px-5 py-4">
                                        <StatusIcon status={item.status} />
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <span className="text-zinc-500">-</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>

        {/* Server Detail Modal */}
        <ServerMetricsDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => {
                setIsDetailModalOpen(false);
                setSelectedServer(null);
            }}
            server={selectedServer}
        />
        </>
    );
}
