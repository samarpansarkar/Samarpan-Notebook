import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/client';
import { BookOpen, Layers, FileText, PlusCircle, ExternalLink, Activity } from 'lucide-react';

const StatCard = ({ title, count, icon: Icon, color, to }) => (
    <Link
        to={to}
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all group"
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                    {count}
                </h3>
            </div>
            <div className={`p-3 rounded-lg bg-opacity-10 ${color}`}>
                <Icon size={24} className={color.replace('bg-opacity-10', '').trim()} />
            </div>
        </div>
    </Link>
);

const QuickLink = ({ title, icon: Icon, to, description }) => (
    <Link
        to={to}
        className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-750 transition-colors group"
    >
        <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="text-white font-medium">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    </Link>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({ subjects: 0, topics: 0, theories: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [subjectsRes, topicsRes, theoriesRes] = await Promise.all([
                    api.get('/subjects'),
                    api.get('/topics'),
                    api.get('/theory')
                ]);

                setStats({
                    subjects: subjectsRes.data.length,
                    topics: topicsRes.data.length,
                    theories: theoriesRes.data.length
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="text-white">Loading stats...</div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Activity className="text-indigo-500" />
                    Dashboard Overview
                </h2>
                <p className="text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Subjects"
                    count={stats.subjects}
                    icon={BookOpen}
                    color="text-blue-400 bg-blue-400"
                    to="/admin/subjects"
                />
                <StatCard
                    title="Active Topics"
                    count={stats.topics}
                    icon={Layers}
                    color="text-purple-400 bg-purple-400"
                    to="/admin/topics"
                />
                <StatCard
                    title="Theory Content"
                    count={stats.theories}
                    icon={FileText}
                    color="text-green-400 bg-green-400"
                    to="/admin/content"
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickLink
                        title="Add New Content"
                        description="Create a new theory or practical lesson"
                        icon={PlusCircle}
                        to="/admin/topic/new"
                    />
                    <QuickLink
                        title="Add Subject"
                        description="Create a new main subject category"
                        icon={BookOpen}
                        to="/admin/subjects/new"
                    />
                    <QuickLink
                        title="View Live Site"
                        description="Visit the public facing application"
                        icon={ExternalLink}
                        to="/"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
