import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Card for individual booking
function BookingCard({ booking }) {
  return (
    <div className="flex items-center bg-[#191822] rounded-xl shadow-sm p-5 gap-6 my-4 border border-pink-500/10">
      <img
        src={booking.poster}
        alt={booking.title}
        className="h-20 w-14 object-cover flex-shrink-0 rounded-lg border border-gray-700"
        draggable={false}
      />
      <div className="flex-1">
        <div className="font-bold text-lg text-white mb-1">{booking.title}</div>
        <div className="text-gray-400 text-sm mb-1">
          Seats: <span className="text-pink-400">{booking.selectedSeats.join(', ')}</span> &nbsp;|&nbsp;
          Time: <span className="text-pink-400">{booking.selectedTime}</span> &nbsp;|&nbsp;
          Date: <span className="text-pink-400">{booking.date}</span>
        </div>
        <div className="text-gray-500 text-xs">
          Ticket ID: <span>{booking.movieId}</span>
        </div>
      </div>
      <div>
        <span className="inline-block px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-red-500 rounded-md text-white font-semibold shadow">
          Booked
        </span>
      </div>
    </div>
  );
}

export default BookingCard
