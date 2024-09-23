'use server'

import { NextRequest, NextResponse } from "next/server";

import Movie from "@/model/Movie.js";

const getMovies = async (page) => {
  if (typeof page !== "number") {
    return { error: "Page must be a number!" };
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}`,

    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWUyMWZiNjAwMmNhNGZiNDhkYzc2OGMzMmM2YjMwYyIsIm5iZiI6MTcyNjY3Mjc1OC44MDQxMTYsInN1YiI6IjY2ZWFkNjg5NTE2OGE4OTZlMTFmNjc0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHhS1ci-ql-G6Rwplm_zjnuPrgJ5oRAN7cpSwqjdg9U",
      },
    }
  );
  const result = await res.json();
  return result;
};

// async function get_genres() {
//     const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en",

//         {
//             headers: {
//                 accept: 'application/json',
//                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWUyMWZiNjAwMmNhNGZiNDhkYzc2OGMzMmM2YjMwYyIsIm5iZiI6MTcyNjY3Mjc1OC44MDQxMTYsInN1YiI6IjY2ZWFkNjg5NTE2OGE4OTZlMTFmNjc0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHhS1ci-ql-G6Rwplm_zjnuPrgJ5oRAN7cpSwqjdg9U'
//             },
//         })
//     const result = await res.json()
//     return result
// }

const getReviews = async (movie_id, page) => {
  if (typeof page !== "number") {
    return { error: "Page must be a number!" };
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews?${page}`,

    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWUyMWZiNjAwMmNhNGZiNDhkYzc2OGMzMmM2YjMwYyIsIm5iZiI6MTcyNjY3Mjc1OC44MDQxMTYsInN1YiI6IjY2ZWFkNjg5NTE2OGE4OTZlMTFmNjc0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHhS1ci-ql-G6Rwplm_zjnuPrgJ5oRAN7cpSwqjdg9U",
      },
    }
  );
  const result = await res.json();
  return result;
};

const getMovieById = async (movie_id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}`,

    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWUyMWZiNjAwMmNhNGZiNDhkYzc2OGMzMmM2YjMwYyIsIm5iZiI6MTcyNjY3Mjc1OC44MDQxMTYsInN1YiI6IjY2ZWFkNjg5NTE2OGE4OTZlMTFmNjc0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHhS1ci-ql-G6Rwplm_zjnuPrgJ5oRAN7cpSwqjdg9U",
      },
    }
  );
  const result = await res.json();
  return result;
};

const createMovie = async (id) => {
  console.log('Start movie creation...');
  
  const movie = await getMovieById(id);
  if (!movie.title) {
      return {error: "Not existant"}
  }
  const reviews = await getReviews(id, 1);
  let genres = [];
  const poster_path = `http://image.tmdb.org/t/p/w500${movie?.poster_path}`;

  movie?.genres?.forEach((genre) => genres.push(genre.name));
  genres = genres.join(", ");

  const newMovie = new Movie({
    title: movie.title,
    genres: genres,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: poster_path,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    reviews: reviews.results,
  });
  newMovie.save();
  return {message: "Movie created"};
};

const updateMovie = async (formData) => {
  let title = formData.get('title')
  let genres = formData.get('genres')
  let overview = formData.get('overview')

  const id = formData.get('id')

  const movie = await Movie.findById(id)
  title.length == 0 ? title = movie.title : null
  genres.length == 0 ? genres = movie.genres : null
  overview.length == 0 ? overview = movie.overview : null


  const filter = { _id: id };
  

  const update = {
    title: title,
    genres: genres,
    overview: overview,  
  };
  

  const m = await Movie.findOneAndUpdate(filter, update, {
    new: true,
  });
  return {message: "Movie updated"};
};

const deleteMovie = async (id) => {
  const filter = { _id: id };
  console.log('Start deletion');
  

  const movie = await Movie.deleteOne(filter);
  return {message: "Movie deleted"};
};

const showMovie = async (id) => {
  const movie = await Movie.findById(id).exec();
    return movie
}

export { getMovies, getMovieById, createMovie, updateMovie, deleteMovie, showMovie };
