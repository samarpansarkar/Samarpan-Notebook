import { useState } from 'react';
import { Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import OutputConsole from '../components/OutputConsole';
import { executeCode } from '../utils/executor';

const CompilerPage = () => {
    const [code, setCode] = useState('// Dev by Samarpan\n// Write your JavaScript code here\nconsole.log("Hello, World!");\n');
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
        setCode('// Dev by Samarpan\n// Write your JavaScript code here\nconsole.log("Hello, World!");\n');
        setLogs([]);
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-4 p-2 md:p-4">
            {/* Header Card */}
            <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border-2 shadow-lg relative overflow-hidden"
                style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl"></div>

                <div className="flex items-center gap-3 relative z-10 bounce-in">
                    <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg hover-wiggle heartbeat">
                        <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1
                                className="text-2xl font-bold leading-none"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                JS Playground
                            </h1>
                            <span className="text-2xl">🎮</span>
                        </div>
                        <p
                            className="text-sm mt-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            Experiment, Learn, and Build
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0 relative z-10 fade-in" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={handleResetCode}
                        className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all hover:scale-105 hover-bounce rubber-band"
                        style={{
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-secondary)'
                        }}
                    >
                        <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                        <span>Reset</span>
                    </button>

                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className={`
                            relative overflow-hidden flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white 
                            bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 
                            rounded-xl shadow-lg hover:shadow-xl
                            transform hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed
                            magnetic-button ripple hover-glow-border tada
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
                                <Sparkles className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor & Console Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 min-h-0">
                {/* Code Editor */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative h-full">
                        <CodeEditor code={code} onChange={setCode} />
                    </div>
                </div>

                {/* Output Console */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative h-full">
                        <OutputConsole logs={logs} onClear={handleClearConsole} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerPage;
