import { AlertCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ContentBlockRenderer = ({ blocks }) => {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    const renderBlock = (block, index) => {
        switch (block.type) {
            case 'heading':
                const HeadingTag = `h${block.level || 2}`;
                const headingClasses = {
                    1: 'text-4xl font-bold text-white mt-8 mb-4',
                    2: 'text-3xl font-bold text-white mt-6 mb-3',
                    3: 'text-2xl font-semibold text-white mt-5 mb-3',
                    4: 'text-xl font-semibold text-gray-100 mt-4 mb-2',
                    5: 'text-lg font-semibold text-gray-200 mt-3 mb-2',
                    6: 'text-base font-semibold text-gray-300 mt-2 mb-1'
                };
                return (
                    <HeadingTag key={index} className={headingClasses[block.level || 2]}>
                        {block.content}
                    </HeadingTag>
                );

            case 'paragraph':
                return (
                    <p key={index} className="text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
                        {block.content}
                    </p>
                );

            case 'code':
                return (
                    <div key={index} className="my-4">
                        <SyntaxHighlighter
                            language={block.language || 'javascript'}
                            style={vscDarkPlus}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                fontSize: '0.875rem'
                            }}
                        >
                            {block.content || ''}
                        </SyntaxHighlighter>
                    </div>
                );

            case 'list':
                return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                        {(block.items || []).map((item, i) => (
                            <li key={i} className="ml-4">{item}</li>
                        ))}
                    </ul>
                );

            case 'alert':
                const alertStyles = {
                    info: {
                        bg: 'bg-blue-900/30',
                        border: 'border-blue-500/50',
                        text: 'text-blue-200',
                        icon: <AlertCircle size={20} className="text-blue-400" />
                    },
                    warning: {
                        bg: 'bg-yellow-900/30',
                        border: 'border-yellow-500/50',
                        text: 'text-yellow-200',
                        icon: <AlertTriangle size={20} className="text-yellow-400" />
                    },
                    success: {
                        bg: 'bg-green-900/30',
                        border: 'border-green-500/50',
                        text: 'text-green-200',
                        icon: <CheckCircle size={20} className="text-green-400" />
                    },
                    error: {
                        bg: 'bg-red-900/30',
                        border: 'border-red-500/50',
                        text: 'text-red-200',
                        icon: <XCircle size={20} className="text-red-400" />
                    }
                };
                const alertStyle = alertStyles[block.alertType || 'info'];
                return (
                    <div
                        key={index}
                        className={`${alertStyle.bg} ${alertStyle.border} ${alertStyle.text} border rounded-lg p-4 mb-4 flex items-start gap-3`}
                    >
                        {alertStyle.icon}
                        <p className="flex-1">{block.content}</p>
                    </div>
                );

            case 'divider':
                return (
                    <hr key={index} className="border-gray-700 my-6" />
                );

            default:
                return null;
        }
    };

    // Sort blocks by order if available
    const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <div className="content-blocks">
            {sortedBlocks.map((block, index) => renderBlock(block, index))}
        </div>
    );
};

export default ContentBlockRenderer;
