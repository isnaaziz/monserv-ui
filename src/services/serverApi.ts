const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface ServerData {
    id: string;
    name: string;
    host: string;
    port: number;
    username: string;
    description?: string;
    tags?: string;
    url: string;
    is_active: boolean;
    location?: string;
    latitude?: number;
    longitude?: number;
    created_at: string;
    updated_at: string;
}

export interface ServerListResponse {
    servers: ServerData[];
    total: number;
}

export interface ServerCreateRequest {
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    description?: string;
    tags?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
}

export interface ServerUpdateRequest {
    name?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    description?: string;
    tags?: string;
    is_active?: boolean;
    location?: string;
    latitude?: number;
    longitude?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

class ServerApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/api/v1/servers`;
    }

    async getAllServers(): Promise<ServerListResponse> {
        const response = await fetch(this.baseUrl);
        const result: ApiResponse<ServerListResponse> = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch servers');
        }
        
        return result.data || { servers: [], total: 0 };
    }

    async getServerById(id: string): Promise<ServerData> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const result: ApiResponse<ServerData> = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch server');
        }
        
        return result.data!;
    }

    async createServer(data: ServerCreateRequest): Promise<ServerData> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result: ApiResponse<ServerData> = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to create server');
        }
        
        return result.data!;
    }

    async updateServer(id: string, data: ServerUpdateRequest): Promise<ServerData> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result: ApiResponse<ServerData> = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update server');
        }
        
        return result.data!;
    }

    async deleteServer(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        
        const result: ApiResponse<null> = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to delete server');
        }
    }

    async toggleServerStatus(id: string): Promise<ServerData> {
        const response = await fetch(`${this.baseUrl}/${id}/toggle`, {
            method: 'PATCH',
        });
        
        const result: ApiResponse<ServerData> = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to toggle server status');
        }
        
        return result.data!;
    }
}

export const serverApi = new ServerApiService();
