"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import heart from "@/_assets/heart.svg";
import Image from "next/image";
import Link from "next/link";
import { addToFavs, retrieveFromFavs } from "../actions";

export default function Moview({ movie, inFavs }) {  
  const title = movie?.title?.length < 18 ? movie?.title : movie?.title?.slice(0, 21) + "...";
  const count = movie?.reviews ? movie?.reviews?.length : 0;
  let popularity = "" + movie?.popularity;
  const popularity1 = popularity.split(".")[0] + ",";
  const popularity2 = popularity.split(".")[1];
  const { data: session, status } = useSession();
  const [addedAsFav, setAddedAsFav] = useState(false)

  const addToFavorites = async () => {
    console.log("Start adding movie with id ", movie?._id, " to favorites");
    const userId = session.user.id;
    const msg = await addToFavs(userId, movie?._id);
    if (msg && msg.content == "success") {
      setAddedAsFav(a => !a);
    } else {
      console.log('cant add movie to favorites')
    }
    console.log(msg.content)
  };

  const retrieveFromFavorites = async () => {
    console.log("Start removing movie with id ", movie?._id, " to favorites");
    const userId = session.user.id;
    const msg = await retrieveFromFavs(userId, movie?._id);
    
    console.log(msg.content)
  };

  return (
    <>
      <div className="w-[36vh] h-[60vh] p-2 relative flex items-center justify-center">
        <div className="border border-white/10 rounded-md  w-[36vh] h-[60vh] absolute flex flex-col justify-between bg-gradient-to-b from-transparent via-black to-black">
          <div className="flex justify-end">
            {addedAsFav && <Image src={heart} />}
          </div>
          <div className="rounded p-1 w-full h-[30vh] flex flex-col">
            <div className="flex flex-col space-y-2 h-2/6">
              <span className="border-b border-white/10 text-xl font-medium h-3/6">
                {title}
              </span>
              <span className="border-b border-white/10 text-xs italic font-medium h-3/6">
                {movie.genres}
              </span>
            </div>

            <div className=" text 2xl font-medium w-full h-2/6 flex space-x-1 mt-2 items-center">
              <div className="text 2xl font-medium w-2/6 h-full flex flex-col items-center justify-center">
                <span className="text-[18px] font-bold">
                  {movie.vote_count}
                </span>
                <span className="text-xs">votes</span>
              </div>
              <div className="text 2xl font-medium w-2/6 h-full flex flex-col items-center justify-center">
                <span className="text-[18px] font-bold">{count}</span>
                <span className="text-xs">Reviews</span>
              </div>

              <div className="border-4 border-white/10  rounded-full w-[52px] h-[52px] flex flex-col items-center justify-center font-semibold text-white">
                <span className="text-xs">{popularity1}</span>
                <span className="text-[8px]">{popularity2}</span>
              </div>
            </div>

            <div className="text 2xl font-medium w- h-2/6 mt-2 flex flex-col space-y-1">
              
              <Link
                href={`/movie/${movie._id}`}
                className="border border-primary bg-white/10 rounded-full px-2 text-center text-[14px] w-full outline-none hover:bg-[#271e1a] hover:border-none"
              >
                Details
              </Link>
              {!inFavs && <button
                onClick={addToFavorites}
                className="border border-primary bg-white/10 rounded-full px-2 text-center text-[14px] w-full outline-none hover:bg-[#271e1a] hover:border-none"
              >
                Add to favorites
              </button>}
              {inFavs && <button
                onClick={retrieveFromFavorites}
                className="border border-primary bg-white/10 rounded-full px-2 text-center text-[14px] w-full outline-none hover:bg-[#271e1a] hover:border-none"
              >
                 Retrieve from favorites
              </button>}
              
            </div>
          </div>
        </div>

        <Image src={movie.poster_path} className="rounded w-full h-full" />
      </div>
    </>
  );
}
