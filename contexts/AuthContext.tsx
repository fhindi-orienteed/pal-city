import { IS_GUEST_KEY, USER_KEY } from '@/constants/localStorageKey';
import { AuthService } from '@/services/authService';
import { User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLogin: boolean;
    login: (mobile: string, password: string) => Promise<void>;
    loginWithOTP: (mobile: string, otp: string) => Promise<void>;
    logout: () => Promise<void>;
    isGuest: boolean;
    setIsGuest: (guest: boolean) => void;
    isLoading: boolean;
    user: User | null;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogin, setIsLogin] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        AsyncStorage.getItem(IS_GUEST_KEY).then((guestStatus) => {
            if (guestStatus === 'true') {
                setIsGuest(true);
            }
        });

        AsyncStorage.getItem(USER_KEY).then((userJson) => {
            if (userJson && JSON.parse(userJson)) {
                const user = JSON.parse(userJson);
                setUser(user);
                setIsLogin(true);
                setIsGuest(false);
            } else {
                setIsLogin(false);
                setIsGuest(true);
            }
        });
    }, []);

    const handleSetIsGuest = async (guest: boolean) => {
        setIsGuest(guest);
        if (guest) {
            await AsyncStorage.setItem(IS_GUEST_KEY, 'true');
            await AsyncStorage.removeItem(USER_KEY);
        } else {
            await AsyncStorage.removeItem(IS_GUEST_KEY);
        }
    };

    const login = async (mobile: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await AuthService.login({ mobile, password });

            if (response.success && response.user) {
                setIsLogin(true);
                setIsGuest(false);
                setUser(response.user);

                // Persist user to AsyncStorage
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
                await AsyncStorage.removeItem(IS_GUEST_KEY);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithOTP = async (mobile: string, otp: string) => {
        try {
            setIsLoading(true);
            const response = await AuthService.verifyOTP({ mobile, otp });

            if (response.success && response.user) {
                setIsLogin(true);
                setIsGuest(false);
                setUser(response.user);

                // Persist user to AsyncStorage
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
                await AsyncStorage.removeItem(IS_GUEST_KEY);
            } else {
                throw new Error(response.message || 'OTP verification failed');
            }
        } catch (error: any) {
            console.error('OTP verification error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await AuthService.logout();

            setIsLogin(false);
            setIsGuest(false);
            setUser(null);

            await AsyncStorage.removeItem(IS_GUEST_KEY);
            await AsyncStorage.removeItem(USER_KEY);
        } catch (error: any) {
            console.error('Logout error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (userData: Partial<User>) => {
        if (user) {
            const updatedUser = {
                ...user,
                ...userData,
                updatedAt: new Date().toISOString(),
            };
            setUser(updatedUser);
            // Persist updated user to AsyncStorage
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, login, loginWithOTP, logout, isGuest, setIsGuest: handleSetIsGuest, isLoading, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
