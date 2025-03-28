import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        if (!product || !product.id) {
            console.error('Produit invalide:', product);
            return;
        }

        const productToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        };

        try {
            addToCart(productToAdd, quantity);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier:', error);
        }
    };

    if (!product) {
        return null;
    }

    return (
        <div className="flex items-center space-x-2">
            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-1 border rounded"
            />
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`px-4 py-2 rounded ${
                    isAdded 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
                {isAdded ? 'Ajouté ✓' : 'Ajouter au panier'}
            </button>
        </div>
    );
};

export default AddToCartButton;