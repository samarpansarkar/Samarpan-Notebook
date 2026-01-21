import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api/client';
import { Save, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import KeywordInput from '@/components/admin/KeywordInput';
import { fetchTopicsAndTheories } from '@/store/slices/topicSlice';
import { selectAllSubjects } from '@/store/slices/subjectSlice';
import RichTextEditor from '@/components/admin/RichTextEditor';
import AIGeneratorModal from '@/components/ai/AIGeneratorModal';
import RegenerationOptions from '@/components/ai/RegenerationOptions';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

const SimplifiedTheoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subjects = useSelector(selectAllSubjects);
    const isEdit = !!id;
    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMetadata, setShowMetadata] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);
    const [showRegenerateModal, setShowRegenerateModal] = useState(false);

    const [formData, setFormData] = useState({
        topicId: '',
        title: '',
        richContent: '',

        level: 'beginner',
        section: '',
        subject: '',
        icon: 'Box',
        description: '',
        liveCode: '',
        order: 0,
        sectionOrder: 0,
        keywords: [],
        componentKey: '',
    });

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
                    setFormData({
                        ...data,
                        richContent: data.richContent || '',
                    });
                    // Show metadata if it exists
                    if (data.subject || data.section || data.keywords?.length) {
                        setShowMetadata(true);
                    }
                } catch (err) {
                    setError('Failed to fetch content data');
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
        setFormData(prev => ({ ...prev, [name]: value }));
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
            dispatch(fetchTopicsAndTheories());
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save content');
        } finally {
            setLoading(false);
        }
    };

    const handleAIGenerated = (aiData) => {
        setFormData(prev => ({
            ...prev,
            title: aiData.title || prev.title,
            richContent: aiData.richContent || prev.richContent,
            description: aiData.description || prev.description,
            keywords: aiData.keywords || prev.keywords,
            level: aiData.level || prev.level,
            liveCode: aiData.liveCode || prev.liveCode
        }));


        if (aiData.description || aiData.keywords?.length) {
            setShowMetadata(true);
        }
    };

    const handleRegenerateFields = async (fields) => {
        if (!formData.title) {
            toast.error('Please add a title first');
            return;
        }

        try {
            toast.info('Regenerating selected fields...');

            const { data } = await api.post('/ai/generate', {
                topic: formData.title,
                subject: formData.subject,
                additionalContext: `Only regenerate these fields: ${fields.join(', ')}`
            });

            if (data.success) {
                // Only update selected fields
                const updates = {};
                fields.forEach(field => {
                    if (data.data[field]) {
                        updates[field] = data.data[field];
                    }
                });

                setFormData(prev => ({ ...prev, ...updates }));
                toast.success(`✨ Regenerated ${fields.length} field(s)`);
            }
        } catch (err) {
            toast.error('Failed to regenerate fields');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <AIGeneratorModal
                isOpen={showAIModal}
                onClose={() => setShowAIModal(false)}
                onGenerate={handleAIGenerated}
                initialSubject={formData.subject}
            />

            <RegenerationOptions
                isOpen={showRegenerateModal}
                onClose={() => setShowRegenerateModal(false)}
                onRegenerate={handleRegenerateFields}
            />

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                    {isEdit ? `Edit Content: ${formData.title}` : 'Create New Content'}
                </h2>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setShowAIModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-500/50 text-indigo-300 rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                    >
                        <Sparkles size={16} />
                        Generate with AI
                    </button>

                    {formData.title && (
                        <button
                            type="button"
                            onClick={() => setShowRegenerateModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 rounded-lg transition-all"
                        >
                            <RefreshCw size={16} />
                            Refine with AI
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="text-gray-400 hover:text-white flex items-center gap-2"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400 border-b border-gray-700 pb-2">
                            Content Details
                        </h3>


                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white text-lg focus:border-indigo-500 focus:outline-none"
                                placeholder="e.g. Understanding React Hooks"
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
                    </div>


                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Content <span className="text-red-400">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            Write your content using the rich text editor below. Format text, add images, code blocks, tables, and more - just like Microsoft Word!
                        </p>
                        <RichTextEditor
                            content={formData.richContent}
                            onChange={(html) => setFormData(prev => ({ ...prev, richContent: html }))}
                        />
                    </div>
                </div>


                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setShowMetadata(!showMetadata)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-750 transition-colors"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-400">
                                Organization & Linking
                            </h3>
                            <p className="text-xs text-orange-400 mt-1">
                                REQUIRED: Link to a Subject and Topic for this content to appear in the app navigation
                            </p>
                        </div>
                        {showMetadata ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                    </button>

                    {showMetadata && (
                        <div className="p-6 border-t border-gray-700 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="">None</option>
                                        {subjects.map(sub => (
                                            <option key={sub.path} value={sub.path.replace('/', '')}>{sub.title} ({sub.name})</option>
                                        ))}
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Topic (Group)</label>
                                    <select
                                        name="section"
                                        value={formData.section}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="">None</option>
                                        {filteredTopics.map(topic => (
                                            <option key={topic._id} value={topic.topicId}>
                                                {topic.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Difficulty Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="hard">Hard</option>
                                        <option value="expert">Expert</option>
                                    </select>
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
                                </div>


                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                                        placeholder="0"
                                    />
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
                            </div>


                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Short Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-20"
                                    placeholder="Brief summary of the content..."
                                />
                            </div>


                            <KeywordInput
                                value={formData.keywords}
                                onChange={(keywords) => setFormData(prev => ({ ...prev, keywords }))}
                            />


                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Live Component Code (Optional)</label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Write standard React code for interactive demo
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
                                <label className="block text-sm text-gray-400 mb-1">Internal Component Key (Advanced)</label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Links to a pre-built React component in the codebase (e.g. 'UseStateDemo')
                                </p>
                                <input
                                    type="text"
                                    name="componentKey"
                                    value={formData.componentKey || ''}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white font-mono text-sm"
                                    placeholder="e.g. UseStateDemo"
                                />
                            </div>
                        </div>
                    )}
                </div>


                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="px-6 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Content'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SimplifiedTheoryForm;
