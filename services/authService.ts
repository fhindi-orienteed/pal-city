import { API_ENDPOINTS } from '@/config/apiConfig';
import { User } from '@/types/interface';
import { apiClient } from './apiClient';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export interface RegisterRequest {
    mobile: string;
    password: string;
    name?: string;
    email?: string;
    city?: string;
}

export interface LoginRequest {
    mobile: string;
    password: string;
}

export interface OTPRequest {
    mobile: string;
}

export interface OTPVerifyRequest {
    mobile: string;
    otp: string;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}

export class AuthService {
    /**
     * Register new user with mobile and password
     */
    static async register(data: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>(
                API_ENDPOINTS.AUTH.REGISTER,
                data
            );

            // Store token if registration is successful
            if (response.token) {
                await apiClient.setAuthToken(response.token);
            }

            return response;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Login with mobile and password
     */
    static async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>(
                API_ENDPOINTS.AUTH.LOGIN,
                data
            );

            // Store token if login is successful
            if (response.token) {
                await apiClient.setAuthToken(response.token);
            }

            return response;
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Request OTP for mobile number
     */
    static async requestOTP(data: OTPRequest): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>(
                API_ENDPOINTS.AUTH.OTP_REQUEST,
                data
            );

            return response;
        } catch (error: any) {
            console.error('OTP request error:', error);
            throw error;
        }
    }

    /**
     * Verify OTP and get JWT token
     */
    static async verifyOTP(data: OTPVerifyRequest): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>(
                API_ENDPOINTS.AUTH.OTP_VERIFY,
                data
            );

            // Store token if OTP verification is successful
            if (response.token) {
                await apiClient.setAuthToken(response.token);
            }

            return response;
        } catch (error: any) {
            console.error('OTP verification error:', error);
            throw error;
        }
    }

    /**
     * Logout - clear authentication token
     */
    static async logout(): Promise<void> {
        try {
            await apiClient.clearAuthToken();
        } catch (error: any) {
            console.error('Logout error:', error);
            throw error;
        }
    }
}
