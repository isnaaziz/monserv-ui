
export interface SidebarItem {
    label: string;
    icon: React.ElementType;
    path: string;
    active?: boolean;
}

export interface StatCardProps {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    color: 'emerald' | 'amber' | 'blue' | 'red';
    icon?: React.ElementType;
}

export interface ActivityItem {
    id: number;
    user: string;
    action: string;
    time: string;
    type: 'success' | 'info' | 'error' | 'warning';
}

export interface ResourceItem {
    id: number;
    website: string;
    region: string;
    loadTime: string;
    cpu: string;
    memory: string;
    status: 'Active' | 'Warning' | 'Maintenance';
}

export interface ChartDataPoint {
    name?: string;
    value?: number;
    fill?: string;
    time?: string;
    upload?: number;
    download?: number;
    uv?: number;
    pv?: number;
    amt?: number;
}
