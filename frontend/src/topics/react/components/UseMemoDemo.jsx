import { useMemo, useState } from "react";

function UseMemoDemo() {
    const [count, setCount] = useState(0);
    const [items] = useState(Array.from({ length: 1000 }, (_, i) => i));

    const expensiveSum = useMemo(() => {
        console.log('Computing expensive sum...');
        return items.reduce((sum, item) => sum + item, 0);
    }, [items]);

    return (
        <div className="space-y-3">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded transition-colors">
                <p className="text-sm text-gray-900 dark:text-gray-200">Button Clicks: {count}</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">Sum of 1000 items: {expensiveSum}</p>
            </div>
            <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 dark:hover:bg-purple-400 transition-colors"
            >
                Increment (Check Console)
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-400">
                The sum calculation only runs once because of useMemo!
            </p>
        </div>
    );
}
export default UseMemoDemo;