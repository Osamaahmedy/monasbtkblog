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
                $message->replyTo($data['email'], $data['name']);
            });

            \Log::info('Email sent successfully');
            return response()->json(['message' => 'Review sent successfully']);
        } catch (\Exception $e) {
            \Log::error('Failed to send email', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json(['message' => 'Unable to send your feedback at this time. Please try again later.'], 500);
        }
    }

    public function sendContact(Request $request)
{
    \Log::info('Contact submission received', $request->all());

    $validator = Validator::make($request->all(), [
        'name' => 'required|string|min:3|max:255',
        'email' => 'required|email|max:255',
        'subject' => 'required|string|min:3|max:255',
        'message' => 'required|string|min:10|max:5000',
    ]);

    if ($validator->fails()) {
        \Log::error('Contact validation failed', ['errors' => $validator->errors()]);
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    try {
        $data = $validator->validated();

        \Log::info('Contact mail configuration', [
            'driver' => config('mail.default'),
            'host' => config('mail.mailers.smtp.host'),
            'port' => config('mail.mailers.smtp.port'),
            'from' => config('mail.from.address'),
            'to' => env('CONTACT_RECEIVER_EMAIL'),
        ]);

        Mail::send('emails.contact', ['data' => $data], function ($message) use ($data) {
            $message->to(env('CONTACT_RECEIVER_EMAIL', 'monasbatech@gmail.com'))
                ->subject('New Contact Message: ' . $data['subject']);
            $message->from(config('mail.from.address'), config('mail.from.name'));
            $message->replyTo($data['email'], $data['name']);
        });

        \Log::info('Contact email sent successfully');

        return response()->json([
            'message' => 'تم إرسال رسالتك بنجاح'
        ], 200);
    } catch (\Throwable $e) {
        \Log::error('Failed to send contact email', [
            'exception' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'message' => 'تعذر إرسال الرسالة حالياً، حاول مرة أخرى لاحقاً'
        ], 500);
    }
}
}
