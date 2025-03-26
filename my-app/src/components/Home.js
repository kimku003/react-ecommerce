import React from 'react';

const Home = () => {
    return (
        <section id="home" className="container mx-auto py-10 flex flex-col md:flex-row items-center justify-around animate-fade-in">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Bienvenue sur Mon E-commerce</h1>
                <p className="text-gray-600 mb-8">Votre destination pour les meilleurs produits en ligne.</p>
                <button onClick={() => window.location.href='#products'} className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                    Découvrez Nos Produits
                </button>
            </div>
            <div className="mt-8 md:mt-0">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="Image d'accueil" className="rounded-lg shadow-lg animate-slide-in-right" />
            </div>
        </section>
    );
};

export default Home;
