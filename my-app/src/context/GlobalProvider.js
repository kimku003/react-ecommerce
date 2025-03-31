import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export const GlobalProvider = ({ children }) => {
    return (
        <CartProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </CartProvider>
    );
};