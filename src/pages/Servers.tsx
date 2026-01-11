import { useState, useEffect, useCallback } from 'react';
import { Server, Plus, MoreHorizontal, Eye, Edit, Trash2, Power, Loader2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { FilterBar } from '../components/common/FilterBar';
import { TableContainer } from '../components/common/TableContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ServerFormModal } from '../components/servers/ServerFormModal';
import { DeleteConfirmModal } from '../components/servers/DeleteConfirmModal';
import { ServerDetailModal } from '../components/servers/ServerDetailModal';
import { 
    serverApi, 
    type ServerData, 
    type ServerCreateRequest, 
    type ServerUpdateRequest 
} from '../services/serverApi';

export default function Servers() {
    const [servers, setServers] = useState<ServerData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    
    // Dropdown state
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const fetchServers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await serverApi.getAllServers();
            setServers(response.servers || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch servers');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServers();
    }, [fetchServers]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenDropdownId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleAddServer = () => {
        setSelectedServer(null);
        setFormMode('create');
        setIsFormModalOpen(true);
    };

    const handleEditServer = (server: ServerData) => {
        setSelectedServer(server);
        setFormMode('edit');
        setIsFormModalOpen(true);
        setOpenDropdownId(null);
    };

    const handleViewServer = (server: ServerData) => {
        setSelectedServer(server);
        setIsDetailModalOpen(true);
        setOpenDropdownId(null);
    };

    const handleDeleteClick = (server: ServerData) => {
        setSelectedServer(server);
        setIsDeleteModalOpen(true);
        setOpenDropdownId(null);
    };

    const handleToggleStatus = async (server: ServerData) => {
        try {
            await serverApi.toggleServerStatus(server.id);
            fetchServers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to toggle server status');
        }
        setOpenDropdownId(null);
    };

    const handleFormSubmit = async (data: ServerCreateRequest | ServerUpdateRequest) => {
        if (formMode === 'create') {
            await serverApi.createServer(data as ServerCreateRequest);
        } else if (selectedServer) {
            await serverApi.updateServer(selectedServer.id, data as ServerUpdateRequest);
        }
        fetchServers();
    };

    const handleDeleteConfirm = async () => {
        if (selectedServer) {
            await serverApi.deleteServer(selectedServer.id);
            fetchServers();
        }
    };

    const filteredServers = servers.filter(server => 
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        { 
            key: 'name', 
            header: 'Server Name', 
            className: 'font-medium text-zinc-200',
            render: (item: ServerData) => (
                <div>
                    <span className="font-medium text-zinc-200">{item.name}</span>
                    {item.description && (
                        <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-[200px]">{item.description}</p>
                    )}
                </div>
            )
        },
        { 
            key: 'host', 
            header: 'Host / IP',
            render: (item: ServerData) => (
                <code className="text-xs bg-zinc-800 px-2 py-1 rounded">
                    {item.host}:{item.port}
                </code>
            )
        },
        { 
            key: 'username', 
            header: 'Username',
            render: (item: ServerData) => (
                <span className="text-zinc-400">{item.username}</span>
            )
        },
        { 
            key: 'is_active', 
            header: 'Status',
            render: (item: ServerData) => (
                <Badge variant={item.is_active ? 'success' : 'error'}>
                    {item.is_active ? 'Active' : 'Inactive'}
                </Badge>
            )
        },
        { 
            key: 'tags', 
            header: 'Tags',
            render: (item: ServerData) => (
                <div className="flex flex-wrap gap-1">
                    {item.tags ? item.tags.split(',').slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="info" className="text-xs">
                            {tag.trim()}
                        </Badge>
                    )) : <span className="text-zinc-600">-</span>}
                    {item.tags && item.tags.split(',').length > 2 && (
                        <Badge variant="default" className="text-xs">
                            +{item.tags.split(',').length - 2}
                        </Badge>
                    )}
                </div>
            )
        },
        {
            key: 'actions',
            header: '',
            render: (item: ServerData) => (
                <div className="relative">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="size-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                        }}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                    
                    {openDropdownId === item.id && (
                        <div 
                            className="absolute right-0 top-full mt-1 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 py-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => handleViewServer(item)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                            >
                                <Eye className="size-4" />
                                View Details
                            </button>
                            <button
                                onClick={() => handleEditServer(item)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                            >
                                <Edit className="size-4" />
                                Edit Server
                            </button>
                            <button
                                onClick={() => handleToggleStatus(item)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                            >
                                <Power className="size-4" />
                                {item.is_active ? 'Deactivate' : 'Activate'}
                            </button>
                            <hr className="my-1 border-zinc-800" />
                            <button
                                onClick={() => handleDeleteClick(item)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 className="size-4" />
                                Delete Server
                            </button>
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader 
                title="Servers" 
                description="Monitor and manage all server instances"
                icon={Server}
                actions={
                    <Button size="sm" onClick={handleAddServer}>
                        <Plus className="size-4 mr-2" />
                        Add Server
                    </Button>
                }
            />

            <FilterBar 
                searchPlaceholder="Search servers..."
                onRefresh={fetchServers}
                onFilter={() => {}}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {error}
                    <Button variant="ghost" size="sm" onClick={fetchServers} className="ml-4">
                        Retry
                    </Button>
                </div>
            )}

            <SectionCard 
                title="Server List" 
                description={`${filteredServers.length} servers total`} 
                noPadding
            >
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="size-8 text-emerald-500 animate-spin" />
                        <span className="ml-3 text-zinc-400">Loading servers...</span>
                    </div>
                ) : filteredServers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="size-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <Server className="size-8 text-zinc-600" />
                        </div>
                        <p className="text-zinc-400 mb-2">
                            {searchQuery ? 'No servers match your search' : 'No servers registered yet'}
                        </p>
                        <p className="text-sm text-zinc-600 mb-4">
                            {searchQuery ? 'Try a different search term' : 'Add your first server to start monitoring'}
                        </p>
                        {!searchQuery && (
                            <Button size="sm" onClick={handleAddServer}>
                                <Plus className="size-4 mr-2" />
                                Add Server
                            </Button>
                        )}
                    </div>
                ) : (
                    <TableContainer<ServerData>
                        columns={columns}
                        data={filteredServers}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </SectionCard>

            {/* Modals */}
            <ServerFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                server={selectedServer}
                mode={formMode}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                serverName={selectedServer?.name || ''}
            />

            <ServerDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                server={selectedServer}
                onEdit={() => {
                    setIsDetailModalOpen(false);
                    handleEditServer(selectedServer!);
                }}
            />
        </div>
    );
}
