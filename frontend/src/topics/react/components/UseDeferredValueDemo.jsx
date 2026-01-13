import { useState, useDeferredValue, useMemo } from 'react';

const UseDeferredValueDemo = () => {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const list = useMemo(() => {
        const l = [];
        for (let i = 0; i < 20000; i++) {
            l.push(`Item ${i + 1}: ${deferredQuery}`);
        }
        return l;
    }, [deferredQuery]);

    return (
        <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type often (Lag Simulation)
                </label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type here..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    The input updates immediately, but the list update is deferred until the main thread is free.
                </p>
            </div>

            <div className="h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 p-2 opacity-50 transition-all duration-200" style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
                {list.map((item, index) => (
                    <div key={index} className="p-1 text-xs text-gray-600 dark:text-gray-400">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UseDeferredValueDemo;
