<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PageController;

use Inertia\Inertia;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
Route::get('/', function () {
    return Inertia::render('Home', [
        'articles' => \App\Models\Article::select('id', 'title', 'slug', 'image', 'status', 'published_at', 'category_id', 'user_id', 'created_at', 'short_description')
            ->with('category:id,title', 'user:id,name')
            ->published()
            ->latest()
            ->take(6)
            ->get()
    ]);
});

Route::get('/contact-us', [PageController::class, 'contactUs'])->name('pages.contact');
Route::post('/contact/send', [ReviewController::class, 'sendContact'])->name('contact.send');
// Public Blog Routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{article:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
// Static Pages
Route::get('/privacy-policy', [\App\Http\Controllers\PageController::class, 'privacyPolicy'])->name('pages.privacy');
Route::get('/about-us', [\App\Http\Controllers\PageController::class, 'aboutUs'])->name('pages.about');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_articles' => \App\Models\Article::count(),
                'active_categories' => \App\Models\Category::count(),
                'pending_comments' => \App\Models\Comment::where('status', 'pending')->count(),
            ]
        ]);
    })->name('dashboard');

    // Admin Routes
  Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('categories', AdminCategoryController::class);
    Route::resource('articles', AdminArticleController::class);
    Route::post('articles/upload-image', [AdminArticleController::class, 'uploadImage'])->name('articles.upload-image');

    Route::get('/comments', [AdminCommentController::class, 'index'])->name('comments.index');
    Route::patch('/comments/{comment}/status', [AdminCommentController::class, 'updateStatus'])->name('comments.update-status');
    Route::delete('/comments/{comment}', [AdminCommentController::class, 'destroy'])->name('comments.destroy');
    Route::post('/comments/bulk-action', [AdminCommentController::class, 'bulkAction'])->name('comments.bulk-action');

    // User management (super admin only)
    Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
    Route::patch('/users/{user}/toggle-active', [AdminUserController::class, 'toggleActive'])->name('users.toggle-active');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
  });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Sitemap
Route::get('/sitemap.xml', function () {
    $articles = \App\Models\Article::published()
        ->select('slug', 'updated_at')
        ->latest('updated_at')
        ->get();

    $content = '<?xml version="1.0" encoding="UTF-8"?>';
    $content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Static pages
    $staticPages = ['/', '/blog', '/privacy-policy', '/about-us', '/contact-us'];
    foreach ($staticPages as $page) {
        $content .= '<url>';
        $content .= '<loc>' . url($page) . '</loc>';
        $content .= '<changefreq>weekly</changefreq>';
        $content .= '<priority>' . ($page === '/' ? '1.0' : '0.8') . '</priority>';
        $content .= '</url>';
    }

    // Articles
    foreach ($articles as $article) {
        $content .= '<url>';
        $content .= '<loc>' . url('/blog/' . $article->slug) . '</loc>';
        $content .= '<lastmod>' . $article->updated_at->toIso8601String() . '</lastmod>';
        $content .= '<changefreq>monthly</changefreq>';
        $content .= '<priority>0.6</priority>';
        $content .= '</url>';
    }

    $content .= '</urlset>';

    return response($content, 200)->header('Content-Type', 'application/xml');
});

require __DIR__.'/auth.php';
