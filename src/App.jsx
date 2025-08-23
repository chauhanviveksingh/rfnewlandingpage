import React, { useState, useEffect, useRef, memo } from "react";
import { CalendarDays } from "lucide-react";

import HomeImg from "./assets/home_img.webp"; // Importing the home image

// The previous image import was causing a compilation error.
// We've replaced it with a valid placeholder image URL to fix the issue.
// You can replace this URL with your desired image URL later.
const homeImgUrl = HomeImg;

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

// Helper function to format date parts
const formatDateParts = (date) => {
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return { month, day, weekday };
};

// Memoized TabContent component to prevent unnecessary re-renders.
const TabContent = memo(({ activeTab, pnrNumber, setPnrNumber, stationInput, setStationInput, trainNumber, setTrainNumber, stationCode, setStationCode }) => {
  // Handlers for input validation
  const handlePnrChange = (e) => {
    const v = e.target.value;
    if (/^\d*$/.test(v)) setPnrNumber(v);
  };
  const handleStationInputChange = (e) => {
    const v = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(v)) setStationInput(v);
  };
  const handleTrainNumberChange = (e) => {
    const v = e.target.value;
    if (/^\d*$/.test(v)) setTrainNumber(v);
  };
  const handleStationCodeChange = (e) => {
    const v = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(v)) setStationCode(v);
  };

  return (
    <div className="mt-6">
      {/* PNR Tab Content */}
      <div className={`${activeTab === "By PNR" ? "" : "hidden"}`}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter PNR Number"
            value={pnrNumber}
            onChange={handlePnrChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Station Tab Content */}
      <div className={`${activeTab === "By Station" ? "" : "hidden"}`}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Enter Station Name (e.g. New Delhi)"
            value={stationInput}
            onChange={handleStationInputChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Train Tab Content */}
      <div className={`${activeTab === "By Train No" ? "" : "hidden"}`}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter Train Number"
            value={trainNumber}
            onChange={handleTrainNumberChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Enter Station Code (e.g. NDLS)"
            value={stationCode}
            onChange={handleStationCodeChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
});

// Full Calendar Component
const FullCalendar = memo(({ selectedDate, setSelectedDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
  const pastSelectableThreshold = new Date();
  pastSelectableThreshold.setDate(pastSelectableThreshold.getDate() - 3);
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const firstDay = firstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = startOfDay(date).getTime() === startOfDay(selectedDate).getTime();
      const isToday = startOfDay(date).getTime() === startOfDay(new Date()).getTime();
      const isUnselectablePastDate = startOfDay(date).getTime() < startOfDay(pastSelectableThreshold).getTime();

      daysArray.push(
        <div
          key={day}
          onClick={isUnselectablePastDate ? null : () => {
            setSelectedDate(date);
            onClose();
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 text-sm font-medium
            ${isSelected ? 'bg-red-600 text-white' : 'hover:bg-gray-200 text-gray-800'}
            ${isToday && !isSelected ? 'border border-red-600 text-red-600' : ''}
            ${isUnselectablePastDate ? 'text-gray-300 cursor-not-allowed hover:bg-transparent' : ''}
          `}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600 hover:text-red-600 p-2 rounded-full transition-all duration-200 focus:outline-none">
          &lt;
        </button>
        <span className="text-lg font-bold">
          {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={nextMonth} className="text-gray-600 hover:text-red-600 p-2 rounded-full transition-all duration-200 focus:outline-none">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {renderDays()}
      </div>
    </div>
  );
});

// Main App component containing all functionality
const App = () => {
  // --- App State (for top section) ---
  const [activeTab, setActiveTab] = useState("By PNR");
  const [pnrNumber, setPnrNumber] = useState("");
  const [stationInput, setStationInput] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [stationCode, setStationCode] = useState("");

  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState('bottom');

  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (datePickerRef.current) {
        const rect = datePickerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const calendarHeight = 400; // Approximate height of the calendar component
        
        // If the bottom of the date picker is close to the bottom of the viewport
        if (rect.bottom + calendarHeight > viewportHeight) {
          setCalendarPosition('top');
        } else {
          setCalendarPosition('bottom');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on component mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showFullCalendar]); // Re-calculate when the calendar opens or closes

  // Build the small 6-day list (today + next 5 days) as requested
  const cardDates = Array.from({ length: 6 }, (_, offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return {
      date: d,
      ...formatDateParts(d),
      label: offset === 0 ? "Today" : null,
    };
  });

  const selectedIndex = cardDates.findIndex(
    (cd) => cd.date.toDateString() === startOfDay(selectedDate).toDateString()
  );

  const commonButtonClass = "col-span-1 h-16 md:h-full w-full bg-red-600 text-white font-bold text-xl rounded-xl shadow-md hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2";

  const Tabs = () => (
    <div className="flex justify-between border-b border-gray-200">
      {["By PNR", "By Station", "By Train No"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-4 text-lg font-semibold rounded-t-lg transition-all duration-300 ${
            activeTab === tab
              ? "text-red-600 border-b-4 border-red-600"
              : "text-gray-500 hover:text-red-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <div className="h-auto bg-gray-100 font-sans flex flex-col items-center">
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

      {/* Top banner with an image - small curve (6px) */}
      <div className="relative w-full overflow-hidden bg-white shadow-lg rounded-b-[6px]">
        <img
          src={homeImgUrl}
          alt="A family eating together in a train"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center rounded-b-[6px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-b-[6px]"></div>
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center drop-shadow-md mt-8">
        Order food online in train!
      </h1>

      {/* Main content card */}
    <div className="relative w-11/12 mt-10 max-w-2xl bg-white p-6 md:p-8 rounded-3xl shadow-xl z-10">
        <Tabs />
        <TabContent
          activeTab={activeTab}
          pnrNumber={pnrNumber}
          setPnrNumber={setPnrNumber}
          stationInput={stationInput}
          setStationInput={setStationInput}
          trainNumber={trainNumber}
          setTrainNumber={setTrainNumber}
          stationCode={stationCode}
          setStationCode={setStationCode}
        />

        {/* Date picker + 6-date cards */}
        <div className="mt-8 relative" ref={datePickerRef}>
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setShowFullCalendar(!showFullCalendar)}>
            <h3 className="text-xl font-bold">Boarding Date</h3>
            <CalendarDays size={24} className="text-red-600" />
            <span className="text-md font-medium text-gray-700">
              {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:px-0">
            {cardDates.map((dateObj, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(startOfDay(dateObj.date))}
                className={`flex-none w-24 p-2 text-center rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedIndex === index
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
                }`}
              >
                <div className="text-2xl font-bold">{dateObj.day}</div>
                <div className="text-sm font-medium">{dateObj.month}</div>
                <div className="text-xs font-medium mt-1">
                  {dateObj.label || dateObj.weekday}
                </div>
              </div>
            ))}
          </div>

          {showFullCalendar && (
            <div
              className={`absolute left-0 mt-2 z-20 ${calendarPosition === 'top' ? 'bottom-full mb-2' : 'top-full'}`}
            >
              <FullCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onClose={() => setShowFullCalendar(false)}
              />
            </div>
          )}
        </div>

        {/* "Let's Go" button now placed below the date picker */}
        <div className="mt-10">
            <button
                onClick={() => {
                    const params = {
                        pnr: pnrNumber,
                        station: stationInput,
                        train: trainNumber,
                        stationCode: stationCode,
                        date: selectedDate.toDateString()
                    };
                    // Replaced alert() with console.log() to prevent breaking the app in the Canvas environment
                    console.log("Searching with: ", params);
                }}
                className={commonButtonClass}
            >
                Let's Go
            </button>
        </div>
      </div>

      <div className="py-10" />
    </div>
  );
};

export default App;