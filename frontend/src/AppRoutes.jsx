import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useSubjects } from '@/context/SubjectContext';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SubjectPage = lazy(() => import('@/pages/SubjectPage'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const TheoryPracticalForm = lazy(() => import('@/pages/admin/TheoryPracticalForm'));
const AdminTopicForm = lazy(() => import('@/pages/admin/AdminTopicForm'));
const AdminTopics = lazy(() => import('@/pages/admin/AdminTopics'));
const AdminSubjects = lazy(() => import('@/pages/admin/AdminSubjects'));
const AdminTheories = lazy(() => import('@/pages/admin/AdminTheories'));
const SubjectForm = lazy(() => import('@/pages/admin/SubjectForm'));
const CompilerPage = lazy(() => import('@/compiler/pages/CompilerPage'));

const PageLoader = () => (
    <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
);

const AppRoutes = () => {
    const { subjects } = useSubjects();

    return (
        <Routes>
            <Route path="/admin/login" element={
                <Suspense fallback={<PageLoader />}>
                    <AdminLogin />
                </Suspense>
            } />

            <Route path="/admin" element={
                <Suspense fallback={<PageLoader />}>
                    <AdminLayout />
                </Suspense>
            }>
                <Route path="dashboard" element={
                    <Suspense fallback={<PageLoader />}>
                        <AdminDashboard />
                    </Suspense>
                } />
                <Route path="subjects" element={
                    <Suspense fallback={<PageLoader />}>
                        <AdminSubjects />
                    </Suspense>
                } />
                <Route path="subjects/new" element={
                    <Suspense fallback={<PageLoader />}>
                        <SubjectForm />
                    </Suspense>
                } />
                <Route path="subjects/edit/:id" element={
                    <Suspense fallback={<PageLoader />}>
                        <SubjectForm />
                    </Suspense>
                } />
                <Route path="topics" element={
                    <Suspense fallback={<PageLoader />}>
                        <AdminTopics />
                    </Suspense>
                } />
                <Route path="content" element={
                    <Suspense fallback={<PageLoader />}>
                        <AdminTheories />
                    </Suspense>
                } />
                <Route path="topics/new" element={
                    <Suspense fallback={<PageLoader />}>
                        <AdminTopicForm />
                    </Suspense>
                } />
                <Route path="topics/edit/:id" element={
                    <Suspense fallback={<PageLoader />}>
                        <AdminTopicForm />
                    </Suspense>
                } />
                <Route path="topic/new" element={
                    <Suspense fallback={<PageLoader />}>
                        <TheoryPracticalForm />
                    </Suspense>
                } />
                <Route path="topic/edit/:id" element={
                    <Suspense fallback={<PageLoader />}>
                        <TheoryPracticalForm />
                    </Suspense>
                } />
            </Route>

            <Route path="/" element={<MainLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <HomePage />
                        </Suspense>
                    }
                />

                <Route
                    path="compiler"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <CompilerPage />
                        </Suspense>
                    }
                />

                {/* Dynamic Subject Routes */}
                {subjects.map(subject => (
                    <Route
                        key={subject.path}
                        path={subject.path.substring(1)} // remove leading slash for relative path
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <SubjectPage subject={subject} />
                            </Suspense>
                        }
                    />
                ))}
                {subjects.map(subject => (
                    <Route
                        key={`${subject.path}-topic`}
                        path={`${subject.path.substring(1)}/:topicId`}
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <SubjectPage subject={subject} />
                            </Suspense>
                        }
                    />
                ))}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
