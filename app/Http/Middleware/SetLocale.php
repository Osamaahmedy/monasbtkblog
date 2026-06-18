<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $lang = $request->cookie('monasbtk_lang');

        if (!$lang || !in_array($lang, ['ar', 'en'])) {
            $acceptLang = $request->header('Accept-Language');
            if ($acceptLang) {
                $lang = (strpos($acceptLang, 'ar') !== false) ? 'ar' : 'en';
            } else {
                $lang = 'ar'; // Default to Arabic for crawlers/direct hits with no header
            }
        }

        App::setLocale($lang);

        $response = $next($request);

        // Queue/Set the cookie for the next response if it isn't set already
        if ($request->cookie('monasbtk_lang') !== $lang) {
            $response->headers->setCookie(cookie('monasbtk_lang', $lang, 60 * 24 * 365, null, null, false, false));
        }

        return $response;
    }
}
