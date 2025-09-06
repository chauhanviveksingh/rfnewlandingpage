import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // using lucide-react for a clean close icon

const FloatingButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const couponCode = "RAIL25";

  // Show buttons after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset "Copied!" message after 2 seconds
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 transition-transform duration-700 ${
        showButtons ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* Floating Card */}
      <div className="relative bg-white w-full shadow-2xl rounded-t-2xl p-6 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => setShowButtons(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#cb212e] transition"
        >
          <X size={20} />
        </button>

        {/* Discount Text and Copy Code */}
        <div className="text-center mb-4">
          <p className="text-xl font-semibold text-gray-800">
            Get 25% Discount Only on App
          </p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-2xl font-bold text-[#cb212e] mr-2">
              {couponCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="bg-gray-200 text-gray-700 text-sm font-medium py-1 px-3 rounded-full hover:bg-gray-300 transition-all duration-300"
            >
              {isCopied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col items-center gap-2">
          <button
            onClick={() => window.open("https://railfeast.com/download", "_blank")}
            className="w-full bg-[#cb212e] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-[#a61a25] transition-all duration-300"
          >
            Order on RailFeast App
          </button>
          <p className="text-gray-500 my-2">Or</p>
          <button
            onClick={() => setShowButtons(false)}
            className="w-full bg-white text-[#cb212e] font-bold py-3 px-6 rounded-xl shadow-md border-2 border-[#cb212e] hover:bg-red-50 transition-all duration-300"
          >
            Stay in Browser
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingButtons;
