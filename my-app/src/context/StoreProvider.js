import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export const StoreProvider = ({ children }) => {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    );
};