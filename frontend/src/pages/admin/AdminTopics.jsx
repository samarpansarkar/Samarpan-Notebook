import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/client';
import { Edit, Trash2, Plus, Layers } from 'lucide-react';

const AdminTopics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTopics = async () => {
        try {
            const { data } = await api.get('/topics');
            setTopics(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch topics');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this topic?')) {
            try {
                await api.delete(`/topics/${id}`);
                fetchTopics();
            } catch (err) {
                alert('Failed to delete topic');
            }
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Layers className="text-indigo-500" />
                    Manage Topics
                </h2>
                <Link
                    to="/admin/topics/new"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={18} /> Add Topic
                </Link>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-750 text-gray-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b border-gray-700">Name</th>
                            <th className="p-4 border-b border-gray-700">ID</th>
                            <th className="p-4 border-b border-gray-700">Subject</th>
                            <th className="p-4 border-b border-gray-700">Order</th>
                            <th className="p-4 border-b border-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {topics.map((topic) => (
                            <tr key={topic._id} className="hover:bg-gray-750 transition-colors">
                                <td className="p-4 font-medium text-white flex items-center gap-2">
                                    {topic.name}
                                </td>
                                <td className="p-4 font-mono text-sm text-gray-500">{topic.topicId}</td>
                                <td className="p-4 text-indigo-400">{topic.subject}</td>
                                <td className="p-4 text-gray-400">{topic.order}</td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        to={`/admin/topics/edit/${topic._id}`}
                                        className="inline-flex p-2 text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(topic._id)}
                                        className="inline-flex p-2 text-red-400 hover:bg-red-900/30 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {topics.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    No topics found. Create one to organize your content.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTopics;
