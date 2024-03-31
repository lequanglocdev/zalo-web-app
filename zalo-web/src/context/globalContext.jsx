import { createContext, useState ,useEffect} from "react";

export const globalContext = createContext({});

export const GlobalContext = ({ children }) => {
  const [user, setUser] = useState();

  const data = {
    user,
  };
  useEffect(() => {
    // Khôi phục thông tin người dùng từ Local Storage khi trang được tải lại
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);

  const handler = { setUser };

  return (
    <globalContext.Provider value={{ data, handler }}>
      {children}
    </globalContext.Provider>
  );
};
