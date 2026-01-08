
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

// Types
export interface SystemStats {
    cpu: number;
    memory: number;
    disk: number;
    bandwidth: {
        in: number;
        out: number;
    };
    health: number;
    uptime: number;
    temp: number;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'error' | 'offline';

interface WebSocketContextType {
    status: ConnectionStatus;
    stats: SystemStats;
    isConnected: boolean;
}

// Default initial state
const initialStats: SystemStats = {
    cpu: 0,
    memory: 0,
    disk: 0,
    bandwidth: { in: 0, out: 0 },
    health: 100,
    uptime: 0,
    temp: 0,
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

interface WebSocketProviderProps {
    children: React.ReactNode;
    url?: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
    url = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws'
}) => {
    const [status, setStatus] = useState<ConnectionStatus>('connecting');
    const [stats, setStats] = useState<SystemStats>(initialStats);
    const ws = useRef<WebSocket | null>(null);
    const retryTimeout = useRef<number | undefined>(undefined);
    const simulationInterval = useRef<number | undefined>(undefined);

    // Simulation Mode Logic
    const startSimulation = () => {
        if (simulationInterval.current) return;

        console.log('Starting simulation mode...');
        setStatus('connected'); // Pretend we are connected

        simulationInterval.current = window.setInterval(() => {
            setStats(prev => ({
                cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 10)),
                memory: Math.min(100, Math.max(0, prev.memory + (Math.random() - 0.5) * 5)),
                disk: prev.disk, // Disk usually static
                bandwidth: {
                    in: Math.max(0, prev.bandwidth.in + (Math.random() - 0.5) * 50),
                    out: Math.max(0, prev.bandwidth.out + (Math.random() - 0.5) * 50),
                },
                health: 98,
                uptime: prev.uptime + 1,
                temp: Math.min(90, Math.max(30, prev.temp + (Math.random() - 0.5) * 2)),
            }));
        }, 1000);
    };

    const stopSimulation = () => {
        if (simulationInterval.current) {
            clearInterval(simulationInterval.current);
            simulationInterval.current = undefined;
        }
    };

    const connect = () => {
        try {
            // If URL is default localhost and likely not running, we might want to fail fast or just timeout.
            // For now, standard WebSocket attempt.
            ws.current = new WebSocket(url);

            ws.current.onopen = () => {
                setStatus('connected');
                stopSimulation();
                console.log('WebSocket connected');
            };

            ws.current.onclose = () => {
                setStatus('error');
                console.log('WebSocket disconnected, retrying...');
                // Fallback to simulation if connection drops? 
                // Or just wait for reconnect. Let's do simulation on error for better UX in dev.
                startSimulation();

                retryTimeout.current = window.setTimeout(connect, 5000);
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
                ws.current?.close();
            };

            ws.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    // Assume data matches shape or map it here
                    setStats(prev => ({ ...prev, ...data }));
                } catch (e) {
                    console.error('Failed to parse WS message', e);
                }
            };
        } catch (e) {
            setStatus('error');
            startSimulation();
            retryTimeout.current = window.setTimeout(connect, 5000);
        }
    };

    useEffect(() => {
        connect();

        return () => {
            ws.current?.close();
            stopSimulation();
            if (retryTimeout.current) clearTimeout(retryTimeout.current);
        };
    }, [url]);

    return (
        <WebSocketContext.Provider value={{ status, stats, isConnected: status === 'connected' }}>
            {children}
        </WebSocketContext.Provider>
    );
};
