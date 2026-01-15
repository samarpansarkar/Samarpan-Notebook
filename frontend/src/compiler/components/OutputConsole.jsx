import { Terminal, Trash2 } from 'lucide-react';

const OutputConsole = ({ logs, onClear }) => {
    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    <Terminal className="w-4 h-4" />
                    <span>Console Output</span>
                </div>
                <button
                    onClick={onClear}
                    className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                    title="Clear Console"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-gray-900 text-gray-100">
                {logs.length === 0 ? (
                    <div className="text-gray-500 italic">No output yet... Run your code to see results.</div>
                ) : (
                    <div className="space-y-1">
                        {logs.map((log, index) => (
                            <div
                                key={index}
                                className={`
                                    ${log.type === 'error' ? 'text-red-400' : ''}
                                    ${log.type === 'warn' ? 'text-yellow-400' : ''}
                                    ${log.type === 'log' ? 'text-green-400' : ''}
                                    whitespace-pre-wrap
                                `}
                            >
                                <span className="opacity-50 mr-2 select-none">›</span>
                                {log.content}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutputConsole;
