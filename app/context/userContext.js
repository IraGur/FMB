"use client";

import React, { createContext, useEffect, useState } from "react";

// Create a context with an initial state
export const UserContext = createContext();

// Create a provider component that will wrap your application
export const UserContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   useEffect(() => {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
         setUser(JSON.parse(savedUser));
      }
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   );
};
