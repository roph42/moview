"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateReview, deleteReview } from "../movie/[id]/actions";

export default function AReview({ review, id }) {
  const { data: session, status } = useSession();
  const [isClicked, setIsClicked] = useState(false);
  const rate = !review?.rate ? 0 : review?.rate;

  return (
    <>
      <div className="w-full flex justify-between">
        <p className="font-medium">{review?.author}</p>
        {review?.author == session?.user.username && (
          <>
            <p className="text-sm text-primary">Note: {rate}/5</p>
            <span className="flex space-x-2 text-xs">
              {!isClicked && (
                <p
                  onClick={() => setIsClicked((a) => !a)}
                  className="cursor-pointer"
                >
                  Update
                </p>
              )}
              {isClicked && (
                <p
                  onClick={() => setIsClicked((a) => !a)}
                  className="cursor-pointer"
                >
                  Cancel
                </p>
              )}
              <form action={deleteReview} className="">
                <input
                  className="bg-black focus outline-none"
                  type="hidden"
                  name="username"
                  value={session?.user?.username}
                />
                <input
                  className="bg-black focus outline-none"
                  type="hidden"
                  name="id"
                  value={id}
                />
                <input
                  className="bg-black focus outline-none"
                  type="hidden"
                  name="content"
                  value={review?.content}
                />
                <button type="submit" className="cursor-pointer">
                  Delete
                </button>
              </form>
            </span>
          </>
        )}
      </div>
      <div className="border-b border-white/10"></div>
      {!isClicked && <p className="text-white text-xs">{review?.content}</p>}

      {isClicked && (
        <form
          action={updateReview}
          className="w-full h-fit flex flex-col space-y-2"
        >
          <input
            className="bg-black focus outline-none"
            type="hidden"
            name="username"
            value={session?.user?.username}
          />
          <input
            className="bg-black focus outline-none"
            type="hidden"
            name="id"
            value={id}
          />
          <textarea
            name="review"
            className="border border-white/10 bg-inherit text-sm outline-none p-2"
          >
            {review?.content}
          </textarea>
          <div className="flex space-x-2 w-full text-xs">
            <button type="submit" className="">
              Update
            </button>

            <button onClick={() => setIsClicked((a) => !a)} className="text">
              Done
            </button>
          </div>
        </form>
      )}
    </>
  );
}
