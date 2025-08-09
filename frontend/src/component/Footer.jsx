import React from "react";

// URLs for Play Store and Apple Store badges (official images)
const playStoreBadge =
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
const appleStoreBadge =
  "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";

export default function Footer() {
  return (
    <footer className="bg-[#181828] text-white mt-40 py-12 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">QuickShow</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate movie streaming platform. Explore, watch, and enjoy
            thousands of movies anytime, anywhere.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Movies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Theaters
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Releases
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Download Our App</h4>
          <p className="text-gray-400 mb-6 text-sm max-w-xs leading-relaxed">
            Get QuickShow on your mobile device for the best streaming
            experience.
          </p>
          <div className="flex gap-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on Google Play Store"
            >
              <img
                src={playStoreBadge}
                alt="Google Play Store"
                className="h-12 object-contain"
                draggable={false}
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on Apple App Store"
            >
              <img
                src={appleStoreBadge}
                alt="Apple App Store"
                className="h-12 object-contain"
                draggable={false}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm select-none">
        &copy; {new Date().getFullYear()} QuickShow. All rights reserved.
      </div>
    </footer>
  );
}
