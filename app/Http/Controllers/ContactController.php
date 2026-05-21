<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'min:3', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ], [
            'name.required' => 'الاسم مطلوب',
            'name.min' => 'الاسم قصير جداً',
            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة',
            'subject.required' => 'الموضوع مطلوب',
            'subject.min' => 'الموضوع قصير جداً',
            'message.required' => 'الرسالة مطلوبة',
            'message.min' => 'الرسالة قصيرة جداً',
        ]);

        try {
            Mail::to(env('CONTACT_RECEIVER_EMAIL', env('MAIL_FROM_ADDRESS')))
                ->send(new ContactMessageMail($validated));

            return back()->with('success', 'تم إرسال رسالتك بنجاح، وسنرد عليك قريباً.');
        } catch (\Throwable $e) {
            Log::error('Contact form mail failed', [
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'حدث خطأ أثناء إرسال الرسالة، حاول مرة أخرى.');
        }
    }
}
