import React from "react";
// Replace with your actual image import or path
import backgroundImage from "../assets/QuickShow-assets/backgroundImage.png"; 
// Replace with actual Marvel Studios logo import or URL
import marvelLogo from "../assets/QuickShow-assets/marvelLogo.svg";  
import { Navigate, useNavigate } from "react-router-dom";

export default function Hero() {
  const Navigate = useNavigate()

  return (
    <div
      className="relative w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Content */}
      <div className="flex flex-1 ml-25 items-center pt-28 pb-10 pl-10 pr-5 z-10 max-w-[600px]">
        <div className="flex flex-col justify-start items-start gap-4">
          {/* Marvel Studios Logo */}
          <img
            src={marvelLogo}
            alt="MARVEL STUDIOS"
            className="h-7 mb-2 select-none"
            draggable={false}
            style={{ filter: "drop-shadow(0 2px 6px rgba(30,20,0,0.23))" }}
          />
          {/* Main Title */}
          <h1
            className="text-white font-extrabold text-5xl md:text-6xl tracking-tight mb-3 leading-tight"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            Guardians <br className="sm:hidden" />
            of the Galaxy
          </h1>
          {/* Movie Info */}
          <div className="flex flex-row items-center gap-3 text-white/70 text-sm font-medium mb-1">
            <span>Action</span>
            <span>|</span>
            <span>Adventure</span>
            <span>|</span>
            <span>Sci-Fi</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              {/* Calendar Icon */}
              <svg
                className="w-[1em] h-[1em] inline-block mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="5" width="18" height="16" rx="2.2" />
                <path d="M8 3v4M16 3v4" />
              </svg>
              2018
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              {/* Clock Icon */}
              <svg
                className="w-[1em] h-[1em] inline-block mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              2h 8m
            </span>
          </div>
          {/* Synopsis */}
          <p className="text-white opacity-90 font-normal text-base leading-relaxed max-w-xl mb-4" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.18)" }}>
            In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
          </p>
          {/* Call to Action */}
          <button onClick={()=>{Navigate('/movies')}} className="rounded-full cursor-pointer px-7 py-2 font-semibold text-white bg-gradient-to-r from-pink-400 to-orange-400 shadow-lg hover:from-orange-400 hover:to-pink-400 transition-all duration-200 whitespace-nowrap mt-2 text-base tracking-wide">
            Explore Movies &rarr;
          </button>
        </div>
      </div>
      {/* Optional: A gentle left-black-fade overlay for better text legibility (uncomment if needed) */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,20,0.55)] via-transparent to-transparent pointer-events-none z-0"></div> */}
    </div>
  );
}
