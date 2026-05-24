<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'title',
        'slug',
        'image',
        'short_description',
        'content',
        'status',
        'published_at',
    ];

    protected $casts = [
        'title' => 'array',
        'short_description' => 'array',
        'content' => 'array',
        'published_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($article) {
            if (auth()->check() && !$article->user_id) {
                $article->user_id = auth()->id();
            }
            if (!$article->slug && isset($article->title['en'])) {
                $article->slug = \Illuminate\Support\Str::slug($article->title['en']);
            }
        });

        static::updating(function ($article) {
            if (!$article->slug && isset($article->title['en'])) {
                $article->slug = \Illuminate\Support\Str::slug($article->title['en']);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->where(function ($q) {
                         $q->whereNull('published_at')
                           ->orWhere('published_at', '<=', now());
                     });
    }

    public function getIsPublishedAttribute()
    {
        return $this->status === 'published' && (is_null($this->published_at) || $this->published_at <= now());
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
