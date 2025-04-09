import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [totalCheckout, settotalCheckout] = useState(null);

  const login = userData => {
    setUser(userData);
    setIsLogin(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogin(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isLogin,
        setUser,
        totalCheckout,
        settotalCheckout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
