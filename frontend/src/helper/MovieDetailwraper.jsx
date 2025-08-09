import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../pages/MovieDetails";
import { movieData } from "../assets/QuickShow-assets/assets.js";

export default function MovieDetailWrapper() {
  const { id } = useParams();
  const selectedMovie = movieData.find((m) => m._id === id || m.id === parseInt(id));

  if (!selectedMovie) return <div className="text-white text-center mt-10">Movie not found</div>;

  return <MovieDetails movie={selectedMovie} />;
}