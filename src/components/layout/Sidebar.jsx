import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar, sections = [], title, basePath }) => {
    const location = useLocation();

    // Group sections by category if needed, or just list them
    // Keeping it simple similar to TopicLayout list but in sidebar form

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
                className={`fixed top-16 bottom-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header/Title of the Sidebar (e.g. "React Concepts") */}
                    {title && (
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <h2 className="font-bold text-gray-800 uppercase text-xs tracking-wider">
                                {title}
                            </h2>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {sections.length > 0 ? (
                            sections.map((section) => {
                                const Icon = section.icon;
                                const isActive = location.pathname === `${basePath}/${section.id}`;

                                return (
                                    <Link
                                        key={section.id}
                                        to={`${basePath}/${section.id}`}
                                        onClick={() => {
                                            // Optional: Close sidebar on mobile when link clicked
                                            if (window.innerWidth < 768) closeSidebar();
                                        }}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${isActive
                                                ? 'bg-indigo-50 text-indigo-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />}
                                            <span>{section.title}</span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4" />}
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="text-sm text-gray-500 italic p-2">
                                Select a subject to view concepts.
                            </div>
                        )}
                    </nav>

                    <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                        Concepts Navigation
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
