import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import monasbtkLogo from '../../../images/monasbtk_colored_logo.png';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen bg-slate-50 lg:bg-[#fafafa]">
            <Head title="Log in" />

            {/* Left side: Premium Branded Panel (Hidden on tablet/mobile) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="hidden lg:flex lg:w-[52%] relative overflow-hidden"
                style={{
                    background: 'linear-gradient(145deg, #1a1030 0%, #2d1548 25%, #4a1259 50%, #2d1548 75%, #1a1030 100%)',
                }}
            >
                {/* Animated floating orbs */}
                <div
                    className="absolute rounded-full blur-[120px] pointer-events-none"
                    style={{
                        width: '400px',
                        height: '400px',
                        top: '-80px',
                        right: '-60px',
                        background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)',
                        animation: 'float1 8s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute rounded-full blur-[100px] pointer-events-none"
                    style={{
                        width: '350px',
                        height: '350px',
                        bottom: '-50px',
                        left: '-40px',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
                        animation: 'float2 10s ease-in-out infinite',
                    }}
                />

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Content */}
                <div className="relative z-20 flex flex-col justify-between p-12 xl:p-16 text-white w-full h-full">
                    {/* Top: Logo */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={monasbtkLogo}
                                    alt="Monasbtk Logo"
                                    className="h-11 w-11 drop-shadow-lg"
                                    style={{ filter: 'brightness(1.1)' }}
                                />
                                <span
                                    className="text-2xl font-bold tracking-tight"
                                    style={{
                                        background: 'linear-gradient(135deg, #f9a8d4, #c084fc, #a78bfa)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Monasbtk
                                </span>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Center: Hero content */}
                    <div className="flex-1 flex flex-col justify-center -mt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                        >
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8"
                                style={{
                                    background: 'rgba(236,72,153,0.15)',
                                    border: '1px solid rgba(236,72,153,0.25)',
                                    color: '#f9a8d4',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <span style={{ fontSize: '14px' }}>✨</span>
                                Premium Event Management
                            </div>

                            {/* Heading */}
                            <h1
                                className="text-5xl xl:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
                                style={{ color: '#f1f5f9' }}
                            >
                                Plan Your
                                <br />
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #ec4899, #a855f7, #6366f1)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Perfect
                                </span>{' '}
                                Occasion.
                            </h1>

                            <p
                                className="text-lg max-w-md leading-relaxed"
                                style={{ color: 'rgba(203,213,225,0.75)', fontWeight: 300 }}
                            >
                                Sign in to discover exclusive venues, manage your celebrations, and create unforgettable memories.
                            </p>

                            {/* Feature pills */}
                            <div className="flex flex-wrap gap-3 mt-10">
                                {['Smart Planning', 'Top Venues', 'Easy Booking'].map((feature, i) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                                        style={{
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'rgba(226,232,240,0.85)',
                                            backdropFilter: 'blur(8px)',
                                        }}
                                    >
                                        <svg className="w-4 h-4" style={{ color: '#ec4899' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom: Copyright */}
                    <div
                        className="text-sm font-medium flex items-center gap-3"
                        style={{ color: 'rgba(148,163,184,0.5)' }}
                    >
                        <span>&copy; {new Date().getFullYear()} Monasbtk</span>
                        <span style={{ fontSize: '4px', lineHeight: 1 }}>●</span>
                        <span>All rights reserved</span>
                    </div>
                </div>
            </motion.div>

            {/* Right side: Login Form */}
            <div className="w-full lg:w-[48%] flex items-center justify-center p-4 sm:p-10 lg:p-16 xl:p-24 relative overflow-hidden">
                {/* Subtle background effects (Only visible on mobile/tablet to add premium feel) */}
                <div
                    className="absolute rounded-full blur-[130px] pointer-events-none lg:opacity-100"
                    style={{
                        width: '320px',
                        height: '320px',
                        top: '-80px',
                        right: '-80px',
                        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute rounded-full blur-[130px] pointer-events-none lg:opacity-100"
                    style={{
                        width: '320px',
                        height: '320px',
                        bottom: '-80px',
                        left: '-80px',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-[420px] bg-white lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-3xl border border-slate-100 lg:border-none shadow-xl shadow-slate-100/50 lg:shadow-none relative z-10"
                >
                    {/* Mobile Logo & Brand (Visible on tablet/mobile) */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <img
                                src={monasbtkLogo}
                                alt="Monasbtk Logo"
                                className="h-10 w-10 sm:h-12 sm:w-12"
                            />
                            <span
                                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                            >
                                Monasbtk
                            </span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="mb-8 text-center lg:text-left">
                        <h2
                            className="text-2xl sm:text-3xl font-bold mb-2.5 tracking-tight"
                            style={{ color: '#0f172a' }}
                        >
                            Welcome back
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.5 }}>
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 rounded-xl text-sm font-medium"
                            style={{
                                background: 'rgba(16,185,129,0.08)',
                                border: '1px solid rgba(16,185,129,0.15)',
                                color: '#059669',
                            }}
                        >
                            {status}
                        </motion.div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="font-semibold mb-1.5 text-xs uppercase tracking-wider"
                                style={{ color: '#475569' }}
                            />
                            <div className="relative mt-1">
                                <div
                                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{ color: '#94a3b8' }}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full rounded-xl text-base font-medium"
                                    style={{
                                        padding: '13px 16px 13px 48px',
                                        border: '1.5px solid #e2e8f0',
                                        background: '#f8fafc',
                                        color: '#0f172a',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="name@example.com"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#ec4899';
                                        e.target.style.background = '#ffffff';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(236,72,153,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.background = '#f8fafc';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="font-semibold text-xs uppercase tracking-wider"
                                    style={{ color: '#475569' }}
                                />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs sm:text-sm font-semibold transition-colors"
                                        style={{ color: '#ec4899' }}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative mt-1">
                                <div
                                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{ color: '#94a3b8' }}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full rounded-xl text-base font-medium"
                                    style={{
                                        padding: '13px 16px 13px 48px',
                                        border: '1.5px solid #e2e8f0',
                                        background: '#f8fafc',
                                        color: '#0f172a',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#ec4899';
                                        e.target.style.background = '#ffffff';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(236,72,153,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.background = '#f8fafc';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember Me - Native label handling (No double toggle bugs) */}
                        <div className="flex items-center pt-1">
                            <label className="flex items-center cursor-pointer group select-none">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember-checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div
                                        className="w-[20px] h-[20px] rounded-[6px] flex items-center justify-center transition-all duration-200"
                                        style={{
                                            border: data.remember ? 'none' : '2px solid #cbd5e1',
                                            background: data.remember
                                                ? 'linear-gradient(135deg, #ec4899, #a855f7)'
                                                : '#ffffff',
                                            boxShadow: data.remember
                                                ? '0 2px 8px rgba(236,72,153,0.3)'
                                                : 'none',
                                        }}
                                    >
                                        {data.remember && (
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span
                                    className="ms-3 text-sm font-medium transition-colors"
                                    style={{ color: data.remember ? '#334155' : '#64748b' }}
                                >
                                    Remember for 30 days
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <motion.button
                                whileHover={{ scale: 1.01, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex justify-center items-center border-0 rounded-xl text-base font-bold text-white focus:outline-none transition-all duration-300"
                                style={{
                                    padding: '14px 24px',
                                    background: processing
                                        ? 'linear-gradient(135deg, #94a3b8, #94a3b8)'
                                        : 'linear-gradient(135deg, #ec4899, #a855f7)',
                                    boxShadow: processing
                                        ? 'none'
                                        : '0 6px 24px rgba(236,72,153,0.25), 0 2px 6px rgba(168,85,247,0.15)',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                    opacity: processing ? 0.7 : 1,
                                }}
                                disabled={processing}
                            >
                                {processing ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        Sign in to your account
                                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>

                    {/* Bottom divider and trust indicators */}
                    <div className="mt-8 pt-6" style={{ borderTop: '1px solid #f1f5f9' }}>
                        <div className="flex items-center justify-center gap-4 sm:gap-6">
                            {[
                                { icon: '🔒', text: 'Secure' },
                                { icon: '⚡', text: 'Fast' },
                                { icon: '🛡️', text: 'Protected' },
                            ].map((item) => (
                                <div
                                    key={item.text}
                                    className="flex items-center gap-1.5 text-xs font-medium"
                                    style={{ color: '#94a3b8' }}
                                >
                                    <span style={{ fontSize: '12px' }}>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-30px, 20px) scale(1.05); }
                    66% { transform: translate(20px, -15px) scale(0.95); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(25px, -20px) scale(1.08); }
                    66% { transform: translate(-15px, 25px) scale(0.92); }
                }
            `}</style>
        </div>
    );
}
