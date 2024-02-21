import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Context = createContext();

const AppContext = ({ children }) => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate('/')
    }
  }, [navigate]);



  return (
    <Context.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        location
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;