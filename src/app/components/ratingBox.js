import React, { useState } from "react";

export default function RatingBox() {
  const [rate, setRate] = useState('');

  const handleRateClick = (value) => {
    setRate(value);
  };

  const ratingValues = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col py-2 justify-between w-2/6 h-auto">
      <div className="w-full h-[12vh] p-2 bg-black text-white border border-white/10 rounded flex space-x-2">
        {ratingValues.map((value) => (
          <input
            key={value}
            type="text"
            readOnly
            value={value}
            onClick={() => handleRateClick(value)}
            className={`w-1/6 h-full border border-white/10 flex items-center justify-center cursor-pointer hover:border-primary focus:outline-none read-only:bg-inherit focus:bg-primary read-only:text-center ${
              rate === value.toString() ? 'bg-primary' : ''
            }`}
          />
        ))}
      </div>
      <input
        type="hidden"
        name="rate"
        value={rate}
        readOnly
      />
    </div>
  );
}