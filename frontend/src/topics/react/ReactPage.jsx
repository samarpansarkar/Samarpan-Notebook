import TopicLayout from '@/components/layout/TopicLayout';
import STUDY_SECTIONS from '@/topics/react/modules/index';

const ReactPage = () => {
    return (
        <TopicLayout
            title="React Optimization & Hooks"
            sections={STUDY_SECTIONS}
            basePath="/react"
        />
    );
};

export default ReactPage;
