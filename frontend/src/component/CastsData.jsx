import React from "react";

// Example: movie.casts is an array of { name, profile_path } objects
export default function CastsData({ casts }) {
  return (
    <section className="px-8 py-6">
      <h3 className="text-lg font-bold mb-6 text-white font-sans">
        Your Favorite Cast
      </h3>
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-7 items-center">
        {casts && casts.length > 0 ? (
          casts.slice(0,9).map((cast) => (
            <div key={cast.name} className="flex flex-col items-center w-24">
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-[#222]"
                draggable={false}
              />
              <span className="mt-2 text-center text-white font-medium text-[14px] truncate w-full">
                {cast.name}
              </span>
            </div>
          ))
        ) : (
          <span className="text-gray-500">No cast data available.</span>
        )}
      </div>
    </section>
  );
}
