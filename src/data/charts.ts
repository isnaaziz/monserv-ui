
export const memoryUsageData = [
    { name: 'SG-PROD-12', value: 28, fill: '#c084fc' }, // purple/pink
    { name: 'DE-PROD-07', value: 36, fill: '#c084fc' },
    { name: 'CA-PROD-23', value: 68, fill: '#c084fc' },
    { name: 'ES-PROD-18', value: 92, fill: '#c084fc' },
    { name: 'IN-PROD-10', value: 112, fill: '#c084fc' },
];

export const hardwareHealthData = [
    { name: 'Up', value: 1317, fill: '#22c55e' },
    { name: 'Warning', value: 378, fill: '#eab308' },
    { name: 'Critical', value: 96, fill: '#ef4444' },
    { name: 'Unknown', value: 93, fill: '#71717a' },
];

export const bandwidthData = [
    { time: '16:00', 'UK-PROD-38': 1650, 'CH-PROD-06': 2450 },
    { time: '16:30', 'UK-PROD-38': 1700, 'CH-PROD-06': 2350 },
    { time: '17:00', 'UK-PROD-38': 1300, 'CH-PROD-06': 2300 },
    { time: '17:30', 'UK-PROD-38': 1600, 'CH-PROD-06': 2100 },
    { time: '18:00', 'UK-PROD-38': 2300, 'CH-PROD-06': 3000 },
    { time: '18:30', 'UK-PROD-38': 2400, 'CH-PROD-06': 3200 },
    { time: '19:00', 'UK-PROD-38': 2650, 'CH-PROD-06': 3250 },
    { time: '19:30', 'UK-PROD-38': 2850, 'CH-PROD-06': 3300 },
];

export const serverNodes = [
    { name: 'DE-PROD-05', color: '#71717a', active: false },
    { name: 'UK-PROD-38', color: '#3b82f6', active: true },
    { name: 'CH-PROD-06', color: '#ef4444', active: true },
    { name: 'CA-PROD-42', color: '#71717a', active: false },
    { name: 'SG-PROD-20', color: '#71717a', active: false },
];

export const cpuData = [
    { name: 'IN-PROD-10', value: 60, fill: '#3b82f6' }, // blue
    { name: 'US-PROD-22', value: 52, fill: '#8b5cf6' }, // purple
    { name: 'DE-PROD-03', value: 45, fill: '#f87171' }, // red/coral
    { name: 'CH-PROD-48', value: 40, fill: '#f59e0b' }, // amber/orange
    { name: 'AU-PROD-27', value: 34, fill: '#eab308' }, // yellow
];
