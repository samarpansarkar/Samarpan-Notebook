import { useMemo, useState } from "react";

export default function VirtualizationDemo() {
    const [items] = useState(Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`));
    const [page, setPage] = useState(0);
    const itemsPerPage = 20;

    const visibleItems = useMemo(() => {
        const start = page * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }, [items, page, itemsPerPage]);

    return (
        <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {page * itemsPerPage + 1}-{Math.min((page + 1) * itemsPerPage, items.length)} of {items.length}
            </p>
            <div className="h-48 overflow-auto border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 transition-colors">
                {visibleItems.map((item, idx) => (
                    <div key={page * itemsPerPage + idx} className="p-2 border-b dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100">
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-3 py-1 bg-indigo-500 text-white rounded text-sm disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(p => Math.min(Math.floor(items.length / itemsPerPage) - 1, p + 1))}
                    disabled={(page + 1) * itemsPerPage >= items.length}
                    className="px-3 py-1 bg-indigo-500 text-white rounded text-sm disabled:opacity-50 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}