import { useState, useEffect, useRef } from 'react';

// Custom Hook: useDebounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const DebounceDemo = () => {
    const [text, setText] = useState('');
    const [apiCalls, setApiCalls] = useState(0);
    const debouncedText = useDebounce(text, 500);

    // Track previous debounced value to avoid initial increment on mount
    const prevDebouncedText = useRef(debouncedText);

    // Effect for "API Call"
    useEffect(() => {
        if (debouncedText !== prevDebouncedText.current) {
            setApiCalls(c => c + 1);
            prevDebouncedText.current = debouncedText;
        }
    }, [debouncedText]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block font-medium text-gray-700 dark:text-gray-300">Search Product</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing..."
                    className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded transition-colors">
                    <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">Without Debounce</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">State Updates (Renders):</p>
                    <div className="text-2xl font-mono text-red-600 dark:text-red-500">{text.length}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Updates on every keystroke</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded transition-colors">
                    <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">With Debounce (500ms)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">"API Calls" Triggered:</p>
                    <div className="text-2xl font-mono text-green-600 dark:text-green-500">{apiCalls}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Updates only when typing stops</p>
                </div>
            </div>

            <div className="bg-gray-800 dark:bg-gray-950 text-gray-200 p-4 rounded font-mono text-sm border dark:border-gray-800">
                <div>Current Value: "{text}"</div>
                <div>Debounced Value: "<span className="text-green-400">{debouncedText}</span>"</div>
            </div>
        </div>
    );
};

export default DebounceDemo;
