import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';

// This is the main application component.
// It creates a responsive UI for ordering food online in a train.
const App = () => {
  // State to manage the active tab (PNR, Station, or Train)
  const [activeTab, setActiveTab] = useState('By Station');
  
  // State to manage the input fields
  const [trainNumber, setTrainNumber] = useState('');
  const [boardingStation, setBoardingStation] = useState('');

  // Function to handle tab changes
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Reset inputs when changing tabs
    setTrainNumber('');
    setBoardingStation('');
  };

  // Helper function to get the date and day of the week
  const getFormattedDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

    return { day, month, weekday };
  };

  // An array to hold the date objects for the next 4 days (including today)
  const dates = [
    { ...getFormattedDate(0), label: 'Today' },
    { ...getFormattedDate(1) },
    { ...getFormattedDate(2) },
    { ...getFormattedDate(3) },
  ];

  const Tabs = () => (
    <div className="flex justify-between border-b border-gray-200">
      {['By PNR', 'By Station', 'By Train'].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`flex-1 text-center py-4 text-lg font-semibold rounded-t-lg transition-all duration-300 ${
            activeTab === tab
              ? 'text-red-600 border-b-4 border-red-600'
              : 'text-gray-500 hover:text-red-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const DatePicker = () => (
    <div className="mt-8">
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-bold">Boarding Date</h3>
        <CalendarDays size={24} className="text-red-600" />
      </div>
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:px-0">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`flex-none w-24 p-2 text-center rounded-xl cursor-pointer transition-all duration-200 ${
              index === 0
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
            }`}
          >
            <div className="text-2xl font-bold">{date.day}</div>
            <div className="text-sm font-medium">{date.month}</div>
            <div className="text-xs font-medium mt-1">
              {date.label || date.weekday}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Tailwind CSS CDN script for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Custom styles for the app */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center">
        {/* Top banner with an image */}
        <div className="relative w-full overflow-hidden bg-white shadow-lg rounded-b-[4rem] md:rounded-b-[6rem] lg:rounded-b-[8rem]">
          <img
            src="src/assets/home_img.png"
            alt="A family eating together in a train"
            className="w-full h-80 sm:h-96 object-cover object-center rounded-b-[4rem] md:rounded-b-[6rem] lg:rounded-b-[8rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 rounded-b-[4rem] md:rounded-b-[6rem] lg:rounded-b-[8rem]"></div>
        </div>

        {/* The text has been moved here, below the image */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center drop-shadow-md mt-8">
            Order food online in train!
        </h1>

        {/* Main content card */}
        <div className="relative w-11/12 mt-10 max-w-2xl bg-white p-6 md:p-8 rounded-3xl shadow-xl z-10">
          <Tabs />

          {/* Form section based on the active tab */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <input
                  type="text"
                  placeholder="Enter Train No./Name"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Enter Boarding Station"
                  value={boardingStation}
                  onChange={(e) => setBoardingStation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <button
                onClick={() => alert('Searching for food...')}
                className="col-span-1 h-12 md:h-full bg-red-600 text-white font-bold text-lg rounded-xl shadow-md hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Let's Go
              </button>
            </div>
          </div>
          <DatePicker />
        </div>

        {/* A bit of spacing at the bottom */}
        <div className="py-10"></div>
      </div>
    </>
  );
};

export default App;
