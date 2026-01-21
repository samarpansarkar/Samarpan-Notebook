import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';
import { ToastProvider } from '@/contexts/ToastContext';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}