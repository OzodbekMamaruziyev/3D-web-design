import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
    LayoutDashboard,
    Image,
    MessageSquare,
    Settings,
    LogOut,
    Home,
    MonitorPlay
} from 'lucide-react';
import clsx from 'clsx';

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/hero', icon: Home, label: 'Bosh sahifa' },
        { path: '/admin/highlights', icon: Image, label: 'Galereya' },
        { path: '/admin/services', icon: MonitorPlay, label: 'Xizmatlar' },
        { path: '/admin/pricing', icon: Settings, label: 'Narxlar' }, // Using Settings icon as placeholder or maybe a DollarSign
        { path: '/admin/contact', icon: MessageSquare, label: 'Aloqa' },
    ];

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full bg-[#050505] z-50">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                location.pathname === item.path
                                    ? "bg-primary text-black font-semibold shadow-[0_0_15px_rgba(0,246,255,0.4)]"
                                    : "text-dimWhite hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => {
                            logout();
                            navigate('/admin/login');
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-dimWhite hover:bg-white/5 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Chiqish</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
