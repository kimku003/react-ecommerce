import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Ajout d'un administrateur par défaut avec un mot de passe
        const defaultAdmin = { email: 'admin@example.com', password: 'admin123', isAdmin: true };
        const storedUser = localStorage.getItem('user');
        setUser(storedUser ? JSON.parse(storedUser) : defaultAdmin);
    }, []);

    const login = (userData) => {
        // Vérifie les informations d'identification de l'administrateur
        if (
            userData.email === 'admin@example.com' &&
            userData.password === 'admin123'
        ) {
            setUser({ ...userData, isAdmin: true });
            localStorage.setItem('user', JSON.stringify({ ...userData, isAdmin: true }));
        } else {
            setUser({ ...userData, isAdmin: false });
            localStorage.setItem('user', JSON.stringify({ ...userData, isAdmin: false }));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
