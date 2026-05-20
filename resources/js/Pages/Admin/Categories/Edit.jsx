import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: category.title || { en: '', ar: '' },
        description: category.description || { en: '', ar: '' },
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.update', category.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Edit Category</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Update category information and image</p>
                    </div>
                    <Link
                        href={route('admin.categories.index')}
                        className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl font-mikhak-medium text-sm text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Categories
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Category: ${category.title.en}`} />

            <div className="py-8">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-8 bg-white shadow-sm rounded-3xl border border-slate-100">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block font-mikhak-bold text-sm text-slate-700">Title (EN)</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400"
                                        value={data.title.en}
                                        onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
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
                                        required
                                    />
                                    {errors['title.ar'] && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium text-right">{errors['title.ar']}</div>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-mikhak-bold text-sm text-slate-700">Category Image</label>
                                
                                {category.image && !data.image && (
                                    <div className="mb-4">
                                        <p className="text-xs text-slate-500 font-mikhak-regular mb-2">Current Image:</p>
                                        <img src={`/storage/${category.image}`} alt={category.title.en} className="h-32 w-32 object-cover rounded-xl border border-slate-200" />
                                    </div>
                                )}

                                <label className="flex flex-col items-center px-4 py-8 bg-slate-50 text-slate-400 rounded-2xl border-2 border-slate-200 border-dashed cursor-pointer hover:bg-slate-100 hover:border-indigo-400 transition-all">
                                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm font-mikhak-medium text-slate-600">{data.image ? data.image.name : 'Upload new image (optional)'}</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                </label>
                                {errors.image && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.image}</div>}
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-xl font-mikhak-bold text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:bg-indigo-800 transition-all duration-200 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
