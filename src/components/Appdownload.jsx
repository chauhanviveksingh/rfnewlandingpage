import React from "react";
import { motion } from "framer-motion";

export default function AppDownloadSection() {
  return (
    <section className="min-h-auto w-full bg-white flex flex-col items-center justify-center text-center px-6 py-12">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-700 drop-shadow-lg mb-4">
        Download Our App
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mb-12">
        Get the best experience of our services right on your phone.  
        Available on both{" "}
        <span className="font-semibold text-red-600">iOS</span> and{" "}
        <span className="font-semibold text-red-600">Android</span>.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        {/* App Store */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 border-2 border-red-600 bg-white text-red-600 
          rounded-lg px-6 py-3 sm:px-8 sm:py-4 shadow-md hover:shadow-red-300 transition-all duration-300"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.185 2.128c... (your svg path)" />
          </svg>
          <div className="text-left">
            <span className="block text-xs sm:text-sm">Download on the</span>
            <span className="block text-lg sm:text-xl font-bold -mt-1">
              App Store
            </span>
          </div>
        </motion.a>

        {/* Google Play */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 border-2 border-red-600 bg-white text-red-600 
          rounded-lg px-6 py-3 sm:px-8 sm:py-4 shadow-md hover:shadow-red-300 transition-all duration-300"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.5 19.5c... (your svg path)" />
          </svg>
          <div className="text-left">
            <span className="block text-xs sm:text-sm">Get it on</span>
            <span className="block text-lg sm:text-xl font-bold -mt-1">
              Google Play
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
