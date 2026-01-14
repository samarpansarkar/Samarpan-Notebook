import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, BookOpen, Layers } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/admin/login');
        } else {
            setUser(JSON.parse(userInfo));
        }
    }, [navigate]);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-900 flex text-gray-100">
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-indigo-500">Admin</span> Panel
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">Logged in as {user.name}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/dashboard')
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/subjects"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/subjects')
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <BookOpen size={20} />
                        Subjects
                    </Link>

                    <Link
                        to="/admin/topics"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/topics')
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Layers size={20} />
                        Topics
                    </Link>

                    <Link
                        to="/admin/topic/new"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/topic/new')
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <PlusCircle size={20} />
                        Add Theory & Practical
                    </Link>

                    <div className="border-t border-gray-700 my-4 pt-4">
                        <Link
                            to="/"
                            target="_blank"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <BookOpen size={20} />
                            View Site
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={logoutHandler}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto bg-gray-900">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
