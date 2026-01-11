import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    serverName: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, serverName }: DeleteConfirmModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            onClose();
        } catch {
            // Error handling done in parent
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Server" size="sm">
            <div className="flex flex-col items-center text-center">
                <div className="size-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="size-6 text-red-500" />
                </div>
                <p className="text-zinc-300 mb-2">
                    Are you sure you want to delete
                </p>
                <p className="text-zinc-100 font-semibold mb-4">
                    "{serverName}"?
                </p>
                <p className="text-sm text-zinc-500">
                    This action cannot be undone. The server will be permanently removed from monitoring.
                </p>
            </div>

            <ModalFooter className="justify-center">
                <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="size-4 mr-2 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        'Delete Server'
                    )}
                </Button>
            </ModalFooter>
        </Modal>
    );
}
