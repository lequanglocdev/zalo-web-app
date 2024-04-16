import { createContext, useState, useEffect } from "react";

export const globalContext = createContext({});

export const GlobalContext = ({ children }) => {
  const [user, setUser] = useState();
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [phone , setPhone] = useState();
  const [gender, setGender] = useState();
  const [image, setImage] = useState();
  const [birthday, setBirthday] = useState();
  const data = {
    user,
    rooms,
    currentRoom,
    phone,
    gender,
    image,
    birthday,
  };
  console.log( "Data" ,data);
  useEffect(() => {
    // Khôi phục thông tin người dùng từ Local Storage khi trang được tải lại
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log( "userData" ,userData);
    setUser(userData);
    setPhone(userData);
    setGender(userData);
    setImage(userData);
    setBirthday(userData);

  }, []);

  const handler = { setUser, setRooms, setCurrentRoom ,setPhone, setGender, setImage, setBirthday};

  return (
    <globalContext.Provider value={{ data, handler }}>
      {children}
    </globalContext.Provider>
  );
};
