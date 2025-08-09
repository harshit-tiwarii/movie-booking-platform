import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// ✅ CORRECTED: Import fetchUser for initial auth check
import { fetchUser } from "../features/user/userSlice"; 
import { NavLinks } from "./NavLinks";
// ✨ ADDED: Import the ProfileSidebar component
import ProfileSidebar from "./ProfileSidebar"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for the profile menu
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get user and loading state from Redux
  const { user, loading } = useSelector((state) => state.auth);

  // ✨ ADDED: Fetch user on component mount to check for existing session
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Effect to close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Effect to disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleProfileClick = () => {
    setProfileMenuOpen((prev) => !prev);
  };
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent flex items-center justify-between px-10 sm:px-10 h-[68px] font-sans select-none">
        {/* Logo */}
        <Link
          to="/"
          className="font-extrabold text-white text-2xl tracking-tight cursor-pointer"
        >
          QuickShow
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 list-none">
          {NavLinks.map((item) => (
            <li key={item.name}>
              {/* ✅ CORRECTED: JSX expression syntax in className */}
              <Link
                to={item.path}
                className={`text-white font-medium text-base relative pb-1 ${
                  location.pathname === item.path
                    ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2.5px] after:bg-gradient-to-r after:from-pink-400 after:to-orange-400 after:rounded"
                    : "hover:text-pink-400"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-white text-xl hover:text-pink-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>
          
          {/* ✨ REFACTORED: Conditional Button/Profile */}
          {!loading && (
            user ? (
              <div className="relative">
                <img
                  onClick={handleProfileClick}
                  // ✅ CORRECTED: user.photo to match signup form
                  src={user.photo} 
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition-transform duration-200 object-cover"
                />
              </div>
            ) : (
              <button
                onClick={() => navigate("/loginForm")}
                className="rounded-full px-7 py-2 font-semibold text-white bg-gradient-to-r from-pink-400 to-orange-400 hover:from-orange-400 hover:to-pink-400 transition-all"
              >
                Login
              </button>
            )
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* ... hamburger SVG ... */}
           {!menuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* ✨ REFACTORED & CORRECTED: Mobile Menu */}
      <div
        className={`fixed inset-0 top-[68px] h-[calc(100vh-68px)] bg-[#181828dd] backdrop-blur-sm text-white z-40 md:hidden transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-6 gap-6 mt-4">
          {NavLinks.map((item) => (
            <li key={item.name}>
              {/* ✅ CORRECTED: JSX expression syntax */}
              <Link
                to={item.path}
                className={`block text-lg font-semibold pb-1 ${
                  location.pathname === item.path
                    ? "text-pink-400"
                    : "hover:text-pink-400"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <button className="flex items-center gap-2 text-xl hover:text-pink-400">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="16.65" y1="16.65" x2="21" y2="21" /></svg>
              Search
            </button>
          </li>
          
          <li className="pt-4 border-t border-gray-700">
            {!loading && (
              user ? (
                // If user is logged in, show profile and logout in the new sidebar
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3">
                     <img src={user.photo} alt="profile" className="w-12 h-12 rounded-full border-2 object-cover"/>
                     <span className="font-semibold text-lg">{user.name}</span>
                   </div>
                   {/* We can use the same sidebar component here, but styled for mobile */}
                   <ProfileSidebar user={user} onClose={() => setMenuOpen(false)} />
                </div>
              ) : (
                // If logged out, show login button
                <button
                  className="w-full px-7 py-3 rounded-full text-white bg-gradient-to-r from-pink-400 to-orange-400 hover:from-orange-400 hover:to-pink-400 transition-all"
                  onClick={() => navigate("/loginForm")}
                >
                  Login
                </button>
              )
            )}
          </li>
        </ul>
      </div>

      {/* ✨ REFACTORED: Use ProfileSidebar component for Desktop */}
      {profileMenuOpen && user && (
        <div className="absolute top-[80px] right-10 w-56 bg-white text-black rounded-md shadow-lg z-50 p-2">
            <ProfileSidebar user={user} onClose={() => setProfileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}