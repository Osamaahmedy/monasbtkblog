import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ArticleForm from './ArticleForm';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

export default function Create({ categories }) {
    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        category_id: '',
        status: 'published',
        published_at: null,
        title: { en: '', ar: '' },
        short_description: { en: '', ar: '' },
        content: { en: '', ar: '' },
        image: null,
        slug: '',
        meta_title: { en: '', ar: '' },
        meta_description: { en: '', ar: '' },
        image_alt: { en: '', ar: '' },
        og_image: null,
    });

    const handleSubmit = () => {
        post(route('admin.articles.store'), {
            forceFormData: true,
            onSuccess: () => {
                localStorage.removeItem('article_new_draft_en');
                localStorage.removeItem('article_new_draft_ar');
                localStorage.removeItem('article_form_draft_new');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">{t.admin.articleForm.createTitle}</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">{t.admin.articleForm.createDesc}</p>
                    </div>
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
            }
        >
            <Head title={t.admin.articleForm.createTitle} />

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
                            submitLabel={t.admin.articleForm.publishArticle}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
