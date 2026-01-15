import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Loader2, FileText } from 'lucide-react';
import api from '@/api/client';
import { useSelector } from 'react-redux';
import { selectAllSubjects } from '@/store/slices/subjectSlice';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [theories, setTheories] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const navigate = useNavigate();
    const subjects = useSelector(selectAllSubjects);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    // Fetch all theories on mount (or could trigger on first focus)
    useEffect(() => {
        const fetchTheories = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/theory');
                setTheories(data);
            } catch (error) {
                console.error("Failed to fetch search data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTheories();
    }, []);

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchTerm = query.toLowerCase();
        const filtered = theories.filter(theory =>
            theory.title.toLowerCase().includes(searchTerm) ||
            theory.topicId.toLowerCase().includes(searchTerm)
        ).slice(0, 10); // Limit results

        setResults(filtered);
        setSelectedIndex(-1);
        setIsOpen(true);
    }, [query, theories]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const handleSelect = (theory) => {
        // Try to find subject from filtering subjects or look for subject property in theory
        // Assuming theory has 'subject' or we can match via other means.
        // If theory doesn't have subject, we might need to rely on topic matching or assume data structure.

        let subjectPath = '';

        if (theory.subject) {
            // If backend provides subject slug/id directly
            const subject = subjects.find(s => s.name.toLowerCase() === theory.subject.toLowerCase() || s.path.includes(theory.subject));
            if (subject) subjectPath = subject.path;
        }

        // Fallback or complex matching if needed. 
        // For now, let's assume `theory` object might NOT have subject directly if it wasn't populated.
        // If it's missing, we might need to update the backend or fetch full data.
        // However, based on user request "2 optios origin like which topic and subject", 
        // it implies we SHOULD show it. 
        // Let's assume for now theory.subject exists (as seen in AdminTopics, topics have it).

        if (!subjectPath && theory.subject) {
            // Try to construct path if we can't find subject object but have the ID
            subjectPath = "/" + theory.subject;
        }

        // Final fallback: ask user to fix data or default to something? 
        // Actually, let's try to match subject path from the theory.topicId if it contains it? No, unreliable.
        // Let's rely on theory.subject matching a subject in our context.

        const subject = subjects.find(s => s.name?.toLowerCase() === theory.subject?.toLowerCase() ||
            s.path?.replace('/', '') === theory.subject?.toLowerCase());

        if (subject) {
            navigate(`${subject.path}/${theory.topicId}`);
            setIsOpen(false);
            setQuery('');
        } else {
            console.warn("Could not determine subject for theory:", theory);
            // Fallback: maybe just navigate to topicId if root handles it? (Unlikely based on routes)
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto md:mx-0" ref={searchRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="Search theories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (query.trim() && results.length > 0) setIsOpen(true);
                    }}
                />
                {query && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => {
                        setQuery('');
                        setResults([]);
                        inputRef.current?.focus();
                    }}>
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                    </div>
                )}
            </div>

            {isOpen && (results.length > 0 || loading) && (
                <div className="absolute mt-1 w-full bg-white dark:bg-gray-900 shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-50 border border-gray-200 dark:border-gray-700">
                    {loading && (
                        <div className="flex items-center justify-center py-4 text-gray-500">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Loading...
                        </div>
                    )}

                    {!loading && results.map((theory, index) => {
                        const subject = subjects.find(s => s.name?.toLowerCase() === theory.subject?.toLowerCase() ||
                            s.path?.replace('/', '') === theory.subject?.toLowerCase());

                        return (
                            <div
                                key={theory._id || index}
                                className={`cursor-pointer select-none relative py-3 pl-4 pr-4 border-b border-gray-100 dark:border-gray-800 last:border-0 ${selectedIndex === index ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                onClick={() => handleSelect(theory)}
                            >
                                <div className="flex items-start">
                                    <div className="shrink-0 pt-0.5">
                                        <FileText className={`h-5 w-5 ${selectedIndex === index ? 'text-indigo-500' : 'text-gray-400'}`} />
                                    </div>
                                    <div className="ml-3 font-medium">
                                        <div className="truncate">{theory.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {subject ? subject.title : (theory.subject || 'Unknown Subject')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {!loading && results.length === 0 && (
                        <div className="cursor-default select-none relative py-2 px-4 text-gray-700 dark:text-gray-400">
                            No results found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
