"use client";

import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Filter from "./components/filter";
import Moview from "./components/moview";
import { loadMovies } from "./actions";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(""); // je garde une trace du genre sélectionné

  // Ici je charge les films au démarrage ou lors du changement du genre
  useEffect(() => {
    const fetchMovies = async () => {
      const filteredMovies = JSON.parse(await loadMovies(genre));
      setMovies(filteredMovies);
    };
    fetchMovies();
  }, [genre]); // je relance  le useeffet lorsque le genre change

  const handleFilter = (selectedGenre) => {
    setGenre(selectedGenre); // et je mets à jour le genre lorsqu'il est sélectionné
  };

  return (
    <>
      <title>Premoview</title>
      <meta name="description" content="Welcome to Premoview" />
      <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <Filter onFilter={handleFilter} />{" "}
        {/* finaly je passe la fonction de filtrage au composant */}
        <main className="w-full min-h-[80vh] h-auto">
          <div className="grid grid-cols-5 gap-8">
            {movies &&
              movies.map((movie, index) => {
                return <Moview key={index} movie={movie} inFavs={false} />;
              })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
