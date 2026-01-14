import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as LucideIcons from 'lucide-react';

const LiveRenderer = ({ code, scope = {} }) => {
    const defaultScope = {
        React,
        ...React,
        ...LucideIcons,
        ...scope
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden my-6">
            <LiveProvider code={code} scope={defaultScope} noInline={false}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[200px]">
                        <LivePreview />
                    </div>

                    <div className="bg-gray-900 overflow-auto max-h-[400px]">
                        <div className="px-4 py-2 bg-gray-950 text-gray-400 text-xs font-mono border-b border-gray-800">
                            Live Editor
                        </div>
                        <LiveEditor
                            className="font-mono text-sm bg-gray-900!"
                            style={{ fontFamily: '"Fira Code", monospace', fontSize: 14 }}
                        />
                    </div>
                </div>
                <div className="bg-red-900/20 text-red-500 p-2 text-xs font-mono">
                    <LiveError />
                </div>
            </LiveProvider>
        </div>
    );
};

export default LiveRenderer;
