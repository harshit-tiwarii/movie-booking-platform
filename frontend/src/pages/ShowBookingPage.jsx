import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineAccessTime, MdArrowForward } from 'react-icons/md';
import { movieData } from '../assets/QuickShow-assets/assets'; // Adjust if path differs
import {toast} from 'react-toastify';

const availableTimings = ['02:30 PM', '01:30 AM', '05:30 PM', '08:30 PM'];

const seatLayout = {
  rows: 8,
  seatsPerRow: 9,
  gaps: [2, 6],
  booked: ['A5', 'A6', 'B5', 'B6', 'C7', 'C8', 'D4', 'D5', 'G1', 'G2', 'H1', 'H2', 'I8', 'I9', 'A1', 'C1'],
};

const Screen = () => (
  <div className="w-full max-w-2xl mx-auto mb-8">
    <h2 className="text-xl font-bold text-center text-gray-300 mb-2">Select your seat</h2>
    <div className="h-2 bg-gray-600 rounded-t-full relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent rounded-t-full"></div>
    </div>
    <p className="text-center text-gray-500 text-sm mt-2">SCREEN SIDE</p>
  </div>
);

const Seat = ({ id, status, isSelected, onSelect }) => {
  const getSeatClass = () => {
    if (status === 'booked') return 'bg-gray-700 cursor-not-allowed';
    if (isSelected) return 'bg-pink-600 border-pink-500 shadow-lg shadow-pink-600/30';
    return 'bg-gray-800 border-gray-600 hover:bg-pink-600 hover:border-pink-500';
  };

  return (
    <button
      onClick={() => status === 'available' && onSelect(id)}
      disabled={status === 'booked'}
      className={`w-10 h-10 rounded-md border text-xs font-semibold transition-all duration-200 ${getSeatClass()}`}
    >
      {id}
    </button>
  );
};

export default function SeatSelectionPage() {
  const { id: movieId, date } = useParams();
  const navigate = useNavigate();
  const movie = movieData.find((m) => m._id === movieId);

  const [selectedTime, setSelectedTime] = useState(availableTimings[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const generateSeatGrid = () => {
    const grid = [];
    const rowChars = 'ABCDEFGHIJ';
    for (let i = 0; i < seatLayout.rows; i++) {
      const rowChar = rowChars[i];
      const rowSeats = [];
      for (let j = 1; j <= seatLayout.seatsPerRow; j++) {
        const seatId = `${rowChar}${j}`;
        const status = seatLayout.booked.includes(seatId) ? 'booked' : 'available';
        rowSeats.push(
          <Seat
            key={seatId}
            id={seatId}
            status={status}
            isSelected={selectedSeats.includes(seatId)}
            onSelect={handleSeatSelect}
          />
        );
        if (seatLayout.gaps.includes(j)) {
          rowSeats.push(<div key={`gap-${i}-${j}`} className="w-8" />);
        }
      }
      grid.push(
        <div key={`row-${i}`} className="flex justify-center items-center gap-2 mb-2">
          {rowSeats}
        </div>
      );
    }
    return grid;
  };

  const canProceed = selectedTime && selectedSeats.length > 0;

  const handleProceed = () => {
    const bookingDetails = {
      movieId,
      title: movie.title,
      poster: movie.poster_path,
      selectedSeats,
      selectedTime,
      date,
    };
    console.log("Booking Details:", bookingDetails);
    
    if (!movie || selectedSeats.length === 0 || !selectedTime || !date) {
    toast.error('Something went wrong, try again');
    return;
  }
    navigate('/mybooking',{state: bookingDetails} );
  };

  if (!movie) return <div className="text-white p-10">Movie not found.</div>;

  return (
    <div className="mt-10 text-white min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Panel: Timings */}
      <div className="w-full lg:w-1/4 bg-black/20 p-8 backdrop-blur-sm border-r border-gray-800">
        <h2 className="text-2xl font-bold mb-8 text-pink-400">Available Timings</h2>
        <div className="space-y-4">
          {availableTimings.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-colors duration-300 ${
                selectedTime === time
                  ? 'bg-pink-600/80 shadow-lg shadow-pink-500/20'
                  : 'bg-gray-800/50 hover:bg-gray-700/70'
              }`}
            >
              <MdOutlineAccessTime
                className={`text-xl ${selectedTime === time ? 'text-white' : 'text-pink-400'}`}
              />
              <span className="font-semibold text-lg">{time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel: Seat Selection */}
      <div className="w-full lg:w-3/4 flex flex-col items-center justify-between p-8">
        <div className="w-full">
          <Screen />
          <div className="mt-12">{generateSeatGrid()}</div>
        </div>

        <div className="mt-12 text-center w-full max-w-md">
          {selectedSeats.length > 0 && (
            <p className="mb-4 text-gray-400">
              Selected Seats: <span className="font-bold text-white">{selectedSeats.join(', ')}</span>
            </p>
          )}
          <button
            disabled={!canProceed}
            onClick={handleProceed}
            className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 ${
              canProceed
                ? 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 shadow-lg shadow-red-500/30'
                : 'bg-gray-700 cursor-not-allowed text-gray-500'
            }`}
          >
            Proceed to Checkout <MdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
