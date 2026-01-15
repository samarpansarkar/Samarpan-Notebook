import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux';

const CodeEditor = ({ code, onChange }) => {
    const theme = useSelector((state) => state.theme.mode);

    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] border border-gray-800 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5 flex flex-col">
            {/* Fake tabs/mac bar for consistency */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        script.js
                    </span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono">JavaScript</div>
            </div>

            <div className="flex-1 py-1">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        fontLigatures: true,
                        wordWrap: 'on',
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        lineNumbers: 'on',
                        renderLineHighlight: 'all',
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        smoothScrolling: true,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
