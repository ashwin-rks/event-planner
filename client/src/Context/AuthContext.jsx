import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/auth/validate', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200 && response.data.user) {
          setIsAuthenticated(true);
          setIsManager(response.data.user.userType === 'Event Manager');
        } else {
          localStorage.clear('token');
          setIsAuthenticated(false);
          setIsManager(false);
        }
      } catch (error) {
        localStorage.clear('token');
        setIsAuthenticated(false);
        setIsManager(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isManager, setIsManager, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
