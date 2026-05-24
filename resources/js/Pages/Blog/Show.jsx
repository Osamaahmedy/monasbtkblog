import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Show({ article, relatedArticles }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('monasbtk_lang') || 'en';
        return 'en';
    });

    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareDropdownRef = useRef();

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
    }, [lang]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (shareDropdownRef.current && !shareDropdownRef.current.contains(e.target)) {
                setShareOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
        author_name: '',
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('comments.store', article.id), {
            onSuccess: () => {
                reset();
                alert(
                    lang === 'en'
                        ? 'Comment submitted and awaiting approval!'
                        : 'تم إرسال التعليق وبانتظار الموافقة!'
                );
            },
        });
    };

    const t = {
        en: {
            by: "By",
            read: "min read",
            comments: "Comments",
            leaveComment: "Write a comment",
            name: "Your name",
            comment: "What are your thoughts?",
            submit: "Post Comment",
            related: "More from Monasbtk",
            noComments: "There are currently no comments for this article. Be the first to leave a comment.",
            home: "Home",
            blog: "Blog",
            submitting: "Publishing...",
            writtenBy: "Written by",
            backToBlog: "Back to blog",
            articleDetails: "Article details",
            quickActions: "Quick actions",
            published: "Published",
            readingTime: "Reading time",
            category: "Category",
            respectful: "Be respectful. Your comment will appear after approval.",
            authorBio: "Content creator at Monasbtk, sharing practical ideas, elegant inspiration, and thoughtful perspectives for your special occasions.",
            share: "Share Story",
        },
        ar: {
            by: "بقلم",
            read: "دقائق للقراءة",
            comments: "التعليقات",
            leaveComment: "اكتب تعليقاً",
            name: "اسمك",
            comment: "ما هي أفكارك؟",
            submit: "نشر",
            related: "المزيد من مناسبتك",
            noComments: "لا توجد تعليقات حالياً على هذا المقال. كن أول من يعلق.",
            home: "الرئيسية",
            blog: "المدونة",
            submitting: "جاري النشر...",
            writtenBy: "بقلم",
            backToBlog: "العودة للمدونة",
            articleDetails: "تفاصيل المقال",
            quickActions: "اختصارات",
            published: "نُشر في",
            readingTime: "وقت القراءة",
            category: "التصنيف",
            respectful: "يرجى كتابة تعليق محترم. سيظهر تعليقك بعد الموافقة.",
            authorBio: "كاتب محتوى في مناسبتك، يشارك أفكاراً عملية، وإلهاماً أنيقاً، ورؤى ملهمة تساعدك على صناعة مناسبات أجمل.",
            share: "مشاركة المقال",
        }
    };

    const getTextContent = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };

    const textContent = getTextContent(article.content?.[lang]);
    const wordCount = textContent ? textContent.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const getArticleReadingTime = (html) => {
        const text = getTextContent(html);
        return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 100) / 200));
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString(
            lang === 'ar' ? 'ar-EG' : 'en-US',
            { month: 'long', day: 'numeric', year: 'numeric' }
        );

    const formatDateShort = (dateStr) =>
        new Date(dateStr).toLocaleDateString(
            lang === 'ar' ? 'ar-EG' : 'en-US',
            { month: 'short', day: 'numeric' }
        );

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const isAr = lang === 'ar';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInstagramShare = () => {
        navigator.clipboard.writeText(pageUrl);
        alert(lang === 'en' ? 'Link copied to clipboard! Share it on your Instagram story.' : 'تم نسخ رابط المقال! يمكنك الآن مشاركته في قصص إنستغرام.');
    };

    return (
        <div dir={isAr ? 'rtl' : 'ltr'} className="blog-show-root" style={{ background: '#fdf9fb', color: '#2a1f30' }}>
            <Head title={article.title?.[lang]}>
                <meta name="description" content={article.short_description?.[lang] || article.title?.[lang]} />
                <meta property="og:title" content={article.title?.[lang]} />
                <meta property="og:description" content={article.short_description?.[lang] || article.title?.[lang]} />
                <meta property="og:type" content="article" />
                {article.image && <meta property="og:image" content={`/storage/${article.image}`} />}
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": article.title?.[lang],
                    "description": article.short_description?.[lang] || "",
                    "image": article.image ? `/storage/${article.image}` : undefined,
                    "author": { "@type": "Person", "name": article.user?.name },
                    "datePublished": article.created_at,
                    "dateModified": article.updated_at || article.created_at,
                    "publisher": { "@type": "Organization", "name": "Monasbtk" },
                    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl }
                })}</script>
            </Head>

            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .blog-show-root {
                    min-height: 100vh;
                    -webkit-font-smoothing: antialiased;
                }

                .progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 120;
                    height: 3.5px;
                    background: #794BC7;
                    transform-origin: left;
                }

                .nav {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    height: 68px;
                    background: rgba(253,249,251,0.85);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(121,75,199,0.13);
                }

                .nav-inner {
                    max-width: 1180px;
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    min-width: 0;
                }

                .nav-logo {
                    font-size: 21px;
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .crumbs {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #b0909a;
                    white-space: nowrap;
                }

                .crumb-link {
                    color: #7a6070;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .crumb-link:hover { color: #794BC7; }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .nav-back {
                    font-size: 13.5px;
                    color: #7a6070;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .nav-back:hover { color: #794BC7; }

                .lang-btn {
                    height: 32px;
                    padding: 0 14px;
                    border-radius: 100px;
                    border: 1px solid rgba(121,75,199,0.2);
                    background: rgba(121,75,199,0.04);
                    font-size: 11px;
                    font-weight: 700;
                    color: #794BC7;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .lang-btn:hover {
                    background: rgba(121,75,199,0.08);
                    border-color: rgba(121,75,199,0.35);
                }

                .page-wrap {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .hero {
                    padding: 40px 0 24px;
                }

                .hero-card {
                    background: #fff;
                    border: 1px solid rgba(121,75,199,0.12);
                    border-radius: 28px;
                    padding: 40px;
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                }

                .cat-tag {
                    font-size: 11px;
                    font-weight: 600;
                    color: #794BC7;
                    background: rgba(121,75,199,0.07);
                    padding: 5px 12px;
                    border-radius: 100px;
                }

                .meta-date {
                    font-size: 13px;
                    color: #b0909a;
                }

                .hero-title {
                    font-size: clamp(28px, 5vw, 48px);
                    font-weight: 800;
                    line-height: 1.15;
                    color: #1e1520;
                    letter-spacing: -0.02em;
                    margin-bottom: 20px;
                    max-width: 950px;
                }

                .hero-sub {
                    font-size: 16px;
                    line-height: 1.8;
                    color: #7a6070;
                    font-weight: 400;
                    max-width: 800px;
                    margin-bottom: 28px;
                }

                .hero-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                    padding-top: 20px;
                    border-top: 1px solid rgba(121,75,199,0.12);
                }

                .author-wrap {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 0;
                }

                .avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF157D, #794BC7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    font-weight: 700;
                    color: #fff;
                    flex-shrink: 0;
                }

                .author-meta { min-width: 0; }

                .author-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #b0909a;
                    margin-bottom: 3px;
                }

                .author-name {
                    font-size: 14.5px;
                    font-weight: 600;
                    color: #2a1f30;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    font-size: 13px;
                    color: #b0909a;
                }

                .sep {
                    color: rgba(192,80,122,0.3);
                    font-size: 12px;
                }

                .cover {
                    margin-top: 28px;
                    border-radius: 28px;
                    overflow: hidden;
                    max-height: 540px;
                    position: relative;
                    background: #f5ecf2;
                }
                .cover img {
                    width: 100%;
                    max-height: 540px;
                    object-fit: cover;
                    display: block;
                }
                .cover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(30,21,32,0.1) 0%, transparent 60%);
                    pointer-events: none;
                }

                .content-area {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 280px;
                    gap: 56px;
                    padding: 36px 0 0;
                    align-items: start;
                }

                .article-main {
                    min-width: 0;
                }

                .prose-card,
                .tags-card,
                .author-card,
                .comment-form-card,
                .comment-card,
                .empty-card,
                .side-card,
                .related-card {
                    background: #fff;
                    border: 1px solid rgba(121,75,199,0.12);
                }

                .prose-card {
                    border-radius: 24px;
                    padding: 40px;
                }

                .article-prose {
                    font-size: 17.5px;
                    line-height: 1.95;
                    color: #3d2f3a;
                }
                .article-prose p { margin-bottom: 1.5em; }
                .article-prose h2,
                .article-prose h3,
                .article-prose h4 {
                    color: #1e1520;
                    font-weight: 800;
                    margin-top: 1.8em;
                    margin-bottom: 0.6em;
                    line-height: 1.25;
                }
                .article-prose h2 { font-size: clamp(24px, 3vw, 32px); }
                .article-prose h3 { font-size: clamp(20px, 2.4vw, 25px); }
                .article-prose h4 { font-size: clamp(17px, 2vw, 21px); }
                .article-prose a {
                    color: #794BC7;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(121,75,199,0.3);
                    transition: border-color .15s;
                }
                .article-prose a:hover { border-color: #794BC7; }
                .article-prose strong { color: #1e1520; font-weight: 700; }
                .article-prose ul, .article-prose ol { padding-inline-start: 1.5rem; margin: 1.4em 0; }
                .article-prose li { margin: 0.55em 0; }
                .article-prose blockquote {
                    margin: 2.2em 0;
                    padding: 22px 26px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #FAF5FF, #F3E8FF);
                    color: #6e5867;
                    border-inline-start: 4px solid rgba(121,75,199,0.35);
                    font-style: italic;
                    font-size: 1.05em;
                }
                .article-prose img { width:100%; border-radius:20px; margin:2.2em 0; box-shadow:0 6px 28px rgba(121,75,199,0.06); }
                .article-prose pre { overflow-x:auto; background:#faf7f9; border:1px solid rgba(121,75,199,0.14); padding:18px; border-radius:16px; margin:1.6em 0; }
                .article-prose code { font-size:13.5px; background:#f7f0f4; padding:2px 7px; border-radius:6px; }
                .share-row { display:flex; align-items:center; gap:16px; padding:22px 0; border-top:1px solid rgba(121,75,199,0.12); margin-top:10px; }
                .share-label { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#b0909a; }

                .section-box {
                    margin-top: 24px;
                    border-radius: 20px;
                    padding: 24px;
                }

                .tag-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .tag-pill {
                    padding: 8px 16px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 600;
                    background: #f5ecf2;
                    color: #6a5060;
                    border: 1px solid rgba(121,75,199,0.18);
                }

                .author-card {
                    border-radius: 24px;
                    padding: 28px;
                }

                .author-card-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                }

                .author-avatar-large {
                    width: 68px;
                    height: 68px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF157D, #794BC7);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .author-card-name {
                    font-size: 20px;
                    font-weight: 800;
                    color: #1e1520;
                    margin-top: 4px;
                    margin-bottom: 8px;
                }

                .author-card-bio {
                    font-size: 14px;
                    line-height: 1.76;
                    color: #7a6070;
                }

                .sidebar {
                    position: sticky;
                    top: 108px;
                }

                .side-card {
                    border-radius: 24px;
                    padding: 24px;
                    margin-bottom: 20px;
                }

                .side-card-title {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #b0909a;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(121,75,199,0.14);
                    margin-bottom: 16px;
                }

                .side-list { display: grid; gap: 16px; }

                .side-item-label {
                    font-size: 12px;
                    color: #b0909a;
                    margin-bottom: 4px;
                }

                .side-item-value {
                    font-size: 13.5px;
                    color: #4a3848;
                    font-weight: 600;
                    line-height: 1.6;
                }

                .action-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 12px 20px;
                    border-radius: 100px;
                    text-decoration: none;
                    font-size: 13.5px;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .action-btn-primary {
                    background: #794BC7;
                    color: #fff;
                }

                .action-btn-primary:hover {
                    background: #6B00C9;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 16px rgba(121,75,199,0.15);
                }

                .action-btn-secondary {
                    margin-top: 10px;
                    color: #7a6070;
                    border: 1px solid rgba(121,75,199,0.22);
                    background: rgba(121,75,199,0.03);
                }

                .action-btn-secondary:hover {
                    color: #794BC7;
                    border-color: rgba(121,75,199,0.35);
                    background: rgba(121,75,199,0.05);
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                }

                .section-label {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #794BC7;
                    flex-shrink: 0;
                }

                .section-rule {
                    flex: 1;
                    height: 1px;
                    background: rgba(121,75,199,0.18);
                }

                .related-section,
                .comments-section {
                    padding: 64px 0 0;
                }

                .related-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                .related-card {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                }

                .related-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(121,75,199,0.06);
                    border-color: rgba(121,75,199,0.22);
                }

                .related-media {
                    aspect-ratio: 16 / 10;
                    background: #f5ecf2;
                    overflow: hidden;
                }

                .related-media img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .related-card:hover .related-media img { transform: scale(1.04); }

                .related-body {
                    padding: 18px;
                }

                .related-title {
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 1.45;
                    color: #1e1520;
                    margin-bottom: 10px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .related-meta {
                    font-size: 12px;
                    color: #b0909a;
                }

                .comment-form-card {
                    border-radius: 24px;
                    padding: 28px;
                    margin-bottom: 20px;
                }

                .comment-head {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .comment-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f2e8ee;
                    color: #8a7080;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13.5px;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .input-clean,
                .textarea-clean {
                    width: 100%;
                    border: 1px solid rgba(121,75,199,0.15);
                    background: #fff;
                    color: #2a1f30;
                    outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }

                .input-clean {
                    height: 48px;
                    border-radius: 14px;
                    padding: 0 16px;
                    font-size: 14px;
                    margin-bottom: 14px;
                }

                .textarea-clean {
                    min-height: 120px;
                    border-radius: 16px;
                    padding: 16px;
                    font-size: 14px;
                    line-height: 1.76;
                    resize: vertical;
                }

                .input-clean:focus,
                .textarea-clean:focus {
                    border-color: rgba(121,75,199,0.35);
                    box-shadow: 0 0 0 3px rgba(121,75,199,0.08);
                }

                .comment-form-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 14px;
                    margin-top: 16px;
                    flex-wrap: wrap;
                }

                .comment-note {
                    font-size: 12.5px;
                    color: #b0909a;
                }

                .submit-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12px 24px;
                    border-radius: 100px;
                    background: #794BC7;
                    color: #fff;
                    font-size: 13.5px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: background 0.18s, transform 0.18s, opacity 0.18s;
                }

                .submit-btn:hover:not(:disabled) {
                    background: #6B00C9;
                    transform: translateY(-1px);
                }

                .submit-btn:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                }

                .error-text {
                    margin-top: 8px;
                    font-size: 12px;
                    color: #EF4444;
                }

                .comment-list {
                    display: grid;
                    gap: 16px;
                }

                .comment-card {
                    border-radius: 20px;
                    padding: 20px;
                }

                .comment-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                }

                .comment-name {
                    font-size: 14.5px;
                    font-weight: 700;
                    color: #2a1f30;
                }

                .comment-date {
                    font-size: 12px;
                    color: #b0909a;
                    margin-top: 2px;
                }

                .comment-content {
                    margin-top: 10px;
                    font-size: 14.5px;
                    line-height: 1.76;
                    color: #6f5a69;
                }

                .empty-card {
                    border-radius: 20px;
                    text-align: center;
                    padding: 48px 24px;
                }

                .empty-text {
                    font-size: 14px;
                    color: #8a7080;
                }

                @media (max-width: 1024px) {
                    .content-area { grid-template-columns: 1fr; gap: 32px; }
                    .sidebar { display: none; }
                    .related-grid { grid-template-columns: 1fr 1fr; }
                }

                @media (max-width: 640px) {
                    .nav-inner, .page-wrap { padding-left: 18px; padding-right: 18px; }
                    .crumbs, .nav-back { display: none; }
                    .hero { padding-top: 24px; }
                    .hero-card, .prose-card, .comment-form-card, .author-card { padding: 24px 20px; }
                    .hero-title { font-size: clamp(26px, 9vw, 36px); }
                    .article-prose { font-size: 16px; line-height: 1.85; }
                    .related-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <motion.div className="progress-bar" style={{ scaleX }} />

            {/* ── NAVIGATION ── */}
            <nav className="nav">
                <div className="nav-inner">
                    <div className="nav-left">
                        <Link href="/" className={`nav-logo font-extrabold bg-gradient-to-r from-[#FF157D] to-[#794BC7] bg-clip-text text-transparent ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            Monasbtk
                        </Link>

                        <div className={`crumbs font-semibold ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                            <Link href="/" className="crumb-link">{t[lang].home}</Link>
                            <span className="opacity-40">/</span>
                            <Link href={route('blog.index')} className="crumb-link">{t[lang].blog}</Link>
                        </div>
                    </div>

                    <div className="nav-right">
                        <Link href={route('blog.index')} className={`nav-back font-bold ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                            {t[lang].backToBlog}
                        </Link>

                        <button
                            className={`lang-btn ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}
                            onClick={() => setLang(isAr ? 'en' : 'ar')}
                        >
                            {isAr ? 'EN' : 'عربي'}
                        </button>
                    </div>
                </div>
            </nav>

            <article className="page-wrap">
                {/* ── HEADER HERO ── */}
                <header className="hero">
                    <motion.div
                        className="hero-card shadow-sm"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className={`meta-row ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                            {article.category?.title?.[lang] && (
                                <span className="cat-tag">{article.category.title[lang]}</span>
                            )}
                            <span className="meta-date">{formatDate(article.created_at)}</span>
                        </div>

                        <h1 className={`hero-title ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {article.title?.[lang]}
                        </h1>

                        {article.short_description?.[lang] && (
                            <p className={`hero-sub ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                {article.short_description[lang]}
                            </p>
                        )}

                        <div className="hero-footer">
                            <div className="author-wrap">
                                <div className="avatar select-none">
                                    {article.user?.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div className={`author-meta ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                    <div className="author-label">{t[lang].writtenBy}</div>
                                    <div className="author-name">{article.user?.name}</div>
                                </div>
                            </div>

                            <div className={`hero-stats font-semibold ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                <span>{readingTime} {t[lang].read}</span>
                                <span className="sep">·</span>
                                <a href="#responses" className="crumb-link">
                                    {article.comments?.length || 0} {t[lang].comments}
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {article.image && (
                        <motion.div
                            className="cover border border-purple-100/20"
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <img src={`/storage/${article.image}`} alt={article.title?.[lang]} />
                            <div className="cover-overlay" />
                        </motion.div>
                    )}
                </header>

                {/* ── ARTICLE CONTENT & SIDEBAR ── */}
                <section className="content-area">
                    <main className="article-main">
                        <motion.div
                            className="prose-card shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.45, delay: 0.15 }}
                        >
                            <div
                                className={`article-prose ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}
                                style={{ textAlign: isAr ? 'right' : 'left' }}
                                dangerouslySetInnerHTML={{ __html: article.content?.[lang] }}
                            />
                        </motion.div>

                        {/* Share Row Dropdown */}
                        <div className="share-row">
                            <span className={`share-label ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                {isAr ? 'مشاركة القصة' : 'Share story'}
                            </span>

                            {/* Dropdown Container */}
                            <div className="relative inline-block" ref={shareDropdownRef}>
                                <button
                                    onClick={() => setShareOpen(!shareOpen)}
                                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border border-purple-200/50 bg-white/70 text-slate-700 font-bold hover:bg-purple-50/50 transition-all select-none cursor-pointer text-sm shadow-sm ${isAr ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                                >
                                    <svg className="w-4 h-4 text-[#794BC7]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l.09-.034a1.8 1.8 0 012.25 1.534l.002.138a1.8 1.8 0 01-1.39 1.764l-.952.184m0-3.586l-.089.034a1.8 1.8 0 00-2.25-1.534l-.002-.138a1.8 1.8 0 001.39-1.764l.952-.184M16.5 7.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm0 9a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z" />
                                    </svg>
                                    <span>{t[lang].share}</span>
                                    <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${shareOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {shareOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className={`absolute ${isAr ? 'left-0' : 'right-0'} mt-2 w-56 rounded-2xl bg-white border border-purple-100/60 shadow-xl z-50 p-2 space-y-1`}
                                        >
                                            {/* 1. X */}
                                            <a
                                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title?.[lang] || '')}&url=${encodeURIComponent(pageUrl)}`}
                                                target="_blank" rel="noreferrer"
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${isAr ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                                            >
                                                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                                <span className="flex-1">X</span>
                                            </a>

                                            {/* 2. WhatsApp */}
                                            <a
                                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent((article.title?.[lang] || '') + ' ' + pageUrl)}`}
                                                target="_blank" rel="noreferrer"
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${isAr ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                                            >
                                                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-20.015c-.218-.485-.45-.495-.658-.504-.172-.008-.371-.008-.57-.008-.201 0-.53.075-.808.379-.278.303-1.062 1.036-1.062 2.529 0 1.493 1.085 2.932 1.236 3.134.152.203 2.137 3.262 5.176 4.57.717.309 1.278.493 1.716.633.722.23 1.381.197 1.902.12.579-.085 1.785-.73 2.039-1.436.254-.705.254-1.309.178-1.436-.076-.127-.278-.203-.579-.354s-1.785-.88-2.062-.98c-.278-.1-.48-.152-.68.152-.2.304-.778 1.037-.954 1.239-.176.202-.353.228-.654.077-.302-.151-1.272-.469-2.423-1.495-.895-.798-1.5-1.784-1.676-2.086-.176-.303-.019-.467.132-.617.136-.134.303-.354.454-.531.151-.177.202-.303.303-.505.101-.202.051-.379-.026-.53-.076-.153-.658-1.585-.9-2.17z"/></svg>
                                                <span className="flex-1">WhatsApp</span>
                                            </a>

                                            {/* 3. Instagram */}
                                            <button
                                                onClick={handleInstagramShare}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer text-left ${isAr ? 'flex-row-reverse font-mikhak-medium text-right' : 'font-outfit'}`}
                                            >
                                                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                                <span className="flex-1">Instagram</span>
                                            </button>

                                            {/* 4. Threads */}
                                            <a
                                                href={`https://threads.net/intent/post?text=${encodeURIComponent((article.title?.[lang] || '') + ' ' + pageUrl)}`}
                                                target="_blank" rel="noreferrer"
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${isAr ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                                            >
                                                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c3.158 0 6.012-1.22 8.125-3.218l-1.425-1.425A9.957 9.957 0 0 1 12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10c0 2.158-.698 3.51-1.636 4.364-.814.74-1.956.886-2.586.886-.786 0-1.782-.375-1.782-1.895V12c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.47 0 2.76-.638 3.655-1.644C16.924 16.58 17.8 17 18.778 17c1.397 0 2.857-.698 3.75-2.07C23.473 13.565 24 12 24 12c0-6.627-5.373-12-12-12zm-3 12c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z"/></svg>
                                                <span className="flex-1">Threads</span>
                                            </a>

                                            {/* 5. Facebook */}
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                                                target="_blank" rel="noreferrer"
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${isAr ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                                            >
                                                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                                <span className="flex-1">Facebook</span>
                                            </a>

                                            <div className="h-px bg-purple-100/30 my-1" />

                                            {/* Copy Link */}
                                            <button
                                                onClick={handleCopy}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer text-left ${isAr ? 'flex-row-reverse font-mikhak-medium text-right' : 'font-outfit'}`}
                                            >
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                                                <span className="flex-1">{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy link')}</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="tags-card section-box">
                            <div className="tag-list">
                                {article.category?.title?.[lang] && (
                                    <span className={`tag-pill ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{article.category.title[lang]}</span>
                                )}
                            </div>
                        </div>

                        {/* Author Bio Card */}
                        <motion.div
                            className="author-card shadow-sm"
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="author-card-row">
                                <div className="author-avatar-large select-none">
                                    {article.user?.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div>
                                    <div className={`author-label ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{t[lang].writtenBy}</div>
                                    <h3 className={`author-card-name ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{article.user?.name}</h3>
                                    <p className={`author-card-bio ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>{t[lang].authorBio}</p>
                                </div>
                            </div>
                        </motion.div>
                    </main>

                    {/* ── SIDEBAR ── */}
                    <aside className="sidebar">
                        <div className="side-card">
                            <div className={`side-card-title ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{t[lang].articleDetails}</div>

                            <div className={`side-list ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                <div>
                                    <div className="side-item-label">{t[lang].published}</div>
                                    <div className="side-item-value">{formatDate(article.created_at)}</div>
                                </div>

                                <div>
                                    <div className="side-item-label">{t[lang].readingTime}</div>
                                    <div className="side-item-value">{readingTime} {t[lang].read}</div>
                                </div>

                                <div>
                                    <div className="side-item-label">{t[lang].category}</div>
                                    <div className="side-item-value">{article.category?.title?.[lang]}</div>
                                </div>
                            </div>
                        </div>

                        <div className="side-card">
                            <div className={`side-card-title ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{t[lang].quickActions}</div>

                            <a href="#responses" className={`action-btn action-btn-primary ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                {t[lang].leaveComment}
                            </a>

                            <Link href={route('blog.index')} className={`action-btn action-btn-secondary ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                {t[lang].backToBlog}
                            </Link>
                        </div>
                    </aside>
                </section>

                {/* ── RELATED ARTICLES ── */}
                {relatedArticles && relatedArticles.length > 0 && (
                    <section className="related-section">
                        <div className="section-header">
                            <span className={`section-label ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{t[lang].related}</span>
                            <div className="section-rule" />
                        </div>

                        <div className="related-grid">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={route('blog.show', rel.slug)}
                                    className="related-card border"
                                >
                                    <div className="related-media">
                                        {rel.image ? (
                                            <img src={`/storage/${rel.image}`} alt={rel.title?.[lang]} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#f5ecf2' }} />
                                        )}
                                    </div>

                                    <div className="related-body">
                                        <div className={`related-title ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{rel.title?.[lang]}</div>
                                        <div className={`related-meta ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                            {formatDateShort(rel.created_at)}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── RESPONSES SECTION ── */}
                <section id="responses" className="comments-section pb-24">
                    <div className="section-header flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#794BC7] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zM12 3c-4.97 0-9 3.582-9 8c0 1.947.766 3.72 2.032 5.097L3 21l4.896-1.632A10.158 10.158 0 0012 20c4.97 0 9-3.582 9-8s-4.03-8-9-8z" />
                        </svg>
                        <span className={`section-label ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`} style={{ display: 'flex', alignItems: 'center' }}>
                            {t[lang].comments} ({article.comments?.length || 0})
                        </span>
                        <div className="section-rule" />
                    </div>

                    <motion.div
                        className="comment-form-card"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={submitComment}>
                            <div className="comment-head">
                                <div className="comment-avatar font-bold select-none" style={{ background: data.author_name ? 'linear-gradient(135deg,#FF157D,#794BC7)' : undefined, color: data.author_name ? '#fff' : undefined }}>
                                    {data.author_name ? data.author_name.charAt(0).toUpperCase() : '✍️'}
                                </div>
                                <span className={`text-sm text-slate-500 font-bold ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>{isAr ? 'شاركنا رأيك في المقال' : 'Share your thoughts on the story'}</span>
                            </div>

                            <input
                                type="text"
                                className={`input-clean ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}
                                placeholder={t[lang].name}
                                value={data.author_name}
                                onChange={(e) => setData('author_name', e.target.value)}
                                required
                            />

                            <textarea
                                className={`textarea-clean ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}
                                placeholder={t[lang].comment}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                required
                                rows="5"
                            />

                            <div className="comment-form-footer">
                                <p className={`comment-note ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>{t[lang].respectful}</p>

                                <button
                                    type="submit"
                                    disabled={processing || !data.content.trim() || !data.author_name.trim()}
                                    className={`submit-btn select-none flex items-center justify-center gap-2 ${isAr ? 'font-mikhak-bold flex-row-reverse' : 'font-outfit'}`}
                                >
                                    <span>{processing ? t[lang].submitting : t[lang].submit}</span>
                                    {processing ? (
                                        <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0v4a8 8 0 00-8 8H0z" />
                                        </svg>
                                    ) : (
                                        <svg className={`w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 ${isAr ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {errors.content && <p className="error-text">{errors.content}</p>}
                            {errors.author_name && <p className="error-text">{errors.author_name}</p>}
                        </form>
                    </motion.div>

                    <div className="comment-list">
                        {article.comments?.map((comment, i) => (
                            <motion.div
                                key={comment.id}
                                className="comment-card"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <div className="comment-row">
                                    <div className="avatar font-bold select-none w-10 h-10 text-sm">
                                        {comment.author_name?.charAt(0)?.toUpperCase() || 'G'}
                                    </div>

                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div className={`comment-name ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{comment.author_name}</div>
                                        <div className={`comment-date ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>{formatDateShort(comment.created_at)}</div>
                                        <p className={`comment-content ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>{comment.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {(!article.comments || article.comments.length === 0) && (
                            <div className="empty-card">
                                <p className={`empty-text ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>{t[lang].noComments}</p>
                            </div>
                        )}
                    </div>
                </section>
            </article>
        </div>
    );
}
