import { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Search, AlertCircle } from 'lucide-react';
import api from '@/api/client';

const AdminKeywords = () => {
    const [keywords, setKeywords] = useState([]);
    const [keywordStats, setKeywordStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [newKeyword, setNewKeyword] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteKeyword, setDeleteKeyword] = useState(null);

    useEffect(() => {
        fetchKeywords();
    }, []);

    const fetchKeywords = async () => {
        setLoading(true);
        try {
            // Fetch keywords from dedicated API
            const { data } = await api.get('/keywords');
            setKeywords(data.map(k => k.name));

            // Create stats object from keyword data
            const stats = {};
            data.forEach(keyword => {
                stats[keyword.name] = keyword.usageCount;
            });
            setKeywordStats(stats);
        } catch (error) {
            console.error('Failed to fetch keywords:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatKeyword = (keyword) => {
        return keyword
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    };

    const handleAddKeyword = async () => {
        const formatted = formatKeyword(newKeyword);
        if (!formatted) {
            return;
        }

        try {
            await api.post('/keywords', { name: formatted });
            await fetchKeywords();
            setNewKeyword('');
            setShowAddModal(false);
        } catch (error) {
            console.error('Failed to add keyword:', error);
            alert(error.response?.data?.message || 'Failed to add keyword');
        }
    };

    const handleDeleteKeyword = async (keyword) => {
        try {
            // Find keyword ID
            const { data: keywords } = await api.get('/keywords');
            const keywordObj = keywords.find(k => k.name === keyword);

            if (!keywordObj) {
                alert('Keyword not found');
                return;
            }

            // Delete keyword (will automatically remove from all theories)
            await api.delete(`/keywords/${keywordObj._id}`);

            // Refresh the list
            await fetchKeywords();
            setDeleteKeyword(null);
        } catch (error) {
            console.error('Failed to delete keyword:', error);
            alert(error.response?.data?.message || 'Failed to delete keyword');
        }
    };

    const filteredKeywords = keywords.filter(keyword =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Tag className="w-7 h-7 text-indigo-400" />
                        Manage Keywords
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        View and manage all keywords across theories
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add Keyword
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search keywords..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Total Keywords</div>
                    <div className="text-2xl font-bold text-white mt-1">{keywords.length}</div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Used Keywords</div>
                    <div className="text-2xl font-bold text-white mt-1">
                        {Object.values(keywordStats).filter(count => count > 0).length}
                    </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Unused Keywords</div>
                    <div className="text-2xl font-bold text-white mt-1">
                        {Object.values(keywordStats).filter(count => count === 0).length}
                    </div>
                </div>
            </div>

            {/* Keywords List */}
            {loading ? (
                <div className="text-center py-12 text-gray-400">Loading keywords...</div>
            ) : filteredKeywords.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    {searchTerm ? 'No keywords found matching your search' : 'No keywords yet'}
                </div>
            ) : (
                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-900">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Keyword
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Usage Count
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredKeywords.map((keyword) => {
                                const count = keywordStats[keyword] || 0;
                                return (
                                    <tr key={keyword} className="hover:bg-gray-750 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700">
                                                    #{keyword}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">{count}</span>
                                            <span className="text-gray-400 text-sm ml-1">
                                                {count === 1 ? 'theory' : 'theories'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {count > 0 ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/50 text-green-300">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-400">
                                                    Unused
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setDeleteKeyword(keyword)}
                                                className="text-red-400 hover:text-red-300 transition-colors p-2"
                                                title="Delete keyword"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Keyword Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Add New Keyword</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Keywords are automatically created when used in theories. This allows you to pre-define keywords for autocomplete.
                        </p>
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                            placeholder="e.g., state-management"
                            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:border-indigo-500 focus:outline-none mb-4"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewKeyword('');
                                }}
                                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddKeyword}
                                disabled={!newKeyword.trim()}
                                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Keyword
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteKeyword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="text-red-400" size={24} />
                            <h3 className="text-xl font-bold text-white">Delete Keyword</h3>
                        </div>
                        <p className="text-gray-300 mb-2">
                            Are you sure you want to delete the keyword <span className="font-semibold text-indigo-400">#{deleteKeyword}</span>?
                        </p>
                        {keywordStats[deleteKeyword] > 0 && (
                            <p className="text-yellow-400 text-sm mb-4 flex items-center gap-2">
                                <AlertCircle size={16} />
                                This keyword is used by {keywordStats[deleteKeyword]} {keywordStats[deleteKeyword] === 1 ? 'theory' : 'theories'}. It will be removed from all of them.
                            </p>
                        )}
                        <div className="flex gap-2 justify-end mt-4">
                            <button
                                onClick={() => setDeleteKeyword(null)}
                                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteKeyword(deleteKeyword)}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminKeywords;
