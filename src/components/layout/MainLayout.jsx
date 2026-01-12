import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Code, FileCode, Layers, Zap } from 'lucide-react';

const MainLayout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/react', label: 'React Optimization', icon: Zap, color: 'text-blue-500' },
        { path: '/js', label: 'JavaScript', icon: Code, color: 'text-yellow-500' },
        { path: '/html-css', label: 'HTML & CSS', icon: Layers, color: 'text-orange-500' },
        { path: '/ts', label: 'TypeScript', icon: FileCode, color: 'text-blue-600' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">

            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
                        <BookOpen className="w-8 h-8" />
                        <span>DevAcademy</span>
                    </Link>
                </div>

                <nav className="p-4 flex-1 overflow-y-auto">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/'
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                        </li>

                        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Topics
                        </div>

                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith(item.path)
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                    v1.0.0 • Learning Hub
                </div>
            </aside>


            <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 p-4 z-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
                    <BookOpen className="w-6 h-6" />
                    <span>DevAcademy</span>
                </Link>

                <div className="text-sm text-gray-500">Menu</div>
            </div>


            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
