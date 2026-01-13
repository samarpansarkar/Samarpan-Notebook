/* eslint-disable */
import { useState, useEffect } from 'react';

// --- The Custom Hook ---
// 1. Starts with 'use'
// 2. Uses other hooks
// 3. Encapsulates logic
function useLocalStorage(key, initialValue) {
    // Get from local storage then parse stored json or return initialValue
    const readValue = () => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    };

    return [storedValue, setValue];
}

const CustomHooksDemo = () => {
    // Usage of custom hook
    const [name, setName] = useLocalStorage('demo-username', 'Guest');
    const [theme, setTheme] = useLocalStorage('demo-theme', 'light');

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Building <code>useLocalStorage</code></h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    This input value persists even after you refresh the page! It uses a custom hook to sync state with LocalStorage.
                </p>

                <div className="space-y-4 max-w-sm">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Persisted Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded focus:ring-2 focus:ring-indigo-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Persisted Theme Preference
                        </label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full px-4 py-2 border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded focus:ring-2 focus:ring-indigo-500 transition-colors"
                        >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>

                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-600 dark:text-gray-300 break-all transition-colors">
                        LocalStorage State: <br />
                        &apos;demo-username&apos;: &quot;{name}&quot; <br />
                        &apos;demo-theme&apos;: &quot;{theme}&quot;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomHooksDemo;
