import React, { useState, useEffect, useContext, memo } from "react";
import { LanguageContext } from "../utils/LanguageContext";

/**
 * Displays current date and time with localization support
 * @returns {JSX.Element} Formatted date and time display
 */
function DateTimeDisplay() {
  const { language } = useContext(LanguageContext);
  const [dateTime, setDateTime] = useState(new Date());

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date according to current language
  const formattedDate = dateTime.toLocaleDateString(
    language === "en" ? "en-GB" : "id-ID",
    { day: "2-digit", month: "2-digit", year: "2-digit" }
  );

  // Format time according to current language
  const formattedTime = dateTime.toLocaleTimeString(
    language === "en" ? "en-GB" : "id-ID",
    { hour: "2-digit", minute: "2-digit", hour12: false }
  );

  return (
    <div
      className="text-gray-800 flex flex-col items-center px-4 py-1 text-sm bg-opacity-80"
      role="timer"
      aria-label="Current date and time"
    >
      <span>{formattedTime}</span>
      <span>{formattedDate}</span>
    </div>
  );
}

export default memo(DateTimeDisplay);
