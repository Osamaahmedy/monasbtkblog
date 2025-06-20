<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReviewController;

Route::middleware('api')->group(function () {
    Route::post('/send-review', [ReviewController::class, 'sendReview']);
});

// Test route - visit /api/test in your browser to check if API routes are working
Route::get('/test', function() {
    return response()->json(['message' => 'API is working']);
});
