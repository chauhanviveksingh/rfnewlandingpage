import React, { useEffect, useState } from "react";

const FloatingButtons = () => {
  const [showButtons, setShowButtons] = useState(false);

  // Show card after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle click + hide card
  const handleClick = (url) => {
    setShowButtons(false);
    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 transition-transform duration-700 ${
        showButtons ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* Full-width card */}
      <div className="bg-white w-full shadow-2xl p-6 flex flex-col md:flex-row justify-center gap-4">
        {/* Button 1 - Order Food */}
        <button
          onClick={() => handleClick("https://railfeast.com")}
          className="w-full md:w-auto bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300"
        >
          Order Food on RailFeast
        </button>

        {/* Button 2 - Download App */}
        <button
          onClick={() => handleClick("https://railfeast.com/download")}
          className="w-full md:w-auto bg-gray-900 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300"
        >
          Download The RailFeast App
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
