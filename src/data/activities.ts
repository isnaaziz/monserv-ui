import type { ActivityItem } from '../types';

export const recentActivity: ActivityItem[] = [
    { id: 1, user: 'Admin', action: 'Deployed new build', time: '2 mins ago', type: 'success' },
    { id: 2, user: 'System', action: 'Automated backup started', time: '15 mins ago', type: 'info' },
    { id: 3, user: 'User 232', action: 'Failed login attempt', time: '1 hour ago', type: 'error' },
    { id: 4, user: 'Admin', action: 'Updated security policy', time: '3 hours ago', type: 'warning' },
];
