import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookmarkCheck, GripVertical, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Sidebar = ({ isOpen, closeSidebar, toggleSidebar, sections = [], title, basePath }) => {
    const location = useLocation();
    const [sidebarWidth, setSidebarWidth] = useState(256); // Default 256px (w-64)
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

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

    // Keyboard shortcut: Ctrl+B to toggle sidebar
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // Handle resize
    const startResizing = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const newWidth = e.clientX;
            // Constrain width between 200px and 500px
            if (newWidth >= 200 && newWidth <= 500) {
                setSidebarWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            <aside
                ref={sidebarRef}
                className={`fixed top-16 bottom-0 left-0 z-20 border-r transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{
                    width: `${sidebarWidth}px`,
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    {title && (
                        <div
                            className="p-4 border-b flex items-center justify-between bounce-in"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                borderColor: 'var(--color-border)'
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 pulse-glow">
                                    <BookmarkCheck className="w-4 h-4 text-white" />
                                </div>
                                <h2
                                    className="font-bold uppercase text-xs tracking-wider"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {title}
                                </h2>
                            </div>

                            {/* Toggle button for desktop */}
                            <button
                                onClick={toggleSidebar}
                                className="hidden md:block p-1 rounded-lg hover:bg-opacity-50 transition-all hover-bounce"
                                style={{
                                    backgroundColor: 'var(--color-bg-tertiary)',
                                    color: 'var(--color-text-secondary)'
                                }}
                                title="Toggle Sidebar (Ctrl+B)"
                            >
                                {isOpen ? <ChevronsLeft className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
                            </button>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-4 bg-notebook stagger-children">
                        {sections.length > 0 ? (
                            sections.map((category) => (
                                <div key={category.id} className="scale-in">
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full flex items-center justify-between gap-2 mb-2 px-2 text-xs font-semibold uppercase tracking-wider transition-all group hover-wiggle"
                                    >
                                        <div className="flex items-center gap-2">
                                            {category.icon && (
                                                <div className={`p-1.5 rounded-lg ${category.color ? `bg-gradient-to-br ${category.color}` : 'bg-gradient-to-br from-amber-400 to-orange-500'} shadow-sm`}>
                                                    <category.icon className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                            <span
                                                className="font-bold"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                {category.title}
                                            </span>
                                        </div>
                                        {openCategories[category.id] ? (
                                            <ChevronDown className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
                                        ) : (
                                            <ChevronRight className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
                                        )}
                                    </button>

                                    {openCategories[category.id] && (
                                        <div className="space-y-1 ml-2 pl-3 border-l-2" style={{ borderColor: 'var(--color-border-light)' }}>
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
                                                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all hover-bounce hover-glow-border ${isActive
                                                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 font-semibold shadow-sm'
                                                            : 'hover:bg-opacity-50'
                                                            }`}
                                                        style={{
                                                            color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {Icon && (
                                                                <Icon
                                                                    className={`w-4 h-4 ${isActive ? 'scale-110' : ''} transition-transform`}
                                                                    style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}
                                                                />
                                                            )}
                                                            <span>{section.title}</span>
                                                        </div>
                                                        {isActive && (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 heartbeat"></div>
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div
                                className="text-sm italic p-4 text-center rounded-xl"
                                style={{
                                    color: 'var(--color-text-tertiary)',
                                    backgroundColor: 'var(--color-bg-secondary)'
                                }}
                            >
                                Select a subject to view concepts.
                            </div>
                        )}
                    </nav>

                    {/* Footer */}
                    <div
                        className="p-4 border-t text-xs text-center"
                        style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-muted)'
                        }}
                    >
                        <div className="mb-1">📚 Learning Path</div>
                        <div className="text-[10px] opacity-60">Press Ctrl+B to toggle</div>
                    </div>
                </div>

                {/* Resize Handle */}
                <div
                    className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize group hover:bg-gradient-to-b hover:from-amber-400 hover:to-orange-500 transition-all"
                    onMouseDown={startResizing}
                    style={{
                        backgroundColor: isResizing ? 'var(--color-primary)' : 'transparent'
                    }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical
                            className="w-4 h-4"
                            style={{ color: 'var(--color-primary)' }}
                        />
                    </div>
                </div>
            </aside>

            {/* Sidebar closed state - show toggle button */}
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-20 left-4 z-30 p-2 rounded-xl shadow-lg transition-all hover:scale-110 magnetic-button hidden md:block"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-primary)'
                    }}
                    title="Open Sidebar (Ctrl+B)"
                >
                    <ChevronsRight className="w-5 h-5" />
                </button>
            )}
        </>
    );
};

export default Sidebar;
