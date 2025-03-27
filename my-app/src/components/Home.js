import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <video 
                        className="w-full h-full object-cover"
                        autoPlay 
                        loop 
                        muted 
                        src="/drone-footage.mp4"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="relative text-center text-white z-10 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        L'univers des Drones
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Découvrez notre sélection de drones haute performance pour tous vos projets
                    </p>
                    <Link to="/products" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full 
                                 text-lg font-semibold transition-all duration-300 inline-block">
                        Découvrir la Collection
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Livraison Rapide</h3>
                            <p className="text-gray-600">Livraison express disponible partout en France</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Garantie 2 Ans</h3>
                            <p className="text-gray-600">Tous nos drones sont garantis 2 ans</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Support 24/7</h3>
                            <p className="text-gray-600">Une équipe d'experts à votre service</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Catégories Populaires</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {['Drones Pro', 'Drones FPV', 'Drones Débutants'].map((category, index) => (
                            <div key={index} 
                                 className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                                <img 
                                    src={`/category-${index + 1}.jpg`} 
                                    alt={category}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="text-white text-2xl font-bold">{category}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
