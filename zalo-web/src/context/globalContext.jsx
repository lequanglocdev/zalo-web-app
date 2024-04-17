import { createContext, useState, useEffect,  } from "react";

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
  //console.log( "Data" ,data);
  useEffect(() => {
   // Khôi phục thông tin người dùng từ Local Storage khi trang được tải lại
    const userData = JSON.parse(localStorage.getItem("user"));
   // console.log( "userData" ,userData);
    if (userData) {
      setUser(userData);
    }
  }, []);
  const handler = { setUser, setRooms, setCurrentRoom };

  return (
    <globalContext.Provider value={{ data, handler }}>
      {children}
    </globalContext.Provider>
  );
};
