<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>رسالة تواصل جديدة</title>
</head>
<body>
    <h2>رسالة تواصل جديدة من صفحة التواصل</h2>

    <p><strong>الاسم:</strong> {{ $data['name'] }}</p>
    <p><strong>البريد الإلكتروني:</strong> {{ $data['email'] }}</p>
    <p><strong>الموضوع:</strong> {{ $data['subject'] }}</p>
    <p><strong>الرسالة:</strong></p>
    <p>{{ $data['message'] }}</p>
</body>
</html>
