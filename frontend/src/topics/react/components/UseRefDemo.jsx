/* eslint-disable */
import { useState, useRef, useEffect } from 'react';

const UseRefDemo = () => {
    const [count, setCount] = useState(0);
    const renderCount = useRef(0);
    const inputRef = useRef(null);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Render Tracking</h3>
                <p className="mb-4 text-gray-900 dark:text-gray-200">
                    State: {count} <br />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        (Clicking this causes re-render)
                    </span>
                </p>
                <button
                    onClick={() => setCount(c => c + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors mr-2"
                >
                    Increment State
                </button>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-300 transition-colors">
                    <strong>Total Renders: {renderCount.current}</strong>
                    <p className="text-xs mt-1">
                        We use <code>useRef</code> to track renders because updating a ref doesn&apos;t trigger a re-render loop!
                    </p>
                </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <h3 className="font-bold mb-4 text-gray-900 dark:text-white">DOM Access</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="I am controlled by ref"
                    className="border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 rounded mr-2 focus:ring-2 focus:ring-green-500 transition-colors"
                />
                <button
                    onClick={focusInput}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:hover:bg-green-500 transition-colors"
                >
                    Focus Input
                </button>
            </div>
        </div>
    );
};

export default UseRefDemo;
