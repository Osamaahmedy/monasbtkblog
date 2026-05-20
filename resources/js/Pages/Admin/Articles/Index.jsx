import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Index({ articles }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this article?')) {
            destroy(route('admin.articles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Articles</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Manage and organize your publications</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-2.5 font-mikhak-medium shadow-sm"
                            value={new URLSearchParams(window.location.search).get('per_page') || '5'}
                            onChange={(e) => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('per_page', e.target.value);
                                url.searchParams.set('page', '1'); // Reset to page 1 on limit change
                                window.location.href = url.toString();
                            }}
                        >
                            <option value="5">5 per page</option>
                            <option value="10">10 per page</option>
                            <option value="25">25 per page</option>
                            <option value="50">50 per page</option>
                        </select>
                        <Link
                            href={route('admin.articles.create')}
                            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 border border-transparent rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create Article
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Articles Management" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4">Article</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Author</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {articles.data.map((article) => (
                                        <tr key={article.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden bg-slate-100">
                                                        {article.image ? (
                                                            <img className="h-12 w-12 object-cover" src={`/storage/${article.image}`} alt="" />
                                                        ) : (
                                                            <div className="h-12 w-12 flex items-center justify-center text-slate-400">
                                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-mikhak-bold text-slate-900 line-clamp-1">{article.title.en}</div>
                                                        <div className="text-xs font-mikhak-regular text-slate-500 line-clamp-1 mt-0.5" dir="rtl">{article.title.ar}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mikhak-medium bg-slate-100 text-slate-800">
                                                    {article.category?.title?.en || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mikhak-regular text-slate-700">
                                                {article.user?.name || 'Admin'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mikhak-bold ${
                                                    article.status === 'published' 
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <a href={route('blog.show', article.slug)} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors" title="View Public Page">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </a>
                                                    <Link href={route('admin.articles.edit', article.id)} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Edit Article">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                        </svg>
                                                    </Link>
                                                    <button onClick={() => handleDelete(article.id)} className="text-slate-400 hover:text-rose-600 transition-colors" title="Delete Article">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {articles.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-sm font-mikhak-bold text-slate-900 mb-1">No articles found</h3>
                                                <p className="text-sm text-slate-500 font-mikhak-regular mb-4">Get started by creating a new article.</p>
                                                <Link href={route('admin.articles.create')} className="text-indigo-600 hover:text-indigo-700 font-mikhak-bold text-sm">
                                                    Create your first article &rarr;
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <Pagination links={articles.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
