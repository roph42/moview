import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import NavBar from "@/app/components/admin/adminNavBar";
import TitleBar from "@/app/components/admin/titleBar";
import AMovie from "@/app/components/admin/amovie";
import Link from "next/link";
import { loadMovies } from "@/app/actions";
// import { getMovieById, createMovie, updateMovie, deleteMovie } from "./actions";



export default async function Page() {
  const movies = JSON.parse(await loadMovies());  

  return (
    <>
      <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <TitleBar />
        <NavBar />

        <div className="flex flex-col space-y-4 h-screen p-2 w-full border border-white/10  rounded ">
          <div className="flex border-0 justify-between ">
            <p>All premoview movies</p>
            <Link href={"/admin/movies/create"} className="border border-white/10 rounded px-2 py-1 w-1/6 text-center text-xs text-green-500 outline-none">
              Create
            </Link>
          </div>

          <div className="flex border-0 justify-between">
            <p>Title</p>
            <p className="">Actions</p>
          </div>
          { movies.map((movie, index) => (
            <AMovie key={index} movie={movie} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
