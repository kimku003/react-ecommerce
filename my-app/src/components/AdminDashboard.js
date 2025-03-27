import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const [publishDate, setPublishDate] = useState('');

    // Redirige si l'utilisateur n'est pas un administrateur
    if (!user || !user.isAdmin) {
        navigate('/');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const handleAddProduct = () => {
        if (newProduct.trim()) {
            setProducts([...products, { name: newProduct, publishDate: null }]);
            setNewProduct('');
        }
    };

    const handleDeleteProduct = (product) => {
        setProducts(products.filter((p) => p !== product));
    };

    const handlePublishNow = (product) => {
        setProducts(
            products.map((p) =>
                p === product ? { ...p, publishDate: 'Publié immédiatement' } : p
            )
        );
    };

    const handleSchedulePublish = (product) => {
        if (publishDate) {
            setProducts(
                products.map((p) =>
                    p === product ? { ...p, publishDate } : p
                )
            );
            setPublishDate('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">Tableau de bord Administrateur</h1>
                <p className="text-gray-600">Bienvenue, {user.email}. Gérez le site ici.</p>
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-bold">Créer un produit</h2>
                        <input
                            type="text"
                            value={newProduct}
                            onChange={(e) => setNewProduct(e.target.value)}
                            placeholder="Nom du produit"
                            className="border px-4 py-2 rounded-md w-64"
                        />
                        <button
                            onClick={handleAddProduct}
                            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Ajouter
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Liste des produits</h2>
                        {products.length > 0 ? (
                            <ul className="space-y-2">
                                {products.map((product, index) => (
                                    <li key={index} className="flex flex-col items-start border px-4 py-2 rounded-md">
                                        <div className="flex justify-between w-full">
                                            <span>{product.name}</span>
                                            <button
                                                onClick={() => handleDeleteProduct(product)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-gray-600">
                                                {product.publishDate
                                                    ? `Publication : ${product.publishDate}`
                                                    : 'Non publié'}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex space-x-2">
                                            <button
                                                onClick={() => handlePublishNow(product)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Publier maintenant
                                            </button>
                                            <input
                                                type="date"
                                                value={publishDate}
                                                onChange={(e) => setPublishDate(e.target.value)}
                                                className="border px-2 py-1 rounded-md"
                                            />
                                            <button
                                                onClick={() => handleSchedulePublish(product)}
                                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                                            >
                                                Planifier
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">Aucun produit disponible.</p>
                        )}
                    </div>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
