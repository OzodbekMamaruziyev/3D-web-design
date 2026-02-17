import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginWithGoogle } from '../../services/api';
import type { User } from '../../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (googleToken: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token
        const token = localStorage.getItem('admin_token');
        const savedUser = localStorage.getItem('admin_user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (googleToken: string) => {
        setIsLoading(true);
        try {
            const data = await loginWithGoogle(googleToken);
            localStorage.setItem('admin_token', data.token);
            localStorage.setItem('admin_user', JSON.stringify(data.user));
            setUser(data.user);
            toast.success('Xush kelibsiz!');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Kirishda xatolik yuz berdi');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setUser(null);
        toast.success('Tizimdan chiqildi');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
