import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Index({ categories }) {
    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        title: { en: '', ar: '' },
        description: { en: '', ar: '' },
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Categories</h2>
                    <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Manage and organize your article categories</p>
                </div>
            }
        >
            <Head title="Categories Management" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Form Section */}
                    <div className="p-8 bg-white shadow-sm rounded-3xl border border-slate-100">
                        <header className="mb-6">
                            <h3 className="text-lg font-mikhak-bold text-slate-900">
                                Add New Category
                            </h3>
                        </header>

                        <form onSubmit={submit} className="space-y-6 max-w-3xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block font-mikhak-bold text-sm text-slate-700">Title (EN)</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400"
                                        value={data.title.en}
                                        onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                                        placeholder="e.g. Events"
                                        required
                                    />
                                    {errors['title.en'] && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors['title.en']}</div>}
                                </div>
                                <div className="space-y-2">
                                    <label className="block font-mikhak-bold text-sm text-slate-700 text-right">العنوان (AR)</label>
                                    <input
                                        type="text"
                                        dir="rtl"
                                        className="mt-1 block w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400"
                                        value={data.title.ar}
                                        onChange={(e) => setData('title', { ...data.title, ar: e.target.value })}
                                        placeholder="مثلاً: فعاليات"
                                        required
                                    />
                                    {errors['title.ar'] && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium text-right">{errors['title.ar']}</div>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-mikhak-bold text-sm text-slate-700">Category Image</label>
                                <label className="flex flex-col items-center px-4 py-8 bg-slate-50 text-slate-400 rounded-2xl border-2 border-slate-200 border-dashed cursor-pointer hover:bg-slate-100 hover:border-indigo-400 transition-all">
                                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-sm font-mikhak-medium text-slate-600">{data.image ? data.image.name : 'Click to upload image'}</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                </label>
                                {errors.image && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.image}</div>}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-xl font-mikhak-bold text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:bg-indigo-800 transition-all duration-200 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white shadow-sm rounded-3xl border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {categories.data.map((category) => (
                                        <tr key={category.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
                                                    {category.image ? (
                                                        <img src={`/storage/${category.image}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-mikhak-bold text-slate-900">{category.title.en}</div>
                                                <div className="text-xs font-mikhak-regular text-slate-500 mt-0.5" dir="rtl">{category.title.ar}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link 
                                                        href={route('admin.categories.edit', category.id)} 
                                                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                                                        title="Edit Category"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                        </svg>
                                                    </Link>
                                                    <button 
                                                        onClick={() => { if(confirm('Are you sure you want to delete this category?')) destroy(route('admin.categories.destroy', category.id)) }}
                                                        className="text-slate-400 hover:text-rose-600 transition-colors"
                                                        title="Delete Category"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {categories.data.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center">
                                                <p className="text-sm text-slate-500 font-mikhak-regular">No categories found. Create one above.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <Pagination links={categories.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
