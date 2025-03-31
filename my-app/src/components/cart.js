import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Panier</h2>
                <p>Votre panier est vide</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Panier</h2>
            <div className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">{item.price} €</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-8 text-right">
                    <p className="text-xl font-bold">
                        Total: {getCartTotal().toFixed(2)} €
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;