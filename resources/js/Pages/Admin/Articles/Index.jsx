import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { useState } from 'react';

const STATUS_CFG = {
    published: { label: 'Published', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    draft:     { label: 'Draft',     cls: 'bg-amber-50  text-amber-700  border-amber-200'  },
};

export default function Index({ articles, filters }) {
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState(filters?.search || '');

    const handleDelete = (id) => {
        if (confirm('Delete this article? This cannot be undone.'))
            destroy(route('admin.articles.destroy', id));
    };

    const applyFilter = (key, value) =>
        router.get(route('admin.articles.index'), { ...filters, [key]: value, page: 1 }, { preserveState: true, replace: true });

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter('search', search);
    };

    const currentPerPage = filters?.per_page || '10';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Articles</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">
                            Manage your publications
                            {articles.total > 0 && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mikhak-bold bg-indigo-100 text-indigo-700">
                                    {articles.total} total
                                </span>
                            )}
                        </p>
                    </div>
                    <Link
                        href={route('admin.articles.create')}
                        className="inline-flex items-center px-5 py-2.5 bg-indigo-600 rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Article
                    </Link>
                </div>
            }
        >
            <Head title="Articles Management" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-slate-100">
                            {/* Status filter tabs */}
                            <div className="flex gap-1.5">
                                {[
                                    { key: 'all',       label: 'All' },
                                    { key: 'published', label: 'Published' },
                                    { key: 'draft',     label: 'Draft' },
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => applyFilter('status', tab.key)}
                                        className={`px-3.5 py-1.5 rounded-xl text-sm font-mikhak-bold transition-all ${
                                            (filters?.status || 'all') === tab.key
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search + per page */}
                            <div className="flex items-center gap-2">
                                <form onSubmit={handleSearch} className="flex items-center gap-2">
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            placeholder="Search articles..."
                                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mikhak-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 w-48 transition-all"
                                        />
                                    </div>
                                    <button type="submit" className="px-3 py-2 bg-slate-900 text-white text-sm font-mikhak-bold rounded-xl hover:bg-slate-800 transition-colors">
                                        Search
                                    </button>
                                </form>
                                <select
                                    value={currentPerPage}
                                    onChange={e => applyFilter('per_page', e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 font-mikhak-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="5">5/page</option>
                                    <option value="10">10/page</option>
                                    <option value="25">25/page</option>
                                    <option value="50">50/page</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                                        <th className="px-5 py-3.5">Article</th>
                                        <th className="px-5 py-3.5">Category</th>
                                        <th className="px-5 py-3.5">Author</th>
                                        <th className="px-5 py-3.5 text-center">Status</th>
                                        <th className="px-5 py-3.5 text-center">Date</th>
                                        <th className="px-5 py-3.5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {articles.data.map((article) => (
                                        <tr key={article.id} className="hover:bg-slate-50/60 transition-colors group">
                                            {/* Article */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 h-12 w-16 rounded-xl overflow-hidden bg-slate-100">
                                                        {article.image ? (
                                                            <img className="h-full w-full object-cover" src={`/storage/${article.image}`} alt="" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-slate-300">
                                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-mikhak-bold text-slate-900 line-clamp-1">{article.title?.en}</div>
                                                        <div className="text-xs font-mikhak-regular text-slate-500 line-clamp-1 mt-0.5" dir="rtl">{article.title?.ar}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mikhak-medium bg-slate-100 text-slate-700">
                                                    {article.category?.title?.en || '—'}
                                                </span>
                                            </td>

                                            {/* Author */}
                                            <td className="px-5 py-4 text-sm font-mikhak-regular text-slate-600">
                                                {article.user?.name || 'Admin'}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mikhak-bold border ${
                                                    STATUS_CFG[article.status]?.cls || 'bg-slate-100 text-slate-600 border-slate-200'
                                                }`}>
                                                    {STATUS_CFG[article.status]?.label || article.status}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-center text-xs text-slate-500 font-mikhak-regular">
                                                {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {article.status === 'published' && (
                                                        <a
                                                            href={route('blog.show', article.slug)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                            title="View Article"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={route('admin.articles.edit', article.id)}
                                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(article.id)}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {articles.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-16 text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-sm font-mikhak-bold text-slate-900 mb-1">No articles found</h3>
                                                <p className="text-sm text-slate-500 font-mikhak-regular mb-4">
                                                    {filters?.search ? 'Try adjusting your search.' : 'Get started by creating a new article.'}
                                                </p>
                                                <Link href={route('admin.articles.create')} className="text-indigo-600 hover:text-indigo-700 font-mikhak-bold text-sm">
                                                    Create your first article →
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {articles.total > 0 && (
                            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <p className="text-xs text-slate-500 font-mikhak-regular">
                                    Showing <span className="font-mikhak-bold text-slate-700">{articles.from}</span>–<span className="font-mikhak-bold text-slate-700">{articles.to}</span> of <span className="font-mikhak-bold text-slate-700">{articles.total}</span> articles
                                </p>
                                <Pagination links={articles.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
