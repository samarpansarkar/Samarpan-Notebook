import { useRef, useState, useCallback, memo } from "react";

const MemoizedChild = memo(({ count, onIncrement }) => {
    const renders = useRef(0);
    renders.current++;

    return (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded transition-colors">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Child Renders: {renders.current}</p>
            <p className="text-sm mb-2 text-gray-800 dark:text-gray-300">Child Prop Count: {count}</p>
            <button
                onClick={onIncrement}
                className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-xs hover:bg-green-300 dark:hover:bg-green-700 transition-colors"
            >
                Increment from Child
            </button>
        </div>
    );
});

export default function UseCallbackDemo() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [useCb, setUseCb] = useState(true);

    const parentRenderCount = useRef(0);
    parentRenderCount.current++;

    const memoizedIncrement = useCallback(() => setCount1(c => c + 1), []);
    const nonMemoizedIncrement = () => setCount1(c => c + 1);

    const incrementCount1 = useCb ? memoizedIncrement : nonMemoizedIncrement;

    return (
        <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded transition-colors">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Parent Renders: {parentRenderCount.current}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300">Parent State: {count2}</p>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setCount2(c => c + 1)}
                    className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                    Update Parent State
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setUseCb(prev => !prev)}
                        className={`px-3 py-2 rounded text-sm border transition-colors ${useCb ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                            }`}
                    >
                        useCallback: {useCb ? 'ON' : 'OFF'}
                    </button>
                </div>
            </div>

            <MemoizedChild count={count1} onIncrement={incrementCount1} />

            <p className="text-xs text-gray-500 italic block mt-2">
                Note: When useCallback is OFF, clicking "Update Parent State" will also cause "Child Renders" to increment because the <code>onIncrement</code> function Reference changes.
            </p>
        </div>
    );
}