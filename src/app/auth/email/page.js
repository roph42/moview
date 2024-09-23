'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "@/_assets/logo.svg";

export default function Verify() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <title>Email Verification</title>
      <meta name="description" content="Verify your email to complete registration" />
      <Image src={logo} alt="Logo" className="w-20 h-20 mb-8" />

      <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-black">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-poppins text-white mb-2">
            Please Verify Your Email
          </h1>
          <p className="text-gray-400">
            We’ve sent an email to your inbox. Please click the verification link to activate your account.
          </p>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full p-3 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
