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
        $query = Article::select('id', 'title', 'slug', 'image', 'status', 'category_id', 'user_id', 'created_at', 'short_description')
            ->with('category', 'user')
            ->where('status', 'published');

        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('id', $request->category);
            });
        }

        return Inertia::render('Blog/Index', [
            'articles' => $query->latest()->paginate(12),
            'categories' => Category::all()
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
