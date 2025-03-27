import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products] = useState([
        {
            id: 1,
            name: 'Produit 1',
            price: 29.99,
            description: 'Description du produit 1',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            name: 'Produit 2',
            price: 39.99,
            description: 'Description du produit 2',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            name: 'Drone Dji Mini 4 Pro Fly More Combo avec radiocommande Blanc',
            price: 999.99,
            description: 'Réalisez des prouesses avec Mini DJI Mini 4 Pro constitue notre mini drone caméra le plus perfectionné à ce jour. Il intègre de puissantes capacités d\'imaging, une détection d\'obstacles omnidirectionnelle, ActiveTrack 360° avec un nouveau mode de suivi, et une transmission vidéo FHD sur 20 km, pour le plus grand plaisir des pros comme des débutants.',
            image: 'https://static.fnac-static.com/multimedia/Images/FR/MDM/c1/b1/52/22196673/3756-1/tsp20250314191927/Drone-Dji-Mini-4-Pro-Fly-More-Combo-avec-radiocommande-Blanc.jpg',
            accessories: ['Batterie de Vol Intelligente : 2 590 mAh', 'Batterie de Vol Intelligente Plus : 3 850 mAh'],
            customizations: [
                'Taille drone plié: 148 x 94 x 64 mm',
                'Taille drone déplié: 298 x 373 x 101 mm',
                'Couleur: Blanc',
                'Télécommande avec écran intégré'
            ]
        },
        {
            id: 4,
            name: 'DJI Air 3',
            price: 1199.99,
            description: 'Le DJI Air 3 établit une nouvelle norme pour les drones grand public avec ses doubles caméras principales, offrant une qualité d\'image exceptionnelle et une polyvalence inégalée.',
            image: 'https://store.dji.com/fr/product/dji-air-3?vid=117101',
            accessories: ['3 batteries intelligentes', 'Station de recharge', 'Sac de transport'],
            customizations: [
                'Double caméra 48MP',
                'Autonomie jusqu\'à 46 minutes',
                'Détection d\'obstacles omnidirectionnelle',
                'Transmission vidéo O4'
            ]
        },
        {
            id: 5,
            name: 'DJI FPV Combo',
            price: 799.99,
            description: 'Découvrez le vol immersif avec le DJI FPV, combinant la vitesse et l\'agilité d\'un drone FPV avec la facilité d\'utilisation caractéristique de DJI.',
            image: 'https://store.dji.com/fr/product/dji-fpv?vid=104921',
            accessories: ['Lunettes V2', 'Manette de contrôle', 'Batterie intelligente'],
            customizations: [
                'Mode S jusqu\'à 140 km/h',
                'Transmission HD faible latence',
                'Caméra 4K/60fps',
                'Mode d\'urgence Turtle'
            ]
        },
        {
            id: 6,
            name: 'DJI Mavic 3 Pro',
            price: 2499.99,
            description: 'Le système de triple caméra Hasselblad révolutionne la photographie aérienne, offrant une polyvalence et une qualité d\'image incomparables.',
            image: 'https://store.dji.com/fr/product/dji-mavic-3-pro?vid=117161',
            accessories: ['Kit Fly More', 'Filtres ND', 'Smart Controller RC Pro'],
            customizations: [
                'Triple caméra Hasselblad',
                'Capteur 4/3 CMOS',
                'Zoom optique 7x',
                'Autonomie 43 minutes'
            ]
        },
        {
            id: 7,
            name: 'DJI Mini 2 SE',
            price: 349.99,
            description: 'Le drone parfait pour débuter, ultra-léger et facile à piloter, offrant des performances remarquables dans un format compact.',
            image: 'https://store.dji.com/fr/product/dji-mini-2-se?vid=115591',
            accessories: ['Radiocommande', 'Batterie intelligente', 'Hélices de rechange'],
            customizations: [
                'Poids < 249g',
                'Caméra 2.7K',
                'Autonomie 31 minutes',
                'Transmission jusqu\'à 10km'
            ]
        }
    ]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'pro', 'amateur', 'débutant'];

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                                <div className="relative">
                                    <img src={product.image} 
                                         alt={product.name} 
                                         className="w-full h-64 object-cover"/>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                                            {product.price.toLocaleString('fr-FR')} €
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                    
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
        </section>
    );
};

export default Products;
