// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const moot = JSON.parse(localStorage.getItem("MootUserInfo"));
    const admin = JSON.parse(localStorage.getItem("lawvsadmininfo"));
    const user = JSON.parse(localStorage.getItem("lawvsuserinfo"));
    console.log(admin, "admin");
    if (admin?.token) {
      setCurrentUser(admin);
    } else if (moot?.token) {
      setCurrentUser(moot);
    } else if (user?.token) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }

    setLoading(false); // ✅ VERY IMPORTANT
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
