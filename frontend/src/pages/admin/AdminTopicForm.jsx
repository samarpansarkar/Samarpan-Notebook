import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '@/api/client';
import { Save, ArrowLeft, HelpCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAllSubjects } from '@/store/slices/subjectSlice';
import GradientPicker from '@/components/admin/GradientPicker';

const AdminTopicForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const subjects = useSelector(selectAllSubjects);
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        topicId: '',
        subject: '',
        icon: 'Folder',
        color: 'from-blue-500 to-cyan-500',
        order: 0
    });

    useEffect(() => {
        if (isEdit) {
            const fetchTopic = async () => {
                try {
                    const { data } = await api.get(`/topics/${id}`);
                    setFormData(data);
                } catch (err) {
                    setError('Failed to fetch topic');
                }
            };
            fetchTopic();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));
    };

    useEffect(() => {
        if (!isEdit && formData.name) {
            const generatedId = formData.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, topicId: generatedId }));
        }
    }, [formData.name, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await api.put(`/topics/${id}`, formData);
            } else {
                await api.post('/topics', formData);
            }
            navigate('/admin/topics');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save topic');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link to="/admin/topics" className="text-gray-400 hover:text-white flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Topics
                </Link>
                <h2 className="text-2xl font-bold text-white">
                    {isEdit ? 'Edit Topic' : 'Add New Topic'}
                </h2>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Topic Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                placeholder="e.g. Hooks"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 group flex items-center gap-2">
                                Topic ID
                                <span className="text-xs bg-gray-600 px-1.5 rounded text-gray-300">Auto-generated</span>
                            </label>
                            <input
                                type="text"
                                name="topicId"
                                value={formData.topicId}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-400 font-mono text-sm"
                                placeholder="e.g. hooks"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Subject</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                required
                            >
                                <option value="">Select a Subject</option>
                                {subjects.map(sub => (
                                    <option key={sub._id} value={sub.path.replace('/', '')}>
                                        {sub.title} ({sub.name})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Icon (Lucide Name)</label>
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                placeholder="e.g. Folder, Layers, Box"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Pick an icon from <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">lucide.dev</a>
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Topic Color Gradient</label>
                        <GradientPicker
                            value={formData.color}
                            onChange={(color) => setFormData(prev => ({ ...prev, color }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-32 bg-gray-700 border border-gray-600 rounded p-2 text-white"
                            placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first in the sidebar.</p>
                    </div>

                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        to="/admin/topics"
                        className="px-6 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Topic'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminTopicForm;
