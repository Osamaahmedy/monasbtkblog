<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->get('status');
        $search = $request->get('search');

        $comments = Comment::with('article')
            ->when($status && $status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('author_name', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Comments/Index', [
            'comments' => $comments,
            'filters' => [
                'status' => $status ?? 'all',
                'search' => $search ?? '',
            ],
        ]);
    }

    public function updateStatus(Comment $comment, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,pending,spam',
        ]);

        $comment->update([
            'status' => $validated['status'],
        ]);

        return back()->with('success', 'Comment status updated.');
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return back()->with('success', 'Comment deleted.');
    }

    public function bulkAction(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:comments,id',
            'action' => 'required|in:approve,pending,spam,delete',
        ]);

        $query = Comment::whereIn('id', $validated['ids']);

        if ($validated['action'] === 'delete') {
            $query->delete();
            return back()->with('success', 'Selected comments deleted.');
        }

        $status = match ($validated['action']) {
            'approve' => 'approved',
            'pending' => 'pending',
            'spam' => 'spam',
        };

        $query->update(['status' => $status]);

        return back()->with('success', 'Selected comments updated.');
    }
}