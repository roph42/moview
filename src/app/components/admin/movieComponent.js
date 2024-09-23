import Link from "next/link";
import { redirect } from "next/navigation";

function AllMovies({ movie }) {
  return (
    <>
      <div className="flex border border-white/10  justify-between px-2 h-10 items-center rounded">
        <p className="w-3/6">{movie.title} </p>
        <div className="flex space-x-2 w-3/6 justify-end">
          <Link
            href={"/admin/movies/details/id"}
            className="border border-orange-100 rounded py-1 w-1/6 text-center outline-none"
          >
            Details
          </Link>
          <button
            className="border border-orange-100 rounded py-1 w-1/6 text-center outline-none"
          >
            Update
          </button>
          <button
            className="border border-orange-100 rounded py-1 w-1/6 text-center outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
export default AllMovies;
