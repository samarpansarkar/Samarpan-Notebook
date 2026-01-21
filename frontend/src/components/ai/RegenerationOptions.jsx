import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

const RegenerationOptions = ({ isOpen, onClose, onRegenerate }) => {
    const [selectedFields, setSelectedFields] = useState({
        title: false,
        description: false,
        richContent: false,
        keywords: false,
        liveCode: false
    });

    if (!isOpen) return null;

    const toggleField = (field) => {
        setSelectedFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleRegenerate = () => {
        const fields = Object.keys(selectedFields).filter(key => selectedFields[key]);
        if (fields.length > 0) {
            onRegenerate(fields);
            onClose();
        }
    };

    const fields = [
        { key: 'title', label: 'Title', description: 'Regenerate the title' },
        { key: 'description', label: 'Description', description: 'Regenerate the summary' },
        { key: 'richContent', label: 'Content', description: 'Regenerate main content' },
        { key: 'keywords', label: 'Keywords', description: 'Regenerate keywords' },
        { key: 'liveCode', label: 'Live Code', description: 'Regenerate demo component' }
    ];

    const selectedCount = Object.values(selectedFields).filter(Boolean).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white">Regenerate Fields</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-3">
                    <p className="text-sm text-gray-400 mb-4">
                        Select which fields you want to regenerate
                    </p>
                    {fields.map(({ key, label, description }) => (
                        <label
                            key={key}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={selectedFields[key]}
                                onChange={() => toggleField(key)}
                                className="mt-1 w-4 h-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="flex-1">
                                <div className="text-white font-medium">{label}</div>
                                <div className="text-xs text-gray-500">{description}</div>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRegenerate}
                        disabled={selectedCount === 0}
                        className="px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Regenerate {selectedCount > 0 && `(${selectedCount})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegenerationOptions;
