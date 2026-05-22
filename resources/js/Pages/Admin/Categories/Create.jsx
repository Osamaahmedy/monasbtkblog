import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: { en: '', ar: '' },
        description: { en: '', ar: '' },
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Create Category</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Add a new category to organize your articles</p>
                    </div>
                    <Link
                        href={route('admin.categories.index')}
                        className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl font-mikhak-medium text-sm text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Categories
                    </Link>
                </div>
            }
        >
            <Head title="Create Category" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-3xl border border-slate-100 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-mikhak-bold text-slate-900">Category Details</h3>
                                    <p className="text-xs text-slate-500 font-mikhak-regular">Fill in the information below</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-8 space-y-7">
                            {/* Title Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block font-mikhak-bold text-sm text-slate-700">
                                        Title (English)
                                        <span className="text-rose-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full bg-slate-50 border focus:bg-white focus:ring-4 rounded-xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400 ${
                                            errors['title.en']
                                                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                                        }`}
                                        value={data.title.en}
                                        onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                                        placeholder="e.g. Technology, Events, Lifestyle"
                                        required
                                    />
                                    {errors['title.en'] && (
                                        <p className="text-rose-500 text-xs mt-1 font-mikhak-medium flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors['title.en']}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block font-mikhak-bold text-sm text-slate-700 text-right">
                                        العنوان (عربي)
                                        <span className="text-rose-500 mr-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        dir="rtl"
                                        className={`mt-1 block w-full bg-slate-50 border focus:bg-white focus:ring-4 rounded-xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400 text-right ${
                                            errors['title.ar']
                                                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                                        }`}
                                        value={data.title.ar}
                                        onChange={(e) => setData('title', { ...data.title, ar: e.target.value })}
                                        placeholder="مثلاً: تقنية، فعاليات، أسلوب حياة"
                                        required
                                    />
                                    {errors['title.ar'] && (
                                        <p className="text-rose-500 text-xs mt-1 font-mikhak-medium flex items-center justify-end">
                                            {errors['title.ar']}
                                            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-3">
                                <label className="block font-mikhak-bold text-sm text-slate-700">
                                    Category Image
                                    <span className="text-slate-400 font-mikhak-regular ml-1">(optional)</span>
                                </label>

                                {imagePreview ? (
                                    <div className="relative inline-block group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-40 w-40 object-cover rounded-2xl border-2 border-indigo-200 shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(null); setData('image', null); }}
                                            className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <label className="mt-3 flex items-center justify-center text-xs text-indigo-600 font-mikhak-medium cursor-pointer hover:text-indigo-700">
                                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Change image
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center px-4 py-10 bg-slate-50 text-slate-400 rounded-2xl border-2 border-slate-200 border-dashed cursor-pointer hover:bg-indigo-50/50 hover:border-indigo-300 transition-all group">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mb-3 transition-colors">
                                            <svg className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-mikhak-bold text-slate-600 group-hover:text-indigo-600 transition-colors">Click to upload image</span>
                                        <span className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 2MB</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                )}

                                {errors.image && (
                                    <p className="text-rose-500 text-xs font-mikhak-medium flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                                <Link
                                    href={route('admin.categories.index')}
                                    className="inline-flex items-center px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-mikhak-medium text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2.5 bg-indigo-600 border border-transparent rounded-xl font-mikhak-bold text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:bg-indigo-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0v4a8 8 0 00-8 8H0z" />
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Create Category
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
