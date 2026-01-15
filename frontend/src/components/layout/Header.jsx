import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, Sun, Moon, Terminal, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/slices/themeSlice';
import { selectAllSubjects } from '@/store/slices/subjectSlice';
import Search from './Search';

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const subjects = useSelector(selectAllSubjects);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const navItems = subjects.map(sub => ({
        path: sub.path,
        label: sub.name,
        icon: sub.iconComponent || BookOpen
    }));

    return (
        <header
            className="sticky top-0 z-30 backdrop-blur-md border-b transition-all duration-200"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left: Logo & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 rounded-lg transition-all hover:scale-110"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <span className="hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                                Samarpan's Notes
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        <nav className="flex items-center gap-1">
                            <Link
                                to="/"
                                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${location.pathname === '/'
                                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
                                        : 'hover:bg-opacity-50'
                                    }`}
                                style={{
                                    color: location.pathname === '/' ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'
                                }}
                            >
                                Home
                                {location.pathname === '/' && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                                )}
                            </Link>

                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname.startsWith(item.path);

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 group ${isActive
                                                ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
                                                : 'hover:bg-opacity-50'
                                            }`}
                                        style={{
                                            color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'
                                        }}
                                    >
                                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span className="underline-wavy">{item.label}</span>
                                        {isActive && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                                        )}
                                    </Link>
                                );
                            })}

                            <Link
                                to="/compiler"
                                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${location.pathname === '/compiler'
                                        ? 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30'
                                        : 'hover:bg-opacity-50'
                                    }`}
                                style={{
                                    color: location.pathname === '/compiler' ? 'var(--color-secondary-dark)' : 'var(--color-text-secondary)'
                                }}
                            >
                                <Terminal className="w-4 h-4" />
                                <span>Playground</span>
                                {location.pathname === '/compiler' && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                                )}
                            </Link>
                        </nav>
                    </div>

                    {/* Right: Search & Theme Toggle */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block w-64">
                            <Search />
                        </div>

                        <button
                            onClick={handleToggleTheme}
                            className="p-2.5 rounded-xl transition-all hover:scale-110 hover:rotate-12 group"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-primary)'
                            }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                            ) : (
                                <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    className="md:hidden border-t"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)'
                    }}
                >
                    <div className="px-4 py-4 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === '/'
                                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
                                    : ''
                                }`}
                            style={{
                                color: location.pathname === '/' ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'
                            }}
                        >
                            Home
                        </Link>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname.startsWith(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${isActive
                                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
                                            : ''
                                        }`}
                                    style={{
                                        color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}

                        <Link
                            to="/compiler"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${location.pathname === '/compiler'
                                    ? 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30'
                                    : ''
                                }`}
                            style={{
                                color: location.pathname === '/compiler' ? 'var(--color-secondary-dark)' : 'var(--color-text-secondary)'
                            }}
                        >
                            <Terminal className="w-4 h-4" />
                            Playground
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
