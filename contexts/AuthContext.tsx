import { IS_GUEST_KEY, USER_KEY } from '@/constants/localStorageKey';
import { User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLogin: boolean;
    login: () => void;
    logout: () => void;
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

    const login = async () => {
        setIsLogin(true);
        setIsGuest(false);
        // Set a default user when logging in
        const newUser = {
            id: '1',
            phoneNumber: '0597262705',
            name: 'Fathi Hindi',
            email: 'fathi.hindi@gmail.com',
            city: 'Nablus',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setUser(newUser);
        // Persist user to AsyncStorage
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
        await AsyncStorage.removeItem(IS_GUEST_KEY);
    };

    const logout = () => {
        setIsLogin(false);
        setIsGuest(false);
        setUser(null);
        AsyncStorage.removeItem(IS_GUEST_KEY);
        AsyncStorage.removeItem(USER_KEY);
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
        <AuthContext.Provider value={{ isLogin, login, logout, isGuest, setIsGuest: handleSetIsGuest, isLoading, user, updateUser }}>
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
