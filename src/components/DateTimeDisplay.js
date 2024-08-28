import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";

function DateTimeDisplay() {
  const { language } = useContext(LanguageContext); // Get the current language from context
  const [dateTime, setDateTime] = useState(new Date());

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second for real-time display

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  // Formatting the date and time
  const formattedDate = dateTime.toLocaleDateString(language === "en" ? "en-GB" : "id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const formattedTime = dateTime.toLocaleTimeString(language === "en" ? "en-GB" : "id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  });

  return (
    <div className="text-gray-800 flex flex-col items-center px-4 py-1 text-sm bg-opacity-80">
      <span>{formattedTime}</span>
      <span>{formattedDate}</span>
    </div>
  );
}

export default DateTimeDisplay;
