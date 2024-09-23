"use client";

import { useState } from "react";

export default function Filter({ onFilter }) {
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(genre);
  };

  return (
    <form className="border border-white/10 rounded pl-2 flex items-center justify-between space-x-2 w-full h-[10vh] p-2" onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <input
          className="border-b border-white/10 text-white bg-inherit outline-none text-xs"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <button className="border border-white/10 rounded p-2 w-1/6 text-center text-xs outline-none" type="submit">
        Filter
      </button>
    </form>
  );
}
