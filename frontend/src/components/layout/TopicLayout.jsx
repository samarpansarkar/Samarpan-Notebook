import { useState, useMemo, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';

const TopicLayout = ({ title, sections, basePath }) => {
    const { topicId } = useParams();
    const [viewMode, setViewMode] = useState('split');


    const activeContent = useMemo(() => {
        // Since sections are now nested (categories -> subtopics), we need to flatten them to find the topic
        const allTopics = sections.flatMap(section => section.subtopics || []);
        return allTopics.find(s => s.id === topicId);
    }, [topicId, sections]);

    return (
        <div className="max-w-7xl mx-auto">

            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    {activeContent ? 'Currently viewing:' : 'Select a topic from the sidebar to begin'}
                </p>
            </div>

            {activeContent ? (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden mb-12 border border-gray-200 dark:border-gray-800">

                    <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <activeContent.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                {activeContent.title}
                            </h2>
                            <div className="flex gap-2">
                                {['theory', 'demo', 'split'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-3 py-1 rounded text-sm font-medium capitalize ${viewMode === mode ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}

                            </div>
                        </div>
                    </div>

                    <div className={`grid ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'} divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700`}>

                        {(viewMode === 'theory' || viewMode === 'split') && (
                            <div className="p-6 space-y-6 overflow-auto max-h-[800px] bg-white dark:bg-gray-900">
                                {/* 1. Overview */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 border-b dark:border-gray-700 pb-2">📖 Overview</h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{activeContent.theory.overview}</p>
                                </div>

                                {/* 2. Definition */}
                                {activeContent.theory.definition && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 border-b dark:border-gray-700 pb-2">📚 Definition</h3>
                                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 text-indigo-900 dark:text-indigo-200 rounded-r">
                                            {activeContent.theory.definition}
                                        </div>
                                    </div>
                                )}

                                {/* 3. Syntax */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 border-b dark:border-gray-700 pb-2">💻 Syntax</h3>
                                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto font-mono custom-scrollbar border border-slate-700">
                                        <code>{activeContent.theory.syntax}</code>
                                    </pre>
                                </div>

                                {/* 4. Real-life Scenario */}
                                {activeContent.theory.realLifeScenario && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 border-b dark:border-gray-700 pb-2">🌍 Real-life Scenario</h3>
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {activeContent.theory.realLifeScenario}
                                        </div>
                                    </div>
                                )}

                                {/* 5. Pros and Cons */}
                                {(activeContent.theory.pros || activeContent.theory.cons) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {activeContent.theory.pros && (
                                            <div className="bg-green-50/50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900">
                                                <h4 className="text-green-800 dark:text-green-400 font-bold mb-2 flex items-center gap-2">
                                                    👍 Pros
                                                </h4>
                                                <ul className="space-y-1">
                                                    {activeContent.theory.pros.map((pro, idx) => (
                                                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                                                            <span className="text-green-600 dark:text-green-400">•</span>
                                                            {pro}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {activeContent.theory.cons && (
                                            <div className="bg-red-50/50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900">
                                                <h4 className="text-red-800 dark:text-red-400 font-bold mb-2 flex items-center gap-2">
                                                    👎 Cons
                                                </h4>
                                                <ul className="space-y-1">
                                                    {activeContent.theory.cons.map((con, idx) => (
                                                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                                                            <span className="text-red-600 dark:text-red-400">•</span>
                                                            {con}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 6. Others / Details */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b dark:border-gray-700 pb-2">🔍 Details & Tips</h3>

                                    {/* When to Use (Merged into Details if not replaced by Scenario) */}
                                    {activeContent.theory.whenToUse && (
                                        <div className="mb-6">
                                            <h4 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">When to Use:</h4>
                                            <ul className="space-y-2">
                                                {activeContent.theory.whenToUse.map((item, idx) => (
                                                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex gap-2 items-start">
                                                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Tips */}
                                    {activeContent.theory.tips && (
                                        <div className="space-y-2 mb-6">
                                            {activeContent.theory.tips.map((tip, idx) => (
                                                <div key={idx} className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-3 rounded-r text-gray-800 dark:text-gray-200 text-sm flex gap-3">
                                                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">★</span>
                                                    <span>{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Deep Dive */}
                                    {activeContent.theory.deepDive && (
                                        <div className="mb-6">
                                            <h4 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Deep Dive:</h4>
                                            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                                                {activeContent.theory.deepDive}
                                            </div>
                                        </div>
                                    )}

                                    {/* Pitfalls */}
                                    {activeContent.theory.commonPitfalls && (
                                        <div>
                                            <h4 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Common Pitfalls:</h4>
                                            <ul className="space-y-2">
                                                {activeContent.theory.commonPitfalls.map((pitfall, idx) => (
                                                    <li key={idx} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-3 rounded-r text-gray-800 dark:text-gray-200 text-sm flex gap-3">
                                                        <span className="text-red-600 dark:text-red-400 font-bold">!</span>
                                                        <span>{pitfall}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}


                        {(viewMode === 'demo' || viewMode === 'split') && (
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>🎮 Live Interaction</span>
                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Interactive</span>
                                </h3>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1">
                                    {activeContent.component ? (
                                        <div className="relative min-h-[200px]">
                                            <Suspense fallback={
                                                <div className="flex items-center justify-center absolute inset-0 bg-white/50 dark:bg-gray-900/50 z-10">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                                </div>
                                            }>
                                                <activeContent.component />
                                            </Suspense>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                                            No interactive demo available for this topic.
                                        </div>
                                    )}

                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                                    Check the browser console (F12) for logs during interaction
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto">
                    <BookOpen className="w-20 h-20 text-indigo-100 dark:text-indigo-900/50 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Ready to learn?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                        Select any topic from the list above to dive into the details, see code examples, and play with live demos.
                    </p>
                    <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full">
                        <Play className="w-4 h-4" />
                        <span>Choose a topic to begin</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopicLayout;
