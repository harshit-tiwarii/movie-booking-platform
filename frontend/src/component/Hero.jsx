import React from "react";
// Replace with your actual image import or path
import backgroundImage from "../assets/QuickShow-assets/backgroundImage.png"; 
// Replace with actual Marvel Studios logo import or URL
import marvelLogo from "../assets/QuickShow-assets/marvelLogo.svg";  
import { useNavigate } from "react-router-dom"; // Corrected import

export default function Hero() {
  // CORRECTED: Variable name should be lowercase to be a function call
  const navigate = useNavigate();

  return (
    // The parent container is mostly fine, but we will adjust its children
    <div
      className="relative w-full min-h-screen flex flex-col justify-center" // Aligns content vertically
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Content Wrapper */}
      {/* ADJUSTED: Responsive padding for better mobile layout */}
      <div className="flex z-10 px-6 sm:px-10 md:px-20 max-w-3xl">

        <div className="flex flex-col justify-start items-start gap-3 md:gap-4">
          {/* Marvel Studios Logo */}
          {/* ADJUSTED: Slightly smaller on mobile */}
          <img
            src={marvelLogo}
            alt="MARVEL STUDIOS"
            className="h-6 md:h-7 mb-2 select-none"
            draggable={false}
          />

          {/* Main Title */}
          {/* ADJUSTED: Responsive font size */}
          <h1
            className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            Guardians <br className="block sm:hidden" /> {/* This break is good for mobile */}
            of the Galaxy
          </h1>

          {/* Movie Info */}
          {/* ADJUSTED: Smaller text and gap on mobile */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-white/80 text-xs sm:text-sm font-medium">
            <span>Action</span>
            <span className="opacity-50">|</span>
            <span>Adventure</span>
            <span className="opacity-50">|</span>
            <span>Sci-Fi</span>
            <span className="opacity-50">|</span>
            <span className="flex items-center gap-1">
              {/* Calendar Icon */}
              <svg className="w-[1em] h-[1em] inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="16" rx="2.2" /> <path d="M8 3v4M16 3v4" />
              </svg>
              2018
            </span>
            <span className="opacity-50">|</span>
            <span className="flex items-center gap-1">
              {/* Clock Icon */}
              <svg className="w-[1em] h-[1em] inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" /> <path d="M12 7v5l3 3" />
              </svg>
              2h 8m
            </span>
          </div>

          {/* Synopsis */}
           {/* ADJUSTED: Smaller text on mobile */}
          <p className="text-white opacity-90 font-normal text-sm md:text-base leading-relaxed max-w-xl mt-2">
            In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
          </p>
          
          {/* Call to Action */}
           {/* ADJUSTED: Smaller button on mobile */}
          <button 
            onClick={() => { navigate('/movies') }} // CORRECTED: Use lowercase 'navigate'
            className="rounded-full cursor-pointer px-6 py-2.5 md:px-7 md:py-3 font-semibold text-white bg-gradient-to-r from-pink-400 to-orange-400 shadow-lg hover:from-orange-400 hover:to-pink-400 transition-all duration-200 whitespace-nowrap mt-4 text-sm md:text-base tracking-wide">
            Explore Movies &rarr;
          </button>
        </div>
      </div>
      
      {/* A fade overlay can greatly improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-0"></div>
    </div>
  );
}