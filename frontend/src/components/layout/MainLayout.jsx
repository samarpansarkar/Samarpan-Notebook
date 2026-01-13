import { Outlet, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import STUDY_SECTIONS from '@/topics/react/modules/index'; // Currently only React sections available

const MainLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Determine current subject context
    const currentSubject = useMemo(() => {
        const path = location.pathname;
        if (path.startsWith('/react')) return 'react';
        if (path.startsWith('/js')) return 'js';
        if (path.startsWith('/html-css')) return 'html-css';
        if (path.startsWith('/ts')) return 'ts';
        return 'home';
    }, [location.pathname]);

    // Get sections for the sidebar based on subject
    const sidebarConfig = useMemo(() => {
        if (currentSubject === 'react') {
            return {
                title: 'React Concepts',
                basePath: '/react',
                sections: STUDY_SECTIONS
            };
        }
        // Placeholders for other subjects
        if (currentSubject === 'js') {
            return {
                title: 'JavaScript Core',
                basePath: '/js',
                sections: [] // Add JS sections when available
            };
        }
        return {
            title: '',
            basePath: '',
            sections: []
        };
    }, [currentSubject]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            {/* Top Header - Always visible */}
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1 pt-0">
                {/* Fixed Sidebar - Visible on Desktop, Toggle on Mobile */}
                {/* Only show sidebar if there are sections to show or we are in a subject route */}
                {currentSubject !== 'home' && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        closeSidebar={() => setSidebarOpen(false)}
                        title={sidebarConfig.title}
                        basePath={sidebarConfig.basePath}
                        sections={sidebarConfig.sections}
                    />
                )}

                {/* Main Content Area */}
                <main
                    className={`flex-1 p-4 md:p-8 transition-all duration-200 dark:text-gray-100 ${currentSubject !== 'home' ? 'md:ml-64' : ''
                        }`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
