import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Server, Globe, User, FileText, Tag, Clock, Activity } from 'lucide-react';
import type { ServerData } from '../../services/serverApi';

interface ServerDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    server: ServerData | null;
    onEdit: () => void;
}

export function ServerDetailModal({ isOpen, onClose, server, onEdit }: ServerDetailModalProps) {
    if (!server) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const DetailRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) => (
        <div className="flex items-start gap-3 py-3 border-b border-zinc-800 last:border-0">
            <div className="size-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                <Icon className="size-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-500 mb-1">{label}</p>
                <div className="text-sm text-zinc-200">{value}</div>
            </div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Server Details" size="lg">
            <div className="space-y-1">
                <DetailRow 
                    icon={Server} 
                    label="Server Name" 
                    value={
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{server.name}</span>
                            <Badge variant={server.is_active ? 'success' : 'error'}>
                                {server.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                    }
                />
                
                <DetailRow 
                    icon={Globe} 
                    label="Connection" 
                    value={
                        <code className="text-emerald-400 bg-zinc-800 px-2 py-1 rounded text-xs">
                            {server.url}
                        </code>
                    }
                />
                
                <DetailRow 
                    icon={User} 
                    label="Credentials" 
                    value={
                        <span>
                            <span className="text-zinc-400">Username:</span> {server.username} | 
                            <span className="text-zinc-400"> Host:</span> {server.host}:{server.port}
                        </span>
                    }
                />
                
                {server.description && (
                    <DetailRow 
                        icon={FileText} 
                        label="Description" 
                        value={server.description}
                    />
                )}
                
                {server.tags && (
                    <DetailRow 
                        icon={Tag} 
                        label="Tags" 
                        value={
                            <div className="flex flex-wrap gap-1">
                                {server.tags.split(',').map((tag, idx) => (
                                    <Badge key={idx} variant="info" className="text-xs">
                                        {tag.trim()}
                                    </Badge>
                                ))}
                            </div>
                        }
                    />
                )}
                
                <DetailRow 
                    icon={Clock} 
                    label="Created At" 
                    value={formatDate(server.created_at)}
                />
                
                <DetailRow 
                    icon={Activity} 
                    label="Last Updated" 
                    value={formatDate(server.updated_at)}
                />
            </div>

            <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                    Close
                </Button>
                <Button onClick={onEdit}>
                    Edit Server
                </Button>
            </ModalFooter>
        </Modal>
    );
}
