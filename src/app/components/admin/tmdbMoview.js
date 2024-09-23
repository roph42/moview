'use client'
// import { useState } from "react";
import { createMovie } from "@/app/admin/movies/actions";
import Image from "next/image";

export default function Moview({ movie }) {
  const handleCreation = async () => {
    const message = await createMovie(movie.id)
    // const [msg, setMsg] = useState(message)
    // console.log(message);
  }
  return (
    <>
    {/* <div>{message}</div> */}
      <div className="w-[36vh] h-[60vh] p-2 relative flex items-center justify-center">
        <div className="border border-white/10 rounded-md  w-[36vh] h-[60vh] absolute flex flex-col justify-between bg-gradient-to-b from-transparent to-black">
          <div className="flex justify-end">
            {/* <Image src={heart} /> */}
          </div>
          <div className="rounded p-1 w-full h-[30vh] flex flex-col justify-end">
            <span className="border-b border-white/10 text-2xl font-medium">
              {movie.title}
            </span>

            <div className="text 2xl font-medium w- h-2/6 mt-2 flex flex-col space-y-1">

              <button
                onClick={handleCreation}
                className="border border-primary bg-white/10 rounded-full p-2 text-center text-[14px] w-full outline-none hover:bg-[#271e1a] hover:border-none"
              >
                Add on premoview
              </button>
            </div>
          </div>
        </div>

        <Image src={`http://image.tmdb.org/t/p/w500${movie?.poster_path}`} className="rounded w-full h-full" />
      </div>
    </>
  );
}
