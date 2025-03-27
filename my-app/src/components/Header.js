import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    // Empêcher le défilement du body quand le menu est ouvert
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-blue-500 text-white py-4 px-4 relative">
            <div className="flex justify-between items-center container mx-auto">
                <div className="text-xl font-bold animate-bounce">Mon E-commerce</div>
                
                <button 
                    onClick={toggleMenu} 
                    className="md:hidden focus:outline-none z-50"
                    aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className="h-6 w-6 transition-transform duration-200"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Overlay pour mobile */}
                {isMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                )}

                <nav className={`
                    fixed md:relative top-0 right-0 h-full md:h-auto w-64 md:w-auto
                    bg-blue-500 md:bg-transparent z-50 md:z-auto
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                    md:block
                `}>
                    <ul className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-0">
                        <li><Link to="/" className="text-white hover:text-blue-200 block w-full" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
                        <li><Link to="/products" className="text-white hover:text-blue-200 block w-full" onClick={() => setIsMenuOpen(false)}>Produits</Link></li>
                        <li><Link to="/about" className="text-white hover:text-blue-200 block w-full" onClick={() => setIsMenuOpen(false)}>À Propos</Link></li>
                        <li><Link to="/contact" className="text-white hover:text-blue-200 block w-full" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                        <li>
                            <Link to="/cart" className="flex items-center text-white hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                    <path d="M3 6h18"/>
                                    <path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                                <span id="cart-count">0</span>
                            </Link>
                        </li>
                        {user && user.isAdmin && (
                            <li>
                                <Link
                                    to="/admin/dashboard"
                                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Administration
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">{user.email}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Connexion
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
