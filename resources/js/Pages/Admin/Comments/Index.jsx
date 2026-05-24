import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { useState, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

// ── Status config ──────────────────────────────────────────────────────────────
function StatusBadge({ status, t }) {
    const STATUS_CONFIG = {
        approved: { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        pending:  { cls: 'bg-amber-50  text-amber-700  border-amber-200'  },
        spam:     { cls: 'bg-rose-50   text-rose-700   border-rose-200'   },
    };
    const cfg = STATUS_CONFIG[status] || { cls: 'bg-slate-100 text-slate-600 border-slate-200' };
    
    let label = status;
    if (status === 'approved') label = t.admin.comments.approved;
    else if (status === 'pending') label = t.admin.comments.pending;
    else if (status === 'spam') label = t.admin.comments.spam;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mikhak-bold border ${cfg.cls}`}>
            {label}
        </span>
    );
}

// ── Stats card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon }) {
    return (
        <div className={`flex items-center gap-4 bg-white rounded-2xl border p-5 shadow-sm ${color.border}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color.bg}`}>
                <span className={`text-lg ${color.text}`}>{icon}</span>
            </div>
            <div>
                <div className={`text-2xl font-mikhak-bold ${color.text}`}>{value}</div>
                <div className="text-xs text-slate-500 font-mikhak-medium mt-0.5">{label}</div>
            </div>
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Index({ comments, filters, counts }) {
    const { lang } = useLanguage();
    const t = translations[lang] || translations.en;
    const { delete: destroy } = useForm();
    const [selectedIds, setSelectedIds] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const searchRef = useRef();

    /* ── helpers ── */
    const updateStatus = (id, status) =>
        router.patch(route('admin.comments.update-status', id), { status }, { preserveScroll: true });

    const handleDelete = (id) => {
        if (confirm(t.admin.comments.confirmDelete))
            destroy(route('admin.comments.destroy', id), { preserveScroll: true });
    };

    const toggleSelectAll = () =>
        setSelectedIds(selectedIds.length === comments.data.length ? [] : comments.data.map(c => c.id));

    const toggleSelect = (id) =>
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const bulkAction = (action) => {
        if (!selectedIds.length) return;
        const msg = { 
            approve: t.admin.comments.confirmApproveSelected, 
            pending: t.admin.comments.confirmPendingSelected, 
            spam: t.admin.comments.confirmSpamSelected, 
            delete: t.admin.comments.confirmDeleteSelected 
        };
        if (!confirm(msg[action])) return;
        router.post(route('admin.comments.bulk-action'), { ids: selectedIds, action }, {
            preserveScroll: true,
            onSuccess: () => setSelectedIds([]),
        });
    };

    const applyFilter = (key, value) =>
        router.get(route('admin.comments.index'), { ...filters, [key]: value, page: 1 }, { preserveState: true, replace: true });

    const handleSearch = () => applyFilter('search', searchRef.current.value);

    /* ── tab config ── */
    const statusTabs = [
        { key: 'all',      label: t.admin.articles.all,      count: counts.all      },
        { key: 'pending',  label: t.admin.comments.pending,  count: counts.pending  },
        { key: 'approved', label: t.admin.comments.approved, count: counts.approved },
        { key: 'spam',     label: t.admin.comments.spam,     count: counts.spam     },
    ];

    const allSelected = comments.data.length > 0 && selectedIds.length === comments.data.length;
    const someSelected = selectedIds.length > 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">{t.admin.comments.title}</h2>
                        <p className="text-sm text-slate-500 font-mikhak-regular mt-1">{t.admin.comments.subtitle}</p>
                    </div>
                    {counts.pending > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-mikhak-bold rounded-xl">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {counts.pending} {t.admin.comments.pendingReview}
                        </span>
                    )}
                </div>
            }
        >
            <Head title={t.admin.comments.title} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-5">

                    {/* ── Stats row ── */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label={t.admin.comments.totalComments} value={counts.all}      icon="💬" color={{ border: 'border-slate-200',   bg: 'bg-slate-100',   text: 'text-slate-700'   }} />
                        <StatCard label={t.admin.comments.pending}        value={counts.pending}  icon="⏳" color={{ border: 'border-amber-200',   bg: 'bg-amber-50',    text: 'text-amber-700'   }} />
                        <StatCard label={t.admin.comments.approved}       value={counts.approved} icon="✅" color={{ border: 'border-emerald-200', bg: 'bg-emerald-50',  text: 'text-emerald-700' }} />
                        <StatCard label={t.admin.comments.spam}           value={counts.spam}     icon="🚫" color={{ border: 'border-rose-200',    bg: 'bg-rose-50',     text: 'text-rose-700'    }} />
                    </div>

                    {/* ── Toolbar ── */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Status tabs + search */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-4 border-b border-slate-100">
                            {/* Status tabs */}
                            <div className="flex flex-wrap gap-1.5">
                                {statusTabs.map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => applyFilter('status', tab.key)}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-mikhak-bold transition-all ${
                                            filters.status === tab.key
                                                ? 'bg-slate-900 text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {tab.label}
                                        <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md text-xs ${
                                            filters.status === tab.key ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Search + per page */}
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <svg className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        defaultValue={filters.search}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder={t.admin.comments.searchPlaceholder}
                                        className={`py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mikhak-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 w-52 transition-all ${lang === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-3 py-2 bg-slate-900 text-white text-sm font-mikhak-bold rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    {t.admin.comments.searchBtn}
                                </button>
                                <select
                                    value={filters.per_page}
                                    onChange={(e) => applyFilter('per_page', e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 font-mikhak-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="10">10 {lang === 'ar' ? 'تعليقات/' : '/page'}</option>
                                    <option value="15">15 {lang === 'ar' ? 'تعليقات/' : '/page'}</option>
                                    <option value="25">25 {lang === 'ar' ? 'تعليق/' : '/page'}</option>
                                    <option value="50">50 {lang === 'ar' ? 'تعليق/' : '/page'}</option>
                                </select>
                            </div>
                        </div>

                        {/* Bulk actions bar */}
                        {someSelected && (
                            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-indigo-50 border-b border-indigo-100">
                                <p className="text-sm text-indigo-700 font-mikhak-bold">
                                    {lang === 'ar' ? (
                                        `تم تحديد ${selectedIds.length} ${selectedIds.length === 1 ? 'تعليق' : 'تعليقات'}`
                                    ) : (
                                        `${selectedIds.length} ${selectedIds.length === 1 ? 'comment' : 'comments'} selected`
                                    )}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => bulkAction('approve')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mikhak-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                        {t.admin.comments.approveBtn}
                                    </button>
                                    <button onClick={() => bulkAction('pending')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mikhak-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {t.admin.comments.pendingBtn}
                                    </button>
                                    <button onClick={() => bulkAction('spam')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mikhak-bold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors border border-rose-200">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                        {t.admin.comments.spamBtn}
                                    </button>
                                    <button onClick={() => bulkAction('delete')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mikhak-bold bg-slate-900 text-white hover:bg-slate-700 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        {t.admin.comments.deleteBtn}
                                    </button>
                                    <button onClick={() => setSelectedIds([])} className="px-3 py-1.5 rounded-lg text-xs font-mikhak-medium text-slate-500 hover:text-slate-700 transition-colors">
                                        {t.admin.comments.clearBtn}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Table ── */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left rtl:text-right">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                                        <th className="px-5 py-3.5 w-10">
                                            <input
                                                type="checkbox"
                                                checked={allSelected}
                                                onChange={toggleSelectAll}
                                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </th>
                                        <th className="px-5 py-3.5 w-44">{t.admin.comments.colAuthor}</th>
                                        <th className="px-5 py-3.5">{t.admin.comments.colComment}</th>
                                        <th className="px-5 py-3.5 w-28 text-center">{t.admin.comments.colStatus}</th>
                                        <th className="px-5 py-3.5 w-36 text-right rtl:text-left">{t.admin.comments.colActions}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {comments.data.map((comment) => {
                                        const isExpanded = expandedId === comment.id;
                                        return (
                                            <tr
                                                key={comment.id}
                                                className={`transition-colors group ${selectedIds.includes(comment.id) ? 'bg-indigo-50/40' : 'hover:bg-slate-50/60'}`}
                                            >
                                                {/* Checkbox */}
                                                <td className="px-5 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(comment.id)}
                                                        onChange={() => toggleSelect(comment.id)}
                                                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </td>

                                                {/* Author */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-mikhak-bold text-sm flex-shrink-0">
                                                            {comment.author_name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-mikhak-bold text-slate-900 truncate">{comment.author_name}</div>
                                                            <div className="text-xs text-slate-400 font-mikhak-regular">
                                                                {new Date(comment.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Comment content */}
                                                <td className="px-5 py-4 max-w-xs lg:max-w-md xl:max-w-lg">
                                                    <div
                                                        className={`text-sm text-slate-700 font-mikhak-regular leading-relaxed cursor-pointer ${!isExpanded ? 'line-clamp-2' : ''}`}
                                                        onClick={() => setExpandedId(isExpanded ? null : comment.id)}
                                                    >
                                                        {comment.content}
                                                    </div>
                                                    {comment.content.length > 120 && (
                                                        <button
                                                            onClick={() => setExpandedId(isExpanded ? null : comment.id)}
                                                            className="text-xs text-indigo-500 font-mikhak-medium mt-1 hover:text-indigo-700"
                                                        >
                                                            {isExpanded ? t.admin.comments.showLess : t.admin.comments.readMore}
                                                        </button>
                                                    )}
                                                    {comment.article && (
                                                        <a
                                                            href={route('blog.show', comment.article.slug)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs text-slate-400 font-mikhak-medium mt-1.5 hover:text-indigo-600 transition-colors"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                            {(() => {
                                                                const title = lang === 'ar' ? comment.article.title?.ar || comment.article.title?.en : comment.article.title?.en || comment.article.title?.ar;
                                                                return (
                                                                    <>
                                                                        {title?.slice(0, 40)}{title?.length > 40 ? '…' : ''}
                                                                    </>
                                                                );
                                                            })()}
                                                        </a>
                                                    )}
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-4 text-center">
                                                    <StatusBadge status={comment.status} t={t} />
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4 text-right rtl:text-left">
                                                    <div className="flex items-center justify-end rtl:justify-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {comment.status !== 'approved' && (
                                                            <button
                                                                onClick={() => updateStatus(comment.id, 'approved')}
                                                                title={t.admin.comments.approveBtn}
                                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                        {comment.status !== 'pending' && (
                                                            <button
                                                                onClick={() => updateStatus(comment.id, 'pending')}
                                                                title={t.admin.comments.pendingBtn}
                                                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                        {comment.status !== 'spam' && (
                                                            <button
                                                                onClick={() => updateStatus(comment.id, 'spam')}
                                                                title={t.admin.comments.spamBtn}
                                                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(comment.id)}
                                                            title={t.admin.comments.deleteBtn}
                                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {/* Empty state */}
                                    {comments.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-sm font-mikhak-bold text-slate-900 mb-1">{t.admin.comments.noComments}</h3>
                                                <p className="text-sm text-slate-500 font-mikhak-regular">
                                                    {filters.search || filters.status !== 'all'
                                                        ? t.admin.comments.adjustFilters
                                                        : t.admin.comments.engageDesc}
                                                </p>
                                                {(filters.search || filters.status !== 'all') && (
                                                    <button
                                                        onClick={() => router.get(route('admin.comments.index'))}
                                                        className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-mikhak-bold"
                                                    >
                                                        {t.admin.comments.clearFilters}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Footer / Pagination ── */}
                        {comments.total > 0 && (
                            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <p className="text-xs text-slate-500 font-mikhak-regular">
                                    {lang === 'ar' ? (
                                        <span>
                                            عرض <span className="font-mikhak-bold text-slate-700">{comments.from}</span>–<span className="font-mikhak-bold text-slate-700">{comments.to}</span> من أصل <span className="font-mikhak-bold text-slate-700">{comments.total}</span> تعليقات
                                        </span>
                                    ) : (
                                        <span>
                                            Showing <span className="font-mikhak-bold text-slate-700">{comments.from}</span>–<span className="font-mikhak-bold text-slate-700">{comments.to}</span> of <span className="font-mikhak-bold text-slate-700">{comments.total}</span> comments
                                        </span>
                                    )}
                                </p>
                                <Pagination links={comments.links} />
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}