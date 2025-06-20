<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function sendReview(Request $request)
    {
        \Log::info('Review submission received', $request->all());
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|string',
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
            'phone' => 'nullable|string',
            'recipientEmail' => 'required|email'
        ]);

        if ($validator->fails()) {
            \Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->all();
            
            // Log mail configuration for debugging
            \Log::info('Mail configuration', [
                'driver' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'from' => config('mail.from.address')
            ]);
            
            Mail::send('emails.review', ['data' => $data], function ($message) use ($data) {
                $message->to($data['recipientEmail'])
                        ->subject('New Review Submission');
                $message->from(config('mail.from.address'), config('mail.from.name'));
            });
            
            \Log::info('Email sent successfully');
            return response()->json(['message' => 'Review sent successfully']);
        } catch (\Exception $e) {
            // Log the detailed error for debugging
            \Log::error('Failed to send email', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Return a generic error message to the user
            return response()->json(['message' => 'Unable to send your feedback at this time. Please try again later.'], 500);
        }
    }
}



