import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/api/client';
import { getIcon } from '@/utils/componentRegistry';

const SubjectContext = createContext();

export const useSubjects = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/subjects');

            const formattedSubjects = data.map(sub => ({
                ...sub,
                iconComponent: getIcon(sub.icon)
            }));

            setSubjects(formattedSubjects);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch subjects:", err);
            setSubjects([]);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <SubjectContext.Provider value={{ subjects, loading, error, refreshSubjects: fetchSubjects }}>
            {children}
        </SubjectContext.Provider>
    );
};
