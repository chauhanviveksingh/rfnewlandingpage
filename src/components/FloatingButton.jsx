import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // using lucide-react for a clean close icon

const FloatingButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const couponCode = "FEAST25";

  // Show buttons after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyCode = () => {
    const tempInput = document.createElement('textarea');
    tempInput.value = couponCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setIsCopied(true);
  };
  
  const handleOrderClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let appUrl = "https://railfeast.com/download"; // Fallback URL

    // Check for Android
    if (/android/i.test(userAgent)) {
      appUrl = "https://play.google.com/store/apps/details?id=com.railfeast&hl=en_IN";
    }
    // Check for iOS (iPhone, iPad, iPod)
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      appUrl = "https://apps.apple.com/in/app/railfeast-order-food-in-train/id6476834902";
    }
    // Check for Windows
    else if (/Windows/.test(userAgent)) {
      appUrl = "https://play.google.com/store/apps/details?id=com.railfeast&hl=en_IN";
    }

    window.open(appUrl, "_blank");
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
          className="absolute top-2 right-2 transition bg-white rounded-full p-2 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <X size={20} className="text-gray-500 hover:text-[#cb212e] transition"/>
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
              className={`text-sm font-medium py-1 px-3 rounded-full transition-all duration-300 ${isCopied ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {isCopied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col items-center gap-2">
          <button
            onClick={handleOrderClick}
            className="w-full bg-[#cb212e] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-[#a61a25] transition-all duration-300"
          >
            Order on RailFeast App
          </button>
          <p className="text-gray-500 my-1">Or</p>
          <p
            onClick={() => setShowButtons(false)}
            className="text-[#cb212e] font-bold mt-2 cursor-pointer hover:underline"
          >
            Stay in Browser
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloatingButtons;
