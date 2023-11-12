import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    return JSON.parse(localStorage.getItem("userId")) || null;
  });

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  const storeUserId = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, storeUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
