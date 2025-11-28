import { User } from '@/types/interface';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isLogin: boolean;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
    user: User | null;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = () => {
        setIsLogin(true);
        // Set a default user when logging in
        setUser({
            id: '1',
            phoneNumber: '0599123456',
            name: '',
            email: '',
            city: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    };

    const logout = () => {
        setIsLogin(false);
        setUser(null);
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            setUser({
                ...user,
                ...userData,
                updatedAt: new Date().toISOString(),
            });
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, login, logout, isLoading, user, updateUser }}>
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
