import { useState, useEffect } from 'react';
import { Modal, ModalFooter } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Server, Globe, Hash, User, Lock, FileText, Tag, Loader2, Eye, EyeOff } from 'lucide-react';
import { LocationPicker } from '../ui/LocationPicker';
import type { ServerData, ServerCreateRequest, ServerUpdateRequest } from '../../services/serverApi';

interface ServerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ServerCreateRequest | ServerUpdateRequest) => Promise<void>;
    server?: ServerData | null;
    mode: 'create' | 'edit';
}

export function ServerFormModal({ isOpen, onClose, onSubmit, server, mode }: ServerFormModalProps) {
    const [formData, setFormData] = useState<ServerCreateRequest>({
        name: '',
        host: '',
        port: 22,
        username: '',
        password: '',
        description: '',
        tags: '',
        location: '',
        latitude: 0,
        longitude: 0,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (server && mode === 'edit') {
            setFormData({
                name: server.name,
                host: server.host,
                port: server.port,
                username: server.username,
                password: '',
                description: server.description || '',
                tags: server.tags || '',
                location: server.location || '',
                latitude: server.latitude || 0,
                longitude: server.longitude || 0,
            });
        } else {
            setFormData({
                name: '',
                host: '',
                port: 22,
                username: '',
                password: '',
                description: '',
                tags: '',
                location: '',
                latitude: 0,
                longitude: 0,
            });
        }
        setError(null);
    }, [server, mode, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'port' || name === 'latitude' || name === 'longitude' 
                ? parseFloat(value) || 0 
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (mode === 'create') {
                await onSubmit(formData);
            } else {
                // For update, only send non-empty password
                const updateData: ServerUpdateRequest = {
                    name: formData.name,
                    host: formData.host,
                    port: formData.port,
                    username: formData.username,
                    description: formData.description,
                    tags: formData.tags,
                    location: formData.location,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                };
                if (formData.password) {
                    updateData.password = formData.password;
                }
                await onSubmit(updateData);
            }
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Add New Server' : 'Edit Server'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {/* Server Name */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Server Name *
                        </label>
                        <Input
                            icon={Server}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., prod-web-01"
                            required
                        />
                    </div>

                    {/* Host */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Host / IP Address *
                        </label>
                        <Input
                            icon={Globe}
                            name="host"
                            value={formData.host}
                            onChange={handleChange}
                            placeholder="e.g., 192.168.1.10"
                            required
                        />
                    </div>

                    {/* Port */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            SSH Port *
                        </label>
                        <Input
                            icon={Hash}
                            name="port"
                            type="number"
                            value={formData.port}
                            onChange={handleChange}
                            placeholder="22"
                            min={1}
                            max={65535}
                            required
                        />
                    </div>

                    {/* Username */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Username *
                        </label>
                        <Input
                            icon={User}
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="e.g., admin"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Password {mode === 'create' ? '*' : '(leave empty to keep)'}
                        </label>
                        <div className="relative">
                            <Input
                                icon={Lock}
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={mode === 'edit' ? '••••••••' : 'Enter password'}
                                required={mode === 'create'}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Description
                        </label>
                        <Input
                            icon={FileText}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="e.g., Production Web Server"
                        />
                    </div>

                    {/* Tags */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Tags
                        </label>
                        <Input
                            icon={Tag}
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., production, web, nginx"
                        />
                        <p className="text-xs text-zinc-600 mt-1">Separate tags with commas</p>
                    </div>

                    {/* Location Picker */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Server Location
                        </label>
                        <LocationPicker
                            location={formData.location || ''}
                            latitude={formData.latitude || 0}
                            longitude={formData.longitude || 0}
                            onLocationChange={(location, lat, lng) => {
                                setFormData(prev => ({
                                    ...prev,
                                    location,
                                    latitude: lat,
                                    longitude: lng,
                                }));
                            }}
                        />
                    </div>
                </div>

                <ModalFooter>
                    <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                {mode === 'create' ? 'Adding...' : 'Saving...'}
                            </>
                        ) : (
                            mode === 'create' ? 'Add Server' : 'Save Changes'
                        )}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
