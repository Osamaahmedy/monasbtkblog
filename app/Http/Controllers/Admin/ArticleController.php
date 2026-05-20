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
    public function index()
    {
        return Inertia::render('Admin/Articles/Index', [
            'articles' => Article::select('id', 'title', 'slug', 'image', 'status', 'category_id', 'user_id', 'created_at')
                            ->with('category', 'user')
                            ->latest()
                            ->paginate(request()->input('per_page', 5))
                            ->withQueryString(),
            'filters' => request()->only(['per_page'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'slug' => Str::slug($request->input('title.en', ''))
        ]);

        $request->validate([
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles,slug',
            'category_id' => 'required|exists:categories,id',
            'content.en' => 'required',
            'content.ar' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [
            'slug.unique' => 'The English title generates a slug that is already in use. Please use a different English title.',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        Article::create([
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => $request->slug,
            'short_description' => $request->short_description,
            'content' => $request->content,
            'image' => $imagePath,
            'status' => 'published',
        ]);

        return redirect()->route('admin.articles.index')->with('success', 'Article created successfully.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->merge([
            'slug' => Str::slug($request->input('title.en', ''))
        ]);

        $request->validate([
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles,slug,' . $article->id,
            'category_id' => 'required|exists:categories,id',
            'content.en' => 'required',
            'content.ar' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [
            'slug.unique' => 'The English title generates a slug that is already in use. Please use a different English title.',
        ]);

        $data = [
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => $request->slug,
            'short_description' => $request->short_description,
            'content' => $request->content,
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
