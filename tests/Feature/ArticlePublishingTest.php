<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticlePublishingTest extends TestCase
{
    use RefreshDatabase;

    public function test_article_published_scope_filters_correctly(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        // 1. Published immediately (no published_at)
        $article1 = Article::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => ['en' => 'Immediately published', 'ar' => 'منشور فوراً'],
            'short_description' => ['en' => 'desc', 'ar' => 'وصف'],
            'content' => ['en' => 'content', 'ar' => 'محتوى'],
            'image' => 'articles/dummy.jpg',
            'status' => 'published',
            'published_at' => null,
        ]);

        // 2. Scheduled for the past
        $article2 = Article::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => ['en' => 'Scheduled past', 'ar' => 'مجدول سابق'],
            'short_description' => ['en' => 'desc', 'ar' => 'وصف'],
            'content' => ['en' => 'content', 'ar' => 'محتوى'],
            'image' => 'articles/dummy.jpg',
            'status' => 'published',
            'published_at' => now()->subHour(),
        ]);

        // 3. Scheduled for the future
        $article3 = Article::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => ['en' => 'Scheduled future', 'ar' => 'مجدول مستقبلي'],
            'short_description' => ['en' => 'desc', 'ar' => 'وصف'],
            'content' => ['en' => 'content', 'ar' => 'محتوى'],
            'image' => 'articles/dummy.jpg',
            'status' => 'published',
            'published_at' => now()->addHour(),
        ]);

        // 4. Draft
        $article4 = Article::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => ['en' => 'Draft article', 'ar' => 'مسودة'],
            'short_description' => ['en' => 'desc', 'ar' => 'وصف'],
            'content' => ['en' => 'content', 'ar' => 'محتوى'],
            'image' => 'articles/dummy.jpg',
            'status' => 'draft',
            'published_at' => null,
        ]);

        $published = Article::published()->get();

        $this->assertTrue($published->contains($article1));
        $this->assertTrue($published->contains($article2));
        $this->assertFalse($published->contains($article3));
        $this->assertFalse($published->contains($article4));
    }

    public function test_article_booted_events_set_user_and_slug(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user);

        // Create article without user_id and slug
        $article = Article::create([
            'category_id' => $category->id,
            'title' => ['en' => 'Automated Slug and User Test', 'ar' => 'تجربة الرابط'],
            'short_description' => ['en' => 'desc', 'ar' => 'وصف'],
            'content' => ['en' => 'content', 'ar' => 'محتوى'],
            'image' => 'articles/dummy.jpg',
            'status' => 'draft',
        ]);

        $this->assertEquals($user->id, $article->user_id);
        $this->assertEquals('automated-slug-and-user-test', $article->slug);
    }
}
