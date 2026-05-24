import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ArticleForm from './ArticleForm';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

const normalize = (val) => {
    if (val && typeof val === 'object' && !Array.isArray(val)) return { en: val.en || '', ar: val.ar || '' };
    try { const p = JSON.parse(val); if (p && typeof p === 'object') return { en: p.en || '', ar: p.ar || '' }; } catch {}
    return { en: '', ar: '' };
};

export default function Edit({ article, categories }) {
    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        _method: 'PUT',
        category_id: article.category_id,
        status: article.status || 'published',
        published_at: article.published_at || null,
        title: normalize(article.title),
        short_description: normalize(article.short_description),
        content: normalize(article.content),
        image: null,
    });

    const handleSubmit = () => {
        post(route('admin.articles.update', article.id), {
            forceFormData: true,
            onSuccess: () => {
                localStorage.removeItem(`article_draft_${article.id}_en`);
                localStorage.removeItem(`article_draft_${article.id}_ar`);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">{t.admin.articleForm.editTitle}</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1 line-clamp-1">
                            {article.title?.[lang] || article.title?.en || t.admin.articleForm.editTitle}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {article.status === 'published' && (
                            <a
                                href={route('blog.show', article.slug)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl font-mikhak-medium text-sm text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                <svg className={`w-4 h-4 ${lang === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {t.admin.articleForm.viewLive}
                            </a>
                        )}
                        <Link
                            href={route('admin.articles.index')}
                            className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl font-mikhak-medium text-sm text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <svg className={`w-4 h-4 ${lang === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t.admin.articleForm.backBtn}
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`${t.admin.articleForm.editTitle}: ${article.title?.[lang] || article.title?.en || 'Article'}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-3xl border border-slate-100 p-6 sm:p-8">
                        <ArticleForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            setError={setError}
                            clearErrors={clearErrors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            categories={categories}
                            submitLabel={t.admin.articleForm.saveChanges}
                            article={article}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
