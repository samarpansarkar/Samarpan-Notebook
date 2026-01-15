import { Outlet, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { selectTopicsBySubject } from '@/store/slices/topicSlice';
import { selectAllSubjects } from '@/store/slices/subjectSlice';

const MainLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
    const subjects = useSelector(selectAllSubjects);
    // Note: getTopicsBySubject was a function in Context. In Redux, we use a selector.
    // However, the selector needs the state AND the subjectKey.
    // We will use useSelector with the state inside the useMemo or pass the state to the selector function.
    const fullState = useSelector(state => state); // Get full state to pass to parameterized selector


    const currentSubject = useMemo(() => {
        const path = location.pathname;
        const matchingSubject = subjects.find(sub => path.startsWith(sub.path));

        if (matchingSubject) {
            return matchingSubject;
        }

        return null;
    }, [location.pathname, subjects]);

    const sidebarConfig = useMemo(() => {
        if (currentSubject) {
            const subjectKey = currentSubject.path.replace('/', '') || currentSubject.name.toLowerCase();

            return {
                title: currentSubject.title || (currentSubject.name + ' Concepts'),
                basePath: currentSubject.path,
                sections: selectTopicsBySubject(fullState, subjectKey)
            };
        }

        return {
            title: '',
            basePath: '',
            sections: []
        };
    }, [currentSubject, fullState]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1 pt-0">
                {currentSubject && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        closeSidebar={() => setSidebarOpen(false)}
                        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                        title={sidebarConfig.title}
                        basePath={sidebarConfig.basePath}
                        sections={sidebarConfig.sections}
                    />
                )}

                <main
                    className={`flex-1 p-4 md:p-8 transition-all duration-300 dark:text-gray-100`}
                    style={{
                        marginLeft: currentSubject && sidebarOpen ? '256px' : '0',
                        transition: 'margin-left 0.3s ease-in-out'
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
