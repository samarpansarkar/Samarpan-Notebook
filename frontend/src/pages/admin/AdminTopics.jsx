import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/client';
import { useSubjects } from '@/context/SubjectContext';
import { Edit, Trash2, Plus, Layers } from 'lucide-react';
import Modal from '@/components/common/Modal';


const AdminTopics = () => {
    const { subjects } = useSubjects();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('All');

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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const checkDelete = (topic) => {
        setSelectedTopic(topic);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedTopic) return;

        try {
            await api.delete(`/topics/${selectedTopic._id}`);
            fetchTopics();
            setShowDeleteModal(false);
            setSelectedTopic(null);
        } catch (err) {
            console.error("Failed to delete topic", err);
            // Could add a toast here later
        }
    };

    const filteredTopics = selectedSubject === 'All'
        ? topics
        : topics.filter(topic => topic.subject === selectedSubject);

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

            {/* Subject Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setSelectedSubject('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSubject === 'All'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                >
                    All
                </button>
                {subjects.map(subject => {
                    const subjectKey = subject.path.replace('/', '');
                    return (
                        <button
                            key={subject._id}
                            onClick={() => setSelectedSubject(subjectKey)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSubject === subjectKey
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {subject.title || subject.name}
                        </button>
                    );
                })}
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
                        {filteredTopics.map((topic) => (
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
                                        onClick={() => checkDelete(topic)}
                                        className="inline-flex p-2 text-red-400 hover:bg-red-900/30 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredTopics.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    No topics found for this subject.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Confirm Deletion"
                footer={
                    <>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Delete Topic
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete the topic <span className="font-bold text-white">{selectedTopic?.name}</span>?
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-200 text-sm">
                        Warning: This will likely break any linked content.
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminTopics;
