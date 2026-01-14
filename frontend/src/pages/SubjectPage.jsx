import { useMemo } from 'react';
import TopicLayout from '@/components/layout/TopicLayout';
import { useTopics } from '@/context/TopicContext';

const SubjectPage = ({ subject }) => {
    const { getTopicsBySubject, loading, error } = useTopics();

    const sections = getTopicsBySubject(subject.path.replace('/', '') || subject.name.toLowerCase());

    if (loading) return <div>Loading content...</div>;

    return (
        <TopicLayout
            title={subject.title}
            sections={sections}
            basePath={subject.path}
        />
    );
};

export default SubjectPage;
