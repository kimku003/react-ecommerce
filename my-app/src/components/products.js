import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';
import { truncateText } from '../utils/textUtils';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products/`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['all', 'pro', 'amateur', 'débutant'];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    if (loading) {
        return <div className="text-center py-12">Chargement...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-600">{error}</div>;
    }

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="container mx-auto py-12 px-4">
                {/* En-tête amélioré */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-800 mb-4">
                        Notre Collection de Drones
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Découvrez notre sélection exclusive de drones haute performance pour tous les niveaux
                    </p>
                </div>

                {/* Filtres de catégorie */}
                <div className="flex justify-center gap-4 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Grille de produits améliorée */}
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {filteredProducts.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                                    <div className="relative">
                                        <img 
                                            src={product.image || 'https://via.placeholder.com/400'} 
                                            alt={product.name}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                                                {product.price.toLocaleString('fr-FR')} €
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 h-[60px] overflow-hidden">
                                            {truncateText(product.description, 120)}
                                        </p>
                                        
                                        {product.accessories && (
                                            <div className="mb-4">
                                                <h4 className="font-bold text-gray-700 mb-2">Accessoires inclus:</h4>
                                                <ul className="space-y-1">
                                                    {product.accessories.map((acc, index) => (
                                                        <li key={index} className="text-sm text-gray-600 flex items-center">
                                                            <span className="mr-2">•</span> {acc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {product.customizations && (
                                            <div className="mb-4">
                                                <h4 className="font-bold text-gray-700 mb-2">Caractéristiques:</h4>
                                                <ul className="space-y-1">
                                                    {product.customizations.map((custom, index) => (
                                                        <li key={index} className="text-sm text-gray-600 flex items-center">
                                                            <span className="mr-2">•</span> {custom}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                                                         transform transition-all duration-300 hover:bg-blue-700 
                                                         active:scale-95 flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
