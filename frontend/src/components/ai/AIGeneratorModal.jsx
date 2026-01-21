import { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Wand2 } from 'lucide-react';
import api from '@/api/client';
import { useToast } from '@/contexts/ToastContext';

const AIGeneratorModal = ({ isOpen, onClose, onGenerate, initialSubject = '' }) => {
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState(initialSubject);
    const [context, setContext] = useState('');
    const [tone, setTone] = useState('professional');
    const [length, setLength] = useState('detailed');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingStage, setLoadingStage] = useState('');
    const toast = useToast();

    if (!isOpen) return null;

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setProgress(0);

        // Simulate progress stages
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 15;
            });
        }, 500);

        // Update loading stages
        setLoadingStage('Analyzing your topic...');
        setTimeout(() => setLoadingStage('Generating content...'), 2000);
        setTimeout(() => setLoadingStage('Finalizing...'), 8000);

        try {
            const { data } = await api.post('/ai/generate', {
                topic,
                subject,
                additionalContext: context,
                tone,
                length
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (data.success) {
                onGenerate(data.data);
                toast.success('🎉 AI content generated successfully!');

                // Small delay to show 100% progress
                setTimeout(() => {
                    onClose();
                    // Reset form
                    setTopic('');
                    setContext('');
                    setProgress(0);
                    setLoadingStage('');
                }, 500);
            }
        } catch (err) {
            clearInterval(progressInterval);
            console.error("AI Generation failed", err);
            const errorMsg = err.response?.data?.message || "Failed to generate content. Please try again.";
            toast.error(errorMsg);
            setProgress(0);
            setLoadingStage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl scale-in overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 bg-linear-to-r from-gray-900 to-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Generate with AI</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleGenerate} className="p-6 space-y-5">
                    {/* Progress Indicator */}
                    {loading && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-indigo-300 font-medium">{loadingStage}</span>
                                <span className="text-gray-400">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Topic Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            What do you want to write about? <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                            placeholder="e.g., React useEffect Hook"
                            autoFocus
                            required
                        />
                    </div>

                    {/* Subject Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Subject / Context
                        </label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:border-indigo-500 transition-all outline-none"
                            placeholder="e.g., React.js"
                        />
                    </div>

                    {/* Customization Options */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Tone
                            </label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none appearance-none"
                            >
                                <option value="professional">Professional</option>
                                <option value="casual">Casual & Friendly</option>
                                <option value="academic">Academic</option>
                                <option value="simplified">Simplified (ELIT)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Content Length
                            </label>
                            <select
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none appearance-none"
                            >
                                <option value="detailed">Detailed</option>
                                <option value="brief">Brief / Concise</option>
                                <option value="comprehensive">Comprehensive Guide</option>
                            </select>
                        </div>
                    </div>

                    {/* Additional Context */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Additional Instructions (Optional)
                        </label>
                        <textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:border-indigo-500 transition-all outline-none h-24 resize-none"
                            placeholder="e.g., Focus on comprehensive examples, simplify for beginners..."
                        />
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 pt-2 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-white font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !topic.trim()}
                        className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-4 h-4" />
                                Generate Content
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIGeneratorModal;
