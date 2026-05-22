import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Index({ categories }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            destroy(route('admin.categories.destroy', id));
        }
    };

    const handlePerPageChange = (e) => {
        const url = new URL(window.location.href);
        url.searchParams.set('per_page', e.target.value);
        url.searchParams.set('page', '1');
        router.visit(url.toString(), { preserveScroll: false });
    };

    const currentPerPage = new URLSearchParams(window.location.search).get('per_page') || '10';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Categories</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">
                            Manage and organize your article categories
                            {categories.total > 0 && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mikhak-bold bg-indigo-100 text-indigo-700">
                                    {categories.total} total
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-2.5 font-mikhak-medium shadow-sm"
                            value={currentPerPage}
                            onChange={handlePerPageChange}
                        >
                            <option value="5">5 per page</option>
                            <option value="10">10 per page</option>
                            <option value="25">25 per page</option>
                            <option value="50">50 per page</option>
                        </select>
                        <Link
                            href={route('admin.categories.create')}
                            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 border border-transparent rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Category
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Categories Management" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 w-16">Image</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-center">Articles</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {categories.data.map((category) => (
                                        <tr key={category.id} className="hover:bg-slate-50/60 transition-colors group">
                                            {/* Image */}
                                            <td className="px-6 py-4">
                                                <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                                                    {category.image ? (
                                                        <img
                                                            src={`/storage/${category.image}`}
                                                            alt={category.title?.en || ''}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Title */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-mikhak-bold text-slate-900">{category.title?.en}</div>
                                                <div className="text-xs font-mikhak-regular text-slate-500 mt-0.5" dir="rtl">{category.title?.ar}</div>
                                            </td>

                                            {/* Articles count */}
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mikhak-bold bg-slate-100 text-slate-600">
                                                    {category.articles_count ?? '—'}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={route('admin.categories.edit', category.id)}
                                                        className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mikhak-medium text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors shadow-sm"
                                                        title="Edit Category"
                                                    >
                                                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mikhak-medium text-slate-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors shadow-sm"
                                                        title="Delete Category"
                                                    >
                                                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Empty State */}
                                    {categories.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-16 text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-sm font-mikhak-bold text-slate-900 mb-1">No categories yet</h3>
                                                <p className="text-sm text-slate-500 font-mikhak-regular mb-4">Get started by creating your first category.</p>
                                                <Link
                                                    href={route('admin.categories.create')}
                                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-mikhak-bold text-sm"
                                                >
                                                    Create your first category →
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer: pagination info + component */}
                        {categories.total > 0 && (
                            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <p className="text-xs text-slate-500 font-mikhak-regular">
                                    Showing <span className="font-mikhak-bold text-slate-700">{categories.from}</span>–<span className="font-mikhak-bold text-slate-700">{categories.to}</span> of <span className="font-mikhak-bold text-slate-700">{categories.total}</span> categories
                                </p>
                                <Pagination links={categories.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
