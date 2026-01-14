import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api/client';
import { Save, ArrowLeft } from 'lucide-react';
import { useSubjects } from '@/context/SubjectContext';
import GradientPicker from '@/components/admin/GradientPicker';

const SubjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refreshSubjects } = useSubjects();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        path: '',
        icon: 'Box',
        color: 'from-blue-500 to-cyan-500',
        order: 0
    });

    useEffect(() => {
        if (isEdit) {
            const fetchSubject = async () => {
                try {
                    const { data } = await api.get(`/subjects/${id}`);
                    setFormData(data);
                } catch (err) {
                    setError('Failed to fetch subject data');
                }
            };
            fetchSubject();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' && !isEdit && !formData.path) {
            setFormData(prev => ({
                ...prev,
                name: value,
                path: '/' + value.toLowerCase().replace(/\s+/g, '-')
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await api.put(`/subjects/${id}`, formData);
            } else {
                await api.post('/subjects', formData);
            }
            await refreshSubjects();
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save subject');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                    {isEdit ? `Edit Subject: ${formData.name}` : 'Create New Subject'}
                </h2>
                <button
                    type="button"
                    onClick={() => navigate('/admin/dashboard')}
                    className="text-gray-400 hover:text-white flex items-center gap-2"
                >
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg border border-gray-700">

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Subject Name (Internal ID)</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. React"
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Display Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. React.js Mastery"
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">URL Path</label>
                    <input
                        type="text"
                        name="path"
                        value={formData.path}
                        onChange={handleChange}
                        placeholder="e.g. /react"
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Icon (Lucide Name)</label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="e.g. Atom"
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Pick an icon from <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">lucide.dev</a>
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Order (Sort Priority)</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Gradient Color</label>
                    <GradientPicker
                        value={formData.color}
                        onChange={(val) => setFormData(prev => ({ ...prev, color: val }))}
                    />
                </div>

                <div className="pt-4 border-t border-gray-700 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Subject'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default SubjectForm;
