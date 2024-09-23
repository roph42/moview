import User from "@/model/User";
import Movie from "@/model/Movie";

const countUsers = async () => {
  const users = await User.find({});
  const count = users.length;

  return count;
};

const countAdmins = async () => {
  let users = await User.find({});
  users = users.filter((user) => user.is_admin);

  const count = users.length;

  return count;
};

const countMovies = async () => {
  const movies = await Movie.find({});
  const count = movies.length;

  return count;
};

const countGenres = async () => {
  const movies = await Movie.find({});
  let genres = "";
  movies.forEach((m) => (genres += m.genres));
  genres = genres.split(", ");
  genres = genres.filter(
    (value, index, array) => array.indexOf(value) === index
  );

  const count = genres.length;

  return count;
};

const countMoviesByGenre = async () => {
  const movies = await Movie.find({});
  let genres = "";
  movies.forEach((m) => (genres += m.genres));
  genres = genres.split(", ");
  const genreCounts = {};
  const all = [];

  // Iterate through movies and count genres
  genres.forEach((genre) => {
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  for (const genre in genreCounts) {
    let obj = {};
    obj['genre'] = genre;
    obj['count'] = genreCounts[genre];
    all.push(obj);
  }

  return JSON.stringify(all);
};

export {
  countUsers,
  countAdmins,
  countMovies,
  countGenres,
  countMoviesByGenre,
};
