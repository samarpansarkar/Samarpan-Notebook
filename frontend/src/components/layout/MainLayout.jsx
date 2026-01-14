import { Outlet, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTopics } from '@/context/TopicContext';
import { useSubjects } from '@/context/SubjectContext';

const MainLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { getTopicsBySubject } = useTopics();
    const { subjects } = useSubjects();

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
                sections: getTopicsBySubject(subjectKey)
            };
        }

        return {
            title: '',
            basePath: '',
            sections: []
        };
    }, [currentSubject, getTopicsBySubject]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1 pt-0">
                {currentSubject && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        closeSidebar={() => setSidebarOpen(false)}
                        title={sidebarConfig.title}
                        basePath={sidebarConfig.basePath}
                        sections={sidebarConfig.sections}
                    />
                )}

                <main
                    className={`flex-1 p-4 md:p-8 transition-all duration-200 dark:text-gray-100 ${currentSubject ? 'md:ml-64' : ''
                        }`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
