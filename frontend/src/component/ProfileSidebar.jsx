import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice"; 
import { Link, useNavigate } from "react-router-dom"; // 

export default function ProfileSidebar({ user, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap() 
      .then(() => {
        navigate("/"); 
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      })
      .finally(() => {
        onClose(); // Always close the sidebar
      });
  };

  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  }

  return (
   
    <>
        <p className="font-semibold mb-2 px-4 pt-2">Hi, {user?.name?.split(" ")[0]}</p>
        <ul className="flex flex-col gap-1 text-gray-700">
            <li>
                <button onClick={() => handleLinkClick('/profilePage')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                    👤 Profile
                </button>
            </li>
            <li>
                <button onClick={() => handleLinkClick('/my-bookings')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                    🎟️ My Bookings
                </button>
            </li>
            <li>
                <button onClick={() => handleLinkClick('/favorites')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                    ❤️ Favorites
                </button>
            </li>
            <li>
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md"
                >
                    🚪 Logout
                </button>
            </li>
        </ul>
    </>
  );
}