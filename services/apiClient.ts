import { API_CONFIG } from '@/config/apiConfig';
import { AUTH_TOKEN } from '@/constants/localStorageKey';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * API Client Service
 * Centralized HTTP client for all API requests with JWT authentication
 */

export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
    success?: boolean;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

class ApiClient {
    private baseURL: string;
    private timeout: number;

    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    /**
     * Get authentication token from AsyncStorage
     */
    private async getAuthToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(AUTH_TOKEN);
        } catch (error) {
            console.error('Error getting auth token:', error);
            return null;
        }
    }

    /**
     * Build headers for request
     */
    private async buildHeaders(customHeaders?: Record<string, string>): Promise<HeadersInit> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...customHeaders,
        };

        const token = await this.getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Handle API response
     */
    private async handleResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        let data: any;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const errorMessage = data?.message || data?.error || `HTTP Error: ${response.status}`;
            throw new ApiError(errorMessage, response.status, data);
        }

        return data as T;
    }

    /**
     * Make HTTP request with timeout
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const headers = await this.buildHeaders(options.headers as Record<string, string>);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            console.log(`[API] ${options.method || 'GET'} ${url}`);

            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return await this.handleResponse<T>(response);
        } catch (error: any) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new ApiError('Request timeout', 408);
            }

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                error.message || 'Network request failed',
                undefined,
                error
            );
        }
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        let url = endpoint;

        if (params) {
            const queryString = new URLSearchParams(
                Object.entries(params).reduce((acc, [key, value]) => {
                    if (value !== undefined && value !== null) {
                        acc[key] = String(value);
                    }
                    return acc;
                }, {} as Record<string, string>)
            ).toString();

            if (queryString) {
                url += `?${queryString}`;
            }
        }

        return this.request<T>(url, { method: 'GET' });
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    /**
     * Store authentication token
     */
    async setAuthToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(AUTH_TOKEN, token);
        } catch (error) {
            console.error('Error storing auth token:', error);
            throw error;
        }
    }

    /**
     * Clear authentication token
     */
    async clearAuthToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem(AUTH_TOKEN);
        } catch (error) {
            console.error('Error clearing auth token:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
