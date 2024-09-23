'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import logo from "@/_assets/logo.svg";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <header className="border-b border-white/10 flex items-center justify-between h-[10vh]">
      <Link href="/">
        <Image src={logo} alt="Premoview logo" className="cursor-pointer" />
      </Link>

      <div className="flex space-x-2 justify-end w-2/6">
        {session ? (
          <>
            <Link href="/auth/profile" className="border-b border-white/10 py-1 w-3/6 text-center">
              Profile
            </Link>
            <Link href={`/favorites/${session.user.id}`} className="border-b border-white/10 py-1 w-3/6 text-center">
              Favoris
            </Link>
            {session.user.isAdmin && (
              <Link href="/admin" className="border-b border-white/10 py-1 w-3/6 text-center">
                Admin
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="rounded bg-red-500 px-2 py-1 w-3/6 text-center text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signup" className="border border-orange-100 rounded px-2 py-1 w-2/6 text-center">
              Register
            </Link>
            <Link href="/auth/signin" className="rounded bg-primary px-2 py-1 w-2/6 text-center">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
