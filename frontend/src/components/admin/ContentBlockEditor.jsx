import { useState } from 'react';
import { Trash2, GripVertical, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';

const ContentBlockEditor = ({ block, onChange, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
    const updateBlock = (field, value) => {
        onChange({ ...block, [field]: value });
    };

    const updateListItem = (index, value) => {
        const newItems = [...(block.items || [])];
        newItems[index] = value;
        updateBlock('items', newItems);
    };

    const addListItem = () => {
        updateBlock('items', [...(block.items || []), '']);
    };

    const removeListItem = (index) => {
        const newItems = (block.items || []).filter((_, i) => i !== index);
        updateBlock('items', newItems);
    };

    const renderBlockEditor = () => {
        switch (block.type) {
            case 'heading':
                return (
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <label className="text-sm text-gray-400 w-20">Level:</label>
                            <select
                                value={block.level || 2}
                                onChange={(e) => updateBlock('level', parseInt(e.target.value))}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                            >
                                {[1, 2, 3, 4, 5, 6].map(level => (
                                    <option key={level} value={level}>H{level}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="text"
                            value={block.content || ''}
                            onChange={(e) => updateBlock('content', e.target.value)}
                            placeholder="Heading text..."
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        />
                    </div>
                );

            case 'paragraph':
                return (
                    <textarea
                        value={block.content || ''}
                        onChange={(e) => updateBlock('content', e.target.value)}
                        placeholder="Paragraph content..."
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-32 font-mono text-sm"
                    />
                );

            case 'code':
                return (
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <label className="text-sm text-gray-400 w-20">Language:</label>
                            <select
                                value={block.language || 'javascript'}
                                onChange={(e) => updateBlock('language', e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="json">JSON</option>
                                <option value="bash">Bash</option>
                                <option value="sql">SQL</option>
                            </select>
                        </div>
                        <textarea
                            value={block.content || ''}
                            onChange={(e) => updateBlock('content', e.target.value)}
                            placeholder="Code content..."
                            className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-green-400 font-mono text-sm h-48"
                        />
                    </div>
                );

            case 'list':
                return (
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-semibold">List Items:</label>
                        {(block.items || ['']).map((item, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateListItem(index, e.target.value)}
                                    placeholder={`Item ${index + 1}...`}
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeListItem(index)}
                                    className="text-red-400 hover:text-red-300 p-2"
                                    title="Remove item"
                                >
                                    <Minus size={16} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addListItem}
                            className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1"
                        >
                            <Plus size={14} /> Add List Item
                        </button>
                    </div>
                );

            case 'alert':
                return (
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <label className="text-sm text-gray-400 w-20">Type:</label>
                            <select
                                value={block.alertType || 'info'}
                                onChange={(e) => updateBlock('alertType', e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                            >
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="success">Success</option>
                                <option value="error">Error</option>
                            </select>
                        </div>
                        <textarea
                            value={block.content || ''}
                            onChange={(e) => updateBlock('content', e.target.value)}
                            placeholder="Alert message..."
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-20"
                        />
                    </div>
                );

            case 'divider':
                return (
                    <div className="text-center text-gray-500 py-4">
                        <hr className="border-gray-600" />
                        <p className="text-xs mt-2">Horizontal divider (no content needed)</p>
                    </div>
                );

            default:
                return null;
        }
    };

    const blockTypeLabels = {
        heading: 'Heading',
        paragraph: 'Paragraph',
        code: 'Code Block',
        list: 'List',
        alert: 'Alert',
        divider: 'Divider'
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            {/* Header with controls */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <GripVertical size={18} className="text-gray-500 cursor-move" />
                    <span className="text-sm font-semibold text-indigo-400">
                        {blockTypeLabels[block.type]}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                    >
                        <ChevronUp size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                    >
                        <ChevronDown size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="p-1 text-red-400 hover:text-red-300 ml-2"
                        title="Delete block"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Block content editor */}
            {renderBlockEditor()}
        </div>
    );
};

export default ContentBlockEditor;
