// app/auth/signin/page.js
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import facebook from "@/_assets/facebook.svg";
import google from "@/_assets/google.svg";
import logo from "@/_assets/logo.svg";
import Link from "next/link";

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {

      router.push('/');
    } else {
      alert('Assurez-vous que votre email est vérifié et renseigner de bonnes informations');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <title>Login</title>
      <meta name="description" content="Login to Premoview" />
      <Image src={logo} alt="Logo" className="w-20 h-20 mb-8" />

      <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-black">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-poppins text-white mb-2">
            Welcome to Premoview!
          </h1>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label className="text-white">Email</label>
            <input
              type="email"
              className="w-full p-3 text-gray-300 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="text-white">Password</label>
            <input
              type="password"
              className="w-full p-3 text-gray-300 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="text-right">
            <Link href="/auth/forgot-password">
              <p className="text-sm text-orange-500 hover:underline">Forgot your password?</p>
            </Link>
          </div>

          {/* Bouton Connexion */}
          <div>
            <button
              type="submit"
              className="w-full p-3 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
            >
              Login
            </button>
          </div>
        </form>

        <div className="border-b-2 border-gray-700 mt-10 mb-10"></div>

        {/* Connexion avec Google et Facebook */}
        <div className="text-center mt-4">
          <button className="w-full p-3 mb-3 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
            <Image src={google} alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <button className="w-full p-3 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
            <Image src={facebook} alt="Facebook" className="w-5 h-5 mr-2" />
            Continue with Facebook
          </button>
        </div>

        {/* Lien vers l'inscription */}
        <div className="text-center mt-6 text-gray-400 flex flex-col">
          <p>Dont have an account?</p>
          <Link href="/auth/signup" className="text-orange-500 hover:underline">
            Register here!
          </Link>
        </div>
      </div>
    </div>

  );
}
