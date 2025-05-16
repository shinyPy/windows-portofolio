import React, { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import * as textsEn from "../data/texts_en";
import * as textsId from "../data/texts_id";

/**
 * Language context for managing application internationalization
 */
export const LanguageContext = createContext();

/**
 * Custom hook for accessing language context
 * @returns {Object} The language context value
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

/**
 * Provider component for language context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // Memoize the text values to prevent unnecessary re-renders
  const value = useMemo(() => {
    const texts = language === "en" ? textsEn : textsId;
    return { language, setLanguage, texts };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
