import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token); // Ispravak
      setUser({ username: decoded.username, role: decoded.role });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
