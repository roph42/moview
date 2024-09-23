'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import TitleBar from '../components/admin/titleBar';
import NavBar from '../components/admin/adminNavBar';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.push('/auth/signin');
    } else if (!session.user.isAdmin) {
      router.push('/');
    }
  }, [session, status]);

  if (status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (session && session.user.isAdmin) {
    return (
      <>
    <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <TitleBar />
 
        <NavBar />
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Détails de votre compte</h2>
          <p className="mt-2 text-gray-600">
            <strong>Email:</strong> {session.user.email}
          </p>
          {session.user.isAdmin && (
            <p className="mt-2 text-green-600 font-semibold">
              Vous êtes administrateur.
            </p>
          )}
        </div>
    </div>
    </>
    );
  }

  return null;
}
