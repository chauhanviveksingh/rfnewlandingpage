import React, { useState, forwardRef } from "react";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import homeImg from "./assets/home_img.png"; // <-- put your image here

const DateIconButton = forwardRef(({ value, onClick }, ref) => {
  // custom input for react-datepicker (renders the calendar icon + current date text)
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className="flex items-center space-x-2 px-2 py-1 rounded-md focus:outline-none"
    >
      <CalendarDays size={20} className="text-red-600" />
      <span className="text-sm font-medium">{value}</span>
    </button>
  );
});

const formatDateParts = (date) => {
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return { day, month, weekday };
};

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const App = () => {
  const [activeTab, setActiveTab] = useState("By PNR");

  // inputs
  const [pnrNumber, setPnrNumber] = useState("");
  const [stationInput, setStationInput] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [stationCode, setStationCode] = useState("");

  // calendar
  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(today); // Date object

  // build the small 4-day list (today + next 3 days)
  const cardDates = [0, 1, 2, 3].map((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return {
      date: d,
      ...formatDateParts(d),
      label: offset === 0 ? "Today" : null,
    };
  });

  // compute which card is active (-1 if selectedDate outside the 4-day window)
  const selectedIndex = cardDates.findIndex(
    (cd) => cd.date.toDateString() === startOfDay(selectedDate).toDateString()
  );

  // handlers (with the same input validation you had)
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

  const commonButtonClass =
    "col-span-1 h-16 md:h-full bg-red-600 text-white font-bold text-xl rounded-xl shadow-md hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2";

  const TabContent = () => {
    switch (activeTab) {
      case "By PNR":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            <div className="col-span-1 md:col-span-2 space-y-4">
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
            <button
              onClick={() => alert("Searching by PNR: " + pnrNumber)}
              className={commonButtonClass}
            >
              Let's Go
            </button>
          </div>
        );
      case "By Station":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <input
                type="text"
                placeholder="Enter Boarding Station Name"
                value={stationInput}
                onChange={handleStationInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            </div>
            <button
              onClick={() => alert("Searching by Station: " + stationInput)}
              className={commonButtonClass}
            >
              Let's Go
            </button>
          </div>
        );
      case "By Train No":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            <div className="col-span-1 md:col-span-2 space-y-4">
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
            <button
              onClick={() =>
                alert(
                  "Searching by Train: " + trainNumber + " at station " + stationCode
                )
              }
              className={commonButtonClass}
            >
              Let's Go
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center">
      {/* Top banner with an image - small curve (6px) */}
      <div className="relative w-full overflow-hidden bg-white shadow-lg rounded-b-[6px]">
        <img
          src={homeImg}
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
        <TabContent />

        {/* Date picker + 4-date cards */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Boarding Date</h3>

            {/* react-datepicker custom input (icon + readable date) */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                // ensure we compare start-of-day
                const d = startOfDay(date || new Date());
                setSelectedDate(d);
              }}
              customInput={<DateIconButton />}
              popperPlacement="bottom-end"
              // optional: limit selectable dates if you want to restrict
              // minDate={today}
            />
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
        </div>
      </div>

      <div className="py-10" />
    </div>
  );
};

export default App;
