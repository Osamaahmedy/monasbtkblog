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
        $request->merge([
            'slug' => $request->filled('slug')
                ? Str::slug($request->input('slug'))
                : Str::slug($request->input('title.en', ''))
        ]);

        $request->validate([
            'title.en'             => 'required|string|max:255',
            'title.ar'             => 'required|string|max:255',
            'slug'                 => 'required|string|unique:articles,slug',
            'category_id'          => 'required|exists:categories,id',
            'content.en'           => 'required',
            'content.ar'           => 'required',
            'image'                => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'               => 'required|in:published,draft',
            'published_at'         => 'nullable|date|after_or_equal:today',
            'meta_title.en'        => 'nullable|string|max:255',
            'meta_title.ar'        => 'nullable|string|max:255',
            'meta_description.en' => 'nullable|string|max:500',
            'meta_description.ar' => 'nullable|string|max:500',
            'image_alt.en'         => 'nullable|string|max:255',
            'image_alt.ar'         => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [
            'slug.unique' => 'This link (slug) is already used. Please choose a different link.',
        ]);

        $imagePath = $request->file('image')->store('articles', 'public');
        
        $ogImagePath = null;
        if ($request->hasFile('og_image')) {
            $ogImagePath = $request->file('og_image')->store('articles/og', 'public');
        }

        Article::create([
            'category_id'       => $request->category_id,
            'title'             => $request->title,
            'slug'              => $request->slug,
            'short_description' => $request->short_description,
            'content'           => $request->content,
            'image'             => $imagePath,
            'status'            => $request->status,
            'published_at'      => $request->status === 'published' ? $request->published_at : null,
            'meta_title'        => $request->meta_title,
            'meta_description'  => $request->meta_description,
            'image_alt'         => $request->image_alt,
            'og_image'          => $ogImagePath,
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

    /**
     * Upload an image from the Quill editor.
     * Returns a URL instead of embedding base64 in content.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $path = $request->file('image')->store('articles/content', 'public');

        return response()->json([
            'url' => '/storage/' . $path,
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->merge([
            'slug' => $request->filled('slug')
                ? Str::slug($request->input('slug'))
                : Str::slug($request->input('title.en', ''))
        ]);

        $request->validate([
            'title.en'             => 'required|string|max:255',
            'title.ar'             => 'required|string|max:255',
            'slug'                 => 'required|string|unique:articles,slug,' . $article->id,
            'category_id'          => 'required|exists:categories,id',
            'content.en'           => 'required',
            'content.ar'           => 'required',
            'image'                => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'               => 'required|in:published,draft',
            'published_at'         => 'nullable|date|after_or_equal:today',
            'meta_title.en'        => 'nullable|string|max:255',
            'meta_title.ar'        => 'nullable|string|max:255',
            'meta_description.en' => 'nullable|string|max:500',
            'meta_description.ar' => 'nullable|string|max:500',
            'image_alt.en'         => 'nullable|string|max:255',
            'image_alt.ar'         => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [
            'slug.unique' => 'This link (slug) is already used. Please choose a different link.',
        ]);

        $data = [
            'category_id'       => $request->category_id,
            'title'             => $request->title,
            'slug'              => $request->slug,
            'short_description' => $request->short_description,
            'content'           => $request->content,
            'status'            => $request->status,
            'published_at'      => $request->status === 'published' ? $request->published_at : null,
            'meta_title'        => $request->meta_title,
            'meta_description'  => $request->meta_description,
            'image_alt'         => $request->image_alt,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('articles', 'public');
        }

        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('articles/og', 'public');
            // Delete old og_image if it exists
            if ($article->og_image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($article->og_image);
            }
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
