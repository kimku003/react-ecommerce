import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white py-4 flex justify-between items-center lg:items-center shadow-md sticky top-0 z-10 rounded-md">
            <div className="logo text-xl font-bold ml-4 animate-bounce">Mon E-commerce</div>
            <button id="menu-toggle" className="mr-4 md:hidden focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <nav id="main-nav" className="mr-4 hidden md:block absolute top-full right-0 bg-blue-500 md:bg-transparent shadow-md md:shadow-none rounded-md md:rounded-none">
                <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4 p-4 md:p-0 text-black ">
                    <li><a href="#home" className="hover:text-blue-300 no-underline block py-2 md:inline">Accueil</a></li>
                    <li><a href="#products" className="hover:text-blue-300 no-underline block py-2 md:inline">Produits</a></li>
                    <li><a href="#about" className="hover:text-blue-300 no-underline block py-2 md:inline">À Propos</a></li>
                    <li><a href="#contact" className="hover:text-blue-300 no-underline block py-2 md:inline">Contact</a></li>
                    <li>
                        <a href="#cart" className="flex items-center hover:text-blue-300 no-underline block py-2 md:inline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            <span className="ml-1" id="cart-count">0</span>
                        </a>
                    </li>
                    <li>
                        <button id="theme-toggle" className="p-2 rounded-full hover:bg-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
