import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { getIcon, getComponent } from '../utils/componentRegistry';

const TopicContext = createContext();

export const useTopics = () => useContext(TopicContext);

export const TopicProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Group topics by section and format for UI
    const sections = [
        {
            id: "hooks",
            title: "React Hooks",
            icon: "Zap", // Will be resolved by getIcon
            subtopics: []
        },
        {
            id: "concepts",
            title: "Other Concepts",
            icon: "Layers",
            subtopics: []
        }
    ];

    const fetchTopics = async () => {
        try {
            setLoading(true);
            // Try fetching from API
            // If API fails (e.g., during initial setup or dev without backend), fallback could be static data?
            // For now, assume backend needs to be running.
            const { data } = await api.get('/topics');

            // Transform data
            // We need to map the DB topics to the structure expected by the UI
            // UI expects: { id (topicId), title, icon (component), theory, component (react component) }

            const formattedTopics = data.map(t => ({
                ...t,
                id: t.topicId,
                icon: getIcon(t.icon),
                component: getComponent(t.componentKey),
                // Ensure theory arrays are safe
                theory: {
                    ...t.theory,
                    pros: t.theory?.pros || [],
                    cons: t.theory?.cons || [],
                    whenToUse: t.theory?.whenToUse || [],
                    tips: t.theory?.tips || [],
                    commonPitfalls: t.theory?.commonPitfalls || []
                }
            }));

            // Distribute into sections
            const populatedSections = sections.map(sec => ({
                ...sec,
                icon: getIcon(sec.icon),
                subtopics: formattedTopics.filter(t => t.section === sec.id)
            }));

            setTopics(populatedSections);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch topics:", err);
            // Fallback or Error state
            // If 404 or network error, maybe show empty state
            setError(err.message);
            setTopics(sections.map(s => ({ ...s, icon: getIcon(s.icon) }))); // Empty sections
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <TopicContext.Provider value={{ sections: topics, loading, error, refreshTopics: fetchTopics }}>
            {children}
        </TopicContext.Provider>
    );
};
