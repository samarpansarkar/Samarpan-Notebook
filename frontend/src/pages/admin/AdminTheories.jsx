import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/client';
import { useSelector } from 'react-redux';
import { selectAllSubjects } from '@/store/slices/subjectSlice';
import { Edit, Trash2, Plus, BookOpen, FileText, Filter } from 'lucide-react';
import Modal from '@/components/common/Modal';

const AdminTheories = () => {
    const subjects = useSelector(selectAllSubjects);
    const [theories, setTheories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filtering State
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');

    const fetchData = async () => {
        try {
            const [theoriesRes, topicsRes] = await Promise.all([
                api.get('/theory'),
                api.get('/topics')
            ]);
            setTheories(theoriesRes.data);
            setTopics(topicsRes.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch content');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Set default subject once subjects are loaded
    useEffect(() => {
        if (!selectedSubject && subjects.length > 0) {
            setSelectedSubject(subjects[0].path.replace('/', ''));
        }
    }, [subjects, selectedSubject]);

    // Derived Data for Filters (Topics for the selected subject)
    const filteredTopics = useMemo(() => {
        return !selectedSubject
            ? []
            : topics.filter(t => (t.subject || '').toLowerCase() === selectedSubject.toLowerCase() || t.subject === selectedSubject || t.path?.includes(selectedSubject));
    }, [selectedSubject, topics]);

    // Set default topic when filteredTopics changes (e.g., subject changed)
    useEffect(() => {
        // If we have topics, default to 'All' if current selection is invalid or empty
        if (filteredTopics.length > 0) {
            const isValid = filteredTopics.some(t => t.topicId === selectedTopic);
            if (selectedTopic !== 'All' && !isValid) {
                setSelectedTopic('All');
            }
        } else {
            setSelectedTopic('All');
        }
    }, [filteredTopics, selectedTopic]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTheory, setSelectedTheory] = useState(null);

    const checkDelete = (theory) => {
        setSelectedTheory(theory);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedTheory) return;

        try {
            await api.delete(`/theory/${selectedTheory.topicId}`);
            fetchData();
            setShowDeleteModal(false);
            setSelectedTheory(null);
        } catch (err) {
            console.error("Failed to delete content", err);
        }
    };

    // Filtering Logic
    const filteredTheories = theories.filter(theory => {
        if (!selectedSubject) return false;

        // Step 1: Filter by Subject
        const subjectKey = selectedSubject.toLowerCase();
        const theorySubject = (theory.subject || '').toLowerCase();
        if (theorySubject !== subjectKey && !theory.topicId?.includes(subjectKey)) {
            return false;
        }

        // Step 2: Filter by Topic
        if (selectedTopic !== 'All') {
            if (theory.topicId !== selectedTopic && theory.section !== selectedTopic) {
                return false;
            }
        }

        return true;
    });

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="text-indigo-500" />
                    Manage Content (Theory)
                </h2>
                <Link
                    to="/admin/topic/new"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={18} /> Add Content
                </Link>
            </div>

            {/* Filters Section */}
            <div className="space-y-4 mb-6">

                {/* Level 1: Subject Filter */}
                <div className="flex flex-wrap gap-2">
                    {subjects.map(subject => {
                        const subjectKey = subject.path.replace('/', '');
                        return (
                            <button
                                key={subject._id}
                                onClick={() => {
                                    setSelectedSubject(subjectKey);
                                    // Topic will update via useEffect to 'All'
                                }}
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

                {/* Level 2: Topic Filter */}
                {selectedSubject && filteredTopics.length > 0 && (
                    <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                        <Filter size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-400">Filter by Topic:</span>
                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none"
                        >
                            <option value="All">All Topics</option>
                            {filteredTopics.map(topic => (
                                <option key={topic._id} value={topic.topicId}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-750 text-gray-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b border-gray-700">Title</th>
                            <th className="p-4 border-b border-gray-700">ID</th>
                            <th className="p-4 border-b border-gray-700">Section</th>
                            <th className="p-4 border-b border-gray-700">Level</th>
                            <th className="p-4 border-b border-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {filteredTheories.map((theory) => (
                            <tr key={theory._id} className="hover:bg-gray-750 transition-colors">
                                <td className="p-4 font-medium text-white flex items-center gap-2">
                                    <FileText size={16} className="text-gray-500" />
                                    {theory.title}
                                </td>
                                <td className="p-4 font-mono text-sm text-gray-500">{theory.topicId}</td>
                                <td className="p-4 text-indigo-400">{theory.section}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold
                                        ${theory.level === 'beginner' ? 'bg-green-900/30 text-green-400' :
                                            theory.level === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                                                theory.level === 'hard' || theory.level === 'expert' ? 'bg-red-900/30 text-red-400' :
                                                    'bg-gray-700 text-gray-300'}`}>
                                        {theory.level}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        to={`/admin/topic/edit/${theory.topicId}`}
                                        className="inline-flex p-2 text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => checkDelete(theory)}
                                        className="inline-flex p-2 text-red-400 hover:bg-red-900/30 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredTheories.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    No content found matching filter.
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
                            Delete Content
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete <span className="font-bold text-white">{selectedTheory?.title}</span>?
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-200 text-sm">
                        Warning: This action cannot be undone.
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminTheories;

