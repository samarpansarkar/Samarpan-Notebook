import { useSelector } from 'react-redux';
import TopicLayout from '@/components/layout/TopicLayout';
import { selectTopicsBySubject } from '@/store/slices/topicSlice';

const ReactPage = () => {
    const loading = useSelector(state => state.topics.status === 'loading');
    const sections = useSelector(state => selectTopicsBySubject(state, 'react'));

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
