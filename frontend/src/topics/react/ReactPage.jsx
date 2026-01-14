import { useEffect } from 'react';
import TopicLayout from '@/components/layout/TopicLayout';
import { useTopics } from '@/context/TopicContext';

const ReactPage = () => {
    const { getTopicsBySubject, loading, error } = useTopics();
    const sections = getTopicsBySubject('react');

    if (loading) return <div>Loading content...</div>;

    return (
        <TopicLayout
            title="React Optimization & Hooks"
            sections={sections}
            basePath="/react"
        />
    );
};

export default ReactPage;
