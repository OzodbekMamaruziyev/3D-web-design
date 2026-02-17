import { useEffect, useState } from 'react';
import { Card, PageHeader } from '../components/UI';
import { Users, Video, Eye, TrendingUp, Activity, Bell } from 'lucide-react';
import { fetchDashboardData } from '../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, title, value, change }: any) => (
    <Card className="flex items-center gap-4 hover:border-primary/50 transition-colors cursor-default group">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
            <Icon size={24} />
        </div>
        <div>
            <p className="text-dimWhite text-sm font-medium">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-white">{value}</h3>
                {change && <span className="text-green-400 text-xs font-medium flex items-center gap-0.5"><TrendingUp size={10} /> {change}</span>}
            </div>
        </div>
    </Card>
);

const ActivityItem = ({ user, action, time, type }: any) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'project' ? 'bg-blue-500/20 text-blue-500' :
            type === 'system' ? 'bg-orange-500/20 text-orange-500' :
                type === 'message' ? 'bg-green-500/20 text-green-500' :
                    'bg-purple-500/20 text-purple-500'
            }`}>
            {type === 'project' ? <Video size={18} /> :
                type === 'system' ? <Activity size={18} /> :
                    type === 'message' ? <Bell size={18} /> : <Users size={18} />}
        </div>
        <div>
            <p className="text-sm text-white"><span className="font-semibold">{user}</span> {action}</p>
            <span className="text-xs text-dimWhite">{time}</span>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, projects: 0, visits: 0 });
    const [chartData, setChartData] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const loadStats = async () => {
            const data = await fetchDashboardData();
            setStats(data.stats);
            // @ts-ignore
            setChartData(data.chartData);
            // @ts-ignore
            setActivities(data.recentActivities);
        };
        loadStats();
    }, []);

    return (
        <div>
            <PageHeader title="Dashboard" description="Sayt statistikasi va umumiy ko'rsatkichlar" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard icon={Users} title="Foydalanuvchilar" value={stats.users} change="+12.5%" />
                <StatCard icon={Video} title="Loyihalar" value={stats.projects} change="+4" />
                <StatCard icon={Eye} title="Tashriflar" value={stats.visits} change="+24.3%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2">
                    <Card className="h-full min-h-[400px]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Tashriflar Statistikasi</h3>
                            <select className="bg-black/50 border border-white/10 rounded-lg px-3 py-1 text-sm text-dimWhite outline-none">
                                <option>So'nggi 7 kun</option>
                                <option>So'nggi oy</option>
                            </select>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00f6ff" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00f6ff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="visits" stroke="#00f6ff" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Recent Activity Section */}
                <Card className="flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6">So'ngi faoliyatlar</h3>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {activities.map((item: any) => (
                            <ActivityItem key={item.id} {...item} />
                        ))}
                    </div>
                    <button className="w-full mt-4 text-center text-primary text-sm font-medium hover:underline">
                        Barchasini ko'rish
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
