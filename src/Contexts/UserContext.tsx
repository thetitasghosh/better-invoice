// context/UserContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "@/app/actions";

const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const user = await getUserData();
      setUser(user);
    };
    fetch();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
