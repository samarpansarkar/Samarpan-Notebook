
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const UserContext = createContext();

// 3. Consumer Component (Deeply nested)
const UserProfile = () => {
    // 4. Consume the context value
    const user = useContext(UserContext);

    return (
        <div className="p-4 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 rounded shadow-sm transition-colors">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">User Profile Component</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>Start Date: 2024</p>
                {/* This data came all the way from Dashboard without props! */}
                <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-2">Active User: {user.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Status: {user.status}</p>
            </div>
        </div>
    );
};

// Intermediate Component (Doesn't need to know about 'user')
const Sidebar = () => {
    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded h-full transition-colors">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Sidebar</h3>
            <ul className="mb-6 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>Home</li>
                <li>Settings</li>
            </ul>
            {/* UserProfile sits inside here */}
            <UserProfile />
        </div>
    );
};

// 2. Provider Component (Top Level)
const UseContextDemo = () => {
    const [user, setUser] = useState({ name: 'Guest User', status: 'Offline' });

    const login = () => setUser({ name: 'Jane Doe', status: 'Active' });
    const logout = () => setUser({ name: 'Guest User', status: 'Offline' });

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Context API Example</h3>
                    <button
                        onClick={user.status === 'Active' ? logout : login}
                        className={`px-4 py-2 rounded text-white text-sm transition-colors ${user.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            }`}
                    >
                        {user.status === 'Active' ? 'Logout' : 'Login'}
                    </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Data flows directly from <strong>Dashboard</strong> to <strong>UserProfile</strong>, skipping the Sidebar.
                </p>

                {/* Provide the value to the tree */}
                <UserContext.Provider value={user}>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-2">Dashboard (Provider)</p>
                        <Sidebar />
                    </div>
                </UserContext.Provider>
            </div>
        </div>
    );
};

export default UseContextDemo;
