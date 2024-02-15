"use client";

import React, { createContext, useState } from "react";

// Create a context with an initial state
export const CalendarContext = createContext();

// Create a provider component that will wrap your application
export const CalendarContextProvider = ({ children }) => {
   const [calendarData, setCalendarData] = useState(null);
   return (
      <CalendarContext.Provider value={{ calendarData, setCalendarData }}>
         {children}
      </CalendarContext.Provider>
   );
};
