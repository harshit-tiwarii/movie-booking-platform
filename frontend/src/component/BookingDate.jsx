import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/** ✅ Helper function to generate a list of upcoming dates */
function getDates(startDate, days) {
  const result = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    result.push(d);
  }
  return result;
}

export default function BookingDate({ movieId }) {
  const navigate = useNavigate();
  const today = new Date();
  const [startOffset, setStartOffset] = useState(0);
  const [selected, setSelected] = useState(null); // default selected index

  const DATES_SHOWN = 5;
  const visibleStart = new Date();
  visibleStart.setDate(today.getDate() + startOffset);
  const visibleDates = getDates(visibleStart, DATES_SHOWN);

  const selectedDate = visibleDates[selected];

  const handlePrev = () => {
    if (startOffset > 0) {
      setStartOffset(startOffset - 1);
      setSelected(selected + 1);
    }
  };

  const handleNext = () => {
    setStartOffset(startOffset + 1);
    setSelected(selected > 0 ? selected - 1 : 0);
  };

  const handleBookNow = () => {
    console.log("Movie ID:", movieId);
    if(!selected){
      return toast.error('Please select date')
    }
    console.log("Date:", selectedDate.toDateString());
    navigate(`/movies/${movieId}/${selectedDate}`)
    scrollTo(0,0)
  };

  return (
    <div className="rounded-xl border border-pink-500/20 bg-gradient-to-br from-[#1b0d13] via-[#1b1017] to-[#190f17] overflow-hidden max-w-5xl mx-auto my-8 mt-23 shadow-xl">
      <div className="flex items-center justify-between p-8">
        <div>
          <div className="font-bold text-white mb-5">Choose Date</div>
          <div className="flex items-center gap-2">
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              disabled={startOffset === 0}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white border border-pink-400/30 bg-black/40 mr-2 ${
                startOffset === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-pink-600/50"
              }`}
              aria-label="Previous dates"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dates */}
            {visibleDates.map((date, i) => (
              <button
                key={date.toISOString()}
                className={`flex flex-col items-center justify-center px-4 py-2 mx-1 min-w-[55px] rounded-md border transition ${
                  selected === i
                    ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                    : "bg-black/20 text-white border-white/10 hover:bg-pink-400/30"
                }`}
                onClick={() => setSelected(i)}
              >
                <span className="font-semibold text-base">
                  {date.getDate().toString().padStart(2, "0")}
                </span>
                <span className="text-xs">
                  {date.toLocaleString("default", { month: "short" })}
                </span>
              </button>
            ))}

            {/* Right arrow */}
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white border border-pink-400/30 bg-black/40 ml-2 hover:bg-pink-600/50"
              aria-label="Next dates"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          className="bg-pink-500 hover:bg-pink-600 transition-colors cursor-pointer px-8 py-2 rounded-md text-white font-semibold shadow-md ml-8"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
