import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

// Types untuk data dari backend
export interface NetworkInterface {
    name: string;
    bytes_sent: number;
    bytes_recv: number;
    packets_sent: number;
    packets_recv: number;
    errors_in: number;
    errors_out: number;
    drops_in: number;
    drops_out: number;
}

export interface NetworkStats {
    interfaces: NetworkInterface[];
    total_bytes_sent: number;
    total_bytes_recv: number;
    bytes_sent_rate: number;  // bytes per second
    bytes_recv_rate: number;  // bytes per second
}

export interface ServerMetrics {
    hostname: string;
    uptime_seconds: number;
    memory: {
        total_bytes: number;
        used_bytes: number;
        free_bytes: number;
        used_percent: number;
    };
    disks: Array<{
        device: string;
        mountpoint: string;
        fstype: string;
        total_bytes: number;
        used_bytes: number;
        free_bytes: number;
        used_percent: number;
    }>;
    network: NetworkStats;
    top_processes_by_memory: Array<{
        pid: number;
        name: string;
        username: string;
        rss_bytes: number;
        percent_ram: number;
        cmdline: string;
    }>;
    generated_at_utc: string;
}

export interface ServerStatus {
    url: string;
    status: 'online' | 'offline' | 'warning' | 'alert';
    metrics: ServerMetrics | null;
    last_update: string;
    // Location fields
    name?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
}

export interface DashboardStats {
    total_servers: number;
    online_servers: number;
    offline_servers: number;
    alert_count: number;
    avg_cpu: number;
    avg_memory: number;
    avg_disk: number;
}

export interface Alert {
    id: string;
    server_url: string;
    hostname: string;
    type: 'memory' | 'disk' | 'process' | 'cpu';
    severity: 'warning' | 'critical';
    subject: string;
    message: string;
    is_active: boolean;
    triggered_at: string;
    resolved_at: string | null;
}

export interface HealthInfo {
    status: 'ok' | 'degraded' | 'error';
    servers: Record<string, {
        url: string;
        hostname: string;
        status: string;
    }>;
    total: number;
    online: number;
    offline: number;
    alerts: number;
}

export interface DashboardData {
    stats: DashboardStats;
    servers: {
        servers: ServerStatus[];
        total: number;
    };
    alerts: Alert[];
    health: HealthInfo;
}

export interface DashboardEvent {
    type: string;
    timestamp: string;
    data: DashboardData;
}

interface SSEContextType {
    data: DashboardData | null;
    isConnected: boolean;
    error: Error | null;
    lastUpdate: Date | null;
    reconnect: () => void;
}

const SSEContext = createContext<SSEContextType | undefined>(undefined);

interface SSEProviderProps {
    children: React.ReactNode;
    url?: string;
}

export function SSEProvider({ children, url }: SSEProviderProps) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const eventSourceRef = useRef<EventSource | null>(null);
    const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;

    // Determine SSE URL based on environment
    const getSSEUrl = useCallback(() => {
        if (url) return url;

        // Get from environment or default to localhost
        const apiBaseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        return `${apiBaseUrl}/api/v1/sse/dashboard`;
    }, [url]);

    const connect = useCallback(() => {
        // Close existing connection
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        // Clear any pending reconnect
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        const sseUrl = getSSEUrl();
        console.log('[SSE] Connecting to:', sseUrl);

        try {
            const eventSource = new EventSource(sseUrl);
            eventSourceRef.current = eventSource;

            eventSource.onopen = () => {
                console.log('[SSE] Connected');
                setIsConnected(true);
                setError(null);
                reconnectAttempts.current = 0;
            };

            // Handle dashboard event
            eventSource.addEventListener('dashboard', (event) => {
                try {
                    const dashboardEvent: DashboardEvent = JSON.parse(event.data);
                    console.log('[SSE] Received dashboard update:', dashboardEvent);
                    setData(dashboardEvent.data);
                    setLastUpdate(new Date(dashboardEvent.timestamp));
                } catch (err) {
                    console.error('[SSE] Error parsing dashboard event:', err);
                }
            });

            // Handle generic messages (fallback)
            eventSource.onmessage = (event) => {
                try {
                    const parsed = JSON.parse(event.data);
                    console.log('[SSE] Received message:', parsed);
                    if (parsed.data) {
                        setData(parsed.data);
                        setLastUpdate(new Date());
                    }
                } catch (err) {
                    console.error('[SSE] Error parsing message:', err);
                }
            };

            eventSource.onerror = (err) => {
                console.error('[SSE] Connection error:', err);
                setIsConnected(false);
                setError(new Error('SSE connection failed'));
                eventSource.close();

                // Attempt reconnection with exponential backoff
                if (reconnectAttempts.current < maxReconnectAttempts) {
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                    console.log(`[SSE] Reconnecting in ${delay}ms (attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`);
                    reconnectTimeoutRef.current = setTimeout(() => {
                        reconnectAttempts.current++;
                        connect();
                    }, delay);
                } else {
                    console.error('[SSE] Max reconnection attempts reached');
                    setError(new Error('Failed to connect after multiple attempts'));
                }
            };
        } catch (err) {
            console.error('[SSE] Failed to create EventSource:', err);
            setError(err as Error);
            setIsConnected(false);
        }
    }, [getSSEUrl]);

    const reconnect = useCallback(() => {
        console.log('[SSE] Manual reconnect requested');
        reconnectAttempts.current = 0;
        connect();
    }, [connect]);

    useEffect(() => {
        connect();

        return () => {
            console.log('[SSE] Cleaning up connection');
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [connect]);

    const value: SSEContextType = {
        data,
        isConnected,
        error,
        lastUpdate,
        reconnect,
    };

    return <SSEContext.Provider value={value}>{children}</SSEContext.Provider>;
}

export function useSSE(): SSEContextType {
    const context = useContext(SSEContext);
    if (context === undefined) {
        throw new Error('useSSE must be used within a SSEProvider');
    }
    return context;
}

// Custom hook untuk mengakses stats dashboard
export function useDashboardStats() {
    const { data, isConnected, error, lastUpdate } = useSSE();

    return {
        stats: data?.stats ?? null,
        servers: data?.servers?.servers ?? [],
        totalServers: data?.servers?.total ?? 0,
        alerts: data?.alerts ?? [],
        health: data?.health ?? null,
        isConnected,
        error,
        lastUpdate,
    };
}
