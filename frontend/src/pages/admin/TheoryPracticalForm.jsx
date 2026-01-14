import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api/client';
import { Save, ArrowLeft, Plus, Trash } from 'lucide-react';
import { iconRegistry, componentRegistry } from '@/utils/componentRegistry';
import { useTopics } from '@/context/TopicContext';
import { useSubjects } from '@/context/SubjectContext';

const TheoryPracticalForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refreshTopics } = useTopics();
    const { subjects } = useSubjects();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        topicId: '',
        title: '',
        level: 'beginner',
        section: 'hooks',
        subject: 'react',
        icon: 'Box',
        description: '',
        componentKey: '',
        liveCode: '',
        order: 0,
        sectionOrder: 0,
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
        if (!isEdit && subjects.length > 0) {
            const firstSubject = subjects[0].path.replace('/', '');
            setFormData(prev => ({ ...prev, subject: firstSubject }));
        }
    }, [subjects, isEdit]);

    const [availableTopics, setAvailableTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data } = await api.get('/topics');
                setAvailableTopics(data);
            } catch (err) {
                console.error("Failed to fetch topics", err);
            }
        };
        fetchTopics();
    }, []);

    const filteredTopics = availableTopics.filter(
        t => t.subject === formData.subject
    );

    useEffect(() => {
        if (isEdit) {
            const fetchTopic = async () => {
                try {
                    const { data } = await api.get(`/theory/${id}`);
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

    useEffect(() => {
        if (!isEdit && formData.title) {
            const generatedId = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, topicId: generatedId }));
        }
    }, [formData.title, isEdit]);

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
                await api.put(`/theory/${id}`, formData);
            } else {
                await api.post('/theory', formData);
            }
            await refreshTopics();
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
                    {isEdit ? `Edit Content: ${id}` : 'Add Theory & Practical'}
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

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-indigo-400 border-b border-gray-700 pb-2">Basic Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                placeholder="e.g. useEffect Hook"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 group flex items-center gap-2">
                                Content ID (URL Slug)
                                <span className="text-xs bg-gray-600 px-1.5 rounded text-gray-300">Auto-generated</span>
                            </label>
                            <input
                                type="text"
                                name="topicId"
                                value={formData.topicId}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-400 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Subject</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                required
                            >
                                {subjects.map(sub => (
                                    <option key={sub.path} value={sub.path.replace('/', '')}>{sub.title} ({sub.name})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Topic (Group)</label>
                            <div className="flex gap-2">
                                <select
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select a Topic</option>
                                    {filteredTopics.map(topic => (
                                        <option key={topic._id} value={topic.topicId}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/topics/new')}
                                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-white transition-colors border border-gray-600"
                                    title="Create New Topic"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            {filteredTopics.length === 0 && (
                                <p className="text-xs text-yellow-500 mt-1 flex items-center gap-1">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                    No topics found for this subject. Please create a topic first.
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Level</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                required
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="hard">Hard</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Section Order</label>
                            <input
                                type="number"
                                name="sectionOrder"
                                value={formData.sectionOrder}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Icon (Lucide Name)</label>
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                placeholder="e.g. Zap, Activity, Home"
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Enter exact component name from <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">lucide.dev</a>
                            </p>
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
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Order (Sort Priority)</label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Live Component Code (Optional)</label>
                        <p className="text-xs text-gray-500 mb-2">
                            Write standard React code. The component is already wrapped in a function, just write the return statement or hook logic.
                            Example: <code className="text-indigo-400">{'<button onClick={() => alert("Hi")}>Click Me</button>'}</code>
                        </p>
                        <textarea
                            name="liveCode"
                            value={formData.liveCode}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-600 rounded p-4 text-green-400 font-mono text-sm h-48"
                            placeholder="<div>Your JSX here</div>"
                        />
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
                        {loading ? 'Saving...' : 'Save Content'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default TheoryPracticalForm;
