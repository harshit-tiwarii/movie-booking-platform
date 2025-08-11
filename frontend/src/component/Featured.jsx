import React from "react";
import { useNavigate } from "react-router-dom";
import { movieData } from "../assets/QuickShow-assets/assets";
import MovieCard from "./MovieCard";

export default function FeaturedSection() {

  const navigate = useNavigate()

  return (
    <div>
    <section className="flex justify-between items-center mt-16 px-10 py-6 bg-transparent max-w-full">
      {/* Left: Now Showing */}
      <h2
        className="text-gray-300 font-medium text-lg"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        Now Showing
        
      </h2>

      {/* Right: View More */}
      <a
        onClick={()=>{navigate('/movies')}}
        className="flex items-center text-gray-300 font-semibold text-base md:text-lg transition-colors select-none cursor-pointer"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        View More
        {/* Right Arrow Icon */}
        <svg
          className="w-5 h-5 ml-2 stroke-[2.5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </section>

  <div className="flex flex-wrap gap-7 justify-center mt-8">
      {movieData.slice(0,4).map((movie,idx) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          idx={idx}
        />
      ))}
    </div>

        <div className="flex justify-center mt-15 mb-10">
            <button onClick={()=>{navigate('/movies')}} className="px-10 py-3 text-white font-medium rounded-md text-sm transition cursor-pointer " style={{backgroundColor:"#f84565"}}>show more</button>
        </div>
  </div>
   
  );
}
