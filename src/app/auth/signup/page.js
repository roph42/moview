'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import facebook from "@/_assets/facebook.svg";
import google from "@/_assets/google.svg";
import logo from "@/_assets/logo.svg";
import Link from "next/link";

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    

    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, passwordConfirmation }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/auth/email');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <title>Register</title>
      <meta name="description" content="Register to Premoview" />
      {/* Logo */}
      <Image src={logo} alt="Logo" className="w-50 h-50 mr-2" />

      {/* Form Container */}
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-poppins text-black mb-2">
            Welcome to Premoview!
          </h1>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="text-white">Nom utilisateur :</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 text-gray-300 bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 text-gray-300 bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe :</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 text-gray-300 bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="text-white">Confirmer le mot de passe</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-3 text-gray-300 bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
          >
            Inscrire
          </button>
        </form>
        <div className="border-b-2 mt-6 mb-6"></div>

          <div className="text-center mt-4">
            <button className="w-full p-3 mb-3 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <Image src={google} alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            <button className="w-full p-3 mb-3 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <Image src={facebook} alt="Facebook" className="w-5 h-5 mr-2" />
              Continue with Facebook
            </button>
          </div>

          <div className="text-center mt-6 text-gray-400 flex flex-col">
            <p>Already have an account ?</p>

            <Link
              href="/auth/signin"
              className="text-orange-500 hover:underline"
            >
              Log in here !
            </Link>
          </div>
      </div>
    </div>
    
  );
};

export default SignupPage;
