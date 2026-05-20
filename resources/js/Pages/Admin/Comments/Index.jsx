import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { useMemo, useState } from 'react';

export default function Index({ comments, filters }) {
    const { delete: destroy } = useForm();
    const [selectedIds, setSelectedIds] = useState([]);

    const updateStatus = (id, status) => {
        router.patch(route('admin.comments.update-status', id), { status }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            destroy(route('admin.comments.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === comments.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(comments.data.map(comment => comment.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const bulkAction = (action) => {
        if (!selectedIds.length) return;

        const confirmText = {
            approve: 'Approve selected comments?',
            pending: 'Mark selected comments as pending?',
            spam: 'Mark selected comments as spam?',
            delete: 'Delete selected comments? This cannot be undone.',
        };

        if (!confirm(confirmText[action])) return;

        router.post(route('admin.comments.bulk-action'), {
            ids: selectedIds,
            action,
        }, {
            preserveScroll: true,
            onSuccess: () => setSelectedIds([]),
        });
    };

    const applyFilter = (key, value) => {
        router.get(route('admin.comments.index'), {
            ...filters,
            [key]: value,
            page: 1,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const statusTabs = [
        { key: 'all', label: 'All' },
        { key: 'pending', label: 'Pending' },
        { key: 'approved', label: 'Approved' },
        { key: 'spam', label: 'Spam' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Comment Moderation</h2>
                    <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Review and manage user feedback on your articles</p>
                </div>
            }
        >
            <Head title="Comments Management" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    {/* Filters */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-5">
                        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                            <div className="flex flex-wrap gap-2">
                                {statusTabs.map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => applyFilter('status', tab.key)}
                                        className={`px-4 py-2 rounded-full text-sm font-mikhak-bold transition-colors ${filters.status === tab.key
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    defaultValue={filters.search}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            applyFilter('search', e.currentTarget.value);
                                        }
                                    }}
                                    placeholder="Search comments..."
                                    className="w-full sm:w-72 rounded-full border-slate-200 focus:border-slate-400 focus:ring-slate-200 text-sm"
                                />
                                <button
                                    onClick={() => applyFilter('search', document.querySelector('input[placeholder="Search comments..."]').value)}
                                    className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-mikhak-bold hover:bg-slate-800"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {selectedIds.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2 items-center justify-between border-t border-slate-100 pt-4">
                                <p className="text-sm text-slate-600 font-mikhak-regular">
                                    {selectedIds.length} selected
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => bulkAction('approve')} className="px-3 py-2 rounded-full text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                                        Approve
                                    </button>
                                    <button onClick={() => bulkAction('pending')} className="px-3 py-2 rounded-full text-sm bg-amber-50 text-amber-700 hover:bg-amber-100">
                                        Pending
                                    </button>
                                    <button onClick={() => bulkAction('spam')} className="px-3 py-2 rounded-full text-sm bg-rose-50 text-rose-700 hover:bg-rose-100">
                                        Spam
                                    </button>
                                    <button onClick={() => bulkAction('delete')} className="px-3 py-2 rounded-full text-sm bg-slate-900 text-white hover:bg-slate-800">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 w-12">
                                            <input
                                                type="checkbox"
                                                checked={comments.data.length > 0 && selectedIds.length === comments.data.length}
                                                onChange={toggleSelectAll}
                                                className="rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                                            />
                                        </th>
                                        <th className="px-6 py-4 w-1/4">Author</th>
                                        <th className="px-6 py-4 w-1/3">Comment</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {comments.data.map((comment) => (
                                        <tr key={comment.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(comment.id)}
                                                    onChange={() => toggleSelect(comment.id)}
                                                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-mikhak-bold">
                                                        {comment.author_name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-mikhak-bold text-slate-900">{comment.author_name}</div>
                                                        <div className="text-xs text-slate-500 font-mikhak-regular">
                                                            {new Date(comment.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-700 font-mikhak-regular max-w-md truncate" title={comment.content}>
                                                    {comment.content}
                                                </div>
                                                {comment.article && (
                                                    <Link
                                                        href={route('blog.show', comment.article.slug)}
                                                        className="text-xs text-indigo-500 font-mikhak-medium mt-1 truncate max-w-md inline-block hover:underline"
                                                    >
                                                        On: {comment.article.title.en}
                                                    </Link>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mikhak-bold ${comment.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                        comment.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                            'bg-rose-50 text-rose-700 border border-rose-200'
                                                    }`}>
                                                    {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {comment.status !== 'approved' && (
                                                        <button
                                                            onClick={() => updateStatus(comment.id, 'approved')}
                                                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="Approve"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    {comment.status !== 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(comment.id, 'pending')}
                                                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Mark as Pending"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(comment.id)}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {comments.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-sm font-mikhak-bold text-slate-900 mb-1">No comments yet</h3>
                                                <p className="text-sm text-slate-500 font-mikhak-regular mb-4">When users comment on articles, they will appear here.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <Pagination links={comments.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}