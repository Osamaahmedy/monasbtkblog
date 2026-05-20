<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'author_name' => 'nullable|string|max:255',
        ]);

        $article->comments()->create([
            'content' => $request->content,
            'author_name' => $request->author_name ?? 'Guest',
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Your comment has been submitted and is awaiting approval.');
    }

    public function updateStatus(Request $request, Comment $comment)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,pending',
        ]);

        $comment->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Comment status updated.');
    }
}
