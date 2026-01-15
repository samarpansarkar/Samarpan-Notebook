import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import OutputConsole from '../components/OutputConsole';
import { executeCode } from '../utils/executor';

const CompilerPage = () => {
    const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");\n');
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const handleRunCode = async () => {
        setIsRunning(true);
        setLogs([]);

        try {
            const newLogs = await executeCode(code);
            setLogs(newLogs);
        } catch (error) {
            setLogs([{ type: 'error', content: `Execution failed: ${error.message}` }]);
        } finally {
            setIsRunning(false);
        }
    };

    const handleClearConsole = () => {
        setLogs([]);
    };

    const handleResetCode = () => {
        if (confirm('Are you sure you want to reset the code?')) {
            setCode('// Write your JavaScript code here\nconsole.log("Hello, World!");\n');
            setLogs([]);
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-4 p-2 md:p-4">
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <span className="text-xl">⚡</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">JS Playground</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Live Execution Environment</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleResetCode}
                        className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-750 rounded-lg transition-all"
                    >
                        <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                        <span>Reset</span>
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className={`
                            relative overflow-hidden flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white 
                            bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 
                            rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 
                            transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed
                        `}
                    >
                        {isRunning ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                                <span>Running...</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 fill-current" />
                                <span>Run Code</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 min-h-0">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-20 blur group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative h-full">
                        <CodeEditor code={code} onChange={setCode} />
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-20 blur group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative h-full">
                        <OutputConsole logs={logs} onClear={handleClearConsole} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerPage;
