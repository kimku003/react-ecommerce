import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { truncateText } from '../utils/textUtils';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Products = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/api/products/');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des produits');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Calcul des produits filtrés
    const filteredProducts = products.filter(product => {
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesCategory = !selectedCategory || 
            product.category?.toLowerCase() === selectedCategory.toLowerCase();
            
        return matchesSearch && matchesCategory;
    });

    // Affichage du chargement
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Affichage des erreurs
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600 text-center">
                    <h2 className="text-xl font-bold mb-2">Erreur</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <section className="py-12">
                <div className="container mx-auto py-12 px-4">
                    {/* En-tête amélioré */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-blue-800 mb-4">Notre Collection de Drones</h2>
                        <p className="text-gray-600 mt-4">
                            Découvrez notre sélection exclusive de drones haute performance pour tous les niveaux.
                        </p>
                    </div>

                    {/* Barre de recherche */}
                    <div className="mb-8">
                        <div className="max-w-md mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filtres de catégorie */}
                    <div className="flex justify-center gap-4 mb-8">
                        {['all', 'pro', 'amateur', 'débutant'].map(category => (
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
                            {filteredProducts.length === 0 ? (
                                <div className="text-center col-span-2">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        Aucun produit trouvé
                                    </h3>
                                </div>
                            ) : (
                                filteredProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
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
                                                    <button 
                                                        onClick={() => addToCart(product)}
                                                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold"
                                                    >
                                                        Ajouter au panier
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
