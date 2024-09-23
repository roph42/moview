"use server";

import Movie from "@/model/Movie";
import User from "@/model/User";
import { ConnectionStates } from "mongoose";

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
      return { message: "Error finding movie" };
    });
}

const addReview = async (formData) => {
  console.log("Adding review");

  const comment = formData.get("comment");
  const movie_id = formData.get("id");
  const username = formData.get("username");
  const rate = formData.get("rate");
  // console.log(rate);
  

  const review = {
    author: username,
    content: comment,
    rate: rate
  };

  const movie = await Movie.findByIdAndUpdate(
    movie_id,
    {
      $push: {
        reviews: {
          $each: [review],
          $position: 0,
        },
      },
    },
    { new: true, upsert: true }
  );
  return { content: "success" };
};

const updateReview = async (formData) => {
  console.log("Updating review");

  const comment = formData.get("review");
  const username = formData.get("username");
  const movie_id = formData.get("id");

  const movie = await Movie.findOneAndUpdate(
    {
      _id: movie_id,
      "reviews.author": username,
    },
    {
      $set: {
        "reviews.$.content": comment,
      },
    },
    { new: true }
  );

  if (!movie) {
    throw new Error("Movie not found or user has not reviewed this movie");
  }

  const updatedReview = movie.reviews.find(
    (review) => review.author === username
  );
  if (!updatedReview || updatedReview.content !== comment) {
    throw new Error("Failed to update the review");
  }

  return { content: "success" };
};

const deleteReview = async (formData) => {
  console.log("Deleting review");
  const username = formData.get("username");
  const movie_id = formData.get("id");
  const content = formData.get("content");

  const movie = await Movie.findByIdAndUpdate(
    movie_id,
    {
      $pull: {
        reviews: { author: username, content: content },
      },
    },
    { new: true }
  );

  if (!movie) {
    throw new Error("Movie not found");
  }

  // const reviewStillExists = movie.reviews.some(
  //   (review) => review.author === username
  // );
  // if (reviewStillExists) {
  //   throw new Error("Failed to delete the review");
  // }

  return { content: "Review deleted successfully" };
};

export { getMovie, addReview, updateReview, deleteReview };
