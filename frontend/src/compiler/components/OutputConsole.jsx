import { Terminal, Trash2, XCircle } from 'lucide-react';

const OutputConsole = ({ logs, onClear }) => {
    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] border border-gray-800 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-2 text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Console</span>
                </div>
                <button
                    onClick={onClear}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-md transition-all duration-200"
                    title="Clear"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono text-[13px] leading-relaxed custom-scrollbar bg-[#1e1e1e]">
                {logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-2">
                        <Terminal className="w-8 h-8 opacity-20" />
                        <span className="text-xs opacity-50">Ready to execute...</span>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        {logs.map((log, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-2 ${log.type === 'error' ? 'text-red-400 bg-red-900/10 -mx-4 px-4 py-1 border-l-2 border-red-500' :
                                    log.type === 'warn' ? 'text-yellow-400 bg-yellow-900/10 -mx-4 px-4 py-1 border-l-2 border-yellow-500' :
                                        'text-gray-300'
                                    }`}
                            >
                                <span className="opacity-30 select-none mt-px">›</span>
                                <span className="whitespace-pre-wrap break-all">{log.content}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutputConsole;
