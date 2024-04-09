import { createContext, useState, useEffect } from "react";

export const globalContext = createContext({});

export const GlobalContext = ({ children }) => {
  const [user, setUser] = useState();
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  const globalData = {
    user,
    rooms,
    currentRoom,
  };

  const globalHandler = { setUser, setRooms, setCurrentRoom };

  return (
    <globalContext.Provider value={{ globalData, globalHandler }}>
      {children}
    </globalContext.Provider>
  );
};
