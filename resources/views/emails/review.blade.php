<!DOCTYPE html>
<html>
<head>
    <title>New Review Submission</title>
</head>
<body>
    <h2>New Review Submission</h2>
    <p><strong>Type:</strong> {{ $data['type'] }}</p>
    <p><strong>Name:</strong> {{ $data['name'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    @if(isset($data['phone']) && $data['phone'])
    <p><strong>Phone:</strong> {{ $data['phone'] }}</p>
    @endif
    <p><strong>Message:</strong></p>
    <p>{{ $data['message'] }}</p>
</body>
</html>
