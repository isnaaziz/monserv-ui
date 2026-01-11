import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '../cards/Card';
import { useSSE } from '../../context/SSEContext';
import { serverApi, type ServerData } from '../../services/serverApi';

// Custom marker icons
const createCustomIcon = (color: string, isOnline: boolean = false) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 20px;
                height: 20px;
                background: ${color};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                position: relative;
            ">
                ${isOnline ? `
                    <div style="
                        position: absolute;
                        top: -6px;
                        left: -6px;
                        width: 32px;
                        height: 32px;
                        background: ${color};
                        border-radius: 50%;
                        opacity: 0.3;
                        animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                    "></div>
                ` : ''}
            </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
    });
};

const onlineIcon = createCustomIcon('#22c55e', true);
const offlineIcon = createCustomIcon('#ef4444', false);
const unknownIcon = createCustomIcon('#71717a', false);

// Component to fit bounds
function FitBounds({ locations }: { locations: Array<{ lat: number; lng: number }> }) {
    const map = useMap();

    useEffect(() => {
        if (locations.length > 0) {
            const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
        }
    }, [locations, map]);

    return null;
}

interface DatacenterLocation {
    id: string;
    hostname: string;
    name: string;
    status: 'online' | 'offline' | 'unknown';
    location: string;
    latitude: number;
    longitude: number;
    host?: string;
    description?: string;
}

export function WorldMap() {
    const { data } = useSSE();
    const sseServers = data?.servers?.servers || [];
    const [registeredServers, setRegisteredServers] = useState<ServerData[]>([]);

    // Fetch registered servers from API
    useEffect(() => {
        const fetchServers = async () => {
            try {
                const response = await serverApi.getAllServers();
                setRegisteredServers(response.servers || []);
            } catch (error) {
                console.error('Failed to fetch registered servers:', error);
            }
        };
        fetchServers();
        // Refresh every 30 seconds
        const interval = setInterval(fetchServers, 30000);
        return () => clearInterval(interval);
    }, []);

    // Merge SSE servers (from env) and registered servers (from CRUD)
    const datacenters = useMemo((): DatacenterLocation[] => {
        const result: DatacenterLocation[] = [];
        const addedHosts = new Set<string>();

        // First, add SSE servers that have location data (from env)
        sseServers.forEach((server) => {
            if (server.latitude && server.longitude && server.latitude !== 0 && server.longitude !== 0) {
                // Extract host/IP from URL for tracking
                const hostMatch = server.url.match(/@([^:]+):/);
                const host = hostMatch ? hostMatch[1] : server.url;
                
                if (!addedHosts.has(host)) {
                    addedHosts.add(host);
                    result.push({
                        id: `sse-${host}`,
                        hostname: server.metrics?.hostname || server.name || host,
                        name: server.name || server.metrics?.hostname || 'Unknown Server',
                        status: server.status === 'online' ? 'online' : 
                                server.status === 'offline' ? 'offline' : 'unknown',
                        location: server.location || 'Unknown Location',
                        latitude: server.latitude,
                        longitude: server.longitude,
                        host: host,
                    });
                }
            }
        });

        // Then add registered servers that aren't already added
        registeredServers
            .filter(server => server.latitude && server.longitude)
            .forEach(server => {
                if (!addedHosts.has(server.host)) {
                    addedHosts.add(server.host);
                    
                    // Find matching SSE server for status
                    const sseServer = sseServers.find((s) => 
                        s.url.includes(server.host) || 
                        s.metrics?.hostname === server.name
                    );

                    let status: 'online' | 'offline' | 'unknown' = 'unknown';
                    if (sseServer) {
                        status = sseServer.status === 'online' ? 'online' : 
                                 sseServer.status === 'offline' ? 'offline' : 'unknown';
                    }

                    result.push({
                        id: server.id,
                        hostname: sseServer?.metrics?.hostname || server.name,
                        name: server.name,
                        status,
                        location: server.location || 'Unknown Location',
                        latitude: server.latitude || 0,
                        longitude: server.longitude || 0,
                        host: server.host,
                        description: server.description,
                    });
                }
            });

        return result;
    }, [registeredServers, sseServers]);

    // Count by status
    const stats = useMemo(() => {
        const counts = { active: 0, down: 0, unknown: 0 };
        datacenters.forEach((dc) => {
            if (dc.status === 'online') counts.active++;
            else if (dc.status === 'offline') counts.down++;
            else counts.unknown++;
        });
        return counts;
    }, [datacenters]);

    // Get locations for fitting bounds
    const locations = useMemo(() => {
        return datacenters.map(dc => ({ lat: dc.latitude, lng: dc.longitude }));
    }, [datacenters]);

    // Default center (world view)
    const defaultCenter: [number, number] = [20, 0];

    return (
        <Card 
            title="Datacenter Status" 
            className="h-full"
            action={
                <div className="flex items-center gap-5 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></span>
                        <span className="text-zinc-700 dark:text-zinc-300">{stats.active} Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
                        <span className="text-zinc-700 dark:text-zinc-300">{stats.down} Down</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-zinc-400"></span>
                        <span className="text-zinc-700 dark:text-zinc-300">{stats.unknown} Unknown</span>
                    </div>
                </div>
            }
        >
            <style>{`
                @keyframes ping {
                    75%, 100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                .leaflet-container {
                    background: #18181b !important;
                    border-radius: 12px;
                }
                .custom-marker {
                    background: transparent !important;
                    border: none !important;
                }
                .leaflet-popup-content-wrapper {
                    background: #27272a;
                    color: #fafafa;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .leaflet-popup-tip {
                    background: #27272a;
                }
                .leaflet-popup-content {
                    margin: 12px;
                }
                .leaflet-control-attribution {
                    display: none;
                }
            `}</style>
            
            <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                {datacenters.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                        <div className="text-center text-zinc-500">
                            <p className="text-lg font-medium">No servers with location data</p>
                            <p className="text-sm mt-1">Add latitude and longitude to your registered servers</p>
                        </div>
                    </div>
                ) : (
                    <MapContainer
                        center={defaultCenter}
                        zoom={2}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        {/* Dark themed map tiles */}
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        
                        {/* Fit bounds to show all markers */}
                        <FitBounds locations={locations} />
                        
                        {/* Server markers */}
                        {datacenters.map((dc) => (
                            <Marker
                                key={dc.id}
                                position={[dc.latitude, dc.longitude]}
                                icon={
                                    dc.status === 'online' ? onlineIcon :
                                    dc.status === 'offline' ? offlineIcon : unknownIcon
                                }
                            >
                                <Popup>
                                    <div className="min-w-[180px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`size-2.5 rounded-full ${
                                                dc.status === 'online' ? 'bg-green-500' :
                                                dc.status === 'offline' ? 'bg-red-500' : 'bg-zinc-400'
                                            }`}></span>
                                            <span className="font-semibold text-white">{dc.name}</span>
                                        </div>
                                        {dc.hostname !== dc.name && (
                                            <p className="text-xs text-zinc-400 mb-1">
                                                Hostname: {dc.hostname}
                                            </p>
                                        )}
                                        <p className="text-sm text-zinc-300">📍 {dc.location}</p>
                                        {dc.host && (
                                            <p className="text-xs text-zinc-400 mt-1">🌐 {dc.host}</p>
                                        )}
                                        {dc.description && (
                                            <p className="text-xs text-zinc-500 mt-1 italic">{dc.description}</p>
                                        )}
                                        <div className="mt-2 pt-2 border-t border-zinc-700">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                                dc.status === 'online' ? 'bg-green-500/20 text-green-400' :
                                                dc.status === 'offline' ? 'bg-red-500/20 text-red-400' : 
                                                'bg-zinc-500/20 text-zinc-400'
                                            }`}>
                                                {dc.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                )}
            </div>
        </Card>
    );
}
