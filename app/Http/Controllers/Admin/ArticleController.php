<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $perPage = in_array((int) $request->get('per_page', 10), [5, 10, 25, 50])
            ? (int) $request->get('per_page', 10)
            : 10;

        $status = $request->get('status');
        $search = $request->get('search');

        $articles = Article::select('id', 'title', 'slug', 'image', 'status', 'published_at', 'category_id', 'user_id', 'created_at')
            ->with('category:id,title', 'user:id,name')
            ->when($status && $status !== 'all', fn($q) => $q->where('status', $status))
            ->when($search, fn($q) => $q->where(fn($q2) =>
                $q2->whereRaw("JSON_EXTRACT(title, '$.en') LIKE ?", ["%{$search}%"])
                   ->orWhereRaw("JSON_EXTRACT(title, '$.ar') LIKE ?", ["%{$search}%"])
            ))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'filters'  => [
                'per_page' => $perPage,
                'status'   => $status ?? 'all',
                'search'   => $search ?? '',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create', [
            'categories' => Category::select('id', 'title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->input('title.en', ''))]);

        $request->validate([
            'title.en'     => 'required|string|max:255',
            'title.ar'     => 'required|string|max:255',
            'slug'         => 'required|string|unique:articles,slug',
            'category_id'  => 'required|exists:categories,id',
            'content.en'   => 'required',
            'content.ar'   => 'required',
            'image'        => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'       => 'required|in:published,draft',
            'published_at' => 'nullable|date|after_or_equal:today',
        ], [
            'slug.unique' => 'This English title is already used. Please choose a different title.',
        ]);

        $imagePath = $request->file('image')->store('articles', 'public');

        Article::create([
            'category_id'       => $request->category_id,
            'title'             => $request->title,
            'slug'              => $request->slug,
            'short_description' => $request->short_description,
            'content'           => $request->content,
            'image'             => $imagePath,
            'status'            => $request->status,
            'published_at'      => $request->status === 'published' ? $request->published_at : null,
        ]);

        return redirect()->route('admin.articles.index')->with('success', 'Article created successfully.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article'    => $article,
            'categories' => Category::select('id', 'title')->get(),
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->merge(['slug' => Str::slug($request->input('title.en', ''))]);

        $request->validate([
            'title.en'     => 'required|string|max:255',
            'title.ar'     => 'required|string|max:255',
            'slug'         => 'required|string|unique:articles,slug,' . $article->id,
            'category_id'  => 'required|exists:categories,id',
            'content.en'   => 'required',
            'content.ar'   => 'required',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'       => 'required|in:published,draft',
            'published_at' => 'nullable|date|after_or_equal:today',
        ], [
            'slug.unique' => 'This English title is already used. Please choose a different title.',
        ]);

        $data = [
            'category_id'       => $request->category_id,
            'title'             => $request->title,
            'slug'              => $request->slug,
            'short_description' => $request->short_description,
            'content'           => $request->content,
            'status'            => $request->status,
            'published_at'      => $request->status === 'published' ? $request->published_at : null,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('articles', 'public');
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article updated successfully.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Article deleted successfully.');
    }
}
