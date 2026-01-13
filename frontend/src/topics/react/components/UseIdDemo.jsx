import { useId } from 'react';

const AccessibleInput = ({ label }) => {
    const id = useId();
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} (ID: <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded text-indigo-600 dark:text-indigo-400">{id}</code>)
            </label>
            <input
                id={id}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="Click label to focus me"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500">
                This input is correctly linked to the label via <code>{id}</code>.
            </p>
        </div>
    );
};

const UseIdDemo = () => {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6 transition-colors">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    <code>useId</code> generates unique IDs that are stable across server and client renders, preventing hydration mismatches.
                </p>

                <AccessibleInput label="First Name" />
                <AccessibleInput label="Last Name" />

                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 text-sm rounded">
                    Notice how each component instance gets a unique suffix properly namespaced.
                </div>
            </div>
        </div>
    );
};

export default UseIdDemo;
