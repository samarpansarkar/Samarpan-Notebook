import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />
    };

    const colors = {
        success: 'bg-green-500/20 border-green-500 text-green-200',
        error: 'bg-red-500/20 border-red-500 text-red-200',
        warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-200',
        info: 'bg-blue-500/20 border-blue-500 text-blue-200'
    };

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${colors[type]} shadow-lg backdrop-blur-sm animate-slide-in-right`}>
            <div className="shrink-0 mt-0.5">
                {icons[type]}
            </div>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
