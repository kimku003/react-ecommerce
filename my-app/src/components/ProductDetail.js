import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = ({ products }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Produit non trouvé</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto">
                <Link to="/products" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux produits
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                            <div className="text-2xl text-blue-600 font-bold mb-6">
                                {product.price.toLocaleString('fr-FR')} €
                            </div>
                            <p className="text-gray-600 mb-6">{product.description}</p>

                            {product.accessories && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">Accessoires inclus</h2>
                                    <ul className="space-y-2">
                                        {product.accessories.map((acc, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {acc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {product.customizations && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">Caractéristiques</h2>
                                    <ul className="space-y-2">
                                        {product.customizations.map((custom, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                                                </svg>
                                                {custom}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
