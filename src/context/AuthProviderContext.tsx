import React, { createContext, useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";

export const AuthProviderContext = createContext<any>({});

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  }

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    const unsecuredRoutes = ['/login'];
    if (!currentUser && sessionUser) {
      setCurrentUser(JSON.parse(sessionUser));
    }

    if (currentUser && unsecuredRoutes.includes(window.location.pathname)) {
      navigate('/');
    }

    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate])

  return (
    <AuthProviderContext.Provider value={{ setCurrentUser, currentUser, handleLogout }}>
      {children}
    </AuthProviderContext.Provider>
  )
};

export default AuthProvider;


