<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monasbtk</title>
    <link rel="icon" href="{{ Vite::asset('resources/images/monasbtk_colored_logo.png') }}" type="image/png">
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossorigin="anonymous"></script>
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>


