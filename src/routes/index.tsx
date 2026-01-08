import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load all pages for better performance
const Dashboard = lazy(() => import('../pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Servers = lazy(() => import('../pages/Servers'));
const NetworkPage = lazy(() => import('../pages/Network'));
const Alerts = lazy(() => import('../pages/Alerts'));
const Reports = lazy(() => import('../pages/Reports'));
const SettingsPage = lazy(() => import('../pages/Settings'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Dashboard />,
    },
    {
        path: '/servers',
        element: <Servers />,
    },
    {
        path: '/network',
        element: <NetworkPage />,
    },
    {
        path: '/alerts',
        element: <Alerts />,
    },
    {
        path: '/reports',
        element: <Reports />,
    },
    {
        path: '/settings',
        element: <SettingsPage />,
    },
];
