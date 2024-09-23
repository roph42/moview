'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword({ searchParams }) {
  const router = useRouter();
  const { token, email } = searchParams; // Récupère le token et l'email depuis l'URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/auth/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, email, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Votre mot de passe a été réinitialisé avec succès.');
      router.push('/auth/signin');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <h1>Réinitialiser votre mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Réinitialiser</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
