import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingCard from "../component/MyBookingCard";

export default function MyBookingsPage() {
  const { state } = useLocation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (state) {
      // Optional: Store in localStorage if you want it to persist on refresh
      const existing = JSON.parse(localStorage.getItem('myBookings')) || [];
      const updated = [...existing, state];
      localStorage.setItem('myBookings', JSON.stringify(updated));
      setBookings(updated);
    } else {
      // Load from localStorage on page refresh
      const existing = JSON.parse(localStorage.getItem('myBookings')) || [];
      setBookings(existing);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1317] via-[#29192b] to-[#191024] flex flex-col items-center pt-16 px-4">
      <div className="max-w-2xl w-full bg-[#221b22] bg-opacity-90 rounded-xl py-10 px-7 md:py-14 md:px-16 shadow-lg mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-7">
          My Bookings
        </h2>

        {bookings && bookings.length > 0 ? (
          bookings.map((booking, idx) => (
            <BookingCard booking={booking} key={idx} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              className="w-14 h-14 text-pink-400 mb-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              viewBox="0 0 48 48"
            >
              <rect x="7" y="16" width="34" height="23" rx="3.5" fill="#28203a" />
              <path
                d="M11 25 l10 8 16-16"
                stroke="currentColor"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-xl font-semibold text-gray-300 mb-1">No bookings found</div>
            <p className="text-gray-400 text-base text-center">
              You haven&apos;t booked any tickets yet.
              <br />
              Explore movies and book your first ticket!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
