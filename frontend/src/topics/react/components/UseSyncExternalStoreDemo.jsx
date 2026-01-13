
import { useSyncExternalStore } from 'react';

// 1. Define the external store (browser network state)
function subscribe(callback) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

function getSnapshot() {
    return navigator.onLine;
}

function getServerSnapshot() {
    return true; // Always online on server
}

const UseSyncExternalStoreDemo = () => {
    const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Network Status Tracker</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                    This component subscribes to the global <code>navigator.onLine</code> status using <code>useSyncExternalStore</code>.
                    <br />
                    Turn off your WiFi/Network to see it update immediately!
                </p>

                <div className={`text-center p-8 rounded-xl border-2 transition-all duration-300 ${isOnline
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                    }`}>
                    <div className="text-5xl mb-2">{isOnline ? '🌐' : '📵'}</div>
                    <div className="text-2xl font-bold">
                        You are {isOnline ? 'Online' : 'Offline'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UseSyncExternalStoreDemo;
