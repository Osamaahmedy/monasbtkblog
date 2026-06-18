<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category');
        $search   = $request->get('search');

        $query = Article::select('id', 'title', 'slug', 'image', 'status', 'published_at', 'category_id', 'user_id', 'created_at', 'short_description')
            ->with('category:id,title', 'user:id,name')
            ->published();

        if ($category) {
            $query->where('category_id', $category);
        }

        if ($search) {
            $query->where(fn($q) =>
                $q->whereRaw("JSON_EXTRACT(title, '$.en') LIKE ?", ["%{$search}%"])
                  ->orWhereRaw("JSON_EXTRACT(title, '$.ar') LIKE ?", ["%{$search}%"])
            );
        }

        return Inertia::render('Blog/Index', [
            'articles'   => $query->latest()->paginate(12)->withQueryString(),
            'categories' => Category::select('id', 'title')->get(),
            'filters'    => ['category' => $category, 'search' => $search],
        ]);
    }

    public function show(Request $request, Article $article)
    {
        if (!$article->is_published && !auth()->check()) {
            abort(404);
        }

        $article->load(['category', 'user', 'comments' => function($q) {
            $q->where('status', 'approved')->latest();
        }]);

        $relatedArticles = Article::published()
            ->select('id', 'title', 'slug', 'image', 'status', 'published_at', 'category_id', 'created_at')
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->latest()
            ->take(3)
            ->get();

        // Detect language
        $lang = app()->getLocale();

        // Get metadata values with fallback
        $metaTitle = ($article->meta_title[$lang] ?? null) ?: ($article->title[$lang] ?? ($article->title['en'] ?? 'monasbtk - مناسبتك'));
        $metaDescription = ($article->meta_description[$lang] ?? null) ?: ($article->short_description[$lang] ?? ($article->title[$lang] ?? ($article->title['en'] ?? '')));
        
        $ogImage = $article->og_image ?: $article->image;
        $ogImageUrl = $ogImage ? url('storage/' . $ogImage) : null;
        $canonicalUrl = route('blog.show', $article->slug);

        return Inertia::render('Blog/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ])->withViewData([
            'meta_title' => $metaTitle,
            'meta_description' => $metaDescription,
            'og_image' => $ogImageUrl,
            'canonical' => $canonicalUrl,
            'og_type' => 'article',
        ]);
    }
}
