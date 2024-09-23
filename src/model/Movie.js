import mongoose from "mongoose";
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  genres: {
    type: String,
  },
  director: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  reviews: {
    type: [{}],
    default: null,
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: Date,
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export default Movie;