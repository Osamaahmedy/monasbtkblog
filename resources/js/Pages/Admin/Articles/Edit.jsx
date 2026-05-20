import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Edit({ article, categories }) {
    const [lang, setLang] = useState('en');
    const [editorHeight, setEditorHeight] = useState('500px');
    const [draftStatus, setDraftStatus] = useState('');

    // Strict normalization to prevent Quill input blocking if database sends empty string or non-object content
    const normalizeObject = (val) => {
        if (typeof val === 'object' && val !== null) {
            return { en: val.en || '', ar: val.ar || '' };
        }
        try {
            if (typeof val === 'string' && val.trim() !== '') {
                const parsed = JSON.parse(val);
                if (typeof parsed === 'object' && parsed !== null) {
                    return { en: parsed.en || '', ar: parsed.ar || '' };
                }
            }
        } catch (e) {}
        return { en: '', ar: '' };
    };

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        _method: 'PUT',
        category_id: article.category_id,
        title: normalizeObject(article.title),
        short_description: normalizeObject(article.short_description),
        content: normalizeObject(article.content),
        image: null,
    });

    // Helper functions for counts
    const getWordCount = (html) => {
        if (!html) return 0;
        const text = html.replace(/<[^>]*>/g, '').trim();
        return text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    };

    const getCharCount = (html) => {
        if (!html) return 0;
        return html.replace(/<[^>]*>/g, '').length;
    };

    const isContentEmpty = (html) => {
        if (!html) return true;
        const text = html.replace(/<[^>]*>/g, '').trim();
        return text.length === 0;
    };

    // Autosave draft to localStorage
    useEffect(() => {
        if (data.content.en || data.content.ar) {
            const timer = setTimeout(() => {
                localStorage.setItem(`article_draft_${article.id}_en`, data.content.en || '');
                localStorage.setItem(`article_draft_${article.id}_ar`, data.content.ar || '');
                setDraftStatus(lang === 'ar' ? 'تم حفظ مسودة تلقائية 💾' : 'Draft autosaved 💾');
                setTimeout(() => setDraftStatus(''), 2000);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [data.content, lang]);

    // Check if there is a saved draft in localStorage on load
    const restoreDraft = () => {
        const savedEn = localStorage.getItem(`article_draft_${article.id}_en`);
        const savedAr = localStorage.getItem(`article_draft_${article.id}_ar`);
        if (savedEn || savedAr) {
            setData('content', {
                en: savedEn || data.content.en,
                ar: savedAr || data.content.ar
            });
            alert(lang === 'ar' ? 'تمت استعادة المسودة بنجاح!' : 'Draft restored successfully!');
        } else {
            alert(lang === 'ar' ? 'لا يوجد مسودة محفوظة.' : 'No saved draft found.');
        }
    };

    const clearDraftStore = () => {
        localStorage.removeItem(`article_draft_${article.id}_en`);
        localStorage.removeItem(`article_draft_${article.id}_ar`);
    };

    // Auto-scroll to first error and switch to appropriate language tab
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0];
            
            if (firstErrorKey.includes('content.')) {
                setLang(firstErrorKey.split('.')[1]);
            } else if (firstErrorKey.includes('title.')) {
                setLang(firstErrorKey.split('.')[1]);
            } else if (firstErrorKey === 'slug') {
                setLang('en');
            }
            
            setTimeout(() => {
                const errorElements = document.querySelectorAll('.text-rose-500');
                for (let el of errorElements) {
                    if (el.textContent === errors[firstErrorKey]) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Try to focus the nearest input/textarea/select
                        const container = el.closest('div');
                        if (container) {
                            const input = container.querySelector('input, textarea, select');
                            if (input) input.focus();
                        }
                        break;
                    }
                }
            }, 150);
        }
    }, [errors]);

    const submit = (e) => {
        e.preventDefault();
        
        let hasError = false;
        clearErrors();

        if (isContentEmpty(data.content.en)) {
            setError('content.en', 'Content in English is required');
            hasError = true;
        }
        if (isContentEmpty(data.content.ar)) {
            setError('content.ar', 'المحتوى باللغة العربية مطلوب');
            hasError = true;
        }

        if (hasError) {
            if (isContentEmpty(data.content.en)) setLang('en');
            else setLang('ar');
            return;
        }

        post(route('admin.articles.update', article.id), {
            forceFormData: true,
            onSuccess: () => {
                clearDraftStore();
            }
        });
    };

    const clearContent = () => {
        const confirmClear = window.confirm(
            lang === 'ar' 
                ? 'هل أنت متأكد من رغبتك في مسح كل محتوى هذه اللغة؟ لا يمكن التراجع عن هذا الإجراء.' 
                : 'Are you sure you want to clear the content for this language? This action cannot be undone.'
        );
        if (confirmClear) {
            setData('content', { ...data.content, [lang]: '' });
        }
    };

    const copyToClipboard = () => {
        const textOnly = (data.content[lang] || '').replace(/<[^>]*>/g, '').trim();
        navigator.clipboard.writeText(textOnly).then(() => {
            alert(lang === 'ar' ? 'تم نسخ النص النظيف بنجاح!' : 'Clean text copied to clipboard!');
        });
    };

    const wordCount = getWordCount(data.content?.[lang]);
    const charCount = getCharCount(data.content?.[lang]);
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl sm:text-3xl text-slate-800 leading-tight">Edit Article</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Update article content, images, and configurations</p>
                    </div>
                    <Link
                        href={route('admin.articles.index')}
                        className="inline-flex items-center px-4.5 py-2.5 bg-white border border-slate-200 rounded-xl font-mikhak-medium text-sm text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Articles
                    </Link>
                </div>
            }
        >
            <Head title="Edit Article" />

            <div className="py-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-slate-100 p-4 sm:p-8">
                        <form onSubmit={submit} className="space-y-8">
                            {/* Language Switcher */}
                            <div className="flex justify-center p-1 bg-slate-50 border border-slate-100 rounded-2xl w-fit mx-auto mb-4">
                                <button
                                    type="button"
                                    onClick={() => setLang('en')}
                                    className={`py-2 px-8 rounded-xl transition-all duration-300 font-mikhak-bold text-sm ${lang === 'en' ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    English
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLang('ar')}
                                    className={`py-2 px-8 rounded-xl transition-all duration-300 font-mikhak-bold text-sm ${lang === 'ar' ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    العربية
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-mikhak-bold text-slate-700">Category <span className="text-rose-500">*</span></label>
                                    <select
                                        className={`mt-1 block w-full bg-slate-50 border ${errors.category_id ? 'border-rose-500 ring-rose-500/20' : 'border-slate-200'} focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium`}
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.title.en} / {cat.title.ar}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.category_id}</div>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-mikhak-bold text-slate-700">Featured Image (Optional)</label>
                                    <div className="mt-1 flex items-center">
                                        <label className="w-full flex flex-col items-center px-4 py-5 bg-slate-50 text-slate-400 rounded-2xl border-2 border-slate-200 border-dashed cursor-pointer hover:bg-slate-100/50 hover:border-primary transition-all">
                                            <svg className="w-6 h-6 mb-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-xs font-mikhak-medium text-slate-500">{data.image ? data.image.name : 'Change Image'}</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => setData('image', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    {article.image && <p className="mt-1.5 text-xs text-slate-400 text-center font-mikhak-regular">Current image: {article.image.split('/').pop()}</p>}
                                    {errors.image && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.image}</div>}
                                </div>
                            </div>

                            <div className={lang === 'ar' ? 'text-right' : ''}>
                                <label className="block text-sm font-mikhak-bold text-slate-700 mb-2 flex items-center justify-between">
                                    {lang === 'ar' ? (
                                        <><span className="text-xs text-rose-500 font-mikhak-regular">مطلوب</span> <span>العنوان <span className="text-rose-500">*</span></span></>
                                    ) : (
                                        <><span>Title <span className="text-rose-500">*</span></span> <span className="text-xs text-rose-500 font-mikhak-regular">Required</span></>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                    className={`mt-1 block w-full bg-slate-50 border ${errors[`title.${lang}`] ? 'border-rose-500 ring-rose-500/20' : 'border-slate-200'} focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400`}
                                    value={data.title[lang]}
                                    onChange={(e) => setData('title', { ...data.title, [lang]: e.target.value })}
                                    required
                                />
                                {errors[`title.${lang}`] && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors[`title.${lang}`]}</div>}
                                {lang === 'en' && errors.slug && <div className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.slug}</div>}
                            </div>

                            <div className={lang === 'ar' ? 'text-right' : ''}>
                                <label className="block text-sm font-mikhak-bold text-slate-700 mb-2">
                                    {lang === 'en' ? 'Short Description (Optional)' : 'وصف مختصر (اختياري)'}
                                </label>
                                <textarea
                                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                    className="mt-1 block w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-regular placeholder-slate-400"
                                    rows="2"
                                    value={data.short_description[lang]}
                                    onChange={(e) => setData('short_description', { ...data.short_description, [lang]: e.target.value })}
                                />
                            </div>

                            {/* Advanced Sticky Rich Text Editor */}
                            <div className={lang === 'ar' ? 'text-right' : ''}>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                                    <label className="text-sm font-mikhak-bold text-slate-700 flex items-center gap-2">
                                        {lang === 'ar' ? (
                                            <><span>محتوى المقالة <span className="text-rose-500">*</span></span></>
                                        ) : (
                                            <><span>Article Content <span className="text-rose-500">*</span></span></>
                                        )}
                                    </label>
                                    
                                    {/* Action controller bar */}
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        {/* Autosave status indicator */}
                                        <AnimatePresence>
                                            {draftStatus && (
                                                <motion.span 
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md"
                                                >
                                                    {draftStatus}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>

                                        {/* Draft Actions */}
                                        <button
                                            type="button"
                                            onClick={restoreDraft}
                                            className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-mikhak-bold"
                                            title="Restore Draft from local store"
                                        >
                                            {lang === 'ar' ? 'استعادة المسودة 💾' : 'Restore Draft 💾'}
                                        </button>

                                        {/* Height controller */}
                                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                                            <span className="px-2 text-slate-500 border-r border-slate-200">Height:</span>
                                            {['350px', '500px', '750px'].map((h) => (
                                                <button
                                                    key={h}
                                                    type="button"
                                                    onClick={() => setEditorHeight(h)}
                                                    className={`px-2.5 py-1 hover:bg-slate-100 transition font-medium ${editorHeight === h ? 'bg-primary text-white hover:bg-primary' : 'text-slate-600'}`}
                                                >
                                                    {h.replace('px', '')}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Copy Text */}
                                        <button
                                            type="button"
                                            onClick={copyToClipboard}
                                            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200"
                                            title="Copy clean text"
                                        >
                                            📋 {lang === 'ar' ? 'نسخ النص' : 'Copy text'}
                                        </button>

                                        {/* Clear editor */}
                                        <button
                                            type="button"
                                            onClick={clearContent}
                                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-100"
                                            title="Clear editor content"
                                        >
                                            🗑️ {lang === 'ar' ? 'مسح المحتوى' : 'Clear'}
                                        </button>
                                    </div>
                                </div>

                                {/* Editor for English */}
                                <div 
                                    className={`prose-container ${errors[`content.en`] ? 'border-2 border-rose-500 rounded-3xl' : ''}`}
                                    style={{ '--editor-height': editorHeight, display: lang === 'en' ? 'block' : 'none' }}
                                >
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content?.en || ''}
                                        onChange={(val) => setData('content', { ...data.content, en: val })}
                                        className="rounded-2xl overflow-hidden border-slate-200 shadow-sm"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                [{ 'font': [] }],
                                                [{ 'size': ['small', false, 'large', 'huge'] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'color': [] }, { 'background': [] }],
                                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                [{ 'indent': '-1' }, { 'indent': '+1' }],
                                                [{ 'align': [] }],
                                                ['link', 'image', 'video'],
                                                ['blockquote', 'code-block'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </div>

                                {/* Editor for Arabic */}
                                <div 
                                    className={`prose-container quill-rtl ${errors[`content.ar`] ? 'border-2 border-rose-500 rounded-3xl' : ''}`}
                                    style={{ '--editor-height': editorHeight, display: lang === 'ar' ? 'block' : 'none' }}
                                >
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content?.ar || ''}
                                        onChange={(val) => setData('content', { ...data.content, ar: val })}
                                        className="rounded-2xl overflow-hidden border-slate-200 shadow-sm"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                [{ 'font': [] }],
                                                [{ 'size': ['small', false, 'large', 'huge'] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'color': [] }, { 'background': [] }],
                                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                [{ 'indent': '-1' }, { 'indent': '+1' }],
                                                [{ 'direction': 'rtl' }],
                                                [{ 'align': [] }],
                                                ['link', 'image', 'video'],
                                                ['blockquote', 'code-block'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </div>

                                {/* Live Stats Indicator */}
                                <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <span>✍️ {lang === 'ar' ? 'الكلمات:' : 'Words:'} <strong className="text-slate-800">{wordCount}</strong></span>
                                        <span>🔤 {lang === 'ar' ? 'الحروف:' : 'Characters:'} <strong className="text-slate-800">{charCount}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-primary">
                                        <span>⏱️ {lang === 'ar' ? 'زمن القراءة المقدر:' : 'Est. Reading Time:'} <strong>{readingTime} {lang === 'ar' ? 'دقيقة' : readingTime === 1 ? 'min' : 'mins'}</strong></span>
                                    </div>
                                </div>

                                {errors[`content.${lang}`] && <div className="text-rose-500 text-sm mt-2 font-mikhak-bold">{errors[`content.${lang}`]}</div>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex justify-center py-4 px-4 border border-transparent shadow-lg shadow-secondary/20 text-lg font-mikhak-bold rounded-2xl text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                .quill-rtl .ql-editor {
                    text-align: right;
                    direction: rtl;
                }
                .ql-toolbar.ql-snow {
                    border-top-left-radius: 1.5rem;
                    border-top-right-radius: 1.5rem;
                    border: 1px solid #e2e8f0;
                    background: #f8fafc;
                    padding: 0.75rem 1rem;
                    border-bottom: none;
                }
                .ql-container.ql-snow {
                    border-bottom-left-radius: 1.5rem;
                    border-bottom-right-radius: 1.5rem;
                    border: 1px solid #e2e8f0;
                    height: var(--editor-height, 500px);
                    background: #ffffff;
                    font-size: 1.05rem;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
                }
                .ql-container.ql-snow.ql-focused {
                    border-color: #794BC7;
                }
                .ql-editor {
                    font-family: 'Mikhak-Regular', sans-serif;
                    padding: 1.5rem 2rem;
                    color: #334155;
                    height: 100%;
                    overflow-y: auto;
                }
                .ql-editor.ql-blank::before {
                    left: 2rem;
                    right: 2rem;
                    color: #94a3b8;
                    font-style: normal;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
