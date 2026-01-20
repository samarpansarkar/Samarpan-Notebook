import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink } from 'lucide-react';
import api from '@/api/client';

const RelatedTheories = ({ topicId, keywords = [] }) => {
    const [relatedTheories, setRelatedTheories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            if (!topicId || keywords.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get(`/theory/related/${topicId}`);
                setRelatedTheories(data);
            } catch (error) {
                console.error('Failed to fetch related theories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelated();
    }, [topicId, keywords]);

    if (loading || relatedTheories.length === 0) {
        return null;
    }

    // Group by subject
    const groupedBySubject = relatedTheories.reduce((acc, theory) => {
        if (!acc[theory.subject]) {
            acc[theory.subject] = [];
        }
        acc[theory.subject].push(theory);
        return {};
    }, {});

    return (
        <div
            className="rounded-2xl shadow-lg p-6 border fade-in"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
            }}
        >
            <h3
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-text-primary)' }}
            >
                <BookOpen className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                Related Theories
            </h3>

            <div className="space-y-4">
                {Object.entries(groupedBySubject).map(([subject, theories]) => (
                    <div key={subject}>
                        <h4
                            className="text-sm font-semibold uppercase tracking-wider mb-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {subject}
                        </h4>
                        <div className="space-y-2">
                            {theories.map((theory) => (
                                <Link
                                    key={theory._id}
                                    to={`/${theory.subject}/${theory.topicId}`}
                                    className="block p-3 rounded-xl transition-all hover-lift-shadow group"
                                    style={{
                                        backgroundColor: 'var(--color-bg-secondary)',
                                        borderLeft: '3px solid var(--color-primary)'
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="font-medium group-hover:underline"
                                                    style={{ color: 'var(--color-text-primary)' }}
                                                >
                                                    {theory.title}
                                                </span>
                                                <ExternalLink
                                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    style={{ color: 'var(--color-primary)' }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span
                                                    className="text-xs px-2 py-0.5 rounded-full"
                                                    style={{
                                                        backgroundColor: 'var(--color-bg-tertiary)',
                                                        color: 'var(--color-text-tertiary)'
                                                    }}
                                                >
                                                    {theory.matchCount} shared keyword{theory.matchCount > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedTheories;
