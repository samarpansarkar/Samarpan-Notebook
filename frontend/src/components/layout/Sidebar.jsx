import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isOpen, closeSidebar, sections = [], title, basePath }) => {
    const location = useLocation();

    // Initialize all categories as open by default
    const [openCategories, setOpenCategories] = useState(() => {
        const initialState = {};
        sections.forEach(section => {
            initialState[section.id] = true;
        });
        return initialState;
    });

    const toggleCategory = (id) => {
        setOpenCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed top-16 bottom-0 left-0 z-20 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header/Title of the Sidebar (e.g. "React Concepts") */}
                    {title && (
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                            <h2 className="font-bold text-gray-800 dark:text-gray-200 uppercase text-xs tracking-wider">
                                {title}
                            </h2>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-4">
                        {sections.length > 0 ? (
                            sections.map((category) => (
                                <div key={category.id}>
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full flex items-center justify-between gap-2 mb-2 px-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            {category.icon && <category.icon className="w-3 h-3" />}
                                            {category.title}
                                        </div>
                                        {openCategories[category.id] ? (
                                            <ChevronDown className="w-3 h-3" />
                                        ) : (
                                            <ChevronRight className="w-3 h-3" />
                                        )}
                                    </button>

                                    {openCategories[category.id] && (
                                        <div className="space-y-1">
                                            {(category.subtopics || []).map((section) => {
                                                const Icon = section.icon;
                                                const isActive = location.pathname === `${basePath}/${section.id}`;
                                                return (
                                                    <Link
                                                        key={section.id}
                                                        to={`${basePath}/${section.id}`}
                                                        onClick={() => {
                                                            if (window.innerWidth < 768) closeSidebar();
                                                        }}
                                                        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${isActive
                                                            ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium'
                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`} />}
                                                            <span>{section.title}</span>
                                                        </div>
                                                        {isActive && <ChevronRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400 italic p-2">
                                Select a subject to view concepts.
                            </div>
                        )}
                    </nav>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500 text-center">
                        Concepts Navigation
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
