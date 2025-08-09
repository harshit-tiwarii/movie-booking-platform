import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, idx }) {
  const year = movie.release_date?.slice(0, 4) || "N/A";
  const genre = movie.genres?.map((g) => g.name).join(" | ");
  const duration = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  const rating = movie.vote_average?.toFixed(1);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="bg-[#1c1f26] rounded-xl overflow-hidden shadow-lg w-[260px] flex flex-col transition-transform hover:-translate-y-2 duration-300 cursor-pointer"
    >
      {/* Poster */}
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-[160px] object-cover"
        draggable={false}
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-base mb-1 truncate">{movie.title}</h3>

        <div className="text-gray-400 text-xs mb-2 leading-snug">
          {year} &bull; {genre} <br />
          Duration: {duration}
        </div>

        {/* Action Row */}
        <div className="flex justify-between items-center mt-auto">
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-4 py-1 rounded-full font-semibold">
            Buy Tickets
          </button>
          <span className="flex items-center gap-1 text-pink-400 font-semibold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.78 12.18.85 8.09l6.432-.936L10 1.5l2.718 5.654 6.432.936-4.929 4.09 1.658 5.91z" />
            </svg>
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
}
