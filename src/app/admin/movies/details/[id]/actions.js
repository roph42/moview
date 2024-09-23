'use server'

import Movie from "@/model/Movie";

async function getMovie(movieId) {
  return Movie.findById(movieId)
    .then((movie) => {
      if (movie) {
        return movie;
      } else {
        return { message: "Movie not found" };
      }
    })
    .catch((error) => {
      return response.json({ message: "Error finding movie" });
    });
}

export default getMovie;
