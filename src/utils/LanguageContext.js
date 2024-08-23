import React, { createContext, useState, useContext } from "react";
import * as textsEn from "../data/texts_en";
import * as textsId from "../data/texts_id";

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const texts = language === "en" ? textsEn : textsId;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};
