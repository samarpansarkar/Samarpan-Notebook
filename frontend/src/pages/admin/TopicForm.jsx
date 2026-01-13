import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/client';
import { Save, ArrowLeft, Plus, Trash } from 'lucide-react';
import { iconRegistry, componentRegistry } from '../../utils/componentRegistry';

const TopicForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        topicId: '',
        title: '',
        category: 'core',
        section: 'hooks',
        icon: 'Box',
        description: '',
        componentKey: '',
        theory: {
            overview: '',
            definition: '',
            syntax: '',
            realLifeScenario: '',
            deepDive: '',
            pros: [''],
            cons: [''],
            whenToUse: [''],
            tips: [''],
            commonPitfalls: [''],
        },
    });

    useEffect(() => {
        if (isEdit) {
            const fetchTopic = async () => {
                try {
                    const { data } = await api.get(`/topics/${id}`);
                    // Ensure arrays are initialized if missing from DB
                    const theory = {
                        ...data.theory,
                        pros: data.theory.pros?.length ? data.theory.pros : [''],
                        cons: data.theory.cons?.length ? data.theory.cons : [''],
                        whenToUse: data.theory.whenToUse?.length ? data.theory.whenToUse : [''],
                        tips: data.theory.tips?.length ? data.theory.tips : [''],
                        commonPitfalls: data.theory.commonPitfalls?.length ? data.theory.commonPitfalls : [''],
                    }
                    setFormData({ ...data, theory });
                } catch (err) {
                    setError('Failed to fetch topic data');
                }
            };
            fetchTopic();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => {
            const newArray = [...prev.theory[field]];
            newArray[index] = value;
            return {
                ...prev,
                theory: {
                    ...prev.theory,
                    [field]: newArray
                }
            };
        });
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            theory: {
                ...prev.theory,
                [field]: [...prev.theory[field], '']
            }
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => {
            const newArray = prev.theory[field].filter((_, i) => i !== index);
            return {
                ...prev,
                theory: {
                    ...prev.theory,
                    [field]: newArray
                }
            };
        });
    };

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
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save topic');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                    {isEdit ? `Edit Topic: ${id}` : 'Create New Topic'}
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

            <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800 p-8 rounded-lg border border-gray-700">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-indigo-400 border-b border-gray-700 pb-2">Basic Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Topic ID (URL Slug)</label>
                            <input
                                type="text"
                                name="topicId"
                                value={formData.topicId}
                                onChange={handleChange}
                                disabled={isEdit}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white disabled:opacity-50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Category (e.g. core, advanced)</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Section (Group)</label>
                            <select
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                            >
                                <option value="hooks">React Hooks</option>
                                <option value="concepts">Other Concepts</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Icon</label>
                            <select
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                            >
                                {Object.keys(iconRegistry).map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Component Demo</label>
                            <select
                                name="componentKey"
                                value={formData.componentKey}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                            >
                                <option value="">None</option>
                                {Object.keys(componentRegistry).map(comp => (
                                    <option key={comp} value={comp}>{comp}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Short Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-20"
                        />
                    </div>
                </div>

                {/* Theory Content */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-indigo-400 border-b border-gray-700 pb-2">Theory Content</h3>

                    <div className="space-y-4">
                        {['overview', 'definition', 'syntax', 'realLifeScenario', 'deepDive'].map(field => (
                            <div key={field}>
                                <label className="block text-sm text-gray-400 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                                <textarea
                                    name={`theory.${field}`}
                                    value={formData.theory[field]}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-24 font-mono text-sm"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Arrays: Pros, Cons, etc */}
                    {['pros', 'cons', 'whenToUse', 'tips', 'commonPitfalls'].map(field => (
                        <div key={field} className="space-y-2">
                            <label className="block text-sm text-gray-400 font-bold capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                            {formData.theory[field].map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleArrayChange(field, index, e.target.value)}
                                        className="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem(field, index)}
                                        className="text-red-400 hover:text-red-300 p-2"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem(field)}
                                className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1"
                            >
                                <Plus size={14} /> Add Item
                            </button>
                        </div>
                    ))}

                </div>

                <div className="pt-4 border-t border-gray-700 flex justify-end">
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

export default TopicForm;
