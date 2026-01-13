
import { useState } from 'react';

const UseStateDemo = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center transition-colors">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Counter Example</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    This component tracks a <code>count</code> value using <code>useState</code>.
                    Clicking buttons updates the state and triggers a re-render.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="text-5xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {count}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCount(c => c - 1)}
                            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                            Decrease
                        </button>
                        <button
                            onClick={() => setCount(0)}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setCount(c => c + 1)}
                            className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        >
                            Increase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UseStateDemo;
