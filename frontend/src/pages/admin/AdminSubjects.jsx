import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, BookOpen } from 'lucide-react';
import api from '@/api/client';

const AdminSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/subjects');
            setSubjects(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch subjects');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            try {
                await api.delete(`/subjects/${id}`);
                setSubjects(subjects.filter(sub => sub._id !== id));
            } catch (err) {
                alert('Failed to delete subject');
            }
        }
    };

    if (loading) return <div className="text-white">Loading subjects...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="text-indigo-500" />
                    Manage Subjects
                </h2>
                <Link
                    to="/admin/subjects/new"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Subject
                </Link>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-750 text-gray-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b border-gray-700">Name</th>
                            <th className="p-4 border-b border-gray-700">Path</th>
                            <th className="p-4 border-b border-gray-700">Title</th>
                            <th className="p-4 border-b border-gray-700">Color</th>
                            <th className="p-4 border-b border-gray-700">Icon</th>
                            <th className="p-4 border-b border-gray-700">Order</th>
                            <th className="p-4 border-b border-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {subjects.map((subject) => (
                            <tr key={subject._id} className="hover:bg-gray-750 transition-colors">
                                <td className="p-4 font-medium text-white">
                                    {subject.name}
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-sm">
                                    {subject.path}
                                </td>
                                <td className="p-4">
                                    {subject.title}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full ${subject.color.replace('text-', 'bg-')}`}></div>
                                        <span className="text-xs text-gray-500 font-mono">{subject.color}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-indigo-400">
                                    {subject.icon}
                                </td>
                                <td className="p-4">
                                    {subject.order}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        to={`/admin/subjects/edit/${subject._id}`}
                                        className="inline-flex p-2 text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(subject._id)}
                                        className="inline-flex p-2 text-red-400 hover:bg-red-900/30 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {subjects.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No subjects found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSubjects;
