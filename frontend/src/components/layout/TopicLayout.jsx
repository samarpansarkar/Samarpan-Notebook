import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Play, Sparkles } from 'lucide-react';
import LiveRenderer from '@/components/LiveRenderer';

const TopicLayout = ({ title, sections, basePath }) => {
    const { topicId } = useParams();
    const [viewMode, setViewMode] = useState('split');

    const activeContent = useMemo(() => {
        const allTopics = sections.flatMap(section => section.subtopics || []);
        return allTopics.find(s => s.id === topicId);
    }, [topicId, sections]);

    return (
        <div className="h-full page-transition">
            {activeContent ? (
                <div
                    className="rounded-2xl shadow-lg overflow-hidden mb-12 border zoom-in"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)'
                    }}
                >
                    {/* Topic Header */}
                    <div
                        className="border-b p-5"
                        style={{
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderColor: 'var(--color-border)'
                        }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
                                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg heartbeat">
                                    <activeContent.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                                    {activeContent.title}
                                </span>
                            </h2>

                            {/* View Mode Buttons */}
                            <div className="flex gap-2">
                                {['theory', 'demo', 'split'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all hover-bounce ${viewMode === mode
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                                            : 'border hover:scale-105'
                                            }`}
                                        style={viewMode !== mode ? {
                                            backgroundColor: 'var(--color-surface)',
                                            borderColor: 'var(--color-border)',
                                            color: 'var(--color-text-secondary)'
                                        } : {}}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className={`grid ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                        {/* Theory Section */}
                        {(viewMode === 'theory' || viewMode === 'split') && (
                            <div
                                className="p-6 space-y-6 overflow-auto max-h-[800px] slide-in-left"
                                style={{ backgroundColor: 'var(--color-surface)' }}
                            >
                                {/* Overview */}
                                <div className="scale-in">
                                    <h3
                                        className="text-lg font-bold mb-3 flex items-center gap-2 pb-2 border-b"
                                        style={{
                                            color: 'var(--color-text-primary)',
                                            borderColor: 'var(--color-border)'
                                        }}
                                    >
                                        <span>📖</span> Overview
                                    </h3>
                                    <p
                                        className="leading-relaxed"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        {activeContent.theory.overview}
                                    </p>
                                </div>

                                {/* Definition */}
                                {activeContent.theory.definition && (
                                    <div className="scale-in" style={{ animationDelay: '0.1s' }}>
                                        <h3
                                            className="text-lg font-bold mb-3 flex items-center gap-2 pb-2 border-b"
                                            style={{
                                                color: 'var(--color-text-primary)',
                                                borderColor: 'var(--color-border)'
                                            }}
                                        >
                                            <span>📚</span> Definition
                                        </h3>
                                        <div
                                            className="border-l-4 p-4 rounded-r-lg"
                                            style={{
                                                backgroundColor: 'var(--color-bg-tertiary)',
                                                borderColor: 'var(--color-primary)',
                                                color: 'var(--color-text-primary)'
                                            }}
                                        >
                                            {activeContent.theory.definition}
                                        </div>
                                    </div>
                                )}

                                {/* Syntax */}
                                <div className="scale-in" style={{ animationDelay: '0.2s' }}>
                                    <h3
                                        className="text-lg font-bold mb-3 flex items-center gap-2 pb-2 border-b"
                                        style={{
                                            color: 'var(--color-text-primary)',
                                            borderColor: 'var(--color-border)'
                                        }}
                                    >
                                        <span>💻</span> Syntax
                                    </h3>
                                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-sm overflow-x-auto font-mono border border-slate-700 shadow-inner">
                                        <code>{activeContent.theory.syntax}</code>
                                    </pre>
                                </div>

                                {/* Real-life Scenario */}
                                {activeContent.theory.realLifeScenario && (
                                    <div className="scale-in" style={{ animationDelay: '0.3s' }}>
                                        <h3
                                            className="text-lg font-bold mb-3 flex items-center gap-2 pb-2 border-b"
                                            style={{
                                                color: 'var(--color-text-primary)',
                                                borderColor: 'var(--color-border)'
                                            }}
                                        >
                                            <span>🌍</span> Real-life Scenario
                                        </h3>
                                        <div
                                            className="p-4 rounded-xl border leading-relaxed"
                                            style={{
                                                backgroundColor: 'var(--color-bg-secondary)',
                                                borderColor: 'var(--color-secondary)',
                                                color: 'var(--color-text-secondary)'
                                            }}
                                        >
                                            {activeContent.theory.realLifeScenario}
                                        </div>
                                    </div>
                                )}

                                {/* Pros & Cons */}
                                {(activeContent.theory.pros || activeContent.theory.cons) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {activeContent.theory.pros && (
                                            <div
                                                className="p-4 rounded-xl border hover-lift-shadow"
                                                style={{
                                                    backgroundColor: 'var(--color-bg-secondary)',
                                                    borderColor: 'var(--color-success)'
                                                }}
                                            >
                                                <h4
                                                    className="font-bold mb-2 flex items-center gap-2"
                                                    style={{ color: 'var(--color-success)' }}
                                                >
                                                    👍 Pros
                                                </h4>
                                                <ul className="space-y-1">
                                                    {activeContent.theory.pros.map((pro, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-sm flex gap-2"
                                                            style={{ color: 'var(--color-text-secondary)' }}
                                                        >
                                                            <span style={{ color: 'var(--color-success)' }}>•</span>
                                                            {pro}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {activeContent.theory.cons && (
                                            <div
                                                className="p-4 rounded-xl border hover-lift-shadow"
                                                style={{
                                                    backgroundColor: 'var(--color-bg-secondary)',
                                                    borderColor: 'var(--color-error)'
                                                }}
                                            >
                                                <h4
                                                    className="font-bold mb-2 flex items-center gap-2"
                                                    style={{ color: 'var(--color-error)' }}
                                                >
                                                    👎 Cons
                                                </h4>
                                                <ul className="space-y-1">
                                                    {activeContent.theory.cons.map((con, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-sm flex gap-2"
                                                            style={{ color: 'var(--color-text-secondary)' }}
                                                        >
                                                            <span style={{ color: 'var(--color-error)' }}>•</span>
                                                            {con}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Details & Tips */}
                                <div>
                                    <h3
                                        className="text-lg font-bold mb-4 pb-2 border-b"
                                        style={{
                                            color: 'var(--color-text-primary)',
                                            borderColor: 'var(--color-border)'
                                        }}
                                    >
                                        🔍 Details & Tips
                                    </h3>

                                    {activeContent.theory.whenToUse && (
                                        <div className="mb-6">
                                            <h4
                                                className="font-semibold mb-2"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                When to Use:
                                            </h4>
                                            <ul className="space-y-2">
                                                {activeContent.theory.whenToUse.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex gap-2 items-start"
                                                        style={{ color: 'var(--color-text-secondary)' }}
                                                    >
                                                        <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activeContent.theory.tips && (
                                        <div className="space-y-2 mb-6">
                                            {activeContent.theory.tips.map((tip, idx) => (
                                                <div
                                                    key={idx}
                                                    className="border-l-4 p-3 rounded-r-lg text-sm flex gap-3 hover-bounce"
                                                    style={{
                                                        backgroundColor: 'var(--color-bg-tertiary)',
                                                        borderColor: 'var(--color-warning)',
                                                        color: 'var(--color-text-primary)'
                                                    }}
                                                >
                                                    <span style={{ color: 'var(--color-warning)' }} className="font-bold">★</span>
                                                    <span>{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeContent.theory.deepDive && (
                                        <div className="mb-6">
                                            <h4
                                                className="font-semibold mb-2"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                Deep Dive:
                                            </h4>
                                            <div
                                                className="text-sm leading-relaxed p-4 rounded-xl border"
                                                style={{
                                                    backgroundColor: 'var(--color-bg-secondary)',
                                                    borderColor: 'var(--color-info)',
                                                    color: 'var(--color-text-secondary)'
                                                }}
                                            >
                                                {activeContent.theory.deepDive}
                                            </div>
                                        </div>
                                    )}

                                    {activeContent.theory.commonPitfalls && (
                                        <div>
                                            <h4
                                                className="font-semibold mb-2"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                Common Pitfalls:
                                            </h4>
                                            <ul className="space-y-2">
                                                {activeContent.theory.commonPitfalls.map((pitfall, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="border-l-4 p-3 rounded-r-lg text-sm flex gap-3 shake"
                                                        style={{
                                                            backgroundColor: 'var(--color-bg-tertiary)',
                                                            borderColor: 'var(--color-error)',
                                                            color: 'var(--color-text-primary)'
                                                        }}
                                                    >
                                                        <span style={{ color: 'var(--color-error)' }} className="font-bold">!</span>
                                                        <span>{pitfall}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Live Demo Section */}
                        {(viewMode === 'demo' || viewMode === 'split') && (
                            <div
                                className="p-6 flex flex-col border-l slide-in-right"
                                style={{
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    borderColor: 'var(--color-border)'
                                }}
                            >
                                <h3
                                    className="text-lg font-bold mb-4 flex items-center gap-2"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    <span>🎮</span>
                                    <span>Live Interaction</span>
                                    <span
                                        className="text-xs font-normal px-2 py-1 rounded-lg pulse-glow"
                                        style={{
                                            backgroundColor: 'var(--color-success)',
                                            color: 'white'
                                        }}
                                    >
                                        Interactive
                                    </span>
                                </h3>
                                <div
                                    className="p-6 rounded-xl border shadow-sm flex-1 hover-lift-shadow"
                                    style={{
                                        backgroundColor: 'var(--color-surface)',
                                        borderColor: 'var(--color-border)'
                                    }}
                                >
                                    {activeContent.liveCode ? (
                                        <LiveRenderer code={activeContent.liveCode} />
                                    ) : (
                                        <div
                                            className="text-center py-12"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                            <p>No interactive demo available for this topic.</p>
                                        </div>
                                    )}
                                </div>
                                <p
                                    className="text-xs mt-4 text-center"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    Check the browser console (F12) for logs during interaction
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div
                    className="rounded-xl shadow-lg p-12 text-center border max-w-2xl mx-auto bounce-in"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)'
                    }}
                >
                    <BookOpen
                        className="w-20 h-20 mx-auto mb-6 float"
                        style={{ color: 'var(--color-primary)', opacity: 0.3 }}
                    />
                    {topicId ? (
                        <>
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ color: 'var(--color-error)' }}
                            >
                                Topic Not Found
                            </h3>
                            <p
                                className="mb-4"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                The topic "{topicId}" could not be found in this subject.
                            </p>
                            <p
                                className="text-xs"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                Debug: Check if the Topic ID matches exactly.
                            </p>
                        </>
                    ) : (
                        <>
                            <h3
                                className="text-2xl font-bold mb-3"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                Ready to learn?
                            </h3>
                            <p
                                className="mb-8 max-w-md mx-auto"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Select any topic from the list above to dive into the details, see code examples, and play with live demos.
                            </p>
                            <div
                                className="inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-full magnetic-button"
                                style={{
                                    backgroundColor: 'var(--color-bg-tertiary)',
                                    color: 'var(--color-primary)'
                                }}
                            >
                                <Play className="w-4 h-4" />
                                <span>Choose a topic to begin</span>
                            </div>
                        </>
                    )}
                </div>
            )
            }
        </div >
    );
};

export default TopicLayout;
