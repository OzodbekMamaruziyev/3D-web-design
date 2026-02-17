import axios from 'axios';

// Base URL for the Go Backend
const API_URL = 'http://localhost:8080/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token in requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- Types ---
export interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
    role: 'admin' | 'user';
}

export interface AuthResponse {
    token: string;
    user: User;
}

// --- Auth API ---
export const loginWithGoogle = async (_googleToken: string): Promise<AuthResponse> => {
    // TODO: Replace with actual backend call
    // const response = await api.post('/auth/google', { token: googleToken });
    // return response.data;

    // MOCK RESPONSE
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'mock_token_12345',
                user: {
                    id: '1',
                    email: 'admin@murotov.uz',
                    name: 'Admin User',
                    role: 'admin'
                }
            });
        }, 1000);
    });
};

export const fetchDashboardData = async () => {
    // TODO: Connect to backend
    return {
        stats: {
            users: 150,
            projects: 12,
            visits: 4500
        },
        chartData: [
            { name: 'Jan', visits: 400, views: 240 },
            { name: 'Feb', visits: 300, views: 139 },
            { name: 'Mar', visits: 200, views: 980 },
            { name: 'Apr', visits: 278, views: 390 },
            { name: 'May', visits: 189, views: 480 },
            { name: 'Jun', visits: 239, views: 380 },
            { name: 'Jul', visits: 349, views: 430 },
        ],
        recentActivities: [
            { id: 1, user: "Admin", action: "Yangi loyiha qo'shdi", time: "2 soat oldin", type: "project" },
            { id: 2, user: "System", action: "Backup yakunlandi", time: "4 soat oldin", type: "system" },
            { id: 3, user: "Client", action: "Yangi xabar qoldirdi", time: "1 kun oldin", type: "message" },
            { id: 4, user: "Admin", action: "Narxlarni yangiladi", time: "2 kun oldin", type: "update" },
        ]
    };
};
