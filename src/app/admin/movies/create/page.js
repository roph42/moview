import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import NavBar from "@/app/components/admin/adminNavBar";
import TitleBar from "@/app/components/admin/titleBar";
import Moview from "@/app/components/admin/tmdbMoview";
import { getMovies, createMovie } from "../actions";

export default async function Page() {
  
  let movies = await getMovies(1); 
  movies = movies.results;

  return (
    <>
      <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <TitleBar />
        <NavBar />

        <main className="w-full min-h-[80vh] h-auto">
          <div className="grid grid-cols-5 gap-8">
            {movies &&
              movies.map((movie, index) => {
                return <Moview key={index} movie={movie} />;
              })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
