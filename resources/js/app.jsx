import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css'; // Make sure Tailwind is configured here

const App = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">
            Hello from React + Tailwind!
        </h1>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
