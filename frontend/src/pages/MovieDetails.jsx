import React, { useRef } from "react";
// Import icons from the react-icons library
import { FaStar, FaPlay, FaHeart } from "react-icons/fa";
import CastsData from "../component/CastsData";
import BookingDate from "../component/BookingDate";
import { movieData } from "../assets/QuickShow-assets/assets";
import MovieCard from "../component/MovieCard";

export default function MovieDetailPage({ movie }) {
  // Helper function to format runtime from minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };
  const bookingRef = useRef()

  const scrollToBooking = ()=>{
    if (bookingRef.current) {
    const offset = -300; // Adjust this value as needed (px to scroll more)
    const top = bookingRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: top + offset,
      behavior: "smooth",
    });
  }
  }
  const scrollToTop = ()=>{
    if (bookingRef.current) {
    const offset = -1050; // Adjust this value as needed (px to scroll more)
    const top = bookingRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: top + offset,
      behavior: "smooth",
    });
  }
  }
  // Prepare data strings for display
  // Using ", " as a separator for genres to match the target design
  const genreString = movie.genres?.map((g) => g.name).join(", ") || "N/A";
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const runtime = formatRuntime(movie.runtime);

  return (
    <div>
    <div className="mt-10 text-white min-h-screen flex items-center justify-center p-8 font-sans">
      {/* Content wrapper with a max-width and flex layout for poster and details */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* Left Column: Movie Poster */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full max-w-sm mx-auto md:max-w-none rounded-lg shadow-2xl shadow-black/50"
            draggable={false}
          />
        </div>

        {/* Right Column: Movie Details */}
        <div className="flex flex-col w-full md:w-2/3">
          
          {/* Language Tag */}
          <p className="text-pink-500 font-semibold text-sm tracking-widest uppercase mb-2">
            {/* Assuming 'original_language' is available, e.g., 'en'. Convert to uppercase. */}
            {movie.original_language?.toUpperCase() || "ENGLISH"} 
          </p>

          {/* Movie Title */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">
            {movie.title}
          </h1>

          {/* User Rating with Star Icon */}
          <div className="flex items-center gap-2 text-gray-300 mb-6">
            <FaStar className="text-yellow-400" />
            <span className="font-bold text-white text-lg">{movie.vote_average?.toFixed(1)}</span>
            <span className="text-gray-400">User Rating</span>
          </div>

          {/* Overview / Synopsis */}
          <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
            {movie.overview}
          </p>
          
          {/* Metadata: Runtime, Genres, Year */}
          <p className="text-gray-500 text-sm mb-8">
            {runtime} &bull; {genreString} &bull; {releaseYear}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800 hover:text-white transition-colors">
              <FaPlay />
              Watch Trailer
            </button>
            <button onClick={scrollToBooking} className="px-8 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
              Buy Tickets
            </button>
            <button className="p-4 rounded-full border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

    </div>
      <CastsData casts={movie.casts} />
      <div ref={bookingRef}>
      <BookingDate movieId={movie._id}/>
      </div>
      <h2 className="text-lg font-bold mb-6 mt-16 text-white font-sans">Suggested movies</h2>
      <div>
        <div ref={scrollToTop} className="flex flex-wrap gap-7 justify-center mt-8">
              {movieData.slice(0,4).map((movie,idx) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  idx={idx}
                />
              ))}
            </div>
      </div>
    </div>
  );
}