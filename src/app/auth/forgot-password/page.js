// app/auth/forgot-password/page.js
'use client';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const res = await fetch('/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Un mail a été envoyé avec les instructions pour modifier le mot de passe .');
    } else {
        setMessage(data.message || 'Une erreur est survenue. Veuillez réessayer.'); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-3xl text-white">Forgot your password?</h1>
      <form onSubmit={handleForgotPassword} className="mt-6">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 bg-gray-800 text-white border border-gray-600 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="ml-4 p-3 bg-orange-500 rounded text-white">
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-white mt-4">{message}</p>}
    </div>
  );
}
