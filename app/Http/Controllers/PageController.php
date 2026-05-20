<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function privacyPolicy()
    {
        return Inertia::render('Static/PrivacyPolicy');
    }

    public function aboutUs()
    {
        return Inertia::render('Static/AboutUs');
    }

    public function contactUs()
    {
        return Inertia::render('Static/ContactUs');
    }
}
