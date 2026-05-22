import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Transition } from '@headlessui/react';

// ─── Tab icons ────────────────────────────────────────────────────────────────
function IconUser() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}
function IconLock() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
}
function IconUsers() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

// ─── Shared input style ────────────────────────────────────────────────────────
const inputCls = (error) =>
    `mt-1 block w-full bg-slate-50 border focus:bg-white focus:ring-4 rounded-xl px-4 py-3 text-slate-700 shadow-sm transition-all font-mikhak-medium placeholder-slate-400 text-sm ${
        error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
    }`;

const labelCls = 'block text-sm font-mikhak-bold text-slate-700 mb-1';

// ─── Alert ────────────────────────────────────────────────────────────────────
function FlashAlert({ flash }) {
    if (!flash?.success && !flash?.error) return null;
    const isSuccess = !!flash.success;
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-mikhak-medium mb-6 ${
            isSuccess ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                {isSuccess
                    ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                }
            </svg>
            {flash.success || flash.error}
        </div>
    );
}

// ─── Tab 1: Profile Info ───────────────────────────────────────────────────────
function ProfileTab({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    return (
        <form onSubmit={(e) => { e.preventDefault(); patch(route('profile.update')); }} className="space-y-5">
            <div>
                <label className={labelCls}>Full Name</label>
                <input
                    type="text"
                    className={inputCls(errors.name)}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Your name"
                    required
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.name}</p>}
            </div>

            <div>
                <label className={labelCls}>Email Address</label>
                <input
                    type="email"
                    className={inputCls(errors.email)}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="you@example.com"
                    required
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.email}</p>}
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 font-mikhak-medium">
                    Your email is unverified.
                </div>
            )}

            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-5 py-2.5 bg-indigo-600 rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-60"
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
                <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                    <p className="text-sm text-emerald-600 font-mikhak-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Saved!
                    </p>
                </Transition>
            </div>
        </form>
    );
}

// ─── Tab 2: Password ───────────────────────────────────────────────────────────
function PasswordTab() {
    const passwordRef = useRef();
    const currentRef = useRef();
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errs) => {
                if (errs.password) { reset('password', 'password_confirmation'); passwordRef.current?.focus(); }
                if (errs.current_password) { reset('current_password'); currentRef.current?.focus(); }
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <label className={labelCls}>Current Password</label>
                <input ref={currentRef} type="password" className={inputCls(errors.current_password)} value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} autoComplete="current-password" />
                {errors.current_password && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.current_password}</p>}
            </div>
            <div>
                <label className={labelCls}>New Password</label>
                <input ref={passwordRef} type="password" className={inputCls(errors.password)} value={data.password} onChange={(e) => setData('password', e.target.value)} autoComplete="new-password" />
                {errors.password && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.password}</p>}
            </div>
            <div>
                <label className={labelCls}>Confirm New Password</label>
                <input type="password" className={inputCls(errors.password_confirmation)} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
                {errors.password_confirmation && <p className="text-rose-500 text-xs mt-1 font-mikhak-medium">{errors.password_confirmation}</p>}
            </div>
            <div className="flex items-center gap-4 pt-2">
                <button type="submit" disabled={processing} className="inline-flex items-center px-5 py-2.5 bg-indigo-600 rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-60">
                    {processing ? 'Updating...' : 'Update Password'}
                </button>
                <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                    <p className="text-sm text-emerald-600 font-mikhak-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Updated!
                    </p>
                </Transition>
            </div>
        </form>
    );
}

// ─── Tab 3: User Management (id=1 only) ───────────────────────────────────────
function UsersTab({ users }) {
    const [showCreate, setShowCreate] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => { reset(); setShowCreate(false); },
        });
    };

    const toggleActive = (user) => {
        router.patch(route('admin.users.toggle-active', user.id), {}, { preserveScroll: true });
    };

    const deleteUser = (user) => {
        if (confirm(`Delete user "${user.name}"? This cannot be undone.`)) {
            router.delete(route('admin.users.destroy', user.id), { preserveScroll: true });
        }
    };

    return (
        <div className="space-y-6">
            {/* Create button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 transition-all"
                >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showCreate ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
                    </svg>
                    {showCreate ? 'Cancel' : 'New User'}
                </button>
            </div>

            {/* Create form */}
            {showCreate && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h4 className="text-sm font-mikhak-bold text-slate-800 mb-4">Create New Account</h4>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelCls}>Name</label>
                                <input type="text" className={inputCls(errors.name)} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Full name" required />
                                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className={labelCls}>Email</label>
                                <input type="email" className={inputCls(errors.email)} value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="user@example.com" required />
                                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className={labelCls}>Password</label>
                                <input type="password" className={inputCls(errors.password)} value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                                {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className={labelCls}>Confirm Password</label>
                                <input type="password" className={inputCls(errors.password_confirmation)} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required />
                                {errors.password_confirmation && <p className="text-rose-500 text-xs mt-1">{errors.password_confirmation}</p>}
                            </div>
                        </div>
                        <div className="pt-1">
                            <button type="submit" disabled={processing} className="inline-flex items-center px-5 py-2.5 bg-indigo-600 rounded-xl font-mikhak-bold text-sm text-white hover:bg-indigo-700 transition-all disabled:opacity-60">
                                {processing ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Users table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-slate-500 font-mikhak-bold text-xs uppercase tracking-wider">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50/60 transition-colors group">
                                <td className="px-4 py-3 text-slate-400 font-mikhak-medium text-xs">{u.id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-mikhak-bold text-sm flex-shrink-0">
                                            {u.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-mikhak-bold text-slate-900 text-sm flex items-center gap-1.5">
                                                {u.name}
                                                {u.id === 1 && (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs bg-amber-100 text-amber-700 font-mikhak-bold">
                                                        Super Admin
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 font-mikhak-regular">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mikhak-bold ${
                                        u.is_active
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                                    }`}>
                                        {u.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {u.id !== 1 && (
                                            <>
                                                <button
                                                    onClick={() => toggleActive(u)}
                                                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mikhak-medium border transition-colors ${
                                                        u.is_active
                                                            ? 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700'
                                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700'
                                                    }`}
                                                >
                                                    {u.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(u)}
                                                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mikhak-medium border bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Edit({ mustVerifyEmail, status, users }) {
    const { auth, flash } = usePage().props;
    const isSuperAdmin = auth.user.id === 1;

    const tabs = [
        { id: 'profile', label: 'Profile Info', icon: <IconUser /> },
        { id: 'password', label: 'Password',    icon: <IconLock /> },
        ...(isSuperAdmin ? [{ id: 'users', label: 'Manage Users', icon: <IconUsers /> }] : []),
    ];

    const [activeTab, setActiveTab] = useState('profile');

    // Avatar initials
    const initials = auth.user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="font-mikhak-bold text-2xl text-slate-800 leading-tight">Account Settings</h2>
                    <p className="text-sm text-slate-500 font-mikhak-regular mt-1">Manage your profile, security, and team</p>
                </div>
            }
        >
            <Head title="Account Settings" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-mikhak-bold text-xl flex-shrink-0 shadow-md">
                            {initials}
                        </div>
                        <div>
                            <h3 className="font-mikhak-bold text-slate-900 text-lg">{auth.user.name}</h3>
                            <p className="text-sm text-slate-500 font-mikhak-regular">{auth.user.email}</p>
                            {isSuperAdmin && (
                                <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-md text-xs bg-amber-100 text-amber-700 font-mikhak-bold">
                                    ⭐ Super Admin
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Flash alert */}
                    {flash && <FlashAlert flash={flash} />}

                    {/* Tabs Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        {/* Tab bar */}
                        <div className="flex border-b border-slate-100 bg-slate-50/50 px-2 pt-2 gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-mikhak-bold rounded-t-xl transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-white text-indigo-600 border border-b-white border-slate-200 -mb-px shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div className="p-8">
                            {activeTab === 'profile' && <ProfileTab mustVerifyEmail={mustVerifyEmail} status={status} />}
                            {activeTab === 'password' && <PasswordTab />}
                            {activeTab === 'users' && isSuperAdmin && <UsersTab users={users || []} />}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
