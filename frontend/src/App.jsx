import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { TopicProvider } from '@/context/TopicContext';


const HomePage = lazy(() => import('@/pages/HomePage'));
const ReactPage = lazy(() => import('@/topics/react/ReactPage'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const TopicForm = lazy(() => import('@/pages/admin/TopicForm'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const TopicForm = lazy(() => import('@/pages/admin/TopicForm'));


const PlaceholderPage = ({ title }) => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-300 mb-4">{title}</h2>
    <p className="text-gray-500">Content coming soon...</p>
  </div>
);


const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <TopicProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="topic/new" element={<TopicForm />} />
            <Route path="topic/edit/:id" element={<TopicForm />} />
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
              path="react"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ReactPage />
                </Suspense>
              }
            />
            <Route
              path="react/:topicId"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ReactPage />
                </Suspense>
              }
            />


            <Route path="js" element={<PlaceholderPage title="JavaScript Core" />} />
            <Route path="html-css" element={<PlaceholderPage title="HTML & CSS" />} />
            <Route path="ts" element={<PlaceholderPage title="TypeScript" />} />


            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </TopicProvider>
    </BrowserRouter>
  );
}