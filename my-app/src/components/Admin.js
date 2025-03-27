import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirige si l'utilisateur n'est pas un administrateur
    if (!user || !user.isAdmin) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">Bienvenue, Administrateur</h1>
                <p className="text-gray-600">Gérez le site ici.</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => navigate('/admin/dashboard')}
                >
                    Accéder au tableau de bord
                </button>
            </div>
        </div>
    );
};

export default Admin;
