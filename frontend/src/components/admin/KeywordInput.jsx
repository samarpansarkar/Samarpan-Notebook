import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import api from '@/api/client';

const KeywordInput = ({ value = [], onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allKeywords, setAllKeywords] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Fetch all existing keywords for autocomplete
    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const { data } = await api.get('/keywords');
                setAllKeywords(data.map(k => k.name));
            } catch (error) {
                console.error('Failed to fetch keywords:', error);
            }
        };
        fetchKeywords();
    }, []);

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim()) {
            // Filter keywords based on input (show all, including selected)
            const filtered = allKeywords.filter(
                keyword =>
                    keyword.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            // Show all keywords when input is empty
            setSuggestions(allKeywords);
        }
    }, [inputValue, allKeywords, value]);

    const formatKeyword = (keyword) => {
        return keyword
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    };

    const addKeyword = (keyword) => {
        const formatted = formatKeyword(keyword);

        // Only allow keywords that exist in the database
        if (!allKeywords.includes(formatted)) {
            alert(`Keyword "${formatted}" does not exist. Please ask an admin to add it first.`);
            setInputValue('');
            setShowSuggestions(false);
            return;
        }

        // Toggle keyword - remove if already selected, add if not
        if (value.includes(formatted)) {
            onChange(value.filter(k => k !== formatted));
        } else if (value.length < 10) {
            onChange([...value, formatted]);
        }

        setInputValue('');
        setShowSuggestions(false);
    };

    const removeKeyword = (keywordToRemove) => {
        onChange(value.filter(k => k !== keywordToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputValue.trim()) {
                addKeyword(inputValue);
            }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeKeyword(value[value.length - 1]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm text-gray-400 mb-1">
                Keywords / Tags
                <span className="text-xs ml-2 text-gray-500">
                    ({value.length}/10) - Press Enter or comma to add
                </span>
            </label>

            {/* Tags Display */}
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map((keyword, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all hover-bounce"
                        style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        {keyword}
                        <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="hover:scale-110 transition-transform"
                            style={{ color: 'var(--color-error)' }}
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>

            {/* Input Field */}
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="Click to see all keywords or type to search..."
                    disabled={value.length >= 10}
                />

                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {suggestions.map((suggestion, index) => {
                            const isSelected = value.includes(suggestion);
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addKeyword(suggestion)}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${isSelected
                                            ? 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
                                            : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {isSelected ? (
                                            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <Plus size={14} className="text-indigo-400" />
                                        )}
                                        {suggestion}
                                    </span>
                                    {isSelected && (
                                        <span className="text-xs text-indigo-400">Selected</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <p className="text-xs text-gray-500">
                Select keywords from the existing list. Contact admin to add new keywords.
            </p>
        </div>
    );
};

export default KeywordInput;
