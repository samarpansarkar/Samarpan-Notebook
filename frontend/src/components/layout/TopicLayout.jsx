import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Play, Sparkles, Tag } from 'lucide-react';
import LiveRenderer from '@/components/LiveRenderer';
import RelatedTheories from '@/components/RelatedTheories';
import ContentBlockRenderer from '@/components/content/ContentBlockRenderer';
import DOMPurify from 'dompurify';

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

                    <div
                        className="border-b p-5"
                        style={{
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderColor: 'var(--color-border)'
                        }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
                                <div className="p-2 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 shadow-lg heartbeat">
                                    <activeContent.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                                    {activeContent.title}
                                </span>
                            </h2>


                            <div className="flex gap-2">
                                {['theory', 'demo', 'split'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all hover-bounce ${viewMode === mode
                                            ? 'bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-md'
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


                    <div className={`grid ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>

                        {(viewMode === 'theory' || viewMode === 'split') && (
                            <div
                                className="p-6 space-y-6 overflow-auto max-h-[800px] slide-in-left"
                                style={{ backgroundColor: 'var(--color-surface)' }}
                            >

                                {activeContent.richContent ? (
                                    <div
                                        className="prose prose-invert max-w-none rich-content"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(activeContent.richContent)
                                        }}
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    />
                                ) : activeContent.contentBlocks && activeContent.contentBlocks.length > 0 ? (
                                    <div className="content-blocks-container">
                                        <ContentBlockRenderer blocks={activeContent.contentBlocks} />
                                    </div>
                                ) : (

                                    <div className="text-center p-8 text-gray-400">
                                        No content available.
                                    </div>
                                )}


                                {activeContent.keywords && activeContent.keywords.length > 0 && (
                                    <div className="scale-in" style={{ animationDelay: '0.7s' }}>
                                        <h3
                                            className="text-lg font-bold mb-3 flex items-center gap-2 pb-2 border-b"
                                            style={{
                                                color: 'var(--color-text-primary)',
                                                borderColor: 'var(--color-border)'
                                            }}
                                        >
                                            <Tag className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                                            Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {activeContent.keywords.map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all hover-bounce cursor-pointer"
                                                    style={{
                                                        backgroundColor: 'var(--color-bg-tertiary)',
                                                        color: 'var(--color-primary)',
                                                        border: '1px solid var(--color-border)'
                                                    }}
                                                >
                                                    #{keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}


                                {activeContent.keywords && activeContent.keywords.length > 0 && (
                                    <div className="scale-in" style={{ animationDelay: '0.8s' }}>
                                        <RelatedTheories
                                            topicId={activeContent.id}
                                            keywords={activeContent.keywords}
                                        />
                                    </div>
                                )}
                            </div>
                        )}


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
