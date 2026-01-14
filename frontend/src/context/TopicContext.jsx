import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/api/client';
import { getIcon, getComponent } from '@/utils/componentRegistry';

const TopicContext = createContext();

export const useTopics = () => useContext(TopicContext);

export const TopicProvider = ({ children }) => {
    const [allTopics, setAllTopics] = useState([]);
    const [allTheories, setAllTheories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const processTheory = (t) => ({
        ...t,
        id: t.topicId,
        icon: getIcon(t.icon),
        component: getComponent(t.componentKey),
        theory: {
            ...t.theory,
            pros: t.theory?.pros || [],
            cons: t.theory?.cons || [],
            whenToUse: t.theory?.whenToUse || [],
            tips: t.theory?.tips || [],
            commonPitfalls: t.theory?.commonPitfalls || []
        }
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [topicsRes, theoriesRes] = await Promise.all([
                api.get('/topics'),
                api.get('/theory')
            ]);

            setAllTopics(topicsRes.data);
            setAllTheories(theoriesRes.data.map(processTheory));
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const getTopicsBySubject = (subjectKey) => {
        const key = subjectKey.toLowerCase();

        const subjectTopics = allTopics
            .filter(t => (t.subject || '').toLowerCase() === key)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

        const subjectTheories = allTheories.filter(t => (t.subject || 'react').toLowerCase() === key);

        return subjectTopics.map(topic => {
            const subtopics = subjectTheories
                .filter(theory =>
                    theory.topicId === topic.topicId ||
                    (theory.section && theory.section.toLowerCase() === topic.topicId.toLowerCase())
                )
                .sort((a, b) => (a.order || 0) - (b.order || 0));

            return {
                id: topic.topicId,
                title: topic.name,
                icon: getIcon(topic.icon),
                color: topic.color,
                subtopics: subtopics
            };
        }).filter(section => section.subtopics.length > 0 || true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <TopicContext.Provider value={{
            topics: allTheories,
            getTopicsBySubject,
            loading,
            error,
            refreshTopics: fetchData
        }}>
            {children}
        </TopicContext.Provider>
    );
};
