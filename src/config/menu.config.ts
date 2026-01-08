import {
    LayoutDashboard,
    Server,
    Network,
    Bell,
    FileText,
    Settings,
    LogOut,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
}

// Main navigation items (shown in sidebar)
export const mainMenuItems: MenuItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/',
    },
    {
        id: 'servers',
        label: 'Servers',
        icon: Server,
        path: '/servers',
    },
    {
        id: 'network',
        label: 'Network',
        icon: Network,
        path: '/network',
    },
    {
        id: 'alerts',
        label: 'Alerts',
        icon: Bell,
        path: '/alerts',
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: FileText,
        path: '/reports',
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/settings',
    },
];

// Footer menu items
export const footerMenuItems: MenuItem[] = [
    {
        id: 'logout',
        label: 'Logout',
        icon: LogOut,
        path: '/logout',
    },
];

// Helper function to check if path is active
export function isPathActive(currentPath: string, itemPath: string): boolean {
    if (itemPath === '/') {
        return currentPath === '/';
    }
    return currentPath.startsWith(itemPath);
}
