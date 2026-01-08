import type { ResourceItem } from '../types';

export const resourceTableData: ResourceItem[] = [
    { id: 1, website: 'https://www.website1.com', region: 'India', loadTime: '2.1', cpu: '37', memory: '4.6 GB', status: 'Active' },
    { id: 2, website: 'https://www.website2.com', region: 'USA', loadTime: '3.8', cpu: '33', memory: '3.7 GB', status: 'Active' },
    { id: 3, website: 'https://www.website3.com', region: 'Australia', loadTime: '4.1', cpu: '28', memory: '3.3 GB', status: 'Warning' },
    { id: 4, website: 'https://www.website4.com', region: 'Japan', loadTime: '5.2', cpu: '26', memory: '4.4 GB', status: 'Maintenance' },
    { id: 5, website: 'https://www.website5.com', region: 'UK', loadTime: '4.0', cpu: '18', memory: '4.8 GB', status: 'Maintenance' },
];
