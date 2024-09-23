import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import NavBar from "@/app/components/admin/adminNavBar";
import TitleBar from "@/app/components/admin/titleBar";
import {
  countUsers,
  countAdmins,
  countMovies,
  countGenres,
  countMoviesByGenre,
} from "./actions";

export default async function Statistics() {
  const numberOfUsers = await countUsers();
  const numberOfAdmins = await countAdmins();
  const numberOfMovies = await countMovies();
  const numberOfGenres = await countGenres();
  const numberOfMoviesByGenre = JSON.parse(await countMoviesByGenre());

  return (
    <>
      <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <TitleBar />
        <NavBar />

        <div className="flex flex-col space-y-4 h-screen p-2 w-full border border-white/10  rounded ">
          <div className="flex border-0 justify-between">
            <p>Statistics</p>
          </div>
          <div className="w-full h-[30vh] p-2 border border-white/10 rounded flex space-x-2">
            <span className="w-1/6 h-full p-2 border border-white/10 rounded flex flex-col space-y-2">
              <p className="text-sm border-b border-white/10 pb-1">
                Number of user
              </p>
              <span className="h-5/6 flex items-center justify-center">
                <p className="font-bold text-6xl text-primary">
                  {numberOfUsers}
                </p>
              </span>
            </span>

            <span className="w-1/6 h-full p-2 border border-white/10 rounded flex flex-col space-y-2">
              <p className="text-sm border-b border-white/10 pb-1">
                Number of Admin
              </p>
              <span className="h-5/6 flex items-center justify-center">
                <p className="font-bold text-6xl text-primary">
                  {numberOfAdmins}
                </p>
              </span>
            </span>
          </div>
          <div className="h-[30vh] p-2 border border-white/10 rounded flex space-x-2">
            <span className="w-1/6 h-full p-2 border border-white/10 rounded">
              <p className="text-sm border-b border-white/10 pb-1">
                Number of movies on premoview
              </p>
              <span className="h-5/6 flex items-center justify-center">
                <p className="font-bold text-6xl text-primary">
                  {numberOfMovies}
                </p>
              </span>
            </span>
            <span className="w-1/6 h-full p-2 border border-white/10 rounded">
              <p className="text-sm border-b border-white/10 pb-1">
                Number of genres on premoview
              </p>
              <span className="h-5/6 flex items-center justify-center">
                <p className="font-bold text-6xl text-primary">
                  {numberOfGenres}
                </p>
              </span>
            </span>

            <span className="w-4/6 h-full p-2 border border-white/10 rounded">
              <p className="text-sm border-b border-white/10 pb-1">
                Number of movies per genre
              </p>
              <span className="h-5/6 grid grid-cols-2 gap-2 items-center justify-between overflow-scroll">
                {numberOfMoviesByGenre.map((elem, index) => {
                  return (
                    <span className="flex justify-between w-5/6" key={index}>
                      {" "}
                      <p className="font-bold text-xs text-primary" >
                        {elem.genre}
                      </p>
                      <p className="font-bold text-xs text-primary border-r border-white/10 pr-8">
                        {elem.count}
                      </p>
                    </span>
                  );
                })}
              </span>
            </span>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
