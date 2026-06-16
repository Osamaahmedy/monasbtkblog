import { lazy, Suspense } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

// Lazy-load ReactQuill — it's the heaviest dependency (~260KB)
// This prevents it from blocking the initial page render
const ReactQuill = lazy(() => import('react-quill'));
// Pre-load the CSS so it's ready when the editor mounts
import('react-quill/dist/quill.snow.css');

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

const cleanChatGptFormatting = (html, editorLang) => {
    if (!html) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const hasArabic = (text) => /[\u0600-\u06FF]/.test(text);

    // 1. Clean list items (<li>)
    const listItems = doc.querySelectorAll('li');
    listItems.forEach(li => {
        let text = li.innerHTML;
        // Strip leading ChatGPT list markers inside <li> (e.g., •, *, -, 1., 2., etc.)
        text = text.replace(/^(\s*(&bull;|&#8226;|&#9679;|&#9642;|&#9702;|•|\*|-|✔|✓|\d+\.)\s*)+/g, '');
        li.innerHTML = text;

        if (editorLang === 'ar') {
            if (hasArabic(li.textContent) || !li.textContent.trim()) {
                li.classList.add('ql-direction-rtl');
                li.classList.add('ql-align-right');
            }
        } else {
            if (hasArabic(li.textContent)) {
                li.classList.add('ql-direction-rtl');
                li.classList.add('ql-align-right');
            } else {
                li.classList.remove('ql-direction-rtl', 'ql-align-right');
            }
        }
    });

    // 2. Clean paragraphs and headers
    const blocks = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, blockquote');
    blocks.forEach(block => {
        let text = block.innerHTML;
        // Convert **bold** to <strong>
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert *italic* to <em>
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/_(.*?)_/g, '<em>$1</em>');
        // Strip out leading markdown headings tags
        text = text.replace(/^#+\s+/g, '');
        block.innerHTML = text;

        if (editorLang === 'ar') {
            if (hasArabic(block.textContent) || !block.textContent.trim() || /[a-zA-Z]/.test(block.textContent) === false) {
                block.classList.add('ql-direction-rtl');
                block.classList.add('ql-align-right');
            } else {
                block.classList.remove('ql-direction-rtl', 'ql-align-right');
            }
        } else {
            if (hasArabic(block.textContent)) {
                block.classList.add('ql-direction-rtl');
                block.classList.add('ql-align-right');
            } else {
                block.classList.remove('ql-direction-rtl', 'ql-align-right');
            }
        }
    });

    return doc.body.innerHTML;
};

const inputCls = (error) =>
    `mt-1 block w-full bg-slate-50 border focus:bg-white focus:ring-4 rounded-xl px-4 py-3 text-sm text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400 ${
        error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
    }`;
const labelCls = 'block text-sm font-mikhak-bold text-slate-700 mb-1.5';

const getMinDateTime = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const formatDateTimeLocal = (value) => {
    if (!value) return '';
    if (value.includes('Z') || value.match(/[+-]\d{2}:\d{2}$/)) {
        const date = new Date(value);
        if (isNaN(date.getTime())) return '';
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }
    return value.slice(0, 16);
};

// ── Image Upload with preview ──────────────────────────────────────────────────
function ImageUpload({ value, onChange, currentImage, error, setError, clearErrors }) {
    const [preview, setPreview] = useState(null);
    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate File Type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                const errMsg = lang === 'ar' 
                    ? 'صيغة الصورة غير صالحة. الصيغ المسموحة هي: jpeg, png, jpg, webp.' 
                    : 'Invalid image format. Allowed formats are: jpeg, png, jpg, webp.';
                if (setError) setError('image', errMsg);
                onChange(null);
                setPreview(null);
                e.target.value = '';
                return;
            }

            // Validate File Size (2MB)
            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                const errMsg = lang === 'ar' 
                    ? 'حجم الصورة كبير جداً. الحد الأقصى المسموح به هو 2 ميجابايت.' 
                    : 'The image size is too large. Maximum allowed size is 2MB.';
                if (setError) setError('image', errMsg);
                onChange(null);
                setPreview(null);
                e.target.value = '';
                return;
            }

            if (clearErrors) clearErrors('image');
            onChange(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const displayImg = preview || (currentImage ? `/storage/${currentImage}` : null);

    return (
        <div>
            <label className={labelCls}>
                {t.admin.articleForm.featuredImage} {!currentImage && <span className="text-rose-500">*</span>}
                {currentImage && <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">{t.admin.articleForm.leaveEmpty}</span>}
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
                            <span className="text-white text-xs font-mikhak-bold">{t.admin.articleForm.changeImage}</span>
                        </div>
                    </>
                ) : (
                    <div className="py-8 flex flex-col items-center">
                        <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-mikhak-bold text-slate-500">{t.admin.articleForm.clickToUpload}</span>
                        <span className="text-xs text-slate-400 mt-1">{t.admin.articleForm.imageRequirements}</span>
                    </div>
                )}
                <input type="file" accept="image/jpeg, image/png, image/jpg, image/webp" className="hidden" onChange={handleChange} />
            </label>
            {error && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{error}</p>}
        </div>
    );
}

// ── OG Image Upload with preview ───────────────────────────────────────────────
function OgImageUpload({ value, onChange, currentImage, error, setError, clearErrors }) {
    const [preview, setPreview] = useState(null);
    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate File Type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                const errMsg = lang === 'ar' 
                    ? 'صيغة صورة المشاركة غير صالحة. الصيغ المسموحة هي: jpeg, png, jpg, webp.' 
                    : 'Invalid OG image format. Allowed formats are: jpeg, png, jpg, webp.';
                if (setError) setError('og_image', errMsg);
                onChange(null);
                setPreview(null);
                e.target.value = '';
                return;
            }

            // Validate File Size (2MB)
            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                const errMsg = lang === 'ar' 
                    ? 'حجم صورة المشاركة كبير جداً. الحد الأقصى المسموح به هو 2 ميجابايت.' 
                    : 'The OG image size is too large. Maximum allowed size is 2MB.';
                if (setError) setError('og_image', errMsg);
                onChange(null);
                setPreview(null);
                e.target.value = '';
                return;
            }

            if (clearErrors) clearErrors('og_image');
            onChange(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const displayImg = preview || (currentImage ? `/storage/${currentImage}` : null);

    return (
        <div>
            <label className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden group ${
                error ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/30'
            }`} style={{ minHeight: '8rem' }}>
                {displayImg ? (
                    <>
                        <img src={displayImg} alt="OG Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity" />
                        <div className="relative z-10 flex flex-col items-center py-4 bg-black/40 w-full h-full justify-center">
                            <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-white text-xs font-mikhak-bold">{t.admin.articleForm.changeImage || 'Change Image'}</span>
                        </div>
                    </>
                ) : (
                    <div className="py-4 flex flex-col items-center text-center px-4">
                        <svg className="w-8 h-8 text-slate-300 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-mikhak-bold text-slate-500">{t.admin.articleForm.clickToUpload || 'Click to upload'}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">{lang === 'ar' ? 'نسبة عرض إلى ارتفاع مفضلة 1.91:1 (مثال: 1200x630)' : 'Preferred 1.91:1 aspect ratio (e.g. 1200x630)'}</span>
                    </div>
                )}
                <input type="file" accept="image/jpeg, image/png, image/jpg, image/webp" className="hidden" onChange={handleChange} />
            </label>
            {error && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{error}</p>}
        </div>
    );
}

// ── Rich Editor Section ────────────────────────────────────────────────────────
function RichEditor({ lang, value, onChange, error, draftKey }) {
    const [draftSaved, setDraftSaved] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [height, setHeight] = useState(500);
    const quillRef = useRef(null);
    const { lang: globalLang } = useLanguage();
    const t = translations[globalLang] || translations.en;

    // Custom image handler — uploads to server instead of embedding base64
    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const quill = quillRef.current?.getEditor();
            if (!quill) return;

            setUploading(true);

            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch(route('admin.articles.upload-image'), {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.content,
                        'Accept': 'application/json',
                    },
                    body: formData,
                });

                if (!response.ok) throw new Error('Upload failed');

                const data = await response.json();
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, 'image', data.url);
                quill.setSelection(range.index + 1);
            } catch (err) {
                alert(globalLang === 'ar'
                    ? 'فشل رفع الصورة. تأكد من أن حجمها أقل من 5MB.'
                    : 'Image upload failed. Make sure it is under 5MB.');
                console.error('Image upload error:', err);
            } finally {
                setUploading(false);
            }
        };
    }, [globalLang]);

    // Quill modules with custom image handler
    const modules = useRef({
        toolbar: {
            container: lang === 'ar' ? TOOLBAR_AR : TOOLBAR_EN,
            handlers: {
                image: imageHandler,
            },
        },
    });

    // Autosave
    useEffect(() => {
        if (!value) return;
        const tSave = setTimeout(() => {
            try { localStorage.setItem(draftKey, value); setDraftSaved(true); setTimeout(() => setDraftSaved(false), 2500); } catch {}
        }, 1200);
        return () => clearTimeout(tSave);
    }, [value, draftKey]);

    const restoreDraft = () => {
        const saved = localStorage.getItem(draftKey);
        if (saved) { onChange(saved); }
        else alert(globalLang === 'ar' ? 'لم يتم العثور على مسودة محفوظة.' : 'No saved draft found.');
    };

    const copyText = () => navigator.clipboard.writeText(stripHtml(value || '')).then(() => alert(globalLang === 'ar' ? 'تم نسخ النص!' : 'Text copied!'));
    const clearEditor = () => { if (confirm(globalLang === 'ar' ? 'هل تريد مسح كل المحتوى؟' : 'Clear all content?')) onChange(''); };

    const handleAutoFix = () => {
        const cleaned = cleanChatGptFormatting(value, lang);
        onChange(cleaned);
        alert(globalLang === 'ar' 
            ? 'تمت إعادة ضبط تنسيق نصوص الذكاء الاصطناعي بنجاح! تم تصحيح الاتجاهات وحذف الرموز المكررة.' 
            : 'AI text formatting fixed successfully! Direction alignment corrected and duplicate markers removed.'
        );
    };

    const wc = wordCount(value);
    const cc = charCount(value);
    const readTime = Math.max(1, Math.ceil(wc / 200));

    return (
        <div>
            {/* Controls row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                    {uploading && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-mikhak-bold animate-pulse">
                            <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0v4a8 8 0 00-8 8H0z" />
                            </svg>
                            {globalLang === 'ar' ? 'جاري رفع الصورة...' : 'Uploading image...'}
                        </span>
                    )}
                    {draftSaved && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-mikhak-bold">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            {t.admin.articleForm.draftSaved}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <button type="button" onClick={restoreDraft} className="px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-mikhak-bold border border-indigo-100 transition-colors">
                        {t.admin.articleForm.restoreDraft}
                    </button>
                    {/* Height */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <span className="px-2.5 py-1.5 text-slate-500 border-r border-slate-200 bg-slate-50">{t.admin.articleForm.heightLabel}</span>
                        {[350, 500, 700].map(h => (
                            <button key={h} type="button" onClick={() => setHeight(h)}
                                className={`px-2.5 py-1.5 font-mikhak-bold transition-colors ${height === h ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                                {h}
                            </button>
                        ))}
                    </div>
                    <button type="button" onClick={handleAutoFix} className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-200 font-mikhak-bold transition-colors flex items-center gap-1">
                        <span>✨</span>
                        <span>{globalLang === 'ar' ? 'ضبط نصوص الذكاء الاصطناعي' : 'Fix AI Text'}</span>
                    </button>
                    <button type="button" onClick={copyText} className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 font-mikhak-bold transition-colors">
                        {t.admin.articleForm.copyBtn}
                    </button>
                    <button type="button" onClick={clearEditor} className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-100 font-mikhak-bold transition-colors">
                        {t.admin.articleForm.clearBtn}
                    </button>
                </div>
            </div>

            {/* Quill — wrapped in Suspense for lazy loading */}
            <div className={`quill-wrapper ${lang === 'ar' ? 'quill-rtl' : ''} ${error ? 'quill-error' : ''}`} style={{ '--qh': `${height}px` }}>
                <Suspense fallback={
                    <div style={{ height: `calc(${height}px + 42px)` }} className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-3 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <span className="text-xs text-slate-400 font-mikhak-medium">{t.admin.articleForm.quillPlaceholder || 'Loading editor...'}</span>
                    </div>
                }>
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={value || ''}
                        onChange={onChange}
                        modules={modules.current}
                        placeholder={t.admin.articleForm.quillPlaceholder}
                    />
                </Suspense>
            </div>

            {/* Stats bar */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-4 text-slate-500 font-mikhak-medium">
                    <span>{t.admin.articleForm.wordsLabel}: <strong className="text-slate-800">{wc}</strong></span>
                    <span>{t.admin.articleForm.charsLabel}: <strong className="text-slate-800">{cc}</strong></span>
                </div>
                <span className="text-indigo-600 font-mikhak-bold">
                    ⏱ ~{readTime} {t.admin.articleForm.minRead}
                </span>
            </div>

            {error && <p className="text-rose-500 text-sm mt-2 font-mikhak-bold">{error}</p>}
        </div>
    );
}

// ── Main ArticleForm ───────────────────────────────────────────────────────────
export default function ArticleForm({ data, setData, errors, setError, clearErrors, processing, onSubmit, categories, submitLabel = 'Publish Article', article = null }) {
    const [lang, setLang] = useState('en');
    const [showSeo, setShowSeo] = useState(false);
    const { lang: globalLang } = useLanguage();
    const t = translations[globalLang] || translations.en;

    // Autosave & Restore logic for the entire form
    const storageKey = article ? `article_form_draft_edit_${article.id}` : 'article_form_draft_new';
    const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
    const restoredRef = useRef(false);

    // 1. Restore draft on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Loop through keys and restore
                Object.keys(parsed).forEach(key => {
                    if (key !== 'image' && key !== 'og_image') {
                        setData(key, parsed[key]);
                    }
                });
                setHasRestoredDraft(true);
            }
        } catch (err) {
            console.error("Failed to restore draft", err);
        } finally {
            // Set ref to true in a setTimeout to let React update state first
            setTimeout(() => {
                restoredRef.current = true;
            }, 100);
        }
    }, []);

    // 2. Save draft when data changes (skip when initial loading/restoring is in progress)
    useEffect(() => {
        if (!restoredRef.current) return;
        const delayDebounce = setTimeout(() => {
            try {
                const copy = { ...data };
                delete copy.image;
                delete copy.og_image;
                localStorage.setItem(storageKey, JSON.stringify(copy));
            } catch (e) {
                console.error("Failed to save draft", e);
            }
        }, 1000); // 1-second debounce

        return () => clearTimeout(delayDebounce);
    }, [data]);

    const handleDiscardDraft = () => {
        if (confirm(globalLang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف المسودة والبدء من جديد؟' : 'Are you sure you want to discard the draft and start fresh?')) {
            localStorage.removeItem(storageKey);
            setHasRestoredDraft(false);
            window.location.reload();
        }
    };

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
        if (isEmpty(data.content?.en)) { setError('content.en', t.admin.articleForm.englishContentRequired); bad = true; }
        if (isEmpty(data.content?.ar)) { setError('content.ar', t.admin.articleForm.arabicContentRequired); bad = true; }
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
                {hasRestoredDraft && (
                    <div className="mb-6 bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-800 text-lg">
                                ⚠️
                            </span>
                            <div className={globalLang === 'ar' ? 'text-right' : 'text-left'}>
                                <h4 className="text-sm font-mikhak-bold text-amber-800">
                                    {globalLang === 'ar' ? 'تم استعادة تعديلات غير محفوظة' : 'Unsaved changes restored'}
                                </h4>
                                <p className="text-xs text-amber-600 font-mikhak-regular mt-0.5">
                                    {globalLang === 'ar' 
                                        ? 'تم تحميل آخر التعديلات تلقائياً من ذاكرة المتصفح المؤقتة.' 
                                        : 'The last updates were automatically loaded from your browser memory.'}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleDiscardDraft}
                            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-mikhak-bold transition-colors shadow-sm"
                        >
                            {globalLang === 'ar' ? 'حذف المسودة والبدء من جديد' : 'Discard draft & reset'}
                        </button>
                    </div>
                )}
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
                                <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">{t.admin.articleForm.optional}</span>
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

                        {/* Rich Text Editor — Deferred mount: only initialize when tab first activated */}
                        <div>
                            <label className={labelCls}>
                                {lang === 'ar' ? 'محتوى المقالة' : 'Article Content'} <span className="text-rose-500">*</span>
                            </label>
                            {/* EN editor - mount on first visit, then keep alive via display:none */}
                            {(lang === 'en' || data.content?.en) && (
                                <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                                    <RichEditor
                                        lang="en"
                                        value={data.content?.en}
                                        onChange={val => setData('content', { ...data.content, en: val })}
                                        error={errors['content.en']}
                                        draftKey={draftKeyEn}
                                    />
                                </div>
                            )}
                            {/* AR editor - mount on first visit, then keep alive via display:none */}
                            {(lang === 'ar' || data.content?.ar) && (
                                <div style={{ display: lang === 'ar' ? 'block' : 'none' }}>
                                    <RichEditor
                                        lang="ar"
                                        value={data.content?.ar}
                                        onChange={val => setData('content', { ...data.content, ar: val })}
                                        error={errors['content.ar']}
                                        draftKey={draftKeyAr}
                                    />
                                </div>
                            )}
                        </div>

                        {/* SEO Settings Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-6">
                            <button
                                type="button"
                                onClick={() => setShowSeo(!showSeo)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 border-b border-slate-100 hover:bg-slate-100/50 transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-mikhak-bold text-slate-800 text-base">
                                        {globalLang === 'ar' ? 'إعدادات تحسين محركات البحث (SEO)' : 'SEO Settings'}
                                    </span>
                                </div>
                                <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showSeo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {showSeo && (
                                <div className="p-6 space-y-6">
                                    {/* Custom Slug */}
                                    <div>
                                        <label className={labelCls}>
                                            {globalLang === 'ar' ? 'رابط المقال المخصص (Custom Slug)' : 'Custom Article Slug'}
                                            <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">({globalLang === 'ar' ? 'اختياري - يترك فارغاً للتوليد التلقائي' : 'Optional - leave empty for auto-generation'})</span>
                                        </label>
                                        <div className="flex rounded-xl shadow-sm mt-1">
                                            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-400 text-xs select-none">
                                                /blog/
                                            </span>
                                            <input
                                                type="text"
                                                className={inputCls(errors.slug) + ' !mt-0 !rounded-l-none'}
                                                placeholder="custom-article-slug"
                                                value={data.slug || ''}
                                                onChange={e => setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                                            />
                                        </div>
                                        {errors.slug && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.slug}</p>}
                                        <p className="text-xs text-slate-400 mt-1.5 font-mikhak-regular">
                                            {globalLang === 'ar' ? 'الرابط الفريد الذي يظهر في المتصفح. استخدم الحروف الإنجليزية الصغيرة والأرقام والشرطات فقط.' : 'The unique URL segment for this article. Use only lowercase letters, numbers, and hyphens.'}
                                        </p>
                                    </div>

                                    {/* Language-dependent SEO fields (Meta Title, Meta Description, Image Alt) */}
                                    <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4 space-y-4">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                                            <span className="text-xs font-mikhak-bold text-slate-500">
                                                {globalLang === 'ar' ? `تعديل حقول SEO للغة: ${lang === 'ar' ? 'العربية' : 'English'}` : `Edit SEO fields for language: ${lang === 'ar' ? 'Arabic' : 'English'}`}
                                            </span>
                                            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-mikhak-bold">
                                                {globalLang === 'ar' ? 'مرتبط بتبويب اللغة المفتوح بالأعلى' : 'Linked to the active language tab above'}
                                            </span>
                                        </div>

                                        {/* Meta Title */}
                                        <div>
                                            <label className={labelCls}>
                                                {lang === 'ar' ? 'عنوان الميتا (Meta Title)' : 'Meta Title'}
                                                <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">({globalLang === 'ar' ? 'اختياري - يفضل بين 50-60 حرفاً' : 'Optional - recommended 50-60 chars'})</span>
                                            </label>
                                            <input
                                                type="text"
                                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                className={inputCls(errors[`meta_title.${lang}`])}
                                                placeholder={lang === 'ar' ? 'عنوان مخصص لمحركات البحث...' : 'Custom title for search engines...'}
                                                value={data.meta_title?.[lang] || ''}
                                                onChange={e => setData('meta_title', { ...data.meta_title, [lang]: e.target.value })}
                                                maxLength={100}
                                            />
                                            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                                                <span>{errors[`meta_title.${lang}`] && <span className="text-rose-500 font-mikhak-medium">{errors[`meta_title.${lang}`]}</span>}</span>
                                                <span>{(data.meta_title?.[lang] || '').length}/100</span>
                                            </div>
                                        </div>

                                        {/* Meta Description */}
                                        <div>
                                            <label className={labelCls}>
                                                {lang === 'ar' ? 'وصف الميتا (Meta Description)' : 'Meta Description'}
                                                <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">({globalLang === 'ar' ? 'اختياري - يفضل بين 120-160 حرفاً' : 'Optional - recommended 120-160 chars'})</span>
                                            </label>
                                            <textarea
                                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                rows={3}
                                                className={inputCls(errors[`meta_description.${lang}`]) + ' resize-none'}
                                                placeholder={lang === 'ar' ? 'وصف موجز وجذاب يظهر في نتائج بحث جوجل...' : 'A brief description that appears in Google search results...'}
                                                value={data.meta_description?.[lang] || ''}
                                                onChange={e => setData('meta_description', { ...data.meta_description, [lang]: e.target.value })}
                                                maxLength={255}
                                            />
                                            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                                                <span>{errors[`meta_description.${lang}`] && <span className="text-rose-500 font-mikhak-medium">{errors[`meta_description.${lang}`]}</span>}</span>
                                                <span>{(data.meta_description?.[lang] || '').length}/255</span>
                                            </div>
                                        </div>

                                        {/* Image Alt Text */}
                                        <div>
                                            <label className={labelCls}>
                                                {lang === 'ar' ? 'النص البديل للصورة البارزة (Alt Text)' : 'Featured Image Alt Text'}
                                                <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">({globalLang === 'ar' ? 'اختياري - لتحسين إمكانية الوصول وبحث الصور' : 'Optional - for accessibility & image search'})</span>
                                            </label>
                                            <input
                                                type="text"
                                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                className={inputCls(errors[`image_alt.${lang}`])}
                                                placeholder={lang === 'ar' ? 'صف ما يوجد في الصورة البارزة...' : 'Describe what is in the featured image...'}
                                                value={data.image_alt?.[lang] || ''}
                                                onChange={e => setData('image_alt', { ...data.image_alt, [lang]: e.target.value })}
                                            />
                                            {errors[`image_alt.${lang}`] && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors[`image_alt.${lang}`]}</p>}
                                        </div>
                                    </div>

                                    {/* Custom OG Image Upload */}
                                    <div className="border-t border-slate-100 pt-5">
                                        <label className={labelCls}>
                                            {globalLang === 'ar' ? 'صورة Open Graph المخصصة (OG Image)' : 'Custom Open Graph Image'}
                                            <span className="text-slate-400 font-mikhak-regular ml-1 text-xs">({globalLang === 'ar' ? 'مستحسن لمشاركات الواتساب والتواصل الاجتماعي - يترك فارغاً لاستخدام الصورة البارزة' : 'Recommended for social shares - defaults to featured image'})</span>
                                        </label>
                                        <div className="mt-2 max-w-md">
                                            <OgImageUpload
                                                value={data.og_image}
                                                onChange={file => setData('og_image', file)}
                                                currentImage={article?.og_image}
                                                error={errors.og_image}
                                                setError={setError}
                                                clearErrors={clearErrors}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="xl:w-72 flex-shrink-0 space-y-4">

                        {/* Publish card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-sm font-mikhak-bold text-slate-700">{t.admin.articleForm.publishSettings}</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {/* Status */}
                                <div>
                                    <label className="block text-xs font-mikhak-bold text-slate-600 mb-1.5">{t.admin.articleForm.statusLabel}</label>
                                    <select
                                        className={inputCls(false) + ' !py-2 !text-sm'}
                                        value={data.status || 'published'}
                                        onChange={e => {
                                            setData('status', e.target.value);
                                            if (e.target.value === 'draft') {
                                                setData('published_at', null);
                                            }
                                        }}
                                    >
                                        <option value="published">{t.admin.articleForm.publishedOption}</option>
                                        <option value="draft">{t.admin.articleForm.draftOption}</option>
                                    </select>
                                </div>

                                {data.status === 'published' && (
                                    <div className="space-y-3 pt-2 border-t border-slate-100 mt-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="is_scheduled"
                                                className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 w-4 h-4 cursor-pointer"
                                                checked={!!data.published_at}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        const now = new Date();
                                                        const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
                                                        setData('published_at', localISO);
                                                    } else {
                                                        setData('published_at', null);
                                                    }
                                                }}
                                            />
                                            <label htmlFor="is_scheduled" className="text-xs font-mikhak-bold text-slate-600 cursor-pointer select-none">
                                                {t.admin.articleForm.schedulePublish}
                                             </label>
                                         </div>

                                         {data.published_at && (
                                             <div className="space-y-1.5">
                                                 <label className="block text-xs font-mikhak-bold text-slate-600">
                                                     {t.admin.articleForm.publishDate}
                                                 </label>
                                                 <input
                                                     type="datetime-local"
                                                     className={inputCls(errors.published_at) + ' !py-1.5 !px-3 !text-xs'}
                                                     value={formatDateTimeLocal(data.published_at)}
                                                     min={getMinDateTime()}
                                                     onChange={e => setData('published_at', e.target.value)}
                                                     required
                                                 />
                                                 {errors.published_at && <p className="text-rose-500 text-xs mt-1">{errors.published_at}</p>}
                                             </div>
                                         )}
                                     </div>
                                 )}

                                {/* Category */}
                                <div>
                                    <label className="block text-xs font-mikhak-bold text-slate-600 mb-1.5">
                                        {t.admin.articleForm.categoryLabel} <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        className={inputCls(errors.category_id) + ' !py-2 !text-sm'}
                                        value={data.category_id || ''}
                                        onChange={e => setData('category_id', e.target.value)}
                                        required
                                    >
                                        <option value="">{t.admin.articleForm.selectCategory}</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.title?.[globalLang] || cat.title?.en}
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
                                            {t.admin.articleForm.savingBtn}
                                        </>
                                    ) : submitLabel}
                                </button>
                            </div>
                        </div>

                        {/* Image card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-sm font-mikhak-bold text-slate-700">{t.admin.articleForm.featuredImage}</h3>
                            </div>
                            <div className="p-4">
                                <ImageUpload
                                    value={data.image}
                                    onChange={file => setData('image', file)}
                                    currentImage={article?.image}
                                    error={errors.image}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </div>
                        </div>

                        {/* Tips card */}
                        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4">
                            <h3 className="text-xs font-mikhak-bold text-indigo-700 mb-2 flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                {t.admin.articleForm.writingTips}
                            </h3>
                            <ul className="text-xs text-indigo-600 font-mikhak-regular space-y-1.5 leading-relaxed">
                                <li>{t.admin.articleForm.tip1}</li>
                                <li>{t.admin.articleForm.tip2}</li>
                                <li>{t.admin.articleForm.tip3}</li>
                                <li>{t.admin.articleForm.tip4}</li>
                                <li>{t.admin.articleForm.tip5}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
