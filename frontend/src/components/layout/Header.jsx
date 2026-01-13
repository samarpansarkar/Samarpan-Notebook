import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Code, FileCode, Layers, Zap, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { path: '/react', label: 'React', icon: Zap, color: 'text-blue-500' },
        { path: '/js', label: 'JavaScript', icon: Code, color: 'text-yellow-500' },
        { path: '/html-css', label: 'HTML & CSS', icon: Layers, color: 'text-orange-500' },
        { path: '/ts', label: 'TypeScript', icon: FileCode, color: 'text-blue-600' },
    ];

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link to="/" className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xl">
                            <BookOpen className="w-8 h-8" />
                            <span>Samarpan's Notes</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <nav className="flex space-x-4 items-center">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                                    ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                Home
                            </Link>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.startsWith(item.path)
                                        ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${item.color}`} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-indigo-600" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button & Theme Toggle for Mobile */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-indigo-600" />
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="pt-2 pb-3 space-y-1 px-2">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/'
                                ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            Home
                        </Link>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${location.pathname.startsWith(item.path)
                                    ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
