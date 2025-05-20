import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token') || null,
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
  });

  // Charger les informations utilisateur si un token est présent au montage
  useEffect(() => {
    if (user.token) {
      axios
        .get('https://todo-backend-zi2d.onrender.com/api/users/getInfos', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          const { name, email } = response.data;
          setUser((prev) => ({ ...prev, name, email }));
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
        })
        .catch((err) => {
          console.error('Failed to fetch user info:', err);
          // Si le token est invalide, déconnecter
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          setUser({ token: null, name: '', email: '' });
        });
    }
  }, [user.token]);

  // Fonction pour connecter l'utilisateur
  const login = (token) => {
    localStorage.setItem('token', token);
    setUser((prev) => ({ ...prev, token }));
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setUser({ token: null, name: '', email: '' });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};