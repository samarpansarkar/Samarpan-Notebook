import { useEffect } from 'react';
import TopicLayout from '@/components/layout/TopicLayout';
import { useTopics } from '@/context/TopicContext';

const ReactPage = () => {
    const { sections, loading, error } = useTopics();

    if (loading) return <div>Loading content...</div>;
    // if (error) return <div>Error loading content: {error}</div>; // Optional

    return (
        <TopicLayout
            title="React Optimization & Hooks"
            sections={sections}
            basePath="/react"
        />
    );
};

export default ReactPage;
