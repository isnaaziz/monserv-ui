import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Search, X, Loader2 } from 'lucide-react';

// Custom marker icon
const locationIcon = L.divIcon({
    className: 'custom-location-marker',
    html: `
        <div style="
            width: 30px;
            height: 30px;
            background: #10b981;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
            <div style="
                width: 10px;
                height: 10px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            "></div>
        </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

// Common locations for quick selection
const COMMON_LOCATIONS = [
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
    { name: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456 },
    { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
    { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Frankfurt, Germany', lat: 50.1109, lng: 8.6821 },
    { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
    { name: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437 },
    { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333 },
    { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
    { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
    { name: 'Seoul, South Korea', lat: 37.5665, lng: 126.9780 },
    { name: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041 },
    { name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
];

interface LocationPickerProps {
    location: string;
    latitude: number;
    longitude: number;
    onLocationChange: (location: string, lat: number, lng: number) => void;
}

// Component to handle map clicks
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

// Component to fly to a location
function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    
    useEffect(() => {
        if (lat !== 0 || lng !== 0) {
            map.flyTo([lat, lng], 6, { duration: 1 });
        }
    }, [lat, lng, map]);
    
    return null;
}

export function LocationPicker({ location, latitude, longitude, onLocationChange }: LocationPickerProps) {
    const [searchQuery, setSearchQuery] = useState(location);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState(COMMON_LOCATIONS);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on search query
    useEffect(() => {
        if (searchQuery) {
            const filtered = COMMON_LOCATIONS.filter(loc => 
                loc.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredLocations(filtered.length > 0 ? filtered : COMMON_LOCATIONS);
        } else {
            setFilteredLocations(COMMON_LOCATIONS);
        }
    }, [searchQuery]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle map click - reverse geocode to get location name
    const handleMapClick = useCallback(async (lat: number, lng: number) => {
        // Set coordinates immediately
        onLocationChange(searchQuery || 'Loading...', lat, lng);
        
        // Reverse geocode to get location name
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await response.json();
            
            if (data && data.address) {
                // Build location name from address components
                const parts = [];
                if (data.address.city || data.address.town || data.address.village || data.address.municipality) {
                    parts.push(data.address.city || data.address.town || data.address.village || data.address.municipality);
                }
                if (data.address.state || data.address.province || data.address.region) {
                    parts.push(data.address.state || data.address.province || data.address.region);
                }
                if (data.address.country) {
                    parts.push(data.address.country);
                }
                
                const locationName = parts.length > 0 ? parts.slice(0, 2).join(', ') : 'Unknown Location';
                setSearchQuery(locationName);
                onLocationChange(locationName, lat, lng);
            }
        } catch (error) {
            console.error('Failed to reverse geocode:', error);
            // Keep the coordinates even if reverse geocoding fails
            const fallbackName = `Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
            setSearchQuery(fallbackName);
            onLocationChange(fallbackName, lat, lng);
        }
    }, [onLocationChange]);

    // Handle location selection from suggestions
    const handleSelectLocation = (loc: typeof COMMON_LOCATIONS[0]) => {
        setSearchQuery(loc.name);
        onLocationChange(loc.name, loc.lat, loc.lng);
        setShowSuggestions(false);
    };

    // Search location using Nominatim (OpenStreetMap)
    const searchLocation = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                const displayName = result.display_name.split(',').slice(0, 2).join(',').trim();
                setSearchQuery(displayName);
                onLocationChange(displayName, lat, lng);
            }
        } catch (error) {
            console.error('Failed to search location:', error);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle enter key
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchLocation();
        }
    };

    // Clear location
    const clearLocation = () => {
        setSearchQuery('');
        onLocationChange('', 0, 0);
    };

    const hasLocation = latitude !== 0 || longitude !== 0;

    return (
        <div className="space-y-3">
            {/* Search Input */}
            <div ref={searchRef} className="relative">
                <div className="relative flex gap-2">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search city or country..."
                            className="w-full pl-10 pr-10 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearLocation}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={searchLocation}
                        disabled={isSearching}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        {isSearching ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Search className="size-4" />
                        )}
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                    <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl">
                        <div className="p-2 text-xs text-zinc-500 border-b border-zinc-700">
                            Quick Select or search above
                        </div>
                        {filteredLocations.map((loc) => (
                            <button
                                key={loc.name}
                                type="button"
                                onClick={() => handleSelectLocation(loc)}
                                className="w-full px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                            >
                                <MapPin className="size-3 text-zinc-500" />
                                {loc.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map Container */}
            <div className="relative rounded-lg overflow-hidden border border-zinc-700">
                <style>{`
                    .location-picker-map .leaflet-container {
                        background: #18181b !important;
                        cursor: crosshair !important;
                    }
                    .custom-location-marker {
                        background: transparent !important;
                        border: none !important;
                    }
                    .location-picker-map .leaflet-control-attribution {
                        display: none;
                    }
                `}</style>
                <div className="location-picker-map h-[200px]">
                    <MapContainer
                        center={hasLocation ? [latitude, longitude] : [20, 0]}
                        zoom={hasLocation ? 6 : 2}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={true}
                        attributionControl={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        <MapClickHandler onClick={handleMapClick} />
                        {hasLocation && (
                            <>
                                <Marker position={[latitude, longitude]} icon={locationIcon} />
                                <FlyToLocation lat={latitude} lng={longitude} />
                            </>
                        )}
                    </MapContainer>
                </div>
                
                {/* Help text overlay */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-xs text-zinc-400 bg-zinc-900/80 px-2 py-1 rounded">
                        Click on map to set location
                    </span>
                    {hasLocation && (
                        <span className="text-xs text-emerald-400 bg-zinc-900/80 px-2 py-1 rounded font-mono">
                            {latitude.toFixed(4)}, {longitude.toFixed(4)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
