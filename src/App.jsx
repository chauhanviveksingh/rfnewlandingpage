import React, { useState, useEffect, useRef, memo } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import HomeImg from "./assets/home_img.webp"; 


const homeImgUrl = HomeImg;
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const formatDateParts = (date) => {
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return { month, day, weekday };
};
/* ---------------- small station dataset (demo) ----------------
   Replace/extend this array with your real station data when ready.
*/
const stationList = [
  { name: "New Delhi", code: "NDLS" },
  { name: "Howrah Junction", code: "HWH" },
  { name: "Mumbai Central", code: "MMCT" },
  { name: "Chennai Central", code: "MAS" },
  { name: "Kanpur Central", code: "CNB" },
  { name: "Patna Junction", code: "PNBE" },
  { name: "Kolkata", code: "KOAA" },
  { name: "Secunderabad", code: "SC" },
];
/* ---------------- TabContent ---------------- */
const TabContent = memo(
  ({
    activeTab,
    pnrNumber,
    setPnrNumber,
    stationInput,
    setStationInput,
    trainNumber,
    setTrainNumber,
    stationCode,
    setStationCode,
    selectedDate,
    setSelectedDate,
    showFullCalendar,
    setShowFullCalendar,
    calendarPosition,
    datePickerRef,
  }) => {
    // validation error state
    const [pnrError, setPnrError] = useState("");
    // dropdown states & refs
    const [stationDropdown, setStationDropdown] = useState([]);
    const [codeDropdown, setCodeDropdown] = useState([]);
    const stationWrapperRef = useRef(null);
    const codeWrapperRef = useRef(null);
    // close dropdowns when clicking outside
    useEffect(() => {
      const onDocClick = (e) => {
        if (stationWrapperRef.current && !stationWrapperRef.current.contains(e.target)) {
          setStationDropdown([]);
        }
        if (codeWrapperRef.current && !codeWrapperRef.current.contains(e.target)) {
          setCodeDropdown([]);
        }
      };
      document.addEventListener("click", onDocClick);
      return () => document.removeEventListener("click", onDocClick);
    }, []);
    // close calendar when clicking outside the date picker/calendar
    useEffect(() => {
      const onDocClickCloseCalendar = (e) => {
        if (
          showFullCalendar &&
          datePickerRef &&
          datePickerRef.current &&
          !datePickerRef.current.contains(e.target)
        ) {
          setShowFullCalendar(false);
        }
      };
      document.addEventListener("mousedown", onDocClickCloseCalendar);
      return () => document.removeEventListener("mousedown", onDocClickCloseCalendar);
    }, [showFullCalendar, datePickerRef, setShowFullCalendar]);
    // Handlers
    const handlePnrChange = (e) => {
      const v = e.target.value;
      if (/^\d*$/.test(v)) {
        setPnrNumber(v);
        if (v === "") {
          setPnrError("");
        } else if (!/^[2468]/.test(v)) {
          setPnrError("PNR must start with 2, 4, 6, or 8");
        } else if (v.length !== 10) {
          setPnrError("PNR must be exactly 10 digits");
        } else {
          setPnrError("");
        }
      }
    };
    const handleStationInputChange = (e) => {
      const v = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(v)) {
        setStationInput(v);
        if (v.trim() === "") {
          setStationDropdown([]);
        } else {
          const q = v.toLowerCase();
          setStationDropdown(
            stationList.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
          );
        }
      }
    };
    const handleTrainNumberChange = (e) => {
      const v = e.target.value;
      if (/^\d*$/.test(v)) setTrainNumber(v);
    };
    const handleStationCodeChange = (e) => {
      const v = e.target.value.toUpperCase();
      if (/^[A-Z]*$/.test(v)) {
        setStationCode(v);
        if (v.trim() === "") {
          setCodeDropdown([]);
        } else {
          const q = v.toLowerCase();
          setCodeDropdown(
            stationList.filter((s) => s.code.toLowerCase().startsWith(q) || s.name.toLowerCase().includes(q))
          );
        }
      }
    };
    const today = startOfDay(new Date());
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
    const toggleCodeDropdown = () => {
        if (codeDropdown.length > 0) {
            setCodeDropdown([]);
        } else {
            setCodeDropdown(stationList);
        }
    };
    return (
      <div className="mt-6">
        {/* By PNR */}
        <div className={`${activeTab === "By PNR" ? "" : "hidden"}`}>
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter PNR Number"
              value={pnrNumber}
              onChange={handlePnrChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cb212e] focus:outline-none transition-all duration-200"
              maxLength={10}
            />
            {pnrError && <p className="text-[#cb212e] text-sm mt-1">{pnrError}</p>}
          </div>
        </div>
        {/* By Station */}
        <div className={`${activeTab === "By Station" ? "" : "hidden"}`}>
          <div className="relative grid grid-cols-1 gap-4" ref={stationWrapperRef}>
            <input
              type="text"
              placeholder="Enter Station Name (e.g. New Delhi)"
              value={stationInput}
              onChange={handleStationInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cb212e] focus:outline-none transition-all duration-200"
              aria-autocomplete="list"
            />
            {stationDropdown.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-44 overflow-y-auto z-20">
                {stationDropdown.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setStationInput(s.name);
                      setStationDropdown([]);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-red-50"
                    role="option"
                  >
                    {s.name} ({s.code})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* By Train No */}
        <div className={`${activeTab === "By Train No" ? "" : "hidden"}`}>
          <div className="relative grid grid-cols-1 gap-4">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter Train Name/No."
              value={trainNumber}
              onChange={handleTrainNumberChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cb212e] focus:outline-none transition-all duration-200"
            />
            <div className="relative" ref={codeWrapperRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Boarding Station"
                  value={stationCode}
                  onChange={handleStationCodeChange}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cb212e] focus:outline-none transition-all duration-200"
                  aria-autocomplete="list"
                />
                <button
                    type="button"
                    onClick={toggleCodeDropdown}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#cb212e]"
                >
                    <ChevronDown size={20} />
                </button>
              </div>
              {codeDropdown.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-44 overflow-y-auto z-20">
                  {codeDropdown.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setStationCode(s.code);
                        setCodeDropdown([]);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-red-50"
                      role="option"
                    >
                      {s.name} ({s.code})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Date picker + 6-date cards for By Train No tab only */}
          <div className="mt-8 relative" ref={datePickerRef}>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setShowFullCalendar(!showFullCalendar)}
            >
              <h3 className="text-xl font-bold">Boarding Date</h3>
              <CalendarDays size={24} className="text-[#cb212e]" />
              <span className="text-md font-medium text-gray-700">
                {selectedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short", // changed from long -> short (e.g. Sep)
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:px-0">
              {cardDates.map((dateObj, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDate(startOfDay(dateObj.date))}
                  className={`flex-none w-24 p-2 text-center rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedIndex === index
                      ? "bg-[#cb212e] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-[#cb212e]"
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
                className={`absolute left-0 mt-2 z-20 ${
                  calendarPosition === "top" ? "bottom-full mb-2" : "top-full"
                }`}
              >
                <FullCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onClose={() => setShowFullCalendar(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
/* ---------------- FullCalendar ---------------- */
const FullCalendar = memo(({ selectedDate, setSelectedDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth())
  );
  const pastSelectableThreshold = new Date();
  pastSelectableThreshold.setDate(pastSelectableThreshold.getDate() - 3);
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const renderDays = () => {
    const totalDays = daysInMonth(
      currentMonth.getMonth(),
      currentMonth.getFullYear()
    );
    const firstDay = firstDayOfMonth(
      currentMonth.getMonth(),
      currentMonth.getFullYear()
    );
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected =
        startOfDay(date).getTime() === startOfDay(selectedDate).getTime();
      const isToday =
        startOfDay(date).getTime() === startOfDay(new Date()).getTime();
      const isUnselectablePastDate =
        startOfDay(date).getTime() <
        startOfDay(pastSelectableThreshold).getTime();
      // Build classes so that unselectable dates DO NOT receive hover classes
      let dayClass =
        "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 text-sm font-medium";
      if (isSelected) {
        dayClass += " bg-[#cb212e] text-white";
      } else {
        if (isUnselectablePastDate) {
          // gray, unclickable, no hover effect
          dayClass += " text-gray-300 cursor-not-allowed";
        } else {
          // selectable
          dayClass += " hover:bg-gray-200 text-gray-800";
          if (isToday) {
            dayClass += " border border-[#cb212e] text-[#cb212e]";
          }
        }
      }
      daysArray.push(
        <div
          key={day}
          onClick={
            isUnselectablePastDate
              ? null
              : () => {
                  setSelectedDate(date);
                  onClose();
                }
          }
          className={dayClass}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };
  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };
  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-gray-600 hover:text-[#cb212e] p-2 rounded-full transition-all duration-200 focus:outline-none"
        >
          &lt;
        </button>
        <span className="text-lg font-bold">
          {currentMonth.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={nextMonth}
          className="text-gray-600 hover:text-[#cb212e] p-2 rounded-full transition-all duration-200 focus:outline-none"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mt-2">{renderDays()}</div>
    </div>
  );
});
/* ---------------- App ---------------- */
const App = () => {
  const [activeTab, setActiveTab] = useState("By PNR");
  const [pnrNumber, setPnrNumber] = useState("");
  const [stationInput, setStationInput] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [stationCode, setStationCode] = useState("");
  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState("bottom");
  const datePickerRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (datePickerRef.current) {
        const rect = datePickerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const calendarHeight = 400;
        if (rect.bottom + calendarHeight > viewportHeight) {
          setCalendarPosition("top");
        } else {
          setCalendarPosition("bottom");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showFullCalendar]);
  const commonButtonClass =
    "col-span-1 h-16 md:h-10 w-full bg-[#cb212e] text-white font-bold text-xl rounded-xl shadow-md hover:bg-[#cb212e] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb212e] focus:ring-offset-2";
  const Tabs = () => {
    const tabs = ["By PNR", "By Station", "By Train No"];
    return (
      <div className="relative flex justify-between border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowFullCalendar(false);
            }}
            className={`flex-1 text-center py-4 text-lg font-semibold rounded-t-lg transition-all duration-300 ${
              activeTab === tab ? "text-[#cb212e]" : "text-gray-500 hover:text-[#cb212e]"
            }`}
          >
            {tab}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-1 bg-[#cb212e] transition-all duration-300 rounded-full"
          style={{
            width: `${100 / 3}%`,
            left: `${["By PNR", "By Station", "By Train No"].indexOf(activeTab) * (100 / 3)}%`,
          }}
        />
      </div>
    );
  };
  return (
    <div className="h-auto bg-gray-100 font-sans flex flex-col items-center">
      <div className="relative w-full overflow-hidden bg-white shadow-lg rounded-b-[6px]">
        <img
          src={homeImgUrl}
          alt="A passenger on a train with a food delivery box"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center rounded-b-[6px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-b-[6px]"></div>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center drop-shadow-md mt-8">
        Order food online in train!
      </h1>
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
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showFullCalendar={showFullCalendar}
          setShowFullCalendar={setShowFullCalendar}
          calendarPosition={calendarPosition}
          datePickerRef={datePickerRef}
        />
        <div className="mt-10">
          <button
            onClick={() => {
              const params = {
                pnr: pnrNumber,
                station: stationInput,
                train: trainNumber,
                stationCode: stationCode,
                date: selectedDate.toDateString(),
              };
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
