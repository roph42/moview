import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ReviewBox from "@/app/components/reviewBox";
import AReview from "@/app/components/areview";
import Image from "next/image";
import { getMovie } from "./actions";

export default async function oneMovie({ params }) {
  const movie = await getMovie(params.id);
  const reviews = movie.reviews;

  return (
    movie && (
      <div className="min-h-screen bg-black text-white p-5 flex flex-col space-y-2">
        <Header />
        <main className="flex flex-col w-auto h-auto justify-start space-y-2">
          <div className="border border-white/10 mt-8 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[10vh] p-2 text-[30px]">
            <div className="flex items-baseline space-x-2 w-full h-full">
              <span>{movie.title}</span>
              <span className="text-[14px] italic">({movie.genres})</span>
            </div>
            <div className="flex flex-col text-sm items-end justify-center w-full h-full">
              <span>Popularity : {movie.popularity} </span>
              <span>Average vote : {movie.vote_average}</span>
            </div>
          </div>

          <div className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[50vh] p-2">
            <div className="border rounded w-1/6 h-full">
              <Image
                src={movie.poster_path}
                className="w-full h-full"
                alt="movie image"
              />
            </div>
            <div className="flex flex-col border border-white/10 w-5/6 h-full font-size:8rem text-[22px] p-2">
              
              <span>Overview:</span>
              <span className="text-base">{movie.overview} </span>
            </div>
          </div>

          <ReviewBox id={params.id} />

          <div className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-auto p-2">
            <div className="rounded-lg w-full flex flex-col justify-center items-center px-3  py-5">
              {reviews &&
                reviews.map((review, index) => {
                  return (
                    <div
                      className="text-white w-full flex flex-col space-y-2 py-2"
                      key={index}
                    >
                      <AReview review={review} id={params.id} />
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
