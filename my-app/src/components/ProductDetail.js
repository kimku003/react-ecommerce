import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../api/config';
import AddToCartButton from './AddToCartButton';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}/`);
                if (!response.ok) {
                    throw new Error('Produit non trouvé');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-12">Chargement...</div>;
    if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
    if (!product) return <div className="text-center py-12">Produit non trouvé</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl font-bold mb-6">{product.price} €</p>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
