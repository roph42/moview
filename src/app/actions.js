"use server";

import Movie from "@/model/Movie";
import User from "@/model/User";

const loadMovies = async (genre = "") => {
  console.log("Loading Movies...");
  
  const query = genre ? { genres: { $regex: new RegExp(genre, "i") } } : {};
  
  const movies = await Movie.find(query);
  return JSON.stringify(movies);
};


const addToFavs = async (user_id, movie_id) => {
  console.log("Adding movie to user favoris...");
  const u = await User.findById(user_id);

  for (let fav of u.favoris) {
    if (fav._id.toString() == movie_id) {
      return { content: "Movie already added as favorite" };
    }
  }
  const movie = await Movie.findById(movie_id);

  const user = await User.findByIdAndUpdate(
    user_id,
    { $push: { favoris: movie } },
    { new: true, upsert: true }
  );

  return { content: "success" };
};

const retrieveFromFavs = async (user_id, movie_id) => {
  console.log("Retrieve movie from favs");

  const user = await User.findById(user_id);
  
  if (!user) {
    return { content: "User not found" };
  }

  const updatedFavoris = user.favoris.filter(movie => movie._id.toString() !== movie_id);

  if (updatedFavoris.length === user.favoris.length) {
    return { content: "Movie not found in favorites" };
  }

  const result = await User.findByIdAndUpdate(
    user_id,
    { $set: { favoris: updatedFavoris } },
    { new: true }
  );

  return { content: "success" };
};

const loadFavorites = async (user_id) => {
  console.log("Loading favorites Movies...");
  const user = await User.findById(user_id);
  return JSON.stringify(user.favoris);
};

export { loadMovies, addToFavs, loadFavorites, retrieveFromFavs };
