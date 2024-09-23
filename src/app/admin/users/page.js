"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NavBar from "@/app/components/admin/adminNavBar";
import TitleBar from "@/app/components/admin/titleBar";
import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/footer";

const UsersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Gestion des utilisateurs et des états
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Effet pour vérifier la session et les droits admin
  useEffect(() => {
    if (status === "loading") return; // Attend que la session soit chargée

    if (!session) {
      router.push("/auth/signin"); // Redirige si non connecté
    } else if (!session.user.isAdmin) {
      router.push("/"); // Redirige si non admin
    }
  }, [session, status, router]);

  // Effet pour charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/admin/api/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        setError(
          data.message ||
            "Une erreur est survenue lors du chargement des utilisateurs."
        );
      }
    };
    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/admin/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Utilisateur ajouté avec succès.");
      setNewUser({ username: "", email: "", password: "" });
    } else {
      setError(
        data.message ||
          "Une erreur est survenue lors de l'ajout de l'utilisateur."
      );
    }
  };

  // Edit user
  const handleEditUser = async (user) => {
    setEditingUser(user);
  };

  // Save edited user
  const handleSaveUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`/admin/api/users/${editingUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingUser),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Utilisateur mis à jour avec succès.");
      setEditingUser(null);
      router.refresh();
    } else {
      setError(
        data.message ||
          "Une erreur est survenue lors de la mise à jour de l'utilisateur."
      );
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const res = await fetch(`/admin/api/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Utilisateur supprimé avec succès.");
        router.refresh(); // Refresh to get updated user list
      } else {
        setError(
          data.message ||
            "Une erreur est survenue lors de la suppression de l'utilisateur."
        );
      }
    }
  };

  // Set user as admin
  const handleSetAdmin = async (userId) => {
    const res = await fetch(`/admin/api/users/${userId}/admin`, {
      method: "PATCH",
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Utilisateur défini comme admin.");
      router.refresh();
    } else {
      setError(
        data.message ||
          "Une erreur est survenue lors de la définition de l'utilisateur comme admin."
      );
    }
  };

  if (session && session.user.isAdmin) {
    return (
      <>
        <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
          <Header />
          <TitleBar />
          <NavBar />

          <div className="flex flex-col space-y-4 h-full p-2 w-full border border-white/10  rounded ">
            <div className="h-full p-8 flex flex-col">
              <h1 className="text-3xl mb-6">Gestion des utilisateurs</h1>

              {/* Error Message */}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              {/* New User Form */}
              <form onSubmit={handleAddUser} className="mb-6 space-y-4">
                <h2 className="text-2xl mb-2">Ajouter un utilisateur</h2>
                <div>
                  <label>Nom utilisateur</label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label>Mot de passe</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ajouter utilisateur
                </button>
              </form>

              {/* User List */}
              <div>
                <h2 className="text-2xl mb-2">Liste des utilisateurs</h2>

                <section className="flex flex-col space-y-1">
                  <div className="flex border-0 justify-between">
                    <p>Username</p>
                    <p className="">Email</p>
                    <p className="">Actions</p>
                  </div>
                    
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="flex border border-white/10 justify-between px-2 h-10 items-center rounded"
                    >
                      <p className="px-2">{user.username}</p>
                      <p className="px-2">{user.email}</p>
                      {user.is_admin && <p className="text-green-500">Admin</p>}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="border rounded h-6 w-20 text-sm"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="border rounded h-6 w-20 text-sm"
                        >
                          Supprimer
                        </button>
                        {!user.is_admin && (
                          <button
                            onClick={() => handleSetAdmin(user._id)}
                            className="border rounded h-6 w-20 text-sm"
                          >
                            Définir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </section>
              </div>

              {/* Edit User Modal */}
              {editingUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-gray-950 p-6 rounded shadow-lg">
                    <h3 className="text-2xl mb-4">Modifier utilisateur</h3>
                    <form onSubmit={handleSaveUser}>
                      <div>
                        <label>Nom utilisateur</label>
                        <input
                          type="text"
                          value={editingUser.username}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              username: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              email: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label>
                          Mot de passe (laisser vide pour ne pas changer)
                        </label>
                        <input
                          type="password"
                          value={editingUser.password || ""}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              password: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Sauvegarder les modifications
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Annuler
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return null;
};

export default UsersPage;
