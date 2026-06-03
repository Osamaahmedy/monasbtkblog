<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TPNBWN4J');</script>
    <!-- End Google Tag Manager -->
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8FF16W6S3C"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8FF16W6S3C');
    </script>
    
    {{-- ===== SEO Core Meta ===== --}}
    <title>@yield('title', 'monasbtk - مناسبتك')</title>
    <meta name="description" content="@yield('description', 'وصف موقعك هنا - اكتب وصفاً جذاباً لا يتجاوز 160 حرف')">
    <meta name="keywords" content="@yield('keywords', 'كلمة1, كلمة2, كلمة3')">
    <meta name="author" content="monasbtk">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <link rel="canonical" href="@yield('canonical', url()->current())">

    {{-- ===== Theme Color ===== --}}
    <meta name="theme-color" content="#794BC7">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="monasbtk">
    <meta name="msapplication-TileColor" content="#794BC7">

    {{-- ===== Open Graph (Facebook / WhatsApp / LinkedIn) ===== --}}
    <meta property="og:type" content="@yield('og_type', 'website')">
    <meta property="og:title" content="@yield('og_title', 'monasbtk - مناسبتك')">
    <meta property="og:description" content="@yield('og_description', 'وصف موقعك هنا')">
    <meta property="og:url" content="@yield('og_url', url()->current())">
    <meta property="og:image" content="@yield('og_image', Vite::asset('resources/images/monasbtk_colored_logo.png'))">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="monasbtk">
    <meta property="og:locale" content="ar_SA">

    {{-- ===== Twitter Card ===== --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('twitter_title', 'monasbtk - مناسبتك')">
    <meta name="twitter:description" content="@yield('twitter_description', 'وصف موقعك هنا')">
    <meta name="twitter:image" content="@yield('twitter_image', Vite::asset('resources/images/monasbtk_colored_logo.png'))">
    {{-- <meta name="twitter:site" content="@your_twitter_handle"> --}}

    {{-- ===== Favicon ===== --}}
    <link rel="icon" href="{{ Vite::asset('resources/images/monasbtk_colored_logo.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ Vite::asset('resources/images/monasbtk_colored_logo.png') }}">

    {{-- ===== Google Search Console Verification ===== --}}
    <meta name="google-site-verification" content="VGHq44w9RrW9MIDWaBCVb5fKIrmU-wdiB_TQaGvhXx0" />

    {{-- ===== Structured Data / JSON-LD (Schema.org) ===== --}}
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "monasbtk",
        "url": "{{ config('app.url') }}",
        "description": ""مناسبتك" هي شركة سعودية ناشئة تعتمد على التكنولوجيا، متخصصة في تقديم حلول ذكية لتنظيم المناسبات والفعاليات. نؤمن بأن التخطيط لمناسبة مميزة لا يجب أن يكون معقدًا، ولهذا صممنا تطبيق "مناسبتك" ليكون أداة سهلة وفعالة تساعد العملاء على توفير الوقت والجهد، والوصول إلى أفضل مزودي الخدمات بكل سلاسة. تأسست الشركة بداية عام 2024، ونسعى لإحداث نقلة نوعية في قطاع تنظيم المناسبات من خلال حلول مبتكرة وشاملة تواكب احتياجات السوق المحلي وتدعم رواد الأعمال في هذا المجال",
        "inLanguage": "ar",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "{{ config('app.url') }}/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }
    </script>

    {{-- ===== Extra Structured Data per page ===== --}}
    @stack('structured_data')

    {{-- ===== Google Fonts - Outfit ===== --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead

    {{-- ===== Google AdSense ===== --}}
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossorigin="anonymous"></script>
</head>
<body class="font-sans antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPNBWN4J"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    @inertia

    <!-- 555 -->
</body>
</html>