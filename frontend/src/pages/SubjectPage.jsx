import { useSelector } from 'react-redux';
import TopicLayout from '@/components/layout/TopicLayout';
import { selectTopicsBySubject } from '@/store/slices/topicSlice';

const SubjectPage = ({ subject }) => {
    const loading = useSelector(state => state.topics.status === 'loading');
    // Error handling can use state.topics.error if needed
    const sections = useSelector(state =>
        selectTopicsBySubject(state, subject.path.replace('/', '') || subject.name.toLowerCase())
    );

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
