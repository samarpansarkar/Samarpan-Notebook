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
        // Don't clear logs automatically to allow accumulation, or clear?
        // Let's clear for fresh run feeling usually expected in online compilers
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
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">JS Playground</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleResetCode}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    >
                        <Play className="w-4 h-4 fill-current" />
                        {isRunning ? 'Running...' : 'Run Code'}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
                <CodeEditor code={code} onChange={setCode} />
                <OutputConsole logs={logs} onClear={handleClearConsole} />
            </div>
        </div>
    );
};

export default CompilerPage;
