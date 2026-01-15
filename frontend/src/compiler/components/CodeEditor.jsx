import Editor from '@monaco-editor/react';
import { useTheme } from '@/context/ThemeContext';

const CodeEditor = ({ code, onChange }) => {
    const { theme } = useTheme();

    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className="h-full w-full border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    );
};

export default CodeEditor;
