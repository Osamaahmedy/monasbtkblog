import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect, useRef, useCallback } from 'react';

// ── Quill toolbar modules ──────────────────────────────────────────────────────
const TOOLBAR_EN = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean'],
];

const TOOLBAR_AR = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }, { align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean'],
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const stripHtml = (html) => html?.replace(/<[^>]*>/g, '').trim() || '';
const wordCount = (html) => { const t = stripHtml(html); return t ? t.split(/\s+/).filter(Boolean).length : 0; };
const charCount = (html) => stripHtml(html).length;
const isEmpty = (html) => stripHtml(html).length === 0;

const inputCls = (error) =>
    `mt-1 block w-full bg-slate-50 border focus:bg-white focus:ring-4 rounded-xl px-4 py-3 text-sm text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400 ${
        error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
    }`;
const labelCls = 'block text-sm font-mikhak-bold text-slate-700 mb-1.5';

// ── Image Upload with preview ──────────────────────────────────────────────────
function ImageUpload({ value, onChange, currentImage, error }) {
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const displayImg = preview || (currentImage ? `/storage/${currentImage}` : null);

    return (
        <div>
            <label className={labelCls}>
                Featured Image {!currentImage && <span className="text-rose-500">*</span>}
                {currentImage && <span className="text-slate-400 font-mikhak-regular ml-1">(leave empty to keep current)</span>}
            </label>
            <label className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden group ${
                error ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/30'
            }`} style={{ minHeight: '10rem' }}>
                {displayImg ? (
                    <>
                        <img src={displayImg} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity" />
                        <div className="relative z-10 flex flex-col items-center py-4 bg-black/30 w-full h-full justify-center">
                            <svg className="w-7 h-7 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-white text-xs font-mikhak-bold">Change Image</span>
                        </div>
                    </>
                ) : (
                    <div className="py-8 flex flex-col items-center">
                        <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-mikhak-bold text-slate-500">Click to upload image</span>
                        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP – max 2MB</span>
                    </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
            </label>
            {error && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{error}</p>}
        </div>
    );
}

// ── Rich Editor Section ────────────────────────────────────────────────────────
function RichEditor({ lang, value, onChange, error, draftKey }) {
    const [draftSaved, setDraftSaved] = useState(false);
    const [height, setHeight] = useState(500);
    const quillRef = useRef(null);

    // Autosave
    useEffect(() => {
        if (!value) return;
        const t = setTimeout(() => {
            try { localStorage.setItem(draftKey, value); setDraftSaved(true); setTimeout(() => setDraftSaved(false), 2500); } catch {}
        }, 1200);
        return () => clearTimeout(t);
    }, [value, draftKey]);

    const restoreDraft = () => {
        const saved = localStorage.getItem(draftKey);
        if (saved) { onChange(saved); }
        else alert('No saved draft found.');
    };

    const copyText = () => navigator.clipboard.writeText(stripHtml(value || '')).then(() => alert('Text copied!'));
    const clearEditor = () => { if (confirm('Clear all content?')) onChange(''); };

    const wc = wordCount(value);
    const cc = charCount(value);
    const readTime = Math.max(1, Math.ceil(wc / 200));

    return (
        <div>
            {/* Controls row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                    {draftSaved && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-mikhak-bold">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            Draft saved
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <button type="button" onClick={restoreDraft} className="px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-mikhak-bold border border-indigo-100 transition-colors">
                        💾 Restore Draft
                    </button>
                    {/* Height */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <span className="px-2.5 py-1.5 text-slate-500 border-r border-slate-200 bg-slate-50">Height</span>
                        {[350, 500, 700].map(h => (
                            <button key={h} type="button" onClick={() => setHeight(h)}
                                className={`px-2.5 py-1.5 font-mikhak-bold transition-colors ${height === h ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                                {h}
                            </button>
                        ))}
                    </div>
                    <button type="button" onClick={copyText} className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 font-mikhak-bold transition-colors">
                        📋 Copy
                    </button>
                    <button type="button" onClick={clearEditor} className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-100 font-mikhak-bold transition-colors">
                        🗑 Clear
                    </button>
                </div>
            </div>

            {/* Quill */}
            <div className={`quill-wrapper ${lang === 'ar' ? 'quill-rtl' : ''} ${error ? 'quill-error' : ''}`} style={{ '--qh': `${height}px` }}>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value || ''}
                    onChange={onChange}
                    modules={{ toolbar: lang === 'ar' ? TOOLBAR_AR : TOOLBAR_EN }}
                    placeholder={lang === 'ar' ? 'اكتب محتوى المقالة هنا...' : 'Write your article content here...'}
                />
            </div>

            {/* Stats bar */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-4 text-slate-500 font-mikhak-medium">
                    <span>Words: <strong className="text-slate-800">{wc}</strong></span>
                    <span>Chars: <strong className="text-slate-800">{cc}</strong></span>
                </div>
                <span className="text-indigo-600 font-mikhak-bold">
                    ⏱ ~{readTime} min read
                </span>
            </div>

            {error && <p className="text-rose-500 text-sm mt-2 font-mikhak-bold">{error}</p>}
        </div>
    );
}

// ── Main ArticleForm ───────────────────────────────────────────────────────────
export default function ArticleForm({ data, setData, errors, setError, clearErrors, processing, onSubmit, categories, submitLabel = 'Publish Article', article = null }) {
    const [lang, setLang] = useState('en');

    // Switch to erroring language automatically
    useEffect(() => {
        const keys = Object.keys(errors);
        if (!keys.length) return;
        const first = keys[0];
        if (first.includes('.en')) setLang('en');
        else if (first.includes('.ar')) setLang('ar');
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        let bad = false;
        if (isEmpty(data.content?.en)) { setError('content.en', 'English content is required'); bad = true; }
        if (isEmpty(data.content?.ar)) { setError('content.ar', 'Arabic content is required'); bad = true; }
        if (bad) return;
        onSubmit();
    };

    const draftKeyEn = article ? `article_draft_${article.id}_en` : 'article_new_draft_en';
    const draftKeyAr = article ? `article_draft_${article.id}_ar` : 'article_new_draft_ar';

    return (
        <>
            <style>{`
                .quill-wrapper .ql-toolbar.ql-snow {
                    border-radius: 1rem 1rem 0 0;
                    border: 1.5px solid #e2e8f0;
                    border-bottom: none;
                    background: #f8fafc;
                    padding: 0.6rem 1rem;
                    flex-wrap: wrap;
                }
                .quill-wrapper .ql-container.ql-snow {
                    border-radius: 0 0 1rem 1rem;
                    border: 1.5px solid #e2e8f0;
                    height: var(--qh, 500px);
                    font-size: 1rem;
                    background: #fff;
                }
                .quill-wrapper.quill-error .ql-toolbar.ql-snow,
                .quill-wrapper.quill-error .ql-container.ql-snow {
                    border-color: #f43f5e;
                }
                .quill-wrapper .ql-container.ql-snow:focus-within {
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
                }
                .quill-wrapper .ql-editor {
                    font-family: inherit;
                    padding: 1.25rem 1.5rem;
                    color: #334155;
                    height: 100%;
                    overflow-y: auto;
                    line-height: 1.8;
                }
                .quill-wrapper .ql-editor.ql-blank::before {
                    color: #94a3b8;
                    font-style: normal;
                    left: 1.5rem;
                    right: 1.5rem;
                }
                .quill-wrapper.quill-rtl .ql-editor {
                    direction: rtl;
                    text-align: right;
                }
                .quill-wrapper .ql-snow .ql-picker.ql-expanded .ql-picker-options {
                    z-index: 9999;
                }
            `}</style>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col xl:flex-row gap-6">

                    {/* ── Main Content Column ── */}
                    <div className="flex-1 min-w-0 space-y-5">

                        {/* Language toggle */}
                        <div className="flex items-center justify-center p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
                            {[{ key: 'en', label: 'English' }, { key: 'ar', label: 'العربية' }].map(l => (
                                <button
                                    key={l.key}
                                    type="button"
                                    onClick={() => setLang(l.key)}
                                    className={`px-7 py-2 rounded-xl text-sm font-mikhak-bold transition-all duration-200 ${
                                        lang === l.key
                                            ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100'
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    {l.label}
                                    {(errors[`content.${l.key}`] || errors[`title.${l.key}`]) && (
                                        <span className="ml-1.5 inline-block w-2 h-2 bg-rose-500 rounded-full align-middle" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Title */}
                        <div>
                            <label className={labelCls}>
                                {lang === 'ar' ? 'العنوان' : 'Title'} <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                className={inputCls(errors[`title.${lang}`])}
                                placeholder={lang === 'ar' ? 'أدخل عنوان المقالة...' : 'Enter article title...'}
                                value={data.title?.[lang] || ''}
                                onChange={e => setData('title', { ...data.title, [lang]: e.target.value })}
                                required
                            />
                            {errors[`title.${lang}`] && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors[`title.${lang}`]}</p>}
                            {lang === 'en' && errors.slug && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.slug}</p>}
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className={labelCls}>
                                {lang === 'ar' ? 'وصف مختصر' : 'Short Description'}
                                <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">(optional)</span>
                            </label>
                            <textarea
                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                rows={3}
                                className={inputCls(false) + ' resize-none'}
                                placeholder={lang === 'ar' ? 'وصف موجز للمقالة يظهر في القوائم...' : 'Brief summary shown in listings...'}
                                value={data.short_description?.[lang] || ''}
                                onChange={e => setData('short_description', { ...data.short_description, [lang]: e.target.value })}
                            />
                        </div>

                        {/* Rich Text Editor */}
                        <div>
                            <label className={labelCls}>
                                {lang === 'ar' ? 'محتوى المقالة' : 'Article Content'} <span className="text-rose-500">*</span>
                            </label>
                            {/* EN editor - always mounted, hidden when AR */}
                            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                                <RichEditor
                                    lang="en"
                                    value={data.content?.en}
                                    onChange={val => setData('content', { ...data.content, en: val })}
                                    error={errors['content.en']}
                                    draftKey={draftKeyEn}
                                />
                            </div>
                            {/* AR editor - always mounted, hidden when EN */}
                            <div style={{ display: lang === 'ar' ? 'block' : 'none' }}>
                                <RichEditor
                                    lang="ar"
                                    value={data.content?.ar}
                                    onChange={val => setData('content', { ...data.content, ar: val })}
                                    error={errors['content.ar']}
                                    draftKey={draftKeyAr}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="xl:w-72 flex-shrink-0 space-y-4">

                        {/* Publish card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-sm font-mikhak-bold text-slate-700">Publish Settings</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {/* Status */}
                                <div>
                                    <label className="block text-xs font-mikhak-bold text-slate-600 mb-1.5">Status</label>
                                    <select
                                        className={inputCls(false) + ' !py-2 !text-sm'}
                                        value={data.status || 'published'}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="published">✅ Published</option>
                                        <option value="draft">📝 Draft</option>
                                    </select>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-xs font-mikhak-bold text-slate-600 mb-1.5">
                                        Category <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        className={inputCls(errors.category_id) + ' !py-2 !text-sm'}
                                        value={data.category_id || ''}
                                        onChange={e => setData('category_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.title?.en} / {cat.title?.ar}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-rose-500 text-xs mt-1">{errors.category_id}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex justify-center items-center py-2.5 bg-indigo-600 rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-60"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0v4a8 8 0 00-8 8H0z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : submitLabel}
                                </button>
                            </div>
                        </div>

                        {/* Image card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-sm font-mikhak-bold text-slate-700">Featured Image</h3>
                            </div>
                            <div className="p-4">
                                <ImageUpload
                                    value={data.image}
                                    onChange={file => setData('image', file)}
                                    currentImage={article?.image}
                                    error={errors.image}
                                />
                            </div>
                        </div>

                        {/* Tips card */}
                        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4">
                            <h3 className="text-xs font-mikhak-bold text-indigo-700 mb-2 flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                Writing Tips
                            </h3>
                            <ul className="text-xs text-indigo-600 font-mikhak-regular space-y-1.5 leading-relaxed">
                                <li>• Use H2/H3 headings for structure</li>
                                <li>• Aim for 300+ words per article</li>
                                <li>• Fill both EN and AR content</li>
                                <li>• Drafts autosave every 1.2s</li>
                                <li>• Use blockquotes for important text</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
