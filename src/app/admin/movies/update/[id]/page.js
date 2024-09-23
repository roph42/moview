// "use client"
import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {getMovie} from "@/app/movie/[id]/actions";
import { updateMovie } from "../../actions";
import Image from "next/image";

export default async function UpdatePage({ params }) {
  const movie = await getMovie(params.id);

  return (
    <form action={updateMovie}>
      <div className="min-h-screen bg-black text-white p-5 flex flex-col space-y-2">
        <Header />
        <main className="flex flex-col w-auto h-auto justify-start space-y-2">
          <div className="border border-white/10 mt-8 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[10vh] p-2 text-[30px]">
            <input
              className="bg-black focus outline-none"
              type="hidden"
              placeholder={movie.title}
              name="id"
              value={params.id}
            />
            <input
              className="bg-black focus outline-none"
              type="text"
              placeholder={movie.title}
              name="title"
            />
          </div>

          <div className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[40vh] p-2">
            <div className="border rounded w-1/6 h-full">
              <Image
                src={movie.poster_path}
                className="border w-full h-full"
                alt="movie image"
              />
            </div>
            <div className="flex flex-col border w-5/6 h-full font-size:8rem text-[25px]">
              <span>Popularity : {movie.popularity} </span>
              <span>Average vote : {movie.vote_average}</span>
              <input
                className="bg-black focus outline-none"
                type="text"
                placeholder={movie.genres}
                name="genres"
              />
              <input
                className="bg-black focus outline-none"
                type="text"
                placeholder={movie.overview}
                name="overview"
              />
              {/* <span>Popularity : {movie.popularity} </span>
                <span>Average vote : {movie.vote_average}</span>
                <span>Gender : {movie.genres} </span>
                <span>Description : {movie.overview} </span> */}
            </div>
          </div>
          <div className="items-center border border-orange-100 rounded text-center w-20">
            {/* <button onSubmit={updateMovie(movie._id)} >Update</button> */}
            <button type="submit">Update</button>
          </div>
        </main>
        <Footer />
      </div>
    </form>
  );
}
