export const statsData = [
    { label: 'Active Sessions', value: '2,845', change: '+12.5%', trend: 'up', color: 'emerald' },
    { label: 'Pending Requests', value: '142', change: '-2.4%', trend: 'down', color: 'amber' },
    { label: 'Completed Tasks', value: '18.2k', change: '+8.1%', trend: 'up', color: 'blue' },
];

export const memoryUsageData = [
    { name: 'App Server', uv: 4000, pv: 2400, amt: 2400, fill: '#10b981' }, // emerald-500
    { name: 'DB Server', uv: 3000, pv: 1398, amt: 2210, fill: '#3b82f6' }, // blue-500
    { name: 'Cache Node', uv: 2000, pv: 9800, amt: 2290, fill: '#f59e0b' }, // amber-500
    { name: 'Worker 1', uv: 2780, pv: 3908, amt: 2000, fill: '#ef4444' }, // red-500
    { name: 'Worker 2', uv: 1890, pv: 4800, amt: 2181, fill: '#8b5cf6' }, // violet-500
];

export const hardwareHealthData = [
    { name: 'Healthy', value: 78, fill: '#10b981' },
    { name: 'Warning', value: 15, fill: '#f59e0b' },
    { name: 'Critical', value: 7, fill: '#ef4444' },
];

export const bandwidthData = [
    { time: '00:00', upload: 40, download: 24 },
    { time: '04:00', upload: 30, download: 13 },
    { time: '08:00', upload: 20, download: 98 },
    { time: '12:00', upload: 27, download: 39 },
    { time: '16:00', upload: 18, download: 48 },
    { time: '20:00', upload: 23, download: 38 },
    { time: '23:59', upload: 34, download: 43 },
];

export const cpuData = [
    { name: 'System', value: 35, fill: '#3b82f6' },
    { name: 'User', value: 45, fill: '#10b981' },
    { name: 'Idle', value: 20, fill: '#27272a' },
];

export const resourceTableData = [
    { id: 1, website: 'https://www.website1.com', region: 'India', loadTime: '2.1', cpu: '37', memory: '4.6 GB', status: 'Active' },
    { id: 2, website: 'https://www.website2.com', region: 'USA', loadTime: '3.8', cpu: '33', memory: '3.7 GB', status: 'Active' },
    { id: 3, website: 'https://www.website3.com', region: 'Australia', loadTime: '4.1', cpu: '28', memory: '3.3 GB', status: 'Warning' },
    { id: 4, website: 'https://www.website4.com', region: 'Japan', loadTime: '5.2', cpu: '26', memory: '4.4 GB', status: 'Maintenance' },
    { id: 5, website: 'https://www.website5.com', region: 'UK', loadTime: '4.0', cpu: '18', memory: '4.8 GB', status: 'Maintenance' },
];

export const recentActivity = [
    { id: 1, user: 'Admin', action: 'Deployed new build', time: '2 mins ago', type: 'success' },
    { id: 2, user: 'System', action: 'Automated backup started', time: '15 mins ago', type: 'info' },
    { id: 3, user: 'User 232', action: 'Failed login attempt', time: '1 hour ago', type: 'error' },
    { id: 4, user: 'Admin', action: 'Updated security policy', time: '3 hours ago', type: 'warning' },
];
