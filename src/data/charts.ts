
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
