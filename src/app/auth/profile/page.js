"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const UpdateProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // State variables for form fields
  const [username, setUsername] = useState(session?.user?.username || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    // Validate password fields if user is trying to change the password
    if (newPassword && newPassword !== passwordConfirmation) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch("/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          username,
          email,
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Profil mis à jour avec succès.");
        router.push("/auth/profile");
      } else {
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (error) {
      setError("Erreur réseau : " + error.message);
    }
  };

  if (!session) {
    return <p>Vous devez être connecté pour accéder à cette page.</p>;
  }

  return (
    <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-black">
          <h1 className="text-2xl mb-4">Modifier le profil</h1>
          {/* Form */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block">Nom utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-black p-3 border rounded-lg"
                required
              />
            </div>
            {/* Email Field */}
            <div>
              <label className="block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg text-black "
                required
              />
            </div>
            {/* Password Update Section */}
            <div>
              <label className="block">
                Ancien mot de passe (si vous souhaitez changer de mot de passe)
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border rounded-lg text-black "
              />
            </div>
            <div>
              <label className="block">Nouveau mot de passe</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg text-black "
              />
            </div>
            <div>
              <label className="block">
                Confirmation du nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full p-3 border rounded-lg text-black "
              />
            </div>
            {/* Display error message */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg"
            >
              Mettre à jour le profil
            </button>
          </form>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default UpdateProfilePage;
