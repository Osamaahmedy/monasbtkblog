<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::factory()->create([
            'name' => 'Admin Monasbtk',
            'email' => 'admin@monasbtk.com',
            'password' => bcrypt('password123'),
        ]);

        // Seed Categories
        $categories = [
            [
                'title' => ['en' => 'Events', 'ar' => 'فعاليات'],
                'description' => ['en' => 'All about events', 'ar' => 'كل ما يخص الفعاليات'],
            ],
            [
                'title' => ['en' => 'News', 'ar' => 'أخبار'],
                'description' => ['en' => 'Latest news', 'ar' => 'آخر الأخبار'],
            ]
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::create($cat);
        }

        // Seed an Article
        $article = \App\Models\Article::create([
            'category_id' => 1,
            'user_id' => $admin->id,
            'title' => ['en' => 'Welcome to Monasbtk', 'ar' => 'أهلاً بكم في مناسبتك'],
            'slug' => 'welcome-to-monasbtk',
            'short_description' => ['en' => 'First article description', 'ar' => 'وصف المقال الأول'],
            'content' => ['en' => '<p>Welcome to our new platform!</p>', 'ar' => '<p>أهلاً بكم في منصتنا الجديدة!</p>'],
            'status' => 'published',
        ]);

        // Seed Comments
        \App\Models\Comment::create([
            'article_id' => $article->id,
            'author_name' => 'John Doe',
            'content' => 'Great platform! Looking forward to more articles.',
            'status' => 'approved',
        ]);

        \App\Models\Comment::create([
            'article_id' => $article->id,
            'author_name' => 'Ahmed Ali',
            'content' => 'موقع رائع جداً، بالتوفيق!',
            'status' => 'pending',
        ]);
    }
}
