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

        $query = Article::select('id', 'title', 'slug', 'image', 'status', 'category_id', 'user_id', 'created_at', 'short_description')
            ->with('category:id,title', 'user:id,name')
            ->where('status', 'published');

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

    public function show(Article $article)
    {
        $article->load(['category', 'user', 'comments' => function($q) {
            $q->where('status', 'approved')->latest();
        }]);

        $relatedArticles = Article::where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }
}
