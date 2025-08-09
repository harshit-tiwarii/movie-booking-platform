import React, { useState } from "react";
import { dummyTrailers } from "../assets/QuickShow-assets/assets"; // Update this import as needed

export default function TrailerSection() {
  // Main (active) trailer index
  const [activeIndex, setActiveIndex] = useState(0);
  // Show video player instead of main image?
  const [showPlayer, setShowPlayer] = useState(false);

  const activeTrailer = dummyTrailers[activeIndex];

  // Extract YouTube ID from videoUrl
  const getYouTubeId = (url) =>
    url.includes("youtu.be/")
      ? url.split("youtu.be/")[1]
      : url.split("v=")[1].split("&")[0];

  return (
    <section className="w-full max-w-5xl mx-auto mt-18 mb-25 px-4">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-sans">
        Trailers
      </h2>
      {/* Main Trailer View */}
      <div className="w-full bg-[#181828] rounded-xl overflow-hidden relative shadow-xl aspect-w-16 aspect-h-9 max-h-[430px] mx-auto flex items-center justify-center">
        {!showPlayer ? (
          <button
    className="w-full h-full relative group outline-none"
    onClick={() => setShowPlayer(true)}
    aria-label="Play Trailer"
  >
    {/* Thumbnail Image */}
    <img
      src={activeTrailer.image}
      alt="trailer-thumbnail"
      className="w-full h-full object-cover rounded-xl"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-200 rounded-xl" />

    {/* Center Play Icon */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        className="w-20 h-20 text-white/95 opacity-90 drop-shadow-md"
        fill="currentColor"
        viewBox="0 0 84 84"
      >
        <circle cx="42" cy="42" r="42" fill="#000" fillOpacity="0.33" />
        <polygon points="34,28 61,42 34,56" fill="#fff" />
      </svg>
    </div>

    {/* Bottom-right YouTube Badge */}
    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-lg">
      <svg width={20} height={20} viewBox="0 0 50 50" fill="none" className="text-red-600">
        <circle cx="25" cy="25" r="24" fill="white" />
        <polygon points="20,16 38,25 20,34" fill="red" />
      </svg>
      <span className="font-bold text-sm text-[#f00] tracking-wider">YouTube</span>
    </div>
  </button>
        ) : (
          <div className="w-full relative aspect-video bg-black rounded-xl overflow-hidden">
  <iframe
    className="absolute inset-0 w-full h-full"
    src={`https://www.youtube.com/embed/${getYouTubeId(activeTrailer.videoUrl)}?autoplay=1&rel=0`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
  {/* Close Button */}
  <button
    onClick={() => setShowPlayer(false)}
    className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center z-10 outline-none focus:ring-2 focus:ring-pink-400"
    aria-label="Close video player"
    tabIndex={0}
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>
</div>

        )}
      </div>
      {/* Trailer Thumbnails */}
      <div className="flex gap-8 mt-14 justify-center flex-wrap">
        {dummyTrailers.map((trailer, idx) => (
          <button
            key={trailer.image}
            className={`relative aspect-w-16 aspect-h-23 w-46 rounded-lg overflow-hidden group border-2 ${
              idx === activeIndex
                ? "border-pink-500 shadow-xl"
                : "border-transparent"
            }`}
            onClick={() => {
              setActiveIndex(idx);
              setShowPlayer(false);
            }}
            aria-label={`Show trailer ${idx + 1}`}
          >
            <img
              src={trailer.image}
              alt={`Trailer ${idx + 1}`}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-200`}
            />
            {/* Overlay Play Icon */}
            <span className="absolute inset-0 flex items-center justify-center opacity-80">
              <svg className="w-8 h-8 text-white drop-shadow-black/40" fill="currentColor" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="#000" fillOpacity="0.3"/>
                <polygon points="13,10 24,16 13,22" fill="#fff"/>
              </svg>
            </span>
            {/* Title and Subtitle (optional, add if you want) */}
            {/* <span className="absolute bottom-2 left-2 text-white text-xs font-semibold">{idx === 0 ? "OFFICIAL TRAILER" : "TRAILER"}</span> */}
          </button>
        ))}
      </div>
    </section>
  );
}
