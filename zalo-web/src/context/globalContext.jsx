import { createContext, useState, useEffect } from "react";

export const globalContext = createContext({});

export const GlobalContext = ({ children }) => {
  const [user, setUser] = useState();
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  const data = {
    user,
    rooms,
    currentRoom,
  };

  const handler = { setUser, setRooms, setCurrentRoom };

  return (
    <globalContext.Provider value={{ data, handler }}>
      {children}
    </globalContext.Provider>
  );
};
