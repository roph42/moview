import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Image from "next/image";

import getMovie from "./actions";

export default async function oneMovie({ params }) {
  const movie = await getMovie(params.id);
  const reviews = movie.reviews;

  return (
    movie && (
      <div className="min-h-screen bg-black text-white p-5 flex flex-col space-y-2">
        <Header />
        <main className="flex flex-col w-auto h-auto justify-start space-y-2">
          <div className="border border-white/10 mt-8 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[10vh] p-2 text-[30px]">
            {movie.title}
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
              <span>Gender : {movie.genres} </span>
              <span>Description : {movie.overview} </span>
            </div>
          </div>

          <div className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[20vh] p-2">
            <div className="flex flex-col py-2 justify-between w-2/6 h-auto">
              <h1 className="text-white text-xl mb-4 ">Rate the movie</h1>
              <span className="w-full h-[5vh] p-2 bg-black text-white border border-zinc-600 rounded"></span>
            </div>
            <textarea
              className="w-3/6 h-[9vh] p-2 bg-black text-white border border-zinc-600 rounded"
              placeholder="Write your comment"
            ></textarea>

            <button className="bg-black text-zinc-300 px-4 py-2 rounded border border-zinc-600">
              Comment
            </button>
          </div>

          <div className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-auto p-2">
            <div className="rounded-lg w-4/6 flex flex-col justify-center items-center px-3  py-5">
              {reviews &&
                reviews.map((review, index) => {
                  return (
                    <div
                      className="text-white mb-4 w-5/6 flex flex-col py-2"
                      key={index}
                    >
                      <p className="font-semibold">{review?.author}</p>
                      <div className="border-b-2 border-white-700 mt-5 mb-10"></div>
                      <p className="text-white">{review?.content}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  );
}
