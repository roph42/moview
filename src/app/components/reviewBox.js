"use client";

import { addReview } from "../movie/[id]/actions";
import { useSession } from "next-auth/react";
import RatingBox from "./ratingBox";

export default function ReviewBox({ id }) {
  const { data: session, status } = useSession();

  return (
    <>
      <h1 className="text-white text-base mb-4 ">Rate the movie</h1>

      <form
        action={addReview}
        className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[20vh] p-2"
      >
        <RatingBox />
        <input
          className="bg-black focus outline-none"
          type="hidden"
          name="id"
          value={id}
        />
        <input
          className="bg-black focus outline-none"
          type="hidden"
          name="username"
          value={session?.user?.username}
        />
        <textarea
          name="comment"
          className="w-3/6 h-[12vh] p-2 bg-black text-white border border-white/10 rounded"
          placeholder="Write your comment"
        ></textarea>

        <button
          type="submit"
          className="bg-black text-zinc-300 px-4 py-2 rounded border border-white/10"
        >
          Comment
        </button>
      </form>
    </>
  );
}
