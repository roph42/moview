"use client";
import Link from "next/link";
import { deleteMovie } from "@/app/admin/movies/actions";

function AMovie({ movie }) {
  const handleDeletion = async () => {
    const message = await deleteMovie(movie._id);
    console.log(message);
  };

  return (
    <>
      <div className="flex border border-white/10  justify-between px-2 h-10 items-center rounded">
        <p className="w-3/6">{movie.title} </p>
        <div className="flex space-x-2 w-3/6 justify-end">
          <Link
            href={`/admin/movies/details/${movie._id}`}
            className="border border-white/10 text-xs text-primary rounded py-1 w-1/6 text-center outline-none"
          >
            Details
          </Link>
          <Link
            href={`/admin/movies/update/${movie._id}`}
            className="border border-white/10 text-xs text-green-500 rounded py-1 w-1/6 text-center outline-none"
          >
            Update
          </Link>
          <button
            onClick={handleDeletion}
            className="border border-white/10 text-xs text-red-500 rounded py-1 w-1/6 text-center outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
export default AMovie;
